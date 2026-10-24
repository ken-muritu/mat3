/**
 * Matatu Connect - Static data exports
 */

import type { Route, Sacco, Stage } from '../types';

/**
 * Sample Routes Data (Pilot Phase)
 */
export const SAMPLE_ROUTES: Route[] = [
  {
    id: 'thika-nairobi',
    name: 'Thika - Nairobi CBD',
    origin: {
      latitude: -1.0333,
      longitude: 37.0693,
      address: 'Thika Town',
      name: 'Thika Stage',
    },
    destination: {
      latitude: -1.2864,
      longitude: 36.8172,
      address: 'Nairobi CBD',
      name: 'Kencom',
    },
    stages: [
      { id: 'thika', name: 'Thika Town', location: { latitude: -1.0333, longitude: 37.0693, address: 'Thika Town' }, order: 1, fareFromOrigin: 0 },
      { id: 'makongeni', name: 'Makongeni', location: { latitude: -1.0667, longitude: 37.0333, address: 'Makongeni' }, order: 2, fareFromOrigin: 30 },
      { id: 'juja', name: 'Juja', location: { latitude: -1.1000, longitude: 37.0167, address: 'Juja Town' }, order: 3, fareFromOrigin: 50 },
      { id: 'ruiru', name: 'Ruiru', location: { latitude: -1.1500, longitude: 36.9667, address: 'Ruiru Town' }, order: 4, fareFromOrigin: 70 },
      { id: 'kahawa', name: 'Kahawa West', location: { latitude: -1.1833, longitude: 36.9333, address: 'Kahawa West' }, order: 5, fareFromOrigin: 90 },
      { id: 'roysambu', name: 'Roysambu', location: { latitude: -1.2167, longitude: 36.8833, address: 'Roysambu' }, order: 6, fareFromOrigin: 100 },
      { id: 'kasarani', name: 'Kasarani', location: { latitude: -1.2333, longitude: 36.8667, address: 'Kasarani' }, order: 7, fareFromOrigin: 110 },
      { id: 'kencom', name: 'Kencom', location: { latitude: -1.2864, longitude: 36.8172, address: 'Nairobi CBD' }, order: 8, fareFromOrigin: 150 },
    ],
    distance: 45,
    estimatedTime: 75,
    baseFare: 150,
    isActive: true,
  },
  {
    id: 'thika-muranga',
    name: "Thika - Murang'a",
    origin: {
      latitude: -1.0333,
      longitude: 37.0693,
      address: 'Thika Town',
      name: 'Thika Stage',
    },
    destination: {
      latitude: -0.7167,
      longitude: 37.1500,
      address: "Murang'a Town",
      name: "Murang'a Stage",
    },
    stages: [
      { id: 'thika-m', name: 'Thika Town', location: { latitude: -1.0333, longitude: 37.0693, address: 'Thika Town' }, order: 1, fareFromOrigin: 0 },
      { id: 'makuyu', name: 'Makuyu', location: { latitude: -0.9167, longitude: 37.1167, address: 'Makuyu' }, order: 2, fareFromOrigin: 80 },
      { id: 'kenol', name: 'Kenol', location: { latitude: -0.8500, longitude: 37.1333, address: 'Kenol' }, order: 3, fareFromOrigin: 120 },
      { id: 'muranga', name: "Murang'a", location: { latitude: -0.7167, longitude: 37.1500, address: "Murang'a Town" }, order: 4, fareFromOrigin: 200 },
    ],
    distance: 55,
    estimatedTime: 90,
    baseFare: 200,
    isActive: true,
  },
  {
    id: 'ruiru-cbd',
    name: 'Ruiru - Nairobi CBD',
    origin: {
      latitude: -1.1500,
      longitude: 36.9667,
      address: 'Ruiru Town',
      name: 'Ruiru Stage',
    },
    destination: {
      latitude: -1.2864,
      longitude: 36.8172,
      address: 'Nairobi CBD',
      name: 'Kencom',
    },
    stages: [
      { id: 'ruiru-r', name: 'Ruiru Town', location: { latitude: -1.1500, longitude: 36.9667, address: 'Ruiru Town' }, order: 1, fareFromOrigin: 0 },
      { id: 'kahawa-r', name: 'Kahawa West', location: { latitude: -1.1833, longitude: 36.9333, address: 'Kahawa West' }, order: 2, fareFromOrigin: 30 },
      { id: 'roysambu-r', name: 'Roysambu', location: { latitude: -1.2167, longitude: 36.8833, address: 'Roysambu' }, order: 3, fareFromOrigin: 50 },
      { id: 'kasarani-r', name: 'Kasarani', location: { latitude: -1.2333, longitude: 36.8667, address: 'Kasarani' }, order: 4, fareFromOrigin: 60 },
      { id: 'kencom-r', name: 'Kencom', location: { latitude: -1.2864, longitude: 36.8172, address: 'Nairobi CBD' }, order: 5, fareFromOrigin: 100 },
    ],
    distance: 25,
    estimatedTime: 45,
    baseFare: 100,
    isActive: true,
  },
];

/**
 * Sample SACCOs Data
 */
export const SAMPLE_SACCOS: Sacco[] = [
  {
    id: 'super-metro',
    name: 'Super Metro',
    registrationNumber: 'SACCO/2010/001',
    routes: ['thika-nairobi', 'ruiru-cbd'],
    vehicleCount: 150,
    driverCount: 180,
    rating: 4.5,
    isVerified: true,
    contactEmail: 'info@supermetro.co.ke',
    contactPhone: '+254700000001',
    logo: '/images/saccos/super-metro.png',
  },
  {
    id: '2nk',
    name: '2NK Sacco',
    registrationNumber: 'SACCO/2008/045',
    routes: ['thika-nairobi', 'juja-cbd'],
    vehicleCount: 120,
    driverCount: 140,
    rating: 4.3,
    isVerified: true,
    contactEmail: 'info@2nk.co.ke',
    contactPhone: '+254700000002',
    logo: '/images/saccos/2nk.png',
  },
  {
    id: 'lopha',
    name: 'Lopha Sacco',
    registrationNumber: 'SACCO/2012/078',
    routes: ['thika-muranga'],
    vehicleCount: 80,
    driverCount: 95,
    rating: 4.2,
    isVerified: true,
    contactEmail: 'info@lopha.co.ke',
    contactPhone: '+254700000003',
    logo: '/images/saccos/lopha.png',
  },
  {
    id: 'kenya-mpya',
    name: 'Kenya Mpya',
    registrationNumber: 'SACCO/2005/023',
    routes: ['thika-nairobi'],
    vehicleCount: 100,
    driverCount: 120,
    rating: 4.4,
    isVerified: true,
    contactEmail: 'info@kenyampya.co.ke',
    contactPhone: '+254700000004',
    logo: '/images/saccos/kenya-mpya.png',
  },
  {
    id: 'manchester',
    name: 'Manchester Sacco',
    registrationNumber: 'SACCO/2015/112',
    routes: ['ruiru-cbd', 'juja-cbd'],
    vehicleCount: 60,
    driverCount: 75,
    rating: 4.1,
    isVerified: true,
    contactEmail: 'info@manchester.co.ke',
    contactPhone: '+254700000005',
    logo: '/images/saccos/manchester.png',
  },
];

/**
 * App Features for marketing
 */
export const APP_FEATURES = [
  {
    id: 'realtime-tracking',
    title: 'Real-Time Tracking',
    description: 'Track your matatu live on the map. Know exactly when it will arrive at your stage.',
    icon: 'navigation',
  },
  {
    id: 'cashless-payment',
    title: 'Cashless Payments',
    description: 'Pay with M-Pesa, Airtel Money, or your wallet. No more cash hassles.',
    icon: 'wallet',
  },
  {
    id: 'advance-booking',
    title: 'Advance Booking',
    description: 'Book your seat in advance for inter-county trips. Guaranteed space.',
    icon: 'calendar',
  },
  {
    id: 'safety-first',
    title: 'Safety First',
    description: 'SOS button, trip sharing, verified drivers, and comprehensive insurance.',
    icon: 'shield',
  },
  {
    id: 'route-discovery',
    title: 'Route Discovery',
    description: 'Find the best route to your destination. Compare fares and travel times.',
    icon: 'map',
  },
  {
    id: 'ratings-reviews',
    title: 'Ratings & Reviews',
    description: 'Rate your trip and help improve the service. Read reviews before booking.',
    icon: 'star',
  },
];

/**
 * FAQ Data
 */
export const FAQ_DATA = [
  {
    question: 'How do I book a matatu?',
    answer: 'Simply enter your pickup and drop-off locations, select your preferred matatu, and confirm your booking. You can pay via M-Pesa or your wallet.',
  },
  {
    question: 'Is my payment secure?',
    answer: 'Yes! We use industry-standard encryption and partner with trusted payment providers like M-Pesa. Your financial information is never stored on our servers.',
  },
  {
    question: 'How does real-time tracking work?',
    answer: 'All partner matatus are equipped with GPS devices. Once you book, you can track your matatu\'s location in real-time on the app map.',
  },
  {
    question: 'What if I have an emergency during my trip?',
    answer: 'Use the SOS button in the app. It will immediately alert your emergency contacts and our safety team with your live location.',
  },
  {
    question: 'Can I cancel my booking?',
    answer: 'Yes, you can cancel up to 5 minutes before the scheduled pickup. Cancellation fees may apply for late cancellations.',
  },
  {
    question: 'How do I become a partner SACCO?',
    answer: 'Contact us at partners@matatuconnect.co.ke or call our partnership line. We\'ll guide you through the onboarding process.',
  },
];

/**
 * Stats for landing page
 */
export const PLATFORM_STATS = [
  { label: 'Active Users', value: '500K+', icon: 'users' },
  { label: 'Daily Rides', value: '100K+', icon: 'car' },
  { label: 'Partner SACCOs', value: '50+', icon: 'building' },
  { label: 'Routes Covered', value: '100+', icon: 'route' },
];
