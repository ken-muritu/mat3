/**
 * Routing & Traffic Service using OpenRouteService
 * https://openrouteservice.org/
 */

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface RouteInfo {
  distance: number; // in kilometers
  duration: number; // in minutes
  durationInTraffic?: number; // estimated with traffic
  geometry?: string; // encoded polyline
  steps?: RouteStep[];
}

export interface RouteStep {
  instruction: string;
  distance: number;
  duration: number;
  name?: string;
}

export interface TrafficCondition {
  level: 'free' | 'light' | 'moderate' | 'heavy' | 'blocked';
  description: string;
  multiplier: number;
}

const ORS_BASE_URL = 'https://api.openrouteservice.org';
// OpenRouteService key from the environment (EXPO_PUBLIC_ORS_API_KEY).
const ORS_API_KEY = process.env.EXPO_PUBLIC_ORS_API_KEY ?? '';

/**
 * Get route between two points with traffic-aware ETA
 */
export async function getRoute(
  origin: Coordinates,
  destination: Coordinates
): Promise<RouteInfo> {
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

    const properties = feature.properties;
    const summary = properties.summary;

    // Calculate traffic-adjusted duration based on time of day
    const trafficMultiplier = getTrafficMultiplier();

    return {
      distance: Math.round(summary.distance / 1000 * 10) / 10, // km with 1 decimal
      duration: Math.round(summary.duration / 60), // minutes
      durationInTraffic: Math.round((summary.duration / 60) * trafficMultiplier),
      geometry: feature.geometry,
      steps: properties.segments?.[0]?.steps?.map((step: any) => ({
        instruction: step.instruction,
        distance: Math.round(step.distance),
        duration: Math.round(step.duration / 60),
        name: step.name,
      })),
    };
  } catch (error) {
    console.error('Failed to get route:', error);
    // Return fallback estimate based on straight-line distance
    const straightLineDistance = calculateRouteDistance(origin, destination);
    const estimatedDuration = Math.round(straightLineDistance / 30 * 60); // Assume 30 km/h average

    return {
      distance: straightLineDistance,
      duration: estimatedDuration,
      durationInTraffic: Math.round(estimatedDuration * getTrafficMultiplier()),
    };
  }
}

/**
 * Get multiple routes (alternative routes)
 */
export async function getAlternativeRoutes(
  origin: Coordinates,
  destination: Coordinates
): Promise<RouteInfo[]> {
  try {
    const response = await fetch(`${ORS_BASE_URL}/v2/directions/driving-car/json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': ORS_API_KEY,
      },
      body: JSON.stringify({
        coordinates: [
          [origin.longitude, origin.latitude],
          [destination.longitude, destination.latitude],
        ],
        alternative_routes: {
          target_count: 3,
          weight_factor: 1.4,
          share_factor: 0.6,
        },
      }),
    });

    if (!response.ok) {
      // Fallback to single route
      const singleRoute = await getRoute(origin, destination);
      return [singleRoute];
    }

    const data = await response.json();
    const trafficMultiplier = getTrafficMultiplier();

    return data.routes.map((route: any) => ({
      distance: Math.round(route.summary.distance / 1000 * 10) / 10,
      duration: Math.round(route.summary.duration / 60),
      durationInTraffic: Math.round((route.summary.duration / 60) * trafficMultiplier),
      geometry: route.geometry,
    }));
  } catch (error) {
    console.error('Failed to get alternative routes:', error);
    const singleRoute = await getRoute(origin, destination);
    return [singleRoute];
  }
}

/**
 * Calculate straight-line distance between two points (Haversine formula)
 */
export function calculateRouteDistance(point1: Coordinates, point2: Coordinates): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(point2.latitude - point1.latitude);
  const dLon = toRad(point2.longitude - point1.longitude);
  const lat1 = toRad(point1.latitude);
  const lat2 = toRad(point2.latitude);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c * 10) / 10;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

/**
 * Get traffic multiplier based on current time (Nairobi traffic patterns)
 */
export function getTrafficMultiplier(): number {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay(); // 0 = Sunday

  // Weekend traffic is lighter
  if (day === 0 || day === 6) {
    return 1.1;
  }

  // Nairobi peak hours
  if (hour >= 6 && hour < 9) return 1.8; // Morning rush
  if (hour >= 17 && hour < 20) return 2.0; // Evening rush (worse)
  if (hour >= 12 && hour < 14) return 1.3; // Lunch hour
  if (hour >= 9 && hour < 17) return 1.2; // Daytime
  
  return 1.0; // Off-peak
}

/**
 * Get current traffic condition description
 */
export function getTrafficCondition(): TrafficCondition {
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
 * Estimate fare based on distance and route
 */
export function estimateFare(distanceKm: number, isInterCounty: boolean = false): {
  min: number;
  max: number;
  average: number;
} {
  // Base rates per km (in KES)
  const ratePerKm = isInterCounty ? 4 : 5; // Inter-county is cheaper per km
  const baseFare = isInterCounty ? 50 : 30;

  const calculatedFare = baseFare + (distanceKm * ratePerKm);
  
  // Round to nearest 10
  const average = Math.round(calculatedFare / 10) * 10;
  const min = Math.round(average * 0.85 / 10) * 10;
  const max = Math.round(average * 1.15 / 10) * 10;

  return { min, max, average };
}
