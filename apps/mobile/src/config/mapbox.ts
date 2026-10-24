/**
 * Ma3 Mapbox Configuration
 * Mapbox provides free maps without requiring Google Cloud billing
 */

// Public Mapbox token from the environment (EXPO_PUBLIC_MAPBOX_TOKEN).
export const MAPBOX_ACCESS_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_TOKEN ?? '';

// Map style URLs
export const MAPBOX_STYLES = {
  // Standard street map
  STREET: 'mapbox://styles/mapbox/streets-v12',
  // Satellite imagery
  SATELLITE: 'mapbox://styles/mapbox/satellite-v9',
  // Navigation/day
  NAVIGATION_DAY: 'mapbox://styles/mapbox/navigation-day-v1',
  // Navigation/night
  NAVIGATION_NIGHT: 'mapbox://styles/mapbox/navigation-night-v1',
};

// Default map settings
export const DEFAULT_MAP_SETTINGS = {
  style: MAPBOX_STYLES.STREET,
  zoomLevel: 12,
  animationDuration: 1000,
};
