/**
 * Fleet Data - Shared matatu fleet information
 */

export interface Matatu {
  id: number;
  sacco: string;
  vehicle: string;
  eta: number;
  fare: number;
  seats: number;
  rating: number;
  route?: string;
  features?: string[];
}

export interface SaccoInfo {
  id: string;
  name: string;
  vehicleCount: number;
  rating: number;
  routes: string[];
}

/**
 * Full fleet data - 35 matatus across Nairobi
 */
export const FLEET_DATA: Matatu[] = [
  { id: 1, sacco: 'Super Metro', vehicle: 'KCB 123A', eta: 3, fare: 100, seats: 5, rating: 4.8, route: 'thika-nairobi' },
  { id: 2, sacco: '2NK Sacco', vehicle: 'KDA 456B', eta: 5, fare: 100, seats: 8, rating: 4.5, route: 'thika-nairobi' },
  { id: 3, sacco: 'Kenya Mpya', vehicle: 'KDB 789C', eta: 8, fare: 90, seats: 3, rating: 4.6, route: 'thika-nairobi' },
  { id: 4, sacco: 'Embassava', vehicle: 'KCE 234D', eta: 4, fare: 80, seats: 10, rating: 4.7, route: 'eastlands' },
  { id: 5, sacco: 'Umoinner', vehicle: 'KDF 567E', eta: 6, fare: 70, seats: 6, rating: 4.4, route: 'umoja' },
  { id: 6, sacco: 'Githurai 45', vehicle: 'KBZ 890F', eta: 9, fare: 60, seats: 4, rating: 4.3, route: 'githurai' },
  { id: 7, sacco: 'Forward Travelers', vehicle: 'KCG 111G', eta: 7, fare: 100, seats: 7, rating: 4.6, route: 'thika-nairobi' },
  { id: 8, sacco: 'KBS', vehicle: 'KDH 222H', eta: 10, fare: 50, seats: 12, rating: 4.2, route: 'cbd' },
  { id: 9, sacco: 'Mwamba', vehicle: 'KCI 333I', eta: 11, fare: 80, seats: 5, rating: 4.5, route: 'ruiru' },
  { id: 10, sacco: 'Thika Road Shuttle', vehicle: 'KDJ 444J', eta: 2, fare: 120, seats: 14, rating: 4.9, route: 'thika-nairobi' },
  { id: 11, sacco: 'Metro Trans', vehicle: 'KCK 555K', eta: 4, fare: 90, seats: 6, rating: 4.7, route: 'westlands' },
  { id: 12, sacco: 'Citi Hoppa', vehicle: 'KDL 666L', eta: 5, fare: 80, seats: 9, rating: 4.4, route: 'cbd' },
  { id: 13, sacco: 'Double M', vehicle: 'KCM 777M', eta: 6, fare: 70, seats: 7, rating: 4.3, route: 'kahawa' },
  { id: 14, sacco: 'Kiambu Road', vehicle: 'KDN 888N', eta: 8, fare: 60, seats: 5, rating: 4.5, route: 'kiambu' },
  { id: 15, sacco: 'Ngong Line', vehicle: 'KCP 999P', eta: 7, fare: 80, seats: 8, rating: 4.6, route: 'ngong' },
  { id: 16, sacco: 'Karen Connection', vehicle: 'KDQ 101Q', eta: 9, fare: 70, seats: 6, rating: 4.4, route: 'karen' },
  { id: 17, sacco: 'Rongai Express', vehicle: 'KCR 202R', eta: 10, fare: 100, seats: 10, rating: 4.5, route: 'rongai' },
  { id: 18, sacco: 'Kikuyu Travelers', vehicle: 'KDS 303S', eta: 12, fare: 80, seats: 4, rating: 4.2, route: 'kikuyu' },
  { id: 19, sacco: 'Kasarani Shuttle', vehicle: 'KCT 404T', eta: 5, fare: 60, seats: 7, rating: 4.6, route: 'kasarani' },
  { id: 20, sacco: 'Umoja Route', vehicle: 'KDU 505U', eta: 6, fare: 50, seats: 8, rating: 4.3, route: 'umoja' },
  { id: 21, sacco: 'Buruburu Sacco', vehicle: 'KCV 606V', eta: 7, fare: 50, seats: 6, rating: 4.4, route: 'buruburu' },
  { id: 22, sacco: 'Eastlands Shuttle', vehicle: 'KDW 707W', eta: 8, fare: 40, seats: 5, rating: 4.1, route: 'eastlands' },
  { id: 23, sacco: 'Kayole Express', vehicle: 'KCX 808X', eta: 9, fare: 50, seats: 9, rating: 4.2, route: 'kayole' },
  { id: 24, sacco: 'Pipeline Sacco', vehicle: 'KDY 909Y', eta: 10, fare: 60, seats: 7, rating: 4.3, route: 'pipeline' },
  { id: 25, sacco: 'South B Shuttle', vehicle: 'KCZ 010Z', eta: 4, fare: 40, seats: 6, rating: 4.5, route: 'south-b' },
  { id: 26, sacco: 'Langata Line', vehicle: 'KDA 121A', eta: 6, fare: 50, seats: 8, rating: 4.4, route: 'langata' },
  { id: 27, sacco: 'Lavington Sacco', vehicle: 'KDB 232B', eta: 5, fare: 60, seats: 5, rating: 4.6, route: 'lavington' },
  { id: 28, sacco: 'Kilimani Express', vehicle: 'KDC 343C', eta: 4, fare: 50, seats: 7, rating: 4.7, route: 'kilimani' },
  { id: 29, sacco: 'Parklands Shuttle', vehicle: 'KDD 454D', eta: 3, fare: 40, seats: 6, rating: 4.5, route: 'parklands' },
  { id: 30, sacco: 'Highridge Sacco', vehicle: 'KDE 565E', eta: 5, fare: 50, seats: 8, rating: 4.4, route: 'highridge' },
  { id: 31, sacco: 'Ruaka Express', vehicle: 'KDF 676F', eta: 8, fare: 70, seats: 6, rating: 4.3, route: 'ruaka' },
  { id: 32, sacco: 'Banana Hill', vehicle: 'KDG 787G', eta: 10, fare: 80, seats: 5, rating: 4.2, route: 'banana' },
  { id: 33, sacco: 'Limuru Road', vehicle: 'KDH 898H', eta: 12, fare: 100, seats: 7, rating: 4.4, route: 'limuru' },
  { id: 34, sacco: 'Ndenderu Sacco', vehicle: 'KDI 909I', eta: 11, fare: 90, seats: 6, rating: 4.3, route: 'ndenderu' },
  { id: 35, sacco: 'Githunguri Line', vehicle: 'KDJ 020J', eta: 15, fare: 120, seats: 8, rating: 4.1, route: 'githunguri' },
];

/**
 * SACCO information
 */
export const SACCO_DATA: SaccoInfo[] = [
  { id: 'super-metro', name: 'Super Metro', vehicleCount: 150, rating: 4.8, routes: ['thika-nairobi', 'ruiru-cbd'] },
  { id: '2nk', name: '2NK Sacco', vehicleCount: 120, rating: 4.5, routes: ['thika-nairobi', 'juja-cbd'] },
  { id: 'kenya-mpya', name: 'Kenya Mpya', vehicleCount: 100, rating: 4.6, routes: ['thika-nairobi'] },
  { id: 'embassava', name: 'Embassava', vehicleCount: 80, rating: 4.7, routes: ['eastlands', 'umoja'] },
  { id: 'kbs', name: 'KBS', vehicleCount: 200, rating: 4.2, routes: ['cbd', 'westlands'] },
  { id: 'citi-hoppa', name: 'Citi Hoppa', vehicleCount: 180, rating: 4.4, routes: ['cbd', 'karen', 'ngong'] },
  { id: 'metro-trans', name: 'Metro Trans', vehicleCount: 90, rating: 4.7, routes: ['westlands', 'parklands'] },
];

/**
 * Route data with coordinates and fares
 */
export const ROUTES_DATA = [
  { id: 'thika-nairobi', name: 'Thika Road - CBD', origin: 'Thika Town', destination: 'Nairobi CBD', fareMin: 100, fareMax: 150, duration: '1hr 15min', distance: 45 },
  { id: 'ruiru-cbd', name: 'Ruiru - CBD', origin: 'Ruiru Town', destination: 'Nairobi CBD', fareMin: 70, fareMax: 100, duration: '45 min', distance: 25 },
  { id: 'juja-cbd', name: 'Juja - CBD', origin: 'Juja Town', destination: 'Nairobi CBD', fareMin: 80, fareMax: 120, duration: '55 min', distance: 32 },
  { id: 'westlands-cbd', name: 'Westlands - CBD', origin: 'Westlands', destination: 'Nairobi CBD', fareMin: 30, fareMax: 50, duration: '20 min', distance: 5 },
  { id: 'karen-cbd', name: 'Karen - CBD', origin: 'Karen', destination: 'Nairobi CBD', fareMin: 70, fareMax: 100, duration: '40 min', distance: 15 },
  { id: 'ngong-cbd', name: 'Ngong - CBD', origin: 'Ngong Town', destination: 'Nairobi CBD', fareMin: 80, fareMax: 120, duration: '50 min', distance: 25 },
  { id: 'rongai-cbd', name: 'Rongai - CBD', origin: 'Rongai', destination: 'Nairobi CBD', fareMin: 80, fareMax: 120, duration: '45 min', distance: 22 },
  { id: 'kikuyu-cbd', name: 'Kikuyu - CBD', origin: 'Kikuyu Town', destination: 'Nairobi CBD', fareMin: 60, fareMax: 100, duration: '35 min', distance: 18 },
  { id: 'eastlands-cbd', name: 'Eastlands - CBD', origin: 'Eastlands', destination: 'Nairobi CBD', fareMin: 30, fareMax: 50, duration: '25 min', distance: 8 },
  { id: 'umoja-cbd', name: 'Umoja - CBD', origin: 'Umoja', destination: 'Nairobi CBD', fareMin: 40, fareMax: 60, duration: '30 min', distance: 12 },
  { id: 'buruburu-cbd', name: 'Buruburu - CBD', origin: 'Buruburu', destination: 'Nairobi CBD', fareMin: 40, fareMax: 60, duration: '25 min', distance: 10 },
  { id: 'kasarani-cbd', name: 'Kasarani - CBD', origin: 'Kasarani', destination: 'Nairobi CBD', fareMin: 50, fareMax: 80, duration: '35 min', distance: 14 },
  { id: 'githurai-cbd', name: 'Githurai - CBD', origin: 'Githurai 45', destination: 'Nairobi CBD', fareMin: 50, fareMax: 80, duration: '40 min', distance: 16 },
  { id: 'kiambu-cbd', name: 'Kiambu - CBD', origin: 'Kiambu Town', destination: 'Nairobi CBD', fareMin: 60, fareMax: 100, duration: '40 min', distance: 17 },
  { id: 'limuru-cbd', name: 'Limuru - CBD', origin: 'Limuru Town', destination: 'Nairobi CBD', fareMin: 100, fareMax: 150, duration: '1hr', distance: 35 },
];

/**
 * Get nearby matatus based on coordinates
 */
export function getNearbyMatatus(lat?: number, lng?: number, limit: number = 10): Matatu[] {
  // In production, this would filter by actual GPS proximity
  // For now, return shuffled subset to simulate different results
  const shuffled = [...FLEET_DATA].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, limit);
}

/**
 * Get matatus by route
 */
export function getMatatusByRoute(routeId: string): Matatu[] {
  return FLEET_DATA.filter(m => m.route === routeId);
}

/**
 * Get route by ID
 */
export function getRouteById(routeId: string) {
  return ROUTES_DATA.find(r => r.id === routeId);
}

/**
 * Search routes by origin or destination
 */
export function searchRoutes(query: string) {
  const q = query.toLowerCase();
  return ROUTES_DATA.filter(r => 
    r.origin.toLowerCase().includes(q) || 
    r.destination.toLowerCase().includes(q) ||
    r.name.toLowerCase().includes(q)
  );
}
