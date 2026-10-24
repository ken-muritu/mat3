/**
 * Routing & Traffic Service using OpenRouteService
 */

const ORS_BASE_URL = 'https://api.openrouteservice.org';
// OpenRouteService key from the environment (VITE_ORS_API_KEY).
const ORS_API_KEY = import.meta.env.VITE_ORS_API_KEY ?? '';

/**
 * Get route between two points with traffic-aware ETA
 */
export async function getRoute(origin, destination) {
  try {
    const response = await fetch(
      `${ORS_BASE_URL}/v2/directions/driving-car?api_key=${ORS_API_KEY}&start=${origin.longitude},${origin.latitude}&end=${destination.longitude},${destination.latitude}`
    );

    if (!response.ok) {
      throw new Error(`Routing API error: ${response.status}`);
    }

    const data = await response.json();
    const feature = data.features?.[0];

    if (!feature) {
      throw new Error('No route found');
    }

    const summary = feature.properties.summary;
    const trafficMultiplier = getTrafficMultiplier();

    return {
      distance: Math.round(summary.distance / 1000 * 10) / 10,
      duration: Math.round(summary.duration / 60),
      durationInTraffic: Math.round((summary.duration / 60) * trafficMultiplier),
      geometry: feature.geometry,
    };
  } catch (error) {
    console.error('Failed to get route:', error);
    const straightLineDistance = calculateDistance(origin, destination);
    const estimatedDuration = Math.round(straightLineDistance / 30 * 60);

    return {
      distance: straightLineDistance,
      duration: estimatedDuration,
      durationInTraffic: Math.round(estimatedDuration * getTrafficMultiplier()),
    };
  }
}

/**
 * Calculate straight-line distance (Haversine)
 */
export function calculateDistance(point1, point2) {
  const R = 6371;
  const dLat = toRad(point2.latitude - point1.latitude);
  const dLon = toRad(point2.longitude - point1.longitude);
  const lat1 = toRad(point1.latitude);
  const lat2 = toRad(point2.latitude);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c * 10) / 10;
}

function toRad(deg) {
  return deg * (Math.PI / 180);
}

/**
 * Get traffic multiplier based on current time (Nairobi patterns)
 */
export function getTrafficMultiplier() {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay();

  if (day === 0 || day === 6) return 1.1;
  if (hour >= 6 && hour < 9) return 1.8;
  if (hour >= 17 && hour < 20) return 2.0;
  if (hour >= 12 && hour < 14) return 1.3;
  if (hour >= 9 && hour < 17) return 1.2;
  
  return 1.0;
}

/**
 * Get current traffic condition
 */
export function getTrafficCondition() {
  const multiplier = getTrafficMultiplier();

  if (multiplier >= 1.8) {
    return { level: 'heavy', description: 'Heavy traffic - expect delays', multiplier };
  }
  if (multiplier >= 1.4) {
    return { level: 'moderate', description: 'Moderate traffic', multiplier };
  }
  if (multiplier >= 1.2) {
    return { level: 'light', description: 'Light traffic', multiplier };
  }
  return { level: 'free', description: 'Roads are clear', multiplier };
}

/**
 * Estimate fare based on distance
 */
export function estimateFare(distanceKm, isInterCounty = false) {
  const ratePerKm = isInterCounty ? 4 : 5;
  const baseFare = isInterCounty ? 50 : 30;
  const calculatedFare = baseFare + (distanceKm * ratePerKm);
  
  const average = Math.round(calculatedFare / 10) * 10;
  const min = Math.round(average * 0.85 / 10) * 10;
  const max = Math.round(average * 1.15 / 10) * 10;

  return { min, max, average };
}
