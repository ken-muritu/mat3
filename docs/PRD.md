# MA3
## Product Requirements Document (PRD)
### Digital Transformation of Kenya's Matatu Sector
### *Panda. Lipa. Fika.*

**Version:** 1.1  
**Last Updated:** February 2026  
**Status:** In Development

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Vision](#2-product-vision)
3. [Market Analysis](#3-market-analysis)
4. [Target Audience](#4-target-audience)
5. [Core Features](#5-core-features)
6. [Technical Architecture](#6-technical-architecture)
7. [Business Model](#7-business-model)
8. [Go-to-Market Strategy](#8-go-to-market-strategy)
9. [Safety & Compliance](#9-safety--compliance)
10. [Competitive Advantages](#10-competitive-advantages)
11. [Financial Projections](#11-financial-projections)
12. [Risk Assessment](#12-risk-assessment)
13. [Implementation Timeline](#13-implementation-timeline)
14. [Long-term Vision](#14-long-term-vision)

---

## 1. Executive Summary

**Ma3** is a revolutionary platform designed to digitize Kenya's matatu public transport sector, targeting SACCO-operated routes including Thika-Nairobi, Thika-Murang'a, and similar high-traffic corridors.

### The Opportunity

Kenya's matatu sector represents a massive, underserved market:
- **40,000+** registered matatus nationwide
- **500+** SACCOs operating across the country
- **Millions** of daily commuters relying on matatus
- **KSh 200B+** annual market value

### The Problem

Current matatu operations suffer from:
- Unpredictable wait times and schedules
- Cash-only transactions leading to security issues
- No real-time tracking or ETAs
- Safety concerns for passengers
- Inefficient route management for operators
- No loyalty or reward systems

### The Solution

Ma3 provides:
- **Real-time tracking** of matatus on all routes
- **Cashless payments** via M-Pesa, Airtel Money, and cards
- **Advance booking** for inter-county trips
- **Safety features** including SOS, trip sharing, and verified drivers
- **SACCO management tools** for fleet optimization
- **Passenger rewards** and loyalty programs

---

## 2. Product Vision

### Mission Statement

> "To revolutionize Kenya's public transport by making matatu travel safe, predictable, and convenient for every Kenyan."

### Vision Statement

> "To become East Africa's leading digital transport platform, connecting millions of commuters with reliable, affordable, and safe matatu services."

### Core Values

1. **Safety First** - Every feature prioritizes passenger and driver safety
2. **Accessibility** - Designed for all Kenyans, regardless of tech literacy
3. **Reliability** - Consistent service quality across all routes
4. **Community** - Supporting SACCOs and local transport ecosystems
5. **Innovation** - Continuously improving the matatu experience

---

## 3. Market Analysis

### Market Size

| Metric | Value |
|--------|-------|
| Total Addressable Market (TAM) | KSh 200B+ annually |
| Serviceable Addressable Market (SAM) | KSh 50B (Nairobi & Central Kenya) |
| Serviceable Obtainable Market (SOM) | KSh 5B (Year 1 target) |

### Key Market Trends

1. **Mobile Money Adoption** - 96% of Kenyans use mobile money
2. **Smartphone Penetration** - 55% and growing rapidly
3. **Digital-First Generation** - Youth prefer app-based services
4. **Safety Consciousness** - Post-COVID demand for safer transport
5. **Regulatory Support** - NTSA pushing for digital compliance

### Competitive Landscape

| Competitor | Strengths | Weaknesses |
|------------|-----------|------------|
| Uber/Bolt | Brand recognition, tech | Expensive, not matatu-focused |
| Little Cab | Local presence | Limited to taxis |
| SWVL | Bus booking | Not matatu-integrated |
| Traditional Matatus | Ubiquitous | No digital features |

---

## 4. Target Audience

### Primary Users

#### 4.1 Passengers

**Demographics:**
- Age: 18-45 years
- Location: Urban and peri-urban Kenya
- Income: KSh 20,000 - 150,000/month
- Tech: Smartphone users with mobile money

**Pain Points:**
- Unpredictable wait times
- Safety concerns, especially for women
- Cash handling risks
- No way to plan journeys

**Needs:**
- Real-time arrival information
- Cashless payment options
- Safety assurance
- Route planning tools

#### 4.2 SACCO Operators

**Profile:**
- 50-500 vehicles per SACCO
- Managing multiple routes
- Dealing with cash collection challenges
- Compliance requirements from NTSA

**Pain Points:**
- Revenue leakage from cash handling
- No visibility into fleet operations
- Difficulty managing driver performance
- Manual record keeping

**Needs:**
- Digital payment collection
- Fleet tracking and management
- Driver performance analytics
- Automated compliance reporting

#### 4.3 Drivers & Conductors

**Profile:**
- Daily income earners
- Limited tech exposure
- Working long hours
- Safety concerns

**Needs:**
- Simple, intuitive interface
- Fair earnings distribution
- Safety features
- Performance tracking

---

## 5. Core Features

### 5.1 Passenger Mobile App

#### A. Pre-Trip Features

| Feature | Description | Priority |
|---------|-------------|----------|
| Route Discovery | Search and browse all available routes | P0 |
| Real-Time Tracking | See matatus on map with live positions | P0 |
| Predictive Wait Times | AI-powered ETA predictions | P0 |
| Advance Booking | Reserve seats for future trips | P1 |
| Fare Transparency | View fares before boarding | P0 |
| Multi-Modal Planning | Combine routes for complex journeys | P2 |

#### B. During-Trip Features

| Feature | Description | Priority |
|---------|-------------|----------|
| Live Trip Tracking | Track your journey in real-time | P0 |
| SOS Emergency Button | One-tap emergency alert | P0 |
| Trip Sharing | Share live location with contacts | P0 |
| Cashless Payment | Pay via M-Pesa, wallet, or card | P0 |
| Digital Ticket | QR code for boarding verification | P1 |
| In-Trip Communication | Message driver if needed | P2 |

#### C. Post-Trip Features

| Feature | Description | Priority |
|---------|-------------|----------|
| Rating & Reviews | Rate drivers and vehicles | P0 |
| Trip History | View all past trips | P0 |
| Digital Receipts | Automatic receipt generation | P1 |
| Loyalty Rewards | Earn points for rides | P1 |
| Lost & Found | Report and recover lost items | P2 |

### 5.2 SACCO Management Portal

| Feature | Description |
|---------|-------------|
| Fleet Dashboard | Real-time view of all vehicles |
| Revenue Analytics | Daily, weekly, monthly reports |
| Driver Management | Performance tracking and ratings |
| Route Optimization | Data-driven route planning |
| Compliance Tools | NTSA reporting automation |
| Payment Settlement | Automated driver payouts |

### 5.3 Driver/Conductor App

| Feature | Description |
|---------|-------------|
| Trip Management | Accept/manage passenger bookings |
| Navigation | Optimized route guidance |
| Earnings Tracker | Real-time earnings visibility |
| Safety Tools | Emergency alerts and support |
| Performance Dashboard | Ratings and feedback |

---

## 6. Technical Architecture

### 6.1 Technology Stack

| Layer | Technology |
|-------|------------|
| **Mobile (iOS/Android)** | React Native + Expo SDK 52 |
| **Web Frontend** | React 19 + Vite 7 + Tailwind CSS 4 |
| **Backend API** | Node.js + Express / NestJS |
| **Database** | PostgreSQL + Redis (caching) |
| **Real-Time** | Socket.io / WebSockets |
| **Maps & Location** | Google Maps Platform |
| **Payments** | M-Pesa Daraja API, Stripe |
| **Push Notifications** | Firebase Cloud Messaging |
| **Analytics** | Mixpanel / Amplitude |
| **Cloud Infrastructure** | AWS / Google Cloud Platform |

### 6.2 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT LAYER                           │
├─────────────────┬─────────────────┬─────────────────────────┤
│  Passenger App  │   Driver App    │    SACCO Portal         │
│  (React Native) │  (React Native) │    (React Web)          │
└────────┬────────┴────────┬────────┴────────────┬────────────┘
         │                 │                      │
         ▼                 ▼                      ▼
┌─────────────────────────────────────────────────────────────┐
│                      API GATEWAY                            │
│              (Authentication, Rate Limiting)                │
└─────────────────────────────┬───────────────────────────────┘
                              │
         ┌────────────────────┼────────────────────┐
         ▼                    ▼                    ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  Auth Service   │  │ Booking Service │  │ Payment Service │
└─────────────────┘  └─────────────────┘  └─────────────────┘
         │                    │                    │
         ▼                    ▼                    ▼
┌─────────────────────────────────────────────────────────────┐
│                      DATA LAYER                             │
│         PostgreSQL │ Redis │ Elasticsearch                  │
└─────────────────────────────────────────────────────────────┘
```

### 6.3 Security Measures

- **Authentication**: JWT + OAuth 2.0
- **Encryption**: TLS 1.3 for all communications
- **Data Protection**: AES-256 encryption at rest
- **PCI Compliance**: For payment processing
- **GDPR/DPA Compliance**: Data privacy standards

---

## 7. Business Model

### 7.1 Revenue Streams

| Stream | Description | Target |
|--------|-------------|--------|
| Transaction Fees | 5-10% per cashless transaction | 70% of revenue |
| SACCO Subscriptions | Monthly platform access fee | 15% of revenue |
| Premium Features | Advance booking, priority support | 10% of revenue |
| Advertising | In-app promotions and partnerships | 5% of revenue |

### 7.2 Pricing Strategy

**Passenger Fees:**
- Free to download and use basic features
- No markup on standard fares
- Small convenience fee for advance booking (KSh 10-20)

**SACCO Fees:**
- Basic: Free (limited features)
- Standard: KSh 5,000/month per SACCO
- Premium: KSh 15,000/month (full analytics + support)

**Transaction Fees:**
- 5% platform fee on all cashless transactions
- Split: 3% to platform, 2% to SACCO

---

## 8. Go-to-Market Strategy

### 8.1 Launch Phases

#### Phase 1: Pilot (Months 1-3)
- **Routes**: Thika-Nairobi corridor
- **SACCOs**: 5 partner SACCOs
- **Users**: 10,000 beta testers
- **Focus**: Core functionality validation

#### Phase 2: Expansion (Months 4-6)
- **Routes**: Greater Nairobi (Kiambu, Machakos, Kajiado)
- **SACCOs**: 25 partner SACCOs
- **Users**: 100,000 active users
- **Focus**: Scale and reliability

#### Phase 3: Growth (Months 7-12)
- **Routes**: All major Kenyan cities
- **SACCOs**: 100+ partner SACCOs
- **Users**: 500,000+ active users
- **Focus**: Market dominance

### 8.2 Marketing Channels

1. **Digital Marketing**: Social media, Google Ads, influencers
2. **Ground Activation**: Stage branding, conductor training
3. **Partnerships**: Safaricom, banks, universities
4. **PR**: Media coverage, thought leadership
5. **Referral Program**: User-to-user incentives

---

## 9. Safety & Compliance

### 9.1 Safety Features

| Feature | Description |
|---------|-------------|
| SOS Button | One-tap emergency alert to contacts + authorities |
| Trip Sharing | Real-time location sharing with trusted contacts |
| Driver Verification | Background checks, license verification |
| Vehicle Inspection | Regular safety compliance checks |
| Insurance | Passenger insurance coverage up to KSh 5M |
| 24/7 Support | Round-the-clock customer support |

### 9.2 Regulatory Compliance

- **NTSA Compliance**: Integration with national transport authority
- **Data Protection Act**: Full compliance with Kenya's DPA 2019
- **CBK Regulations**: Payment service provider licensing
- **Insurance Requirements**: Third-party liability coverage

---

## 10. Competitive Advantages

1. **First-Mover in Matatu Digitization**: No direct competitor in this space
2. **SACCO Partnerships**: Deep integration with existing operators
3. **Local Understanding**: Built for Kenyan context and culture
4. **Mobile Money Native**: M-Pesa-first payment approach
5. **Safety Focus**: Comprehensive safety features
6. **Scalable Technology**: Modern, cloud-native architecture

---

## 11. Financial Projections

### 11.1 Key Metrics (24-Month Target)

| Metric | Target |
|--------|--------|
| Active Users | 2,000,000 |
| Partner SACCOs | 150+ |
| Routes Covered | 300+ |
| Daily Transactions | 500,000+ |
| Monthly GMV | KSh 500M+ |
| Monthly Revenue | KSh 25M+ |

### 11.2 Funding Requirements

| Stage | Amount | Use of Funds |
|-------|--------|--------------|
| Seed | $500K | MVP development, pilot launch |
| Series A | $3M | Market expansion, team growth |
| Series B | $10M | National scale, new features |

---

## 12. Risk Assessment

### 12.1 Key Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| SACCO Resistance | High | Medium | Revenue sharing, training programs |
| Regulatory Changes | High | Low | Proactive compliance, lobbying |
| Competition | Medium | Medium | First-mover advantage, partnerships |
| Tech Failures | High | Low | Redundancy, monitoring, testing |
| Security Breaches | High | Low | Security audits, encryption |

---

## 13. Implementation Timeline

### Year 1 Roadmap

| Quarter | Milestones |
|---------|------------|
| Q1 | MVP launch, 5 SACCO pilots, 10K users |
| Q2 | Payment integration, 25 SACCOs, 50K users |
| Q3 | SACCO portal launch, 50 SACCOs, 200K users |
| Q4 | Multi-city expansion, 100 SACCOs, 500K users |

### Year 2 Roadmap

| Quarter | Milestones |
|---------|------------|
| Q1 | Inter-county booking, loyalty program |
| Q2 | Driver app v2, advanced analytics |
| Q3 | Regional expansion (Tanzania, Uganda) |
| Q4 | 2M users, profitability target |

---

## 14. Long-term Vision

### 5-Year Goals

1. **Market Leadership**: #1 digital transport platform in East Africa
2. **User Base**: 10M+ active users across 5 countries
3. **Revenue**: $50M+ annual revenue
4. **Impact**: 50% reduction in transport-related incidents
5. **Innovation**: AI-powered route optimization, autonomous vehicle integration

### Beyond Transport

- **Logistics**: Package delivery via matatu network
- **Financial Services**: Micro-loans for drivers
- **Data Insights**: Urban planning partnerships
- **Electric Vehicles**: Green transport initiatives

---

## Appendix

### A. Glossary

| Term | Definition |
|------|------------|
| Matatu | Public minibus transport in Kenya |
| SACCO | Savings and Credit Cooperative (matatu operator association) |
| NTSA | National Transport and Safety Authority |
| Stage | Designated matatu boarding/alighting point |
| Conductor | Person who collects fares on a matatu |

### B. References

- Kenya National Bureau of Statistics
- NTSA Annual Reports
- Safaricom M-Pesa Statistics
- World Bank Kenya Transport Studies

---

**Document Control**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Jan 2026 | Ma3 Team | Initial PRD |

---

*This document is confidential and intended for internal use only.*
