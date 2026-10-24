import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  ActivityIndicator,
  ScrollView,
  Image,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { getTrackingMapUrl, calculateDistance, estimateETA } from '../services/mapService';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');

interface TripInfo {
  id: string;
  sacco: string;
  vehicle: string;
  driver: string;
  driverPhone: string;
  route: string;
  pickup: string;
  destination: string;
  fare: number;
  eta: number;
  status: 'waiting' | 'approaching' | 'boarding' | 'in_transit' | 'arriving' | 'completed';
}

const mockTrip: TripInfo = {
  id: 'TRIP-001',
  sacco: 'Super Metro',
  vehicle: 'KCB 123A',
  driver: 'John Kamau',
  driverPhone: '+254 712 345 678',
  route: 'Thika - Nairobi CBD',
  pickup: 'Thika Town Stage',
  destination: 'Kencom, Nairobi',
  fare: 150,
  eta: 5,
  status: 'approaching',
};

export default function TrackingScreen({ navigation, route }: any) {
  const { colors } = useTheme();
  const [trip, setTrip] = useState<TripInfo>(mockTrip);
  const [eta, setEta] = useState(trip.eta);
  const [userLocation, setUserLocation] = useState<{latitude: number; longitude: number} | null>(null);
  const [vehicleLocation, setVehicleLocation] = useState<{latitude: number; longitude: number} | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0.3);
  const [mapUrl, setMapUrl] = useState<string | null>(null);
  const [mapError, setMapError] = useState(false);

  // Sample vehicle location (simulating a matatu on Thika Road)
  const mockVehicleLocation = {
    latitude: -1.2200,
    longitude: 36.8880,
  };

  // Sample destination (Kencom, Nairobi CBD)
  const destinationLocation = {
    latitude: -1.2864,
    longitude: 36.8172,
  };

  // Default user location (Thika)
  const defaultUserLocation = {
    latitude: -1.0333,
    longitude: 37.0693,
  };

  useEffect(() => {
    initializeTracking();
    
    // ETA countdown
    const interval = setInterval(() => {
      setEta((prev) => Math.max(0, prev - 1));
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const initializeTracking = async () => {
    try {
      setIsLoading(true);
      setMapError(false);
      
      // Get user's current location
      let userLoc = defaultUserLocation;
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          userLoc = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };
        }
      } catch (locError) {
        console.log('Using default location');
      }
      
      setUserLocation(userLoc as any);
      setVehicleLocation(mockVehicleLocation);

      // Generate static map URL
      const url = getTrackingMapUrl(
        userLoc,
        mockVehicleLocation,
        destinationLocation,
        { width: 400, height: 250 }
      );
      setMapUrl(url);

      // Calculate ETA
      const distance = calculateDistance(mockVehicleLocation, userLoc);
      const calculatedEta = estimateETA(distance);
      setEta(calculatedEta);

      setIsLoading(false);
    } catch (error) {
      console.error('Error initializing tracking:', error);
      setMapError(true);
      setIsLoading(false);
    }
  };

  // Simulate progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 0.02, 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getStatusText = (status: TripInfo['status']) => {
    switch (status) {
      case 'waiting': return 'Waiting for matatu';
      case 'approaching': return 'Matatu is approaching';
      case 'boarding': return 'Boarding in progress';
      case 'in_transit': return 'On the way';
      case 'arriving': return 'Arriving at destination';
      case 'completed': return 'Trip completed';
      default: return 'Unknown status';
    }
  };

  const getStatusColor = (status: TripInfo['status']) => {
    switch (status) {
      case 'waiting': return colors.warning;
      case 'approaching': return colors.accent;
      case 'boarding': return colors.primary;
      case 'in_transit': return colors.primary;
      case 'arriving': return colors.success;
      case 'completed': return colors.success;
      default: return colors.textMuted;
    }
  };

  const handleSOS = () => {
    Alert.alert(
      'Emergency SOS',
      'This will alert your emergency contacts and our safety team with your live location. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Send SOS', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('SOS Sent', 'Emergency contacts have been notified.');
          }
        },
      ]
    );
  };

  const handleShareTrip = () => {
    Alert.alert('Share Trip', 'Trip details shared with your emergency contacts.');
  };

  const handleCallDriver = () => {
    Linking.openURL(`tel:${trip.driverPhone.replace(/\s/g, '')}`);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Map View */}
        <View style={[styles.mapContainer, { backgroundColor: colors.surface }]}>
          {isLoading ? (
            <View style={styles.mapPlaceholder}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={[styles.mapLoadingText, { color: colors.textMuted }]}>
                Loading map...
              </Text>
            </View>
          ) : mapUrl && !mapError ? (
            <>
              <Image
                source={{ uri: mapUrl }}
                style={styles.mapImage}
                resizeMode="cover"
                onError={() => setMapError(true)}
              />
              {/* Map Legend */}
              <View style={[styles.mapLegend, { backgroundColor: colors.surface }]}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#22C55E' }]} />
                  <Text style={[styles.legendText, { color: colors.textMuted }]}>You</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
                  <Text style={[styles.legendText, { color: colors.textMuted }]}>Matatu</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: colors.accent }]} />
                  <Text style={[styles.legendText, { color: colors.textMuted }]}>Destination</Text>
                </View>
              </View>
              {/* ETA Overlay */}
              <View style={[styles.etaOverlay, { backgroundColor: colors.primary }]}>
                <Text style={styles.etaOverlayLabel}>ETA</Text>
                <Text style={styles.etaOverlayValue}>{eta} min</Text>
              </View>
            </>
          ) : (
            <View style={styles.mapPlaceholder}>
              <Ionicons name="map-outline" size={48} color={colors.textMuted} />
              <Text style={[styles.mapLoadingText, { color: colors.textMuted }]}>
                Map unavailable
              </Text>
              <TouchableOpacity
                style={[styles.retryBtn, { backgroundColor: colors.primary }]}
                onPress={initializeTracking}
              >
                <Text style={styles.retryBtnText}>Retry</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Status Card */}
        <View style={[styles.statusCard, { backgroundColor: colors.surface }]}>
          <View style={styles.statusHeader}>
            <View style={[styles.statusDot, { backgroundColor: getStatusColor(trip.status) }]} />
            <Text style={[styles.statusText, { color: getStatusColor(trip.status) }]}>
              {getStatusText(trip.status)}
            </Text>
          </View>
          
          {/* Progress Bar */}
          <View style={[styles.tripProgressBar, { backgroundColor: colors.border }]}>
            <View style={[styles.tripProgressFill, { backgroundColor: colors.primary, width: `${progress * 100}%` }]} />
          </View>
        </View>

        {/* Route Info */}
        <View style={[styles.routeCard, { backgroundColor: colors.surface }]}>
          <View style={styles.routeRow}>
            <View style={[styles.routeDot, { backgroundColor: colors.primary }]} />
            <View style={styles.routeInfo}>
              <Text style={[styles.routeLabel, { color: colors.textMuted }]}>PICKUP</Text>
              <Text style={[styles.routeValue, { color: colors.text }]}>{trip.pickup}</Text>
            </View>
          </View>
          <View style={[styles.routeDivider, { borderColor: colors.border }]} />
          <View style={styles.routeRow}>
            <View style={[styles.routeDot, { backgroundColor: colors.accent }]} />
            <View style={styles.routeInfo}>
              <Text style={[styles.routeLabel, { color: colors.textMuted }]}>DESTINATION</Text>
              <Text style={[styles.routeValue, { color: colors.text }]}>{trip.destination}</Text>
            </View>
          </View>
        </View>

        {/* Vehicle Info */}
        <View style={[styles.vehicleCard, { backgroundColor: colors.surface }]}>
          <View style={[styles.vehicleIconBox, { backgroundColor: colors.primary + '20' }]}>
            <Ionicons name="bus" size={28} color={colors.primary} />
          </View>
          <View style={styles.vehicleInfo}>
            <Text style={[styles.vehicleSacco, { color: colors.text }]}>{trip.sacco}</Text>
            <Text style={[styles.vehicleDetails, { color: colors.textMuted }]}>
              {trip.vehicle} • {trip.driver}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.callBtn, { backgroundColor: colors.success }]}
            onPress={handleCallDriver}
          >
            <Ionicons name="call" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Fare Card */}
        <View style={[styles.fareCard, { backgroundColor: colors.primary }]}>
          <View>
            <Text style={styles.fareLabel}>Total Fare</Text>
            <Text style={styles.fareValue}>KSh {trip.fare}</Text>
          </View>
          <View style={styles.farePayment}>
            <Ionicons name="wallet" size={20} color="rgba(255,255,255,0.8)" />
            <Text style={styles.farePaymentText}>M-Pesa</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.actionBtn, styles.sosBtn]}
            onPress={handleSOS}
          >
            <Ionicons name="warning" size={24} color="#fff" />
            <Text style={styles.actionBtnText}>SOS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: colors.primary }]}
            onPress={handleShareTrip}
          >
            <Ionicons name="share-social" size={24} color="#fff" />
            <Text style={styles.actionBtnText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: colors.accent }]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="close" size={24} color={colors.primaryDark} />
            <Text style={[styles.actionBtnText, { color: colors.primaryDark }]}>End</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    height: 250,
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  mapLoadingText: {
    fontSize: 14,
  },
  retryBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  retryBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
  mapLegend: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 11,
  },
  etaOverlay: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
  },
  etaOverlayLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
    fontWeight: '500',
  },
  etaOverlayValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  statusCard: {
    margin: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 16,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
  },
  tripProgressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  tripProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  routeCard: {
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 16,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  routeDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  routeInfo: {
    flex: 1,
  },
  routeLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  routeValue: {
    fontSize: 15,
    fontWeight: '500',
    marginTop: 2,
  },
  routeDivider: {
    width: 2,
    height: 24,
    marginLeft: 6,
    marginVertical: 4,
    borderLeftWidth: 2,
    borderStyle: 'dashed',
  },
  vehicleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 16,
  },
  vehicleIconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vehicleInfo: {
    flex: 1,
    marginLeft: 12,
  },
  vehicleSacco: {
    fontSize: 16,
    fontWeight: '600',
  },
  vehicleDetails: {
    fontSize: 14,
    marginTop: 2,
  },
  callBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fareCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 16,
  },
  fareLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },
  fareValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  farePayment: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  farePaymentText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  actionBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 16,
    borderRadius: 14,
  },
  sosBtn: {
    backgroundColor: '#EF4444',
  },
  actionBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
});
