/**
 * Ma3 Location Service
 * Handles real-time GPS tracking using expo-location and Supabase
 */

import * as Location from 'expo-location';
import { supabase } from '../lib/supabase';

export interface LocationData {
  latitude: number;
  longitude: number;
  speed: number | null;
  heading: number | null;
  accuracy: number | null;
  timestamp: number;
}

export interface VehicleLocation {
  id: string;
  vehicle_id: string;
  latitude: number;
  longitude: number;
  speed: number;
  heading: number;
  timestamp: string;
}

class LocationService {
  private watchSubscription: Location.LocationSubscription | null = null;
  private isTracking: boolean = false;

  /**
   * Request location permissions
   */
  async requestPermissions(): Promise<boolean> {
    try {
      const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
      
      if (foregroundStatus !== 'granted') {
        console.warn('Foreground location permission denied');
        return false;
      }

      // Request background permissions for trip tracking
      const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
      
      if (backgroundStatus !== 'granted') {
        console.warn('Background location permission denied - tracking will only work when app is open');
      }

      return true;
    } catch (error) {
      console.error('Error requesting location permissions:', error);
      return false;
    }
  }

  /**
   * Get current location once
   */
  async getCurrentLocation(): Promise<LocationData | null> {
    try {
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) return null;

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        speed: location.coords.speed,
        heading: location.coords.heading,
        accuracy: location.coords.accuracy,
        timestamp: location.timestamp,
      };
    } catch (error) {
      console.error('Error getting current location:', error);
      return null;
    }
  }

  /**
   * Start watching location updates (for drivers/vehicles)
   */
  async startTracking(
    vehicleId: string,
    onLocationUpdate?: (location: LocationData) => void,
    intervalMs: number = 5000
  ): Promise<boolean> {
    try {
      if (this.isTracking) {
        console.warn('Already tracking location');
        return true;
      }

      const hasPermission = await this.requestPermissions();
      if (!hasPermission) return false;

      this.watchSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: intervalMs,
          distanceInterval: 10, // Update every 10 meters
        },
        async (location) => {
          const locationData: LocationData = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            speed: location.coords.speed,
            heading: location.coords.heading,
            accuracy: location.coords.accuracy,
            timestamp: location.timestamp,
          };

          // Callback for local updates
          if (onLocationUpdate) {
            onLocationUpdate(locationData);
          }

          // Send to Supabase for real-time sharing
          await this.sendLocationToServer(vehicleId, locationData);
        }
      );

      this.isTracking = true;
      return true;
    } catch (error) {
      console.error('Error starting location tracking:', error);
      return false;
    }
  }

  /**
   * Stop watching location updates
   */
  stopTracking(): void {
    if (this.watchSubscription) {
      this.watchSubscription.remove();
      this.watchSubscription = null;
    }
    this.isTracking = false;
  }

  /**
   * Send location to Supabase for real-time sharing
   */
  private async sendLocationToServer(vehicleId: string, location: LocationData): Promise<void> {
    try {
      const { error } = await supabase.from('vehicle_locations').insert({
        vehicle_id: vehicleId,
        latitude: location.latitude,
        longitude: location.longitude,
        speed: location.speed || 0,
        heading: location.heading || 0,
      });

      if (error) {
        console.error('Error sending location to server:', error);
      }
    } catch (error) {
      console.error('Error in sendLocationToServer:', error);
    }
  }

  /**
   * Subscribe to real-time vehicle location updates (for passengers)
   */
  subscribeToVehicle(
    vehicleId: string,
    onLocationUpdate: (location: VehicleLocation) => void
  ): () => void {
    const channel = supabase
      .channel(`vehicle-${vehicleId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'vehicle_locations',
          filter: `vehicle_id=eq.${vehicleId}`,
        },
        (payload) => {
          onLocationUpdate(payload.new as VehicleLocation);
        }
      )
      .subscribe();

    // Return unsubscribe function
    return () => {
      supabase.removeChannel(channel);
    };
  }

  /**
   * Get latest vehicle location from database
   */
  async getVehicleLocation(vehicleId: string): Promise<VehicleLocation | null> {
    try {
      const { data, error } = await supabase
        .from('vehicle_locations')
        .select('*')
        .eq('vehicle_id', vehicleId)
        .order('timestamp', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error('Error getting vehicle location:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getVehicleLocation:', error);
      return null;
    }
  }

  /**
   * Calculate distance between two coordinates (Haversine formula)
   */
  calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  /**
   * Estimate ETA based on distance and average speed
   */
  estimateETA(distanceKm: number, speedKmh: number = 30): number {
    if (speedKmh <= 0) speedKmh = 30; // Default to 30 km/h in traffic
    return Math.round((distanceKm / speedKmh) * 60); // Returns minutes
  }
}

export const locationService = new LocationService();
export default locationService;
