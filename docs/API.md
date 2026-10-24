# Matatu Connect - API Documentation

## Overview

This document outlines the planned API structure for Matatu Connect. The API follows RESTful principles and uses JSON for request/response bodies.

**Base URL:** `https://api.matatuconnect.co.ke/v1`

---

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <access_token>
```

### Endpoints

#### Register User

```http
POST /auth/register
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Kamau",
  "phone": "+254712345678",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_abc123",
      "firstName": "John",
      "lastName": "Kamau",
      "phone": "+254712345678",
      "email": "john@example.com",
      "role": "passenger",
      "isVerified": false,
      "createdAt": "2026-01-30T12:00:00Z"
    },
    "message": "OTP sent to your phone number"
  }
}
```

#### Login

```http
POST /auth/login
```

**Request Body:**
```json
{
  "phone": "+254712345678",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": { ... },
    "accessToken": "<access-token>",
    "refreshToken": "<refresh-token>",
    "expiresIn": 900
  }
}
```

#### Refresh Token

```http
POST /auth/refresh
```

**Request Body:**
```json
{
  "refreshToken": "<refresh-token>"
}
```

#### Verify OTP

```http
POST /auth/verify-otp
```

**Request Body:**
```json
{
  "phone": "+254712345678",
  "otp": "123456"
}
```

---

## Routes

#### List Routes

```http
GET /routes
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| origin | string | Filter by origin location |
| destination | string | Filter by destination |
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 20) |

**Response (200):**
```json
{
  "success": true,
  "data": {
    "routes": [
      {
        "id": "route_thika_nairobi",
        "name": "Thika - Nairobi CBD",
        "origin": {
          "name": "Thika Town",
          "latitude": -1.0333,
          "longitude": 37.0693
        },
        "destination": {
          "name": "Kencom",
          "latitude": -1.2864,
          "longitude": 36.8172
        },
        "distance": 45,
        "estimatedTime": 75,
        "baseFare": 150,
        "stages": [...],
        "isActive": true
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45,
      "pages": 3
    }
  }
}
```

#### Get Route Details

```http
GET /routes/:routeId
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "route": {
      "id": "route_thika_nairobi",
      "name": "Thika - Nairobi CBD",
      "origin": {...},
      "destination": {...},
      "stages": [
        {
          "id": "stage_thika",
          "name": "Thika Town",
          "order": 1,
          "fareFromOrigin": 0,
          "location": {...}
        },
        ...
      ],
      "saccos": [
        {
          "id": "sacco_super_metro",
          "name": "Super Metro",
          "rating": 4.5,
          "vehicleCount": 45
        }
      ],
      "distance": 45,
      "estimatedTime": 75,
      "baseFare": 150
    }
  }
}
```

#### Get Available Vehicles on Route

```http
GET /routes/:routeId/vehicles
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| stageId | string | Filter by current stage |

**Response (200):**
```json
{
  "success": true,
  "data": {
    "vehicles": [
      {
        "id": "veh_abc123",
        "registrationNumber": "KCB 123A",
        "sacco": {
          "id": "sacco_super_metro",
          "name": "Super Metro"
        },
        "driver": {
          "id": "drv_xyz789",
          "name": "John K.",
          "rating": 4.8
        },
        "currentLocation": {
          "latitude": -1.1500,
          "longitude": 36.9667,
          "stage": "Ruiru"
        },
        "eta": 5,
        "availableSeats": 8,
        "fare": 100,
        "amenities": ["wifi", "usb"]
      }
    ]
  }
}
```

---

## Bookings

#### Create Booking

```http
POST /bookings
```

**Request Body:**
```json
{
  "routeId": "route_thika_nairobi",
  "vehicleId": "veh_abc123",
  "pickupStageId": "stage_thika",
  "dropoffStageId": "stage_kencom",
  "paymentMethod": "mpesa",
  "seats": 1
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "booking": {
      "id": "book_def456",
      "status": "pending_payment",
      "route": {...},
      "vehicle": {...},
      "pickup": {...},
      "dropoff": {...},
      "fare": 150,
      "platformFee": 23,
      "totalAmount": 173,
      "paymentMethod": "mpesa",
      "createdAt": "2026-01-30T12:00:00Z"
    },
    "payment": {
      "id": "pay_ghi789",
      "status": "pending",
      "mpesaPrompt": "Check your phone for M-Pesa prompt"
    }
  }
}
```

#### List User Bookings

```http
GET /bookings
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| status | string | Filter by status |
| from | date | Start date |
| to | date | End date |

#### Get Booking Details

```http
GET /bookings/:bookingId
```

#### Cancel Booking

```http
PATCH /bookings/:bookingId/cancel
```

**Request Body:**
```json
{
  "reason": "Change of plans"
}
```

---

## Payments

#### Initiate Payment

```http
POST /payments/initiate
```

**Request Body:**
```json
{
  "bookingId": "book_def456",
  "method": "mpesa",
  "phone": "+254712345678"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "paymentId": "pay_ghi789",
    "status": "pending",
    "checkoutRequestId": "ws_CO_123456789",
    "message": "M-Pesa prompt sent to your phone"
  }
}
```

#### Confirm Payment (Webhook)

```http
POST /payments/callback
```

This endpoint receives M-Pesa callback notifications.

#### Get Payment Status

```http
GET /payments/:paymentId
```

---

## Tracking

#### Get Trip Tracking

```http
GET /tracking/:tripId
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "trip": {
      "id": "trip_jkl012",
      "status": "in_transit",
      "vehicle": {
        "id": "veh_abc123",
        "registrationNumber": "KCB 123A",
        "currentLocation": {
          "latitude": -1.2000,
          "longitude": 36.9000
        }
      },
      "driver": {
        "name": "John Kamau",
        "phone": "+254712345678",
        "rating": 4.8
      },
      "route": {...},
      "eta": 15,
      "distanceRemaining": 12.5,
      "stages": [
        { "name": "Thika", "status": "passed", "time": "08:30" },
        { "name": "Ruiru", "status": "current", "time": "09:15" },
        { "name": "Kencom", "status": "upcoming", "eta": "09:45" }
      ]
    }
  }
}
```

#### Live Tracking (WebSocket)

```
WS /tracking/:tripId/live
```

**Events:**
- `location_update` - Vehicle location changed
- `stage_reached` - Vehicle reached a stage
- `eta_update` - ETA recalculated
- `trip_completed` - Trip finished

---

## Ratings

#### Submit Rating

```http
POST /ratings
```

**Request Body:**
```json
{
  "tripId": "trip_jkl012",
  "driverRating": 5,
  "vehicleRating": 4,
  "comment": "Great ride, very comfortable!"
}
```

#### Get Driver Ratings

```http
GET /ratings/driver/:driverId
```

---

## Wallet

#### Get Wallet Balance

```http
GET /wallet
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "balance": 500,
    "currency": "KES"
  }
}
```

#### Top Up Wallet

```http
POST /wallet/topup
```

**Request Body:**
```json
{
  "amount": 500,
  "method": "mpesa",
  "phone": "+254712345678"
}
```

#### Get Transactions

```http
GET /wallet/transactions
```

---

## Emergency

#### Send SOS Alert

```http
POST /emergency/sos
```

**Request Body:**
```json
{
  "tripId": "trip_jkl012",
  "location": {
    "latitude": -1.2000,
    "longitude": 36.9000
  },
  "message": "Emergency assistance needed"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "alertId": "sos_mno345",
    "status": "sent",
    "notifiedContacts": 3,
    "message": "Emergency contacts and safety team notified"
  }
}
```

#### Get Emergency Contacts

```http
GET /emergency/contacts
```

#### Add Emergency Contact

```http
POST /emergency/contacts
```

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid phone number format",
    "details": [
      {
        "field": "phone",
        "message": "Phone number must start with +254"
      }
    ]
  }
}
```

### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| VALIDATION_ERROR | 400 | Invalid request data |
| UNAUTHORIZED | 401 | Missing or invalid token |
| FORBIDDEN | 403 | Insufficient permissions |
| NOT_FOUND | 404 | Resource not found |
| CONFLICT | 409 | Resource conflict |
| RATE_LIMITED | 429 | Too many requests |
| SERVER_ERROR | 500 | Internal server error |

---

## Rate Limiting

- **Anonymous**: 100 requests/minute
- **Authenticated**: 1000 requests/minute
- **Tracking WebSocket**: 10 connections/user

---

## Webhooks

### M-Pesa Callback

```http
POST /webhooks/mpesa
```

### SACCO Notifications

```http
POST /webhooks/sacco/:saccoId
```

---

## SDKs & Libraries

### JavaScript/TypeScript

```bash
npm install @matatu-connect/sdk
```

```typescript
import { MatatuConnect } from '@matatu-connect/sdk';

const client = new MatatuConnect({
  apiKey: 'your_api_key'
});

const routes = await client.routes.list();
```

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | Jan 2026 | Initial API release |
