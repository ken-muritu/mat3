<div align="center">

# 🚌 Ma3

### *Panda. Lipa. Fika.*
### Digital Transformation of Kenya's Matatu Sector

Live web app: **[mat-web.vercel.app](https://mat-web.vercel.app)**

**Kenya's answer to Uber/Bolt, specifically tailored for the matatu ecosystem**

[![Version](https://img.shields.io/badge/version-1.0.0-green)](https://github.com/ken-muritu/mat3)
[![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android%20%7C%20Web-blue)](https://github.com/ken-muritu/mat3)
[![License](https://img.shields.io/badge/license-all%20rights%20reserved-lightgrey)](https://github.com/ken-muritu/mat3)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](docs/CONTRIBUTING.md)

[Features](#-features) • [Getting Started](#-getting-started) • [Architecture](#-architecture) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [The Problem](#-the-problem)
- [Our Solution](#-our-solution)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
- [Application Structure](#-application-structure)
- [Design System](#-design-system)
- [Documentation](#-documentation)
- [Deployment](#-deployment)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [Contact](#-contact)

---

## 🌍 Overview

**Ma3** is a revolutionary platform designed to digitize Kenya's matatu public transport sector. We're targeting SACCO-operated routes including Thika-Nairobi, Thika-Murang'a, and similar high-traffic corridors, with plans to expand nationwide.

### The Opportunity

| Metric | Value |
|--------|-------|
| Registered Matatus | 40,000+ |
| Operating SACCOs | 500+ |
| Daily Commuters | Millions |
| Annual Market Value | KSh 200B+ |

---

## 😤 The Problem

Current matatu operations suffer from critical issues:

| Problem | Impact |
|---------|--------|
| **Unpredictable Wait Times** | Passengers waste hours waiting |
| **Cash-Only Transactions** | Security risks, revenue leakage |
| **No Real-Time Tracking** | No visibility into matatu locations |
| **Safety Concerns** | Especially for women and night travelers |
| **Inefficient Operations** | SACCOs lack fleet management tools |
| **No Loyalty Programs** | No incentive for repeat customers |

---

## 💡 Our Solution

Ma3 provides a comprehensive digital platform:

### For Passengers
- 📍 **Real-time tracking** of matatus on all routes
- 💳 **Cashless payments** via M-Pesa, Airtel Money, and cards
- 🎫 **Advance booking** for inter-county trips
- 🛡️ **Safety features** including SOS, trip sharing, verified drivers
- ⭐ **Ratings & reviews** for accountability

### For SACCOs
- 📊 **Fleet management** dashboard
- 💰 **Digital payment collection** with automated settlements
- 📈 **Analytics & reporting** for business insights
- ✅ **NTSA compliance** automation

### For Drivers
- 📱 **Simple driver app** for trip management
- 💵 **Transparent earnings** tracking
- 🏆 **Performance metrics** and incentives

---

## ✨ Features

### Mobile App (Passenger)

| Screen | Features |
|--------|----------|
| **Home** | Nearby matatus, quick actions, promo banners |
| **Routes** | Search routes, view fares, see SACCOs |
| **Booking** | Multi-step booking with payment selection |
| **Tracking** | Live GPS tracking, ETA, driver info, SOS |
| **Wallet** | Balance, top-up, transactions, payment methods |
| **Safety** | Emergency contacts, SOS button, trip sharing |
| **History** | Past trips, ratings, receipts |
| **Profile** | Settings, preferences, account management |

### Web Application

| Page | Features |
|------|----------|
| **Home** | Landing page, features showcase, CTAs |
| **About** | Mission, vision, team, timeline |
| **Routes** | Route explorer with search and filters |
| **Book Ride** | Complete booking flow |
| **Safety** | Safety features, emergency contacts, tips |
| **Tracking** | Live trip tracking interface |

---

## 🛠️ Technology Stack

### Frontend

| Layer | Technology | Version |
|-------|------------|---------|
| **Web Framework** | React | 19.x |
| **Build Tool** | Vite | 7.x |
| **Styling** | Tailwind CSS | 4.x |
| **Web Routing** | React Router | 7.x |
| **Mobile Framework** | React Native | 0.76.x |
| **Mobile Platform** | Expo | SDK 52 |
| **Mobile Navigation** | React Navigation | 7.x |
| **Icons (Web)** | Lucide React | Latest |
| **Icons (Mobile)** | Expo Vector Icons | Latest |

### Maps & Location

| Component | Technology |
|-----------|------------|
| **Maps** | Mapbox Static Images API |
| **Geocoding** | Expo Location |
| **Location Services** | Expo Location |

> **Note:** We use Mapbox Static Images API for lightweight map rendering without requiring native SDKs, keeping APK size small (~30-40MB).

### Shared Infrastructure

| Component | Technology |
|-----------|------------|
| **Language** | TypeScript 5.7 |
| **Package Manager** | pnpm 9 |
| **Monorepo** | pnpm Workspaces |
| **Code Formatting** | Prettier |
| **CI/CD** | GitHub Actions |

### Backend (Planned)

| Component | Technology |
|-----------|------------|
| **API Server** | Node.js + Express/NestJS |
| **Database** | PostgreSQL |
| **Caching** | Redis |
| **Real-Time** | Socket.io |
| **Cloud** | AWS / GCP |
| **Payments** | M-Pesa Daraja API |

---

## 🏗️ Project Architecture

### Monorepo Structure

```
matatu-connect/
│
├── 📁 apps/
│   ├── 📁 web/                          # React Web Application
│   │   ├── 📁 public/                   # Static assets
│   │   │   └── favicon.svg              # App favicon
│   │   ├── 📁 src/
│   │   │   ├── 📁 components/           # Reusable UI components
│   │   │   │   ├── Navbar.jsx           # Navigation bar
│   │   │   │   └── Footer.jsx           # Page footer
│   │   │   ├── 📁 context/              # React Context providers
│   │   │   │   └── ThemeContext.jsx     # Light/dark theme
│   │   │   ├── 📁 pages/                # Route pages
│   │   │   │   ├── Home.jsx             # Landing page
│   │   │   │   ├── About.jsx            # About us
│   │   │   │   ├── Routes.jsx           # Route explorer
│   │   │   │   ├── BookRide.jsx         # Booking flow
│   │   │   │   ├── Safety.jsx           # Safety features
│   │   │   │   └── Tracking.jsx         # Trip tracking
│   │   │   ├── App.jsx                  # Root component
│   │   │   ├── main.jsx                 # Entry point
│   │   │   └── index.css                # Global styles + Tailwind
│   │   ├── index.html                   # HTML template
│   │   ├── vite.config.js               # Vite configuration
│   │   ├── tsconfig.json                # TypeScript config
│   │   └── package.json                 # Dependencies
│   │
│   └── 📁 mobile/                       # React Native + Expo App
│       ├── 📁 assets/                   # Images, fonts, icons
│       ├── 📁 src/
│       │   ├── 📁 components/           # Reusable components
│       │   │   └── ErrorBoundary.tsx    # Error handling
│       │   ├── 📁 context/              # React Context
│       │   │   └── ThemeContext.tsx     # Theme management
│       │   ├── 📁 navigation/           # Navigation setup
│       │   │   └── RootNavigator.tsx    # Tab + Stack navigators
│       │   ├── 📁 screens/              # App screens
│       │   │   ├── HomeScreen.tsx       # Dashboard
│       │   │   ├── RoutesScreen.tsx     # Route browser
│       │   │   ├── BookingScreen.tsx    # Booking flow
│       │   │   ├── TrackingScreen.tsx   # Live tracking
│       │   │   ├── WalletScreen.tsx     # Wallet & payments
│       │   │   ├── SafetyScreen.tsx     # Safety features
│       │   │   ├── HistoryScreen.tsx    # Trip history
│       │   │   ├── ProfileScreen.tsx    # User profile
│       │   │   ├── SettingsScreen.tsx   # App settings
│       │   │   ├── LoginScreen.tsx      # Authentication
│       │   │   └── RegisterScreen.tsx   # User registration
│       │   └── App.tsx                  # Root component
│       ├── app.json                     # Expo configuration
│       ├── babel.config.js              # Babel config
│       ├── metro.config.js              # Metro bundler config
│       ├── tsconfig.json                # TypeScript config
│       ├── index.js                     # Entry point
│       └── package.json                 # Dependencies
│
├── 📁 packages/
│   └── 📁 shared/                       # Shared Code Package
│       ├── 📁 src/
│       │   ├── 📁 constants/            # App-wide constants
│       │   │   └── index.ts             # Colors, routes, config
│       │   ├── 📁 types/                # TypeScript interfaces
│       │   │   └── index.ts             # All type definitions
│       │   ├── 📁 utils/                # Utility functions
│       │   │   └── index.ts             # Helpers, formatters
│       │   ├── 📁 data/                 # Static/mock data
│       │   │   └── index.ts             # Sample routes, SACCOs
│       │   └── index.ts                 # Main exports
│       ├── tsconfig.json                # TypeScript config
│       └── package.json                 # Package definition
│
├── 📁 docs/                             # Documentation
│   ├── PRD.md                           # Product Requirements
│   ├── ARCHITECTURE.md                  # Technical Architecture
│   ├── API.md                           # API Documentation
│   └── CONTRIBUTING.md                  # Contribution Guide
│
├── 📁 .github/
│   └── 📁 workflows/                    # CI/CD Pipelines
│       └── build-android.yml            # Android APK build
│
├── package.json                         # Root package.json
├── pnpm-workspace.yaml                  # Workspace config
├── tsconfig.json                        # Root TS config
├── .prettierrc                          # Code formatting
├── .npmrc                               # pnpm config
├── .gitignore                           # Git ignore rules
└── README.md                            # This file
```

### Navigation Architecture

#### Mobile App Navigation

```
RootNavigator (Bottom Tabs)
├── Home Tab (Stack Navigator)
│   ├── HomeScreen (Dashboard)
│   ├── BookingScreen (Book a ride)
│   ├── TrackingScreen (Live tracking)
│   ├── SafetyScreen (Emergency features)
│   └── HistoryScreen (Trip history)
│
├── Routes Tab (Stack Navigator)
│   └── RoutesScreen (Browse routes)
│
├── Wallet Tab (Stack Navigator)
│   └── WalletScreen (Balance & payments)
│
└── Profile Tab (Stack Navigator)
    ├── ProfileScreen (User profile)
    ├── HistoryScreen (Trip history)
    ├── SafetyScreen (Emergency contacts)
    └── SettingsScreen (App settings)

AuthNavigator (Separate Stack)
├── LoginScreen
└── RegisterScreen
```

#### Web App Routing

```
/ (App)
├── /              → Home (Landing page)
├── /about         → About (Company info)
├── /routes        → Routes (Route explorer)
├── /book          → BookRide (Booking flow)
├── /safety        → Safety (Safety features)
└── /tracking      → Tracking (Trip tracking)
```

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | >= 18.0.0 |
| pnpm | >= 9.0.0 |
| Git | Latest |
| Expo CLI | Latest (for mobile) |

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/ken-muritu/mat3.git
cd mat

# 2. Install dependencies
pnpm install

# 3. Start development servers
pnpm dev:web      # Web app at http://localhost:5000
pnpm dev:mobile   # Expo dev server
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start web dev server (default) |
| `pnpm dev:web` | Start web dev server on port 5000 |
| `pnpm dev:mobile` | Start Expo dev server |
| `pnpm build` | Build web for production |
| `pnpm build:web` | Build web for production |
| `pnpm build:mobile` | Build mobile for Android |
| `pnpm build:apk` | Build Android APK via EAS |
| `pnpm lint` | Lint all packages |
| `pnpm type-check` | TypeScript type checking |
| `pnpm clean` | Remove node_modules and build artifacts |

### Environment Variables

Set these in each app's environment (for example a git-ignored `.env` file in `apps/web` and `apps/mobile`):

| Web (`apps/web`) | Mobile (`apps/mobile`) | Purpose |
|---|---|---|
| `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` | `EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY` | Supabase |
| `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID` | the same names with the `EXPO_PUBLIC_` prefix | Firebase |
| `VITE_MAPBOX_TOKEN` | `EXPO_PUBLIC_MAPBOX_TOKEN` | Mapbox public token (restrict it to your URLs/app) |
| `VITE_ORS_API_KEY` | `EXPO_PUBLIC_ORS_API_KEY` | OpenRouteService routing |
| `VITE_ANDROID_APK_URL`, `VITE_IOS_APP_URL` | | App download links on the website |

The mobile build also needs your own Firebase config files, `apps/mobile/google-services.json` (Android) and `apps/mobile/GoogleService-Info.plist` (iOS). They are git-ignored. The release workflow reads the Mapbox token from the `EXPO_PUBLIC_MAPBOX_TOKEN` repository secret.

---

## 🎨 Design System

### Brand Colors

| Color | Hex | CSS Variable | Usage |
|-------|-----|--------------|-------|
| **Primary** | `#006B3F` | `--color-primary` | Main brand (Kenya green) |
| **Primary Light** | `#008F54` | `--color-primary-light` | Hover states |
| **Primary Dark** | `#004D2D` | `--color-primary-dark` | Active states |
| **Accent** | `#FFB800` | `--color-accent` | CTAs, highlights (Golden) |
| **Accent Light** | `#FFCC33` | `--color-accent-light` | Hover states |
| **Accent Dark** | `#CC9300` | `--color-accent-dark` | Active states |
| **Secondary** | `#1E3A5F` | `--color-secondary` | Secondary elements |
| **Success** | `#22C55E` | `--color-success` | Success states |
| **Warning** | `#F59E0B` | `--color-warning` | Warning states |
| **Danger** | `#EF4444` | `--color-danger` | Error states |

### Typography

| Property | Value |
|----------|-------|
| **Font Family** | Inter (Google Fonts) |
| **Weights** | 300, 400, 500, 600, 700, 800 |
| **Base Size** | 16px |

### Theming

Both web and mobile support **light** and **dark** modes:

- Theme preference persisted to local storage
- System preference detection
- Smooth transitions between themes

---

## 📁 Shared Package

The `@ma3/shared` package contains code shared between web and mobile:

### Constants (`/constants`)

```typescript
APP_NAME           // "Ma3"
APP_TAGLINE        // "Panda. Lipa. Fika."
ROUTES             // Navigation route paths
NAV_LINKS          // Navigation menu items
COLORS             // Theme color palette
API                // API configuration
STORAGE_KEYS       // Local storage keys
PAYMENT_METHODS    // M-Pesa, Airtel, Card, Wallet
VEHICLE_TYPES      // 14-seater, 33-seater, Shuttle
PILOT_ROUTES       // Initial routes (Thika corridor)
PILOT_SACCOS       // Partner SACCOs
FARE_CONFIG        // Platform fees, min fare
SOCIAL_LINKS       // Social media URLs
APP_STORE_LINKS    // Play Store, App Store
```

### Types (`/types`)

```typescript
// User & Authentication
User, UserRole, AuthState, LoginCredentials, RegisterData

// Routes & Locations
Route, Stage, Location

// Vehicles & Operators
Vehicle, Driver, Conductor, Sacco

// Bookings & Payments
Booking, BookingStatus, Payment, PaymentMethod

// Trips & Tracking
TripTracking, TripStatus

// Safety & Emergency
EmergencyContact, EmergencyAlert

// Wallet & Transactions
Wallet, WalletTransaction

// Notifications
Notification, NotificationType

// API Responses
ApiResponse, PaginatedResponse
```

### Utilities (`/utils`)

```typescript
// Formatting
formatCurrency(100)        // "KSh 100"
formatDate(date)           // "January 30, 2026"
formatTime(date)           // "2:30 PM"
formatDuration(75)         // "1 hr 15 min"
formatDistance(45)         // "45.0 km"
formatPhoneNumber(phone)   // "+254712345678"

// Calculations
calculateTotalFare(100)    // { baseFare, platformFee, total }
calculateDistance(...)     // Haversine formula

// Validation
isValidKenyanPhone(phone)  // true/false

// Helpers
truncate(text, 50)         // "Long text..."
generateId()               // Unique ID
debounce(fn, 300)          // Debounced function
getGreeting()              // "Good morning"
getETAText(5)              // "5 min away"
getRatingText(4.5)         // "Excellent"
```

### Data (`/data`)

```typescript
SAMPLE_ROUTES      // Thika-Nairobi, Thika-Murang'a, etc.
SAMPLE_SACCOS      // Super Metro, 2NK, Lopha, etc.
APP_FEATURES       // Feature descriptions for marketing
FAQS               // Frequently asked questions
PLATFORM_STATS     // User counts, trip counts, etc.
```

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [PRD.md](docs/PRD.md) | Product Requirements Document |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | Technical Architecture |
| [API.md](docs/API.md) | API Documentation |
| [CONTRIBUTING.md](docs/CONTRIBUTING.md) | Contribution Guidelines |

---

## 🚢 Deployment

### Web Application

```bash
# Build for production
pnpm build:web

# Output in apps/web/dist/
# Deploy to Vercel, Netlify, or any static host
```

**Recommended Hosts:**
- Vercel (recommended)
- Netlify
- Cloudflare Pages

### Mobile Application

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure EAS
cd apps/mobile
eas build:configure

# Build APK for testing
eas build --platform android --profile preview

# Build for Play Store
eas build --platform android --profile production

# Build for App Store
eas build --platform ios --profile production
```

### CI/CD Pipeline

GitHub Actions automatically builds Android APK on push to `main`:

```yaml
# .github/workflows/build-android.yml
- Triggered on push to main (apps/mobile/** or packages/shared/**)
- Builds release APK
- Uploads as artifact (30-day retention)
```

---

## 🗺️ Roadmap

### Phase 1: MVP (Q1 2026) ✅
- [x] Monorepo setup with pnpm
- [x] Web application (React + Vite + Tailwind)
- [x] Mobile application (React Native + Expo)
- [x] Shared package (constants, types, utils)
- [x] Core screens (Home, Routes, Booking, Wallet, Profile)
- [x] Safety features (SOS, Trip Sharing)
- [x] Theme support (Light/Dark mode)
- [x] CI/CD pipeline

### Phase 2: Backend Integration (Q2 2026)
- [ ] Node.js API server
- [ ] PostgreSQL database
- [ ] M-Pesa payment integration
- [ ] User authentication (JWT)
- [ ] Real-time tracking (Socket.io)

### Phase 3: Launch (Q3 2026)
- [ ] Pilot with 5 SACCOs on Thika route
- [ ] 10,000 beta users
- [ ] Play Store & App Store release
- [ ] SACCO management portal

### Phase 4: Scale (Q4 2026)
- [ ] Expand to 25+ SACCOs
- [ ] Cover Greater Nairobi
- [ ] 100,000+ active users
- [ ] Advanced analytics

### Long-term Vision
- 2M+ active users by 2028
- Expand to Tanzania & Uganda
- Logistics & package delivery
- Electric vehicle integration

---

## 📊 Target Metrics (24-Month)

| Metric | Target |
|--------|--------|
| Active Users | 2,000,000 |
| Partner SACCOs | 150+ |
| Routes Covered | 300+ |
| Daily Transactions | 500,000+ |
| Monthly GMV | KSh 500M+ |
| Safety Impact | 30% reduction in incidents |

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](docs/CONTRIBUTING.md) for details.

### Quick Start

```bash
# 1. Fork the repository
# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/mat.git

# 3. Create a feature branch
git checkout -b feature/amazing-feature

# 4. Make your changes
# 5. Commit with conventional commits
git commit -m "feat(booking): add advance booking feature"

# 6. Push and create PR
git push origin feature/amazing-feature
```

### Commit Convention

```
feat(scope): description    # New feature
fix(scope): description     # Bug fix
docs(scope): description    # Documentation
style(scope): description   # Formatting
refactor(scope): description # Code refactoring
test(scope): description    # Tests
chore(scope): description   # Maintenance
```

---

## 📄 License

Copyright © 2026 Kennedy Muritu. All rights reserved. The code is public to read, not to reuse. See [LICENSE](LICENSE).

Built by [Kennedy Muritu](https://www.muritu.top).
