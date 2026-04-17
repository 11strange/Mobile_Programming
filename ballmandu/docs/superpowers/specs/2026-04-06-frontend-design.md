# Ballmandu — Frontend Design Spec
**Date:** 2026-04-06  
**Scope:** Frontend only (no backend, no auth)  
**Stack:** Expo (managed workflow) + Expo Router + NativeWind + React Native

---

## Overview

Ballmandu is a futsal court booking platform for Kathmandu, Nepal. This spec covers the frontend-only phase: a React Native mobile app with two role views (Player and Court Owner) toggled via a mode selector screen. No authentication, no backend — all data is mocked.

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Expo (managed) | SDK 52+ | App runtime, build tooling |
| Expo Router | v4 | File-based routing, route groups |
| NativeWind | v4 | Tailwind-style classes in RN |
| React Native Reanimated | v3 | Animations |
| expo-google-fonts | latest | Manrope + Inter fonts |
| Victory Native | latest | Charts on Analytics screen |
| Lucide React Native | latest | Icons |

---

## Project Structure

```
ballmandu/
├── app/
│   ├── index.tsx                  ← Mode selector screen
│   ├── (player)/
│   │   ├── _layout.tsx            ← Player bottom tab navigator
│   │   ├── index.tsx              ← Home: browse courts
│   │   ├── search.tsx             ← Search & filter courts
│   │   ├── bookings.tsx           ← My bookings list
│   │   └── profile.tsx            ← User profile
│   └── (owner)/
│       ├── _layout.tsx            ← Owner bottom tab navigator
│       ├── index.tsx              ← Dashboard: today's overview
│       ├── bookings.tsx           ← Manage all bookings
│       ├── courts.tsx             ← Court management
│       └── analytics.tsx          ← Revenue + occupancy charts
├── components/
│   ├── player/
│   │   ├── CourtCard.tsx          ← Court listing card
│   │   ├── BookingSheet.tsx       ← Slide-up booking bottom sheet
│   │   └── SlotPicker.tsx         ← Time slot selector grid
│   └── owner/
│       ├── StatCard.tsx           ← KPI metric card
│       ├── BookingRow.tsx         ← Booking list item with actions
│       └── RevenueChart.tsx       ← Weekly bar chart wrapper
├── data/
│   └── mockData.ts                ← All mock data (KTM-specific)
└── constants/
    └── theme.ts                   ← Neon Arena design tokens
```

---

## Design System — Neon Arena (React Native)

Ported from the existing `Futsal_Booking` web prototype.

```ts
// constants/theme.ts
export const colors = {
  background: '#0e0e0e',
  surface: '#0e0e0e',
  surfaceContainerLow: '#131313',
  surfaceContainer: '#1a1a1a',
  surfaceContainerHigh: '#20201f',
  surfaceContainerHighest: '#262626',
  primary: '#d1ff26',
  primaryContainer: '#cefc22',
  onPrimary: '#526700',
  onSurface: '#ffffff',
  onSurfaceVariant: '#adaaaa',
};

export const fonts = {
  display: 'Manrope',
  body: 'Inter',
};
```

NativeWind `tailwind.config.js` maps these tokens so Tailwind classes like `bg-background`, `text-primary`, `bg-surface-container-low` work in RN components.

---

## Mode Selector — `app/index.tsx`

Single screen shown on app launch. Two large tappable cards:

- **"I'm a Player"** — navigates to `/(player)/`
- **"I'm a Court Owner"** — navigates to `/(owner)/`

No persistence needed (pure frontend demo). A small "switch mode" button in each layout's header lets the user return to this screen.

---

## Player Screens

### Home (`(player)/index.tsx`)
- Welcome header: "Good morning, [Name]" + notification bell
- Horizontal scroll: **Quick Stats** (total bookings, upcoming, hours played)
- Section: **Featured Courts** — vertical list of `CourtCard` components
- Each `CourtCard` shows: court image, name, KTM location, rating, NPR price/hr, amenity chips, "Book Now" button
- Tapping a card opens `BookingSheet` (bottom sheet)

### Search (`(player)/search.tsx`)
- Search input (auto-focused)
- Filter chips row: Indoor / Outdoor / Under Rs.1000 / Thamel / Lalitpur / Baneshwor
- Filtered court grid (same `CourtCard`)
- Empty state illustration when no results

### Bookings (`(player)/bookings.tsx`)
- Two tabs: **Upcoming** and **Past**
- Booking card: court image thumbnail, court name, date, time slot, status badge (confirmed / pending / cancelled)
- Empty state for each tab

### Profile (`(player)/profile.tsx`)
- Avatar circle + name + member since
- Stats row: total bookings, hours played, favorite court
- Settings rows: Edit Profile, Notifications, Help, About

---

## Owner Screens

### Dashboard (`(owner)/index.tsx`)
- Header: "Today, [Date]" + court name
- **4 KPI StatCards**: Today's Bookings, Today's Revenue (NPR), Weekly Occupancy %, Active Courts
- **Upcoming Today** section: next 3 bookings as compact rows (time, player name, duration, status)
- Quick action buttons: Add Slot, View All Bookings

### Bookings (`(owner)/bookings.tsx`)
- Filter tabs: All / Pending / Confirmed / Cancelled
- `BookingRow` list: player name, court, date/time, duration, amount, status badge
- Each row has **Confirm** and **Cancel** mock action buttons (updates local state only)

### Courts (`(owner)/courts.tsx`)
- Court details card: name, location, image, amenities
- **Availability toggle** per day of week (Mon–Sun) — mock toggle, local state
- Price editor: tap to edit hourly rate (mock, local state)
- Court status toggle: Open / Closed

### Analytics (`(owner)/analytics.tsx`)
- Date range selector: This Week / This Month
- **Weekly Revenue** bar chart (Victory Native) — 7 bars, NPR values
- **Occupancy Rate** donut chart — percentage filled
- **Top Booking Hours** horizontal bar list (6pm, 7pm, 8pm...)
- Summary row: total revenue, avg per day, peak day

---

## Mock Data

All data is Kathmandu-specific:

```ts
// Prices in NPR, locations in KTM
courts: [
  { id: '1', name: 'Kicks Arena', location: 'Thamel', pricePerHour: 1200, ... },
  { id: '2', name: 'Goal Zone', location: 'Lalitpur', pricePerHour: 900, ... },
  { id: '3', name: 'Baneshwor Futsal', location: 'Baneshwor', pricePerHour: 800, ... },
  { id: '4', name: 'Bhaktapur Pitch', location: 'Bhaktapur', pricePerHour: 750, ... },
  { id: '5', name: 'ProTurf KTM', location: 'Koteshwor', pricePerHour: 1500, ... },
]
```

Player mock user, 3–4 mock bookings (upcoming + past), owner mock stats (revenue, occupancy).

---

## Navigation

Each route group has its own `_layout.tsx` with a bottom tab navigator using Expo Router's `<Tabs>` component. Tab icons from Lucide React Native.

**Player tabs:** Home, Search, Bookings, Profile  
**Owner tabs:** Dashboard, Bookings, Courts, Analytics

A "Switch Mode" link in each layout returns to `app/index.tsx`.

---

## Animations

- `react-native-reanimated` for card entrance animations (fade + slide up)
- `BookingSheet` uses a reanimated bottom sheet (slide up on open)
- Tab transitions: default Expo Router transitions

---

## Out of Scope (This Phase)

- Authentication / login
- Real API calls (backend)
- Push notifications
- Payment integration
- Map view
- Image upload for courts
