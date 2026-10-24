/**
 * Ma3 Map Service
 * Uses Mapbox Static Images API for lightweight map rendering
 * No native SDK required - just image URLs
 */

import { MAPBOX_ACCESS_TOKEN } from '../config/mapbox';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface MapMarker {
  coords: Coordinates;
  color?: string;
  label?: string;
}

export interface StaticMapOptions {
  width?: number;
  height?: number;
  zoom?: number;
  style?: 'streets-v12' | 'satellite-v9' | 'dark-v11' | 'light-v11';
  markers?: MapMarker[];
  path?: Coordinates[];
  pathColor?: string;
  retina?: boolean;
}

const DEFAULT_OPTIONS: StaticMapOptions = {
  width: 400,
  height: 300,
  zoom: 13,
  style: 'streets-v12',
  retina: true,
};

/**
 * Generate a Mapbox Static Image URL
 */
export function getStaticMapUrl(
  center: Coordinates,
  options: StaticMapOptions = {}
): string {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const { width, height, zoom, style, markers, path, pathColor, retina } = opts;

  let overlays: string[] = [];

  // Add markers
  if (markers && markers.length > 0) {
    markers.forEach((marker) => {
      const color = (marker.color || '#006B3F').replace('#', '');
      const label = marker.label || '';
      const pin = `pin-s${label ? `-${label}` : ''}+${color}(${marker.coords.longitude},${marker.coords.latitude})`;
      overlays.push(pin);
    });
  }

  // Add path/route line
  if (path && path.length >= 2) {
    const color = (pathColor || '#006B3F').replace('#', '');
    const coords = path.map(p => `${p.longitude},${p.latitude}`).join(',');
    const pathOverlay = `path-4+${color}-0.7(${encodeURIComponent(coords)})`;
    overlays.push(pathOverlay);
  }

  const overlayStr = overlays.length > 0 ? overlays.join(',') + '/' : '';
  const retinaStr = retina ? '@2x' : '';

  return `https://api.mapbox.com/styles/v1/mapbox/${style}/static/${overlayStr}${center.longitude},${center.latitude},${zoom},0/${width}x${height}${retinaStr}?access_token=${MAPBOX_ACCESS_TOKEN}`;
}

/**
 * Generate a map URL showing a route between two points
 */
export function getRouteMapUrl(
  origin: Coordinates,
  destination: Coordinates,
  options: Omit<StaticMapOptions, 'markers' | 'path'> = {}
): string {
  // Calculate center point
  const center: Coordinates = {
    latitude: (origin.latitude + destination.latitude) / 2,
    longitude: (origin.longitude + destination.longitude) / 2,
  };

  // Calculate appropriate zoom based on distance
  const distance = calculateDistance(origin, destination);
  let zoom = 12;
  if (distance > 50) zoom = 9;
  else if (distance > 20) zoom = 10;
  else if (distance > 10) zoom = 11;
  else if (distance > 5) zoom = 12;
  else zoom = 13;

  return getStaticMapUrl(center, {
    ...options,
    zoom,
    markers: [
      { coords: origin, color: '#006B3F', label: 'a' },
      { coords: destination, color: '#FFB800', label: 'b' },
    ],
    path: [origin, destination],
    pathColor: '#006B3F',
  });
}

/**
 * Generate a map URL showing vehicle tracking
 */
export function getTrackingMapUrl(
  userLocation: Coordinates,
  vehicleLocation: Coordinates,
  destination: Coordinates,
  options: Omit<StaticMapOptions, 'markers' | 'path'> = {}
): string {
  // Calculate center to show all three points
  const lats = [userLocation.latitude, vehicleLocation.latitude, destination.latitude];
  const lngs = [userLocation.longitude, vehicleLocation.longitude, destination.longitude];
  
  const center: Coordinates = {
    latitude: (Math.min(...lats) + Math.max(...lats)) / 2,
    longitude: (Math.min(...lngs) + Math.max(...lngs)) / 2,
  };

  // Calculate zoom to fit all points
  const latDiff = Math.max(...lats) - Math.min(...lats);
  const lngDiff = Math.max(...lngs) - Math.min(...lngs);
  const maxDiff = Math.max(latDiff, lngDiff);
  
  let zoom = 12;
  if (maxDiff > 0.5) zoom = 9;
  else if (maxDiff > 0.2) zoom = 10;
  else if (maxDiff > 0.1) zoom = 11;
  else if (maxDiff > 0.05) zoom = 12;
  else zoom = 13;

  return getStaticMapUrl(center, {
    ...options,
    zoom,
    markers: [
      { coords: userLocation, color: '#22C55E', label: 'u' },      // User - green
      { coords: vehicleLocation, color: '#006B3F', label: 'm' },   // Matatu - primary
      { coords: destination, color: '#FFB800', label: 'd' },       // Destination - accent
    ],
    path: [vehicleLocation, destination],
    pathColor: '#006B3F',
  });
}

/**
 * Calculate distance between two coordinates in km (Haversine formula)
 */
export function calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(coord2.latitude - coord1.latitude);
  const dLon = toRad(coord2.longitude - coord1.longitude);
  const lat1 = toRad(coord1.latitude);
  const lat2 = toRad(coord2.latitude);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

/**
 * Estimate ETA in minutes based on distance
 * Assumes average speed of 25 km/h for Nairobi traffic
 */
export function estimateETA(distanceKm: number, avgSpeedKmh: number = 25): number {
  return Math.round((distanceKm / avgSpeedKmh) * 60);
}
