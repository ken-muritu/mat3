# Ma3 - Technical Architecture

## Overview

Ma3 is built as a **monorepo** using pnpm workspaces, enabling code sharing between web and mobile applications while maintaining separation of concerns.

---

## Repository Structure

```
ma3/
├── apps/
│   ├── web/                    # React + Vite web application
│   │   ├── public/             # Static assets
│   │   ├── src/
│   │   │   ├── components/     # Reusable UI components
│   │   │   ├── context/        # React Context providers
│   │   │   ├── pages/          # Route pages
│   │   │   ├── hooks/          # Custom React hooks
│   │   │   ├── services/       # API service layer
│   │   │   ├── utils/          # Utility functions
│   │   │   ├── App.jsx         # Root component
│   │   │   ├── main.jsx        # Entry point
│   │   │   └── index.css       # Global styles
│   │   ├── index.html
│   │   ├── vite.config.js
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── mobile/                 # React Native + Expo application
│       ├── assets/             # Images, fonts, icons
│       ├── src/
│       │   ├── components/     # Reusable UI components
│       │   ├── context/        # React Context providers
│       │   ├── navigation/     # React Navigation setup
│       │   ├── screens/        # App screens
│       │   ├── hooks/          # Custom React hooks
│       │   ├── services/       # API service layer
│       │   └── App.tsx         # Root component
│       ├── app.json            # Expo configuration
│       ├── babel.config.js
│       ├── metro.config.js
│       ├── tsconfig.json
│       └── package.json
│
├── packages/
│   └── shared/                 # Shared code package
│       ├── src/
│       │   ├── constants/      # App-wide constants
│       │   ├── types/          # TypeScript interfaces
│       │   ├── utils/          # Utility functions
│       │   ├── data/           # Static/mock data
│       │   └── index.ts        # Main exports
│       ├── tsconfig.json
│       └── package.json
│
├── docs/                       # Documentation
│   ├── PRD.md                  # Product Requirements Document
│   ├── ARCHITECTURE.md         # This file
│   ├── API.md                  # API documentation
│   └── CONTRIBUTING.md         # Contribution guidelines
│
├── .github/
│   └── workflows/              # CI/CD pipelines
│       └── build-android.yml   # Android APK build
│
├── package.json                # Root package.json
├── pnpm-workspace.yaml         # Workspace configuration
├── tsconfig.json               # Root TypeScript config
├── .prettierrc                 # Code formatting
├── .gitignore
└── README.md
```

---

## Technology Stack

### Frontend (Web)

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.x | UI framework |
| Vite | 7.x | Build tool & dev server |
| Tailwind CSS | 4.x | Utility-first styling |
| React Router | 7.x | Client-side routing |
| Lucide React | Latest | Icon library |

### Frontend (Mobile)

| Technology | Version | Purpose |
|------------|---------|---------|
| React Native | 0.76.x | Cross-platform mobile |
| Expo | SDK 52 | Development platform |
| React Navigation | 7.x | Navigation library |
| Expo Vector Icons | Latest | Icon library |
| AsyncStorage | Latest | Local data persistence |

### Shared Package

| Technology | Version | Purpose |
|------------|---------|---------|
| TypeScript | 5.7.x | Type safety |

### Backend (Planned)

| Technology | Purpose |
|------------|---------|
| Node.js + Express/NestJS | API server |
| PostgreSQL | Primary database |
| Redis | Caching & sessions |
| Socket.io | Real-time updates |
| AWS/GCP | Cloud infrastructure |

---

## Application Architecture

### Web Application

```
┌─────────────────────────────────────────────────────────────┐
│                        App.jsx                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                   ThemeProvider                      │   │
│  │  ┌───────────────────────────────────────────────┐  │   │
│  │  │              BrowserRouter                     │  │   │
│  │  │  ┌─────────────────────────────────────────┐  │  │   │
│  │  │  │              Navbar                      │  │  │   │
│  │  │  ├─────────────────────────────────────────┤  │  │   │
│  │  │  │              Routes                      │  │  │   │
│  │  │  │  ├── /           → Home                  │  │  │   │
│  │  │  │  ├── /about      → About                 │  │  │   │
│  │  │  │  ├── /routes     → Routes                │  │  │   │
│  │  │  │  ├── /book       → BookRide              │  │  │   │
│  │  │  │  ├── /safety     → Safety                │  │  │   │
│  │  │  │  └── /tracking   → Tracking              │  │  │   │
│  │  │  ├─────────────────────────────────────────┤  │  │   │
│  │  │  │              Footer                      │  │  │   │
│  │  │  └─────────────────────────────────────────┘  │  │   │
│  │  └───────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Mobile Application

```
┌─────────────────────────────────────────────────────────────┐
│                        App.tsx                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                   ErrorBoundary                      │   │
│  │  ┌───────────────────────────────────────────────┐  │   │
│  │  │              SafeAreaProvider                  │  │   │
│  │  │  ┌─────────────────────────────────────────┐  │  │   │
│  │  │  │           ThemeProvider                  │  │  │   │
│  │  │  │  ┌───────────────────────────────────┐  │  │   │
│  │  │  │  │       NavigationContainer          │  │  │   │
│  │  │  │  │  ┌─────────────────────────────┐  │  │  │   │
│  │  │  │  │  │      RootNavigator          │  │  │  │   │
│  │  │  │  │  │  (Bottom Tab Navigator)     │  │  │  │   │
│  │  │  │  │  │  ├── Home (Stack)           │  │  │  │   │
│  │  │  │  │  │  │   ├── HomeScreen         │  │  │  │   │
│  │  │  │  │  │  │   ├── BookingScreen      │  │  │  │   │
│  │  │  │  │  │  │   ├── TrackingScreen     │  │  │  │   │
│  │  │  │  │  │  │   ├── SafetyScreen       │  │  │  │   │
│  │  │  │  │  │  │   └── HistoryScreen      │  │  │  │   │
│  │  │  │  │  │  ├── Routes (Stack)         │  │  │  │   │
│  │  │  │  │  │  ├── Wallet (Stack)         │  │  │  │   │
│  │  │  │  │  │  └── Profile (Stack)        │  │  │  │   │
│  │  │  │  │  │      ├── ProfileScreen      │  │  │  │   │
│  │  │  │  │  │      ├── HistoryScreen      │  │  │  │   │
│  │  │  │  │  │      ├── SafetyScreen       │  │  │  │   │
│  │  │  │  │  │      └── SettingsScreen     │  │  │  │   │
│  │  │  │  │  └─────────────────────────────┘  │  │  │   │
│  │  │  │  └───────────────────────────────────┘  │  │   │
│  │  │  └─────────────────────────────────────────┘  │   │
│  │  └───────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Shared Package Structure

The `@ma3/shared` package contains code shared between web and mobile:

### Constants (`/constants`)

```typescript
// App configuration
APP_NAME, APP_TAGLINE, APP_INFO

// Navigation routes
ROUTES, NAV_LINKS

// Theme colors
COLORS (primary, accent, secondary, success, warning, danger)

// API configuration
API.BASE_URL, API.ENDPOINTS

// Storage keys
STORAGE_KEYS

// Business configuration
PAYMENT_METHODS, VEHICLE_TYPES, FARE_CONFIG, RATING_CONFIG

// Pilot data
PILOT_ROUTES, PILOT_SACCOS

// External links
SOCIAL_LINKS, APP_STORE_LINKS
```

### Types (`/types`)

```typescript
// User & Auth
User, UserRole, AuthState, LoginCredentials, RegisterData

// Routes & Locations
Route, Stage, Location

// Vehicles & Operators
Vehicle, Driver, Conductor, Sacco

// Bookings & Payments
Booking, BookingStatus, Payment, PaymentMethod, PaymentStatus

// Trips & Tracking
TripTracking, TripStatus

// Ratings & Reviews
Rating

// Safety
EmergencyContact, EmergencyAlert

// Wallet
Wallet, WalletTransaction

// Notifications
Notification, NotificationType

// API
ApiResponse, PaginatedResponse

// Theme
Theme, ThemeMode

// Navigation
NavigationItem

// Search & Filters
SearchFilters, RouteFilters
```

### Utilities (`/utils`)

```typescript
// Formatting
formatCurrency(amount)
formatDate(date, options)
formatTime(date)
formatDuration(minutes)
formatDistance(km)
formatPhoneNumber(phone)
formatRating(rating)

// Calculations
calculateTotalFare(baseFare)
calculateDistance(lat1, lon1, lat2, lon2)

// Validation
isValidKenyanPhone(phone)

// Helpers
truncate(text, maxLength)
generateId()
debounce(func, wait)
capitalize(str)
getETAText(minutes)
getRatingText(rating)
getGreeting()
isMobile()
sleep(ms)
retry(fn, maxAttempts, delay)
```

### Data (`/data`)

```typescript
// Sample data for development
SAMPLE_ROUTES      // Route objects with stages
SAMPLE_SACCOS      // SACCO information
APP_FEATURES       // Feature descriptions
FAQS               // Frequently asked questions
PLATFORM_STATS     // Platform statistics
```

---

## State Management

### Current Implementation

Both web and mobile use **React Context** for state management:

1. **ThemeContext** - Light/dark mode with persistence
2. **AuthContext** (planned) - User authentication state
3. **BookingContext** (planned) - Active booking state

### Future Considerations

For complex state, consider:
- **Zustand** - Lightweight state management
- **TanStack Query** - Server state management
- **Redux Toolkit** - If more complex state needed

---

## Theming System

### Design Tokens

```css
/* Primary Colors (Kenya Green) */
--color-primary: #006B3F
--color-primary-light: #008F54
--color-primary-dark: #004D2D

/* Accent Colors (Golden Yellow) */
--color-accent: #FFB800
--color-accent-light: #FFCC33
--color-accent-dark: #CC9300

/* Semantic Colors */
--color-success: #22C55E
--color-warning: #F59E0B
--color-danger: #EF4444

/* Surface Colors */
--color-surface-light: #FFFFFF
--color-surface-dark: #0F172A

/* Text Colors */
--color-text-light: #0F172A
--color-text-dark: #F8FAFC
--color-muted-light: #64748B
--color-muted-dark: #94A3B8
```

### Typography

- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800

---

## API Design (Planned)

### RESTful Endpoints

```
Authentication:
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh
POST   /api/auth/logout

Users:
GET    /api/users/me
PATCH  /api/users/me
DELETE /api/users/me

Routes:
GET    /api/routes
GET    /api/routes/:id
GET    /api/routes/:id/vehicles

Bookings:
POST   /api/bookings
GET    /api/bookings
GET    /api/bookings/:id
PATCH  /api/bookings/:id/cancel

Payments:
POST   /api/payments/initiate
POST   /api/payments/confirm
GET    /api/payments/:id

Tracking:
GET    /api/tracking/:tripId
WS     /api/tracking/:tripId/live

Ratings:
POST   /api/ratings
GET    /api/ratings/driver/:driverId
```

---

## Security Considerations

### Authentication
- JWT tokens with short expiry (15 min)
- Refresh tokens with longer expiry (7 days)
- Secure token storage (Keychain/Keystore on mobile)

### Data Protection
- HTTPS for all API calls
- Sensitive data encryption at rest
- PII handling per Kenya DPA 2019

### Mobile Security
- Certificate pinning
- Root/jailbreak detection
- Secure local storage

---

## Performance Optimization

### Web
- Code splitting with React.lazy
- Image optimization
- Service worker for offline support
- CDN for static assets

### Mobile
- Hermes JavaScript engine
- Image caching
- Lazy loading screens
- Optimized list rendering (FlatList)

---

## Testing Strategy

### Unit Tests
- Jest for JavaScript/TypeScript
- React Testing Library for components

### Integration Tests
- API endpoint testing
- Navigation flow testing

### E2E Tests
- Detox for mobile
- Playwright for web

---

## CI/CD Pipeline

### GitHub Actions Workflows

1. **build-android.yml** - Android APK builds
   - Triggered on push to main
   - Builds release APK
   - Uploads as artifact

2. **build-web.yml** (planned) - Web deployment
   - Build and deploy to Vercel/Netlify

3. **test.yml** (planned) - Automated testing
   - Run unit and integration tests

---

## Deployment

### Web Application
- **Hosting**: Vercel / Netlify
- **CDN**: Cloudflare
- **Domain**: ma3.co.ke

### Mobile Application
- **Android**: Google Play Store
- **iOS**: Apple App Store
- **Beta**: Expo EAS for internal testing

### Backend (Planned)
- **Cloud**: AWS / GCP
- **Container**: Docker + Kubernetes
- **Database**: Managed PostgreSQL

---

## Monitoring & Analytics

### Application Monitoring
- Sentry for error tracking
- Performance monitoring

### Analytics
- Mixpanel / Amplitude for user analytics
- Custom dashboards for business metrics

### Infrastructure
- CloudWatch / Stackdriver for logs
- Uptime monitoring

---

## Future Architecture Considerations

1. **Microservices** - Split backend into services as scale increases
2. **Event-Driven** - Use message queues for async operations
3. **GraphQL** - Consider for complex data requirements
4. **Edge Computing** - For real-time tracking optimization
5. **Machine Learning** - ETA predictions, demand forecasting
