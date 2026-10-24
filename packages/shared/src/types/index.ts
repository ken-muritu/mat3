/**
 * Matatu Connect - Shared TypeScript types
 */

/**
 * User Types
 */
export interface User {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
  role: UserRole;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'passenger' | 'driver' | 'conductor' | 'sacco_admin' | 'admin';

/**
 * Authentication Types
 */
export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  phone: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  password: string;
}

/**
 * Route Types
 */
export interface Route {
  id: string;
  name: string;
  origin: Location;
  destination: Location;
  stages: Stage[];
  distance: number; // in km
  estimatedTime: number; // in minutes
  baseFare: number; // in KES
  isActive: boolean;
}

export interface Stage {
  id: string;
  name: string;
  location: Location;
  order: number;
  fareFromOrigin: number;
}

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  name?: string;
}

/**
 * Vehicle Types
 */
export interface Vehicle {
  id: string;
  registrationNumber: string;
  saccoId: string;
  type: VehicleType;
  capacity: number;
  currentOccupancy: number;
  amenities: VehicleAmenity[];
  status: VehicleStatus;
  currentLocation?: Location;
  driver?: Driver;
  conductor?: Conductor;
  rating: number;
  totalTrips: number;
  insuranceExpiry: string;
  ntsaCompliant: boolean;
}

export type VehicleType = 'matatu_14' | 'matatu_33' | 'shuttle';
export type VehicleStatus = 'active' | 'idle' | 'maintenance' | 'offline';
export type VehicleAmenity = 'wifi' | 'ac' | 'usb_charging' | 'music' | 'tv';

/**
 * Driver & Conductor Types
 */
export interface Driver {
  id: string;
  userId: string;
  licenseNumber: string;
  psvBadgeNumber: string;
  saccoId: string;
  rating: number;
  totalTrips: number;
  isVerified: boolean;
  status: DriverStatus;
}

export interface Conductor {
  id: string;
  userId: string;
  saccoId: string;
  rating: number;
  totalTrips: number;
  isVerified: boolean;
}

export type DriverStatus = 'available' | 'on_trip' | 'offline';

/**
 * SACCO Types
 */
export interface Sacco {
  id: string;
  name: string;
  registrationNumber: string;
  routes: string[];
  vehicleCount: number;
  driverCount: number;
  rating: number;
  isVerified: boolean;
  contactEmail: string;
  contactPhone: string;
  logo?: string;
}

/**
 * Booking Types
 */
export interface Booking {
  id: string;
  passengerId: string;
  vehicleId: string;
  routeId: string;
  pickupStage: Stage;
  dropoffStage: Stage;
  fare: number;
  platformFee: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  bookingStatus: BookingStatus;
  seatNumber?: number;
  createdAt: string;
  scheduledAt?: string;
  completedAt?: string;
}

export type PaymentMethod = 'mpesa' | 'airtel_money' | 'tkash' | 'card' | 'wallet';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type BookingStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';

/**
 * Trip Tracking Types
 */
export interface TripTracking {
  bookingId: string;
  vehicleId: string;
  currentLocation: Location;
  estimatedArrival: number; // minutes
  distanceRemaining: number; // km
  status: TripStatus;
  route: Location[];
}

export type TripStatus = 'waiting' | 'approaching' | 'boarding' | 'in_transit' | 'arriving' | 'completed';

/**
 * Rating Types
 */
export interface Rating {
  id: string;
  bookingId: string;
  passengerId: string;
  driverRating?: number;
  conductorRating?: number;
  vehicleRating?: number;
  overallRating: number;
  comment?: string;
  categories: RatingCategory[];
  createdAt: string;
}

export type RatingCategory = 
  | 'safety' 
  | 'cleanliness' 
  | 'punctuality' 
  | 'comfort' 
  | 'driver_behavior' 
  | 'conductor_behavior';

/**
 * Emergency Types
 */
export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

export interface EmergencyAlert {
  id: string;
  passengerId: string;
  bookingId?: string;
  location: Location;
  type: EmergencyType;
  status: EmergencyStatus;
  createdAt: string;
  resolvedAt?: string;
}

export type EmergencyType = 'sos' | 'accident' | 'harassment' | 'theft' | 'other';
export type EmergencyStatus = 'active' | 'responding' | 'resolved';

/**
 * Wallet Types
 */
export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  currency: string;
  transactions: WalletTransaction[];
}

export interface WalletTransaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  reference?: string;
  createdAt: string;
}

export type TransactionType = 'topup' | 'payment' | 'refund' | 'cashback' | 'referral_bonus';

/**
 * Notification Types
 */
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  data?: Record<string, unknown>;
  createdAt: string;
}

export type NotificationType = 
  | 'booking_confirmed' 
  | 'vehicle_arriving' 
  | 'trip_completed' 
  | 'payment_received'
  | 'promo'
  | 'safety_alert'
  | 'system';

/**
 * API Response Types
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Theme Types
 */
export type Theme = 'light' | 'dark' | 'system';

export interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

/**
 * Navigation Types
 */
export interface NavLink {
  name: string;
  path: string;
  icon?: string;
}

/**
 * Search & Filter Types
 */
export interface RouteSearchParams {
  origin?: string;
  destination?: string;
  departureTime?: string;
  saccoId?: string;
  vehicleType?: VehicleType;
  amenities?: VehicleAmenity[];
  maxFare?: number;
}

export interface VehicleFilter {
  routeId?: string;
  saccoId?: string;
  status?: VehicleStatus;
  minRating?: number;
  amenities?: VehicleAmenity[];
}
