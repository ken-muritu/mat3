/**
 * Ma3 - Application-wide constants
 * Ma3 is Kenyan slang for matatu - short, memorable, and culturally authentic
 */

export const APP_NAME = 'Ma3';
export const APP_TAGLINE = 'Panda. Lipa. Fika.';
export const APP_DESCRIPTION = 'Digital Transformation of Kenya\'s Matatu Sector - Kenya\'s answer to Uber/Bolt for matatus';

/**
 * App Information
 */
export const APP_INFO = {
  name: APP_NAME,
  tagline: APP_TAGLINE,
  description: APP_DESCRIPTION,
  version: '1.0.0',
  email: 'hello@ma3.co.ke',
  phone: '+254 700 MA3 APP',
  website: 'https://ma3.co.ke',
  supportEmail: 'support@ma3.co.ke',
} as const;

/**
 * Navigation Routes
 */
export const ROUTES = {
  HOME: '/',
  BOOK_RIDE: '/book',
  ROUTES: '/routes',
  TRACKING: '/tracking',
  WALLET: '/wallet',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  SAFETY: '/safety',
  HELP: '/help',
  ABOUT: '/about',
  LOGIN: '/login',
  REGISTER: '/register',
  SACCO_DASHBOARD: '/sacco',
} as const;

/**
 * Navigation Links
 */
export const NAV_LINKS = [
  { name: 'Home', path: ROUTES.HOME, icon: 'home' },
  { name: 'Book Ride', path: ROUTES.BOOK_RIDE, icon: 'map-pin' },
  { name: 'Routes', path: ROUTES.ROUTES, icon: 'route' },
  { name: 'Tracking', path: ROUTES.TRACKING, icon: 'navigation' },
  { name: 'Wallet', path: ROUTES.WALLET, icon: 'wallet' },
] as const;

/**
 * Color Palette - Ma3 Branding
 * Primary: Deep green (representing Kenya)
 * Accent: Golden yellow (representing prosperity and matatu culture)
 */
export const COLORS = {
  primary: {
    DEFAULT: '#006B3F',
    light: '#008F54',
    dark: '#004D2D',
  },
  accent: {
    DEFAULT: '#FFB800',
    light: '#FFCC33',
    dark: '#CC9300',
  },
  secondary: {
    DEFAULT: '#1E3A5F',
    light: '#2A4A73',
    dark: '#152A45',
  },
  success: {
    DEFAULT: '#22C55E',
    light: '#4ADE80',
    dark: '#16A34A',
  },
  warning: {
    DEFAULT: '#F59E0B',
    light: '#FBBF24',
    dark: '#D97706',
  },
  danger: {
    DEFAULT: '#EF4444',
    light: '#F87171',
    dark: '#DC2626',
  },
  surface: {
    light: '#ffffff',
    dark: '#0F172A',
  },
  text: {
    light: '#0F172A',
    dark: '#F8FAFC',
  },
  muted: {
    light: '#64748B',
    dark: '#94A3B8',
  },
} as const;

/**
 * Breakpoints (matching Tailwind defaults)
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

/**
 * API Endpoints
 */
export const API = {
  BASE_URL: (typeof process !== 'undefined' && process.env?.VITE_API_URL) || 'https://api.ma3.co.ke',
  ENDPOINTS: {
    AUTH: '/auth',
    USERS: '/users',
    ROUTES: '/routes',
    BOOKINGS: '/bookings',
    PAYMENTS: '/payments',
    TRACKING: '/tracking',
    SACCOS: '/saccos',
    VEHICLES: '/vehicles',
    DRIVERS: '/drivers',
    RATINGS: '/ratings',
    EMERGENCY: '/emergency',
  },
} as const;

/**
 * Storage Keys
 */
export const STORAGE_KEYS = {
  THEME: 'ma3_theme',
  AUTH_TOKEN: 'ma3_auth_token',
  REFRESH_TOKEN: 'ma3_refresh_token',
  USER: 'ma3_user',
  RECENT_ROUTES: 'ma3_recent_routes',
  FAVORITE_ROUTES: 'ma3_favorite_routes',
  EMERGENCY_CONTACTS: 'ma3_emergency_contacts',
  LANGUAGE: 'ma3_language',
  ONBOARDING_COMPLETE: 'ma3_onboarding_complete',
} as const;

/**
 * Payment Methods
 */
export const PAYMENT_METHODS = {
  MPESA: 'mpesa',
  AIRTEL_MONEY: 'airtel_money',
  TKASH: 'tkash',
  CARD: 'card',
  WALLET: 'wallet',
} as const;

/**
 * Vehicle Types
 */
export const VEHICLE_TYPES = {
  MATATU_14: { seats: 14, name: '14-Seater Matatu' },
  MATATU_33: { seats: 33, name: '33-Seater Bus' },
  SHUTTLE: { seats: 7, name: 'Shuttle' },
} as const;

/**
 * Popular Routes (Pilot Phase)
 */
export const PILOT_ROUTES = [
  { id: 'thika-nairobi', name: 'Thika - Nairobi CBD', distance: '45km', avgTime: '1hr 15min' },
  { id: 'thika-muranga', name: 'Thika - Murang\'a', distance: '55km', avgTime: '1hr 30min' },
  { id: 'ruiru-cbd', name: 'Ruiru - Nairobi CBD', distance: '25km', avgTime: '45min' },
  { id: 'juja-cbd', name: 'Juja - Nairobi CBD', distance: '35km', avgTime: '1hr' },
] as const;

/**
 * Partner SACCOs (Pilot Phase)
 */
export const PILOT_SACCOS = [
  { id: 'super-metro', name: 'Super Metro', routes: ['thika-nairobi', 'ruiru-cbd'] },
  { id: '2nk', name: '2NK Sacco', routes: ['thika-nairobi', 'juja-cbd'] },
  { id: 'lopha', name: 'Lopha Sacco', routes: ['thika-muranga'] },
  { id: 'kenya-mpya', name: 'Kenya Mpya', routes: ['thika-nairobi'] },
  { id: 'manchester', name: 'Manchester Sacco', routes: ['ruiru-cbd', 'juja-cbd'] },
] as const;

/**
 * Social Media Links
 */
export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/ma3app',
  instagram: 'https://instagram.com/ma3app',
  twitter: 'https://twitter.com/ma3app',
  youtube: 'https://youtube.com/@ma3app',
  tiktok: 'https://tiktok.com/@ma3app',
} as const;

/**
 * App Store Links
 */
export const APP_STORE_LINKS = {
  playStore: 'https://play.google.com/store/apps/details?id=com.ma3.app',
  appStore: 'https://apps.apple.com/app/ma3/id123456789',
} as const;

/**
 * Fare Configuration
 */
export const FARE_CONFIG = {
  platformFee: 0.15, // 15% platform fee
  saccoShare: 0.05, // 5% SACCO share
  minFare: 30, // KES 30 minimum fare
  currency: 'KES',
  currencySymbol: 'KSh',
} as const;

/**
 * Rating Configuration
 */
export const RATING_CONFIG = {
  minRating: 1,
  maxRating: 5,
  suspensionThreshold: 3.5, // Drivers below 3.5 get suspended
} as const;
