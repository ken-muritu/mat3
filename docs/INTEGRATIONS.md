# Ma3 - Integration Guide

This guide covers integrating third-party services to make Ma3 fully functional. We focus on free tiers and open-source alternatives.

---

## Table of Contents

1. [Backend API Setup](#backend-api-setup)
2. [Authentication (Firebase)](#authentication-firebase)
3. [Maps Integration](#maps-integration)
4. [Payment Integration (M-Pesa)](#payment-integration-m-pesa)
5. [Real-time Tracking (Socket.io)](#real-time-tracking)
6. [Push Notifications](#push-notifications)
7. [Analytics](#analytics)
8. [Environment Variables](#environment-variables)

---

## Backend API Setup

### Option 1: Supabase (Recommended - Free Tier)

Supabase provides PostgreSQL database, authentication, and real-time subscriptions.

**Setup:**
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Get your API keys from Settings > API

```bash
# .env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key
```

**Database Schema:**
```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone VARCHAR(15) UNIQUE NOT NULL,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Routes table
CREATE TABLE routes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  origin VARCHAR(100) NOT NULL,
  destination VARCHAR(100) NOT NULL,
  distance_km DECIMAL(5,2),
  avg_duration_min INT,
  base_fare DECIMAL(10,2),
  sacco_id UUID REFERENCES saccos(id)
);

-- Bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  route_id UUID REFERENCES routes(id),
  vehicle_id UUID REFERENCES vehicles(id),
  status VARCHAR(20) DEFAULT 'pending',
  fare DECIMAL(10,2),
  payment_method VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Wallet transactions
CREATE TABLE wallet_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  type VARCHAR(20) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Option 2: Railway/Render (Free Tier)

Deploy a Node.js/Express API:

```bash
# Clone starter
git clone https://github.com/your-org/ma3-api
cd ma3-api
npm install

# Deploy to Railway
railway login
railway init
railway up
```

---

## Authentication (Firebase + Supabase)

Ma3 uses a **dual authentication strategy**:
- **Firebase**: Phone number authentication (OTP)
- **Supabase**: Email/password authentication + database

This allows you to use the best of both services across web and mobile platforms.

### How It Works Across Platforms

| Platform | Firebase Phone Auth | Supabase Email Auth | Database |
|----------|--------------------|--------------------|----------|
| **Web** | ✅ Full support | ✅ Full support | Supabase |
| **Android APK** | ✅ Full support | ✅ Full support | Supabase |
| **iOS** | ✅ Full support | ✅ Full support | Supabase |

### Setup Firebase Auth

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create new project "ma3-app"
3. Enable Authentication > Phone
4. Add your app (iOS/Android/Web)

**Dependencies (already installed):**
```bash
# Mobile - uses firebase JS SDK via Expo
cd apps/mobile
pnpm add firebase

# Web
cd apps/web
pnpm add firebase
```

**Configuration Files:**

Web (`apps/web/src/lib/firebase.js`):
```javascript
import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

Mobile (`apps/mobile/src/lib/firebase.ts`):
```typescript
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
```

### Using Authentication in Your App

The `AuthContext` provides unified access to both Firebase and Supabase auth:

```typescript
import { useAuth } from '../context/AuthContext';

function LoginScreen() {
  const { 
    // Supabase methods
    signIn,           // Email/password login
    signUp,           // Email/password registration
    signInWithPhone,  // Supabase phone OTP
    verifyOtp,        // Supabase OTP verification
    
    // Firebase methods  
    sendPhoneOTP,     // Firebase phone OTP (web)
    verifyPhoneOTP,   // Firebase OTP verification (web)
    sendFirebaseOTP,  // Firebase phone OTP (mobile)
    verifyFirebaseOTP,// Firebase OTP verification (mobile)
    
    // Common
    signOut,          // Signs out from both providers
    user,             // Supabase user object
    firebaseUser,     // Firebase user object
    isAuthenticated,  // Boolean check
  } = useAuth();

  // Example: Firebase phone auth
  const handlePhoneLogin = async (phone) => {
    const result = await sendPhoneOTP(phone, 'recaptcha-container');
    if (result.success) {
      // Show OTP input screen
    }
  };
}
```

### Setup Supabase Auth

1. Go to [Supabase Dashboard](https://supabase.com)
2. Create project
3. Get API keys from Settings > API

**Configuration Files:**

Web (`apps/web/src/lib/supabase.js`):
```javascript
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
```

Mobile (`apps/mobile/src/lib/supabase.ts`):
```typescript
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);
```

---

## Maps Integration

### Option 1: React Native Maps (Free)

Already installed. Configure for Google Maps:

**Android Setup:**
1. Get API key from [Google Cloud Console](https://console.cloud.google.com)
2. Enable Maps SDK for Android

```xml
<!-- apps/mobile/android/app/src/main/AndroidManifest.xml -->
<meta-data
  android:name="com.google.android.geo.API_KEY"
  android:value="YOUR_GOOGLE_MAPS_API_KEY"/>
```

**iOS Setup:**
```ruby
# apps/mobile/ios/Podfile
pod 'GoogleMaps'
pod 'Google-Maps-iOS-Utils'
```

### Option 2: Mapbox (Free Tier - 50K loads/month)

```bash
npx expo install @rnmapbox/maps
```

```typescript
import Mapbox from '@rnmapbox/maps';

Mapbox.setAccessToken('YOUR_MAPBOX_TOKEN');

// In component
<Mapbox.MapView style={{ flex: 1 }}>
  <Mapbox.Camera
    centerCoordinate={[-1.2921, 36.8219]} // Nairobi
    zoomLevel={12}
  />
</Mapbox.MapView>
```

### Option 3: OpenStreetMap with Leaflet (Web - Free)

```bash
cd apps/web
npm install react-leaflet leaflet
```

```jsx
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

<MapContainer center={[-1.2921, 36.8219]} zoom={13}>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  <Marker position={[-1.2921, 36.8219]} />
</MapContainer>
```

---

## Payment Integration (M-Pesa)

### Safaricom Daraja API

1. Register at [Daraja Portal](https://developer.safaricom.co.ke)
2. Create app and get credentials
3. Use sandbox for testing

**Environment Variables:**
```bash
MPESA_CONSUMER_KEY=your-consumer-key
MPESA_CONSUMER_SECRET=your-consumer-secret
MPESA_SHORTCODE=174379  # Sandbox
MPESA_PASSKEY=your-passkey
MPESA_CALLBACK_URL=https://api.ma3.co.ke/mpesa/callback
```

**Backend Integration (Node.js):**
```javascript
// api/src/services/mpesa.js
const axios = require('axios');

class MpesaService {
  constructor() {
    this.baseUrl = 'https://sandbox.safaricom.co.ke'; // Use api.safaricom.co.ke for production
  }

  async getAccessToken() {
    const auth = Buffer.from(
      `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
    ).toString('base64');

    const response = await axios.get(
      `${this.baseUrl}/oauth/v1/generate?grant_type=client_credentials`,
      { headers: { Authorization: `Basic ${auth}` } }
    );

    return response.data.access_token;
  }

  async initiateSTKPush(phone, amount, reference) {
    const token = await this.getAccessToken();
    const timestamp = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14);
    const password = Buffer.from(
      `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
    ).toString('base64');

    const response = await axios.post(
      `${this.baseUrl}/mpesa/stkpush/v1/processrequest`,
      {
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phone,
        PartyB: process.env.MPESA_SHORTCODE,
        PhoneNumber: phone,
        CallBackURL: process.env.MPESA_CALLBACK_URL,
        AccountReference: reference,
        TransactionDesc: 'Ma3 Fare Payment',
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data;
  }
}

module.exports = new MpesaService();
```

**Mobile Integration:**
```typescript
// apps/mobile/src/services/payment.ts
export const initiatePayment = async (amount: number, phone: string) => {
  const response = await api.request('/payments/mpesa/initiate', {
    method: 'POST',
    body: { amount, phone },
  });
  return response;
};
```

---

## Real-time Tracking

### Socket.io Setup

**Backend:**
```javascript
// api/src/socket.js
const { Server } = require('socket.io');

const initSocket = (server) => {
  const io = new Server(server, {
    cors: { origin: '*' },
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Join vehicle tracking room
    socket.on('track-vehicle', (vehicleId) => {
      socket.join(`vehicle:${vehicleId}`);
    });

    // Driver sends location updates
    socket.on('location-update', (data) => {
      io.to(`vehicle:${data.vehicleId}`).emit('vehicle-location', {
        vehicleId: data.vehicleId,
        lat: data.lat,
        lng: data.lng,
        timestamp: Date.now(),
      });
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
};

module.exports = initSocket;
```

**Mobile Client:**
```typescript
// apps/mobile/src/services/socket.ts
import { io, Socket } from 'socket.io-client';
import { API } from '@ma3/shared';

class SocketService {
  private socket: Socket | null = null;

  connect() {
    this.socket = io(API.BASE_URL.replace('/api', ''));
    return this.socket;
  }

  trackVehicle(vehicleId: string, onUpdate: (location: any) => void) {
    if (!this.socket) this.connect();
    
    this.socket?.emit('track-vehicle', vehicleId);
    this.socket?.on('vehicle-location', onUpdate);
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
  }
}

export const socketService = new SocketService();
```

---

## Push Notifications

### Expo Push Notifications (Free)

```bash
npx expo install expo-notifications expo-device
```

```typescript
// apps/mobile/src/services/notifications.ts
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export async function registerForPushNotifications() {
  if (!Device.isDevice) return null;

  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') return null;

  const token = await Notifications.getExpoPushTokenAsync();
  return token.data;
}

export async function sendPushNotification(expoPushToken: string, title: string, body: string) {
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: expoPushToken,
      sound: 'default',
      title,
      body,
    }),
  });
}
```

---

## Analytics

### Option 1: Mixpanel (Free Tier)

```bash
npm install mixpanel-react-native
```

```typescript
import { Mixpanel } from 'mixpanel-react-native';

const mixpanel = new Mixpanel('YOUR_PROJECT_TOKEN');
mixpanel.init();

// Track events
mixpanel.track('Booking Created', { route: 'Thika-CBD', fare: 100 });
```

### Option 2: PostHog (Free Self-hosted)

```bash
npm install posthog-react-native
```

```typescript
import PostHog from 'posthog-react-native';

const posthog = new PostHog('YOUR_API_KEY', {
  host: 'https://app.posthog.com', // or your self-hosted instance
});

posthog.capture('booking_created', { route: 'Thika-CBD' });
```

---

## Environment Variables

### Mobile (.env)
```bash
# API
API_URL=https://api.ma3.co.ke

# Firebase
FIREBASE_API_KEY=xxx
FIREBASE_AUTH_DOMAIN=ma3-app.firebaseapp.com
FIREBASE_PROJECT_ID=ma3-app

# Maps
GOOGLE_MAPS_API_KEY=xxx
MAPBOX_ACCESS_TOKEN=xxx

# Analytics
MIXPANEL_TOKEN=xxx
```

### Web (.env)
```bash
VITE_API_URL=https://api.ma3.co.ke
VITE_FIREBASE_API_KEY=xxx
VITE_GOOGLE_MAPS_KEY=xxx
```

### Backend (.env)
```bash
# Database
DATABASE_URL=postgresql://user:pass@host:5432/ma3

# M-Pesa
MPESA_CONSUMER_KEY=xxx
MPESA_CONSUMER_SECRET=xxx
MPESA_SHORTCODE=174379
MPESA_PASSKEY=xxx
MPESA_CALLBACK_URL=https://api.ma3.co.ke/mpesa/callback

# JWT
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=7d

# Redis (for Socket.io scaling)
REDIS_URL=redis://localhost:6379
```

---

## Quick Start Checklist

### Minimum Viable Product (MVP)

- [ ] **Supabase** - Database + Auth (Free)
- [ ] **Firebase Phone Auth** - OTP verification (Free tier)
- [ ] **OpenStreetMap** - Maps (Free)
- [ ] **M-Pesa Sandbox** - Payment testing (Free)
- [ ] **Expo Push** - Notifications (Free)
- [ ] **Vercel** - Web hosting (Free)
- [ ] **Railway** - API hosting (Free tier)

### Production Ready

- [ ] M-Pesa Production credentials
- [ ] Google Maps API (pay-as-you-go)
- [ ] Custom domain + SSL
- [ ] Redis for real-time scaling
- [ ] Sentry for error tracking
- [ ] CloudFlare for CDN

---

## Testing Credentials

### M-Pesa Sandbox
- **Phone**: Use any Safaricom test number
- **PIN**: 1234 (sandbox)

### Test Users
```json
{
  "phone": "+254700000001",
  "password": "test123",
  "name": "Test User"
}
```

---

## Support

- **Documentation**: [docs.ma3.co.ke](https://docs.ma3.co.ke)
- **API Reference**: [api.ma3.co.ke/docs](https://api.ma3.co.ke/docs)
- **Email**: dev@ma3.co.ke

---

*Last updated: January 2026*
