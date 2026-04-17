# Implementation Plan: Ballmandu Futsal Booking App

This plan outlines the end-to-end development of **Ballmandu**, a high-end mobile-first futsal booking application inspired by `merofutsal.com`. The application will feature a premium "Kinetic Vault" design system with dark/light mode support.

## User Review Required

> [!IMPORTANT]
> **Agent Orchestration**: This plan is designed to be executed by three specialized Claude agents (Frontend, Backend, Checking). Please ensure you have the `claude` CLI or similar environment ready to spawn these agents.
> **Mobile Interface**: We will use a standard web-to-mobile workflow (Vite + Capacitor or simply browser-in-emulator) to view the interface in Android Studio.

---

## Proposed Changes

### 1. Project Initialization [Global]
- Setup the core project structure: `frontend/`, `backend/`, and `checking/`.
- [NEW] `index.html`, `package.json`, `tailwind.config.js`.

### 2. Backend Layer (Supabase)
The **Backend Agent** will handle:
- **Database Schema**:
  - `grounds`: `id`, `name`, `location`, `price_per_hour`, `image_url`, `amenities`.
  - `slots`: `id`, `ground_id`, `start_time`, `end_time`, `is_booked`.
  - `bookings`: `id`, `user_id`, `slot_id`, `status`.
- **Authentication**: Supabase Auth (Email/Google).
- **Storage**: Supabase Storage for ground images.
- **RLS Policies**: Ensure users can only book available slots and see their own bookings.

### 3. Frontend Layer (React + Vite + Tailwind)
The **Frontend Agent** will handle:
- **Design System**: Implementation of "Ballmandu Kinetic" (Space Grotesk, Manrope, Glassmorphism).
- **Theme Engine**: Dark/Light mode toggle using Tailwind's `dark` class.
- **Screens**:
  - **Home**: Search, filters, ground listings.
  - **Ground Details**: Dynamic pricing, availability calendar.
  - **Booking Flow**: Multi-step checkout.
  - **User Dashboard**: Profile and history.
- **Animations**: Framer Motion for premium transitions.

### 4. Checking & QA Layer
The **Checking Agent** will handle:
- **Integration Tests**: Verify booking flow from end-to-end.
- **Mobile Validation**: Checking responsiveness in the Android Studio emulator.
- **Theme Persistence**: Verify that the dark/light preference is saved.

---

## Agent-Specific Commands

### 🟢 Frontend Agent Prompt
> "Build the Ballmandu UI using React, Vite, and Tailwind. Implement the 'The Kinetic Vault' design system: Dark/Light toggle, Space Grotesk/Manrope fonts, High-contrast neon #D1FF26 accents, and Glassmorphic navigation. Use Framer Motion for 'editorial kinetic' animations. Focus on 'ballmandu/frontend'."

### 🔵 Backend Agent Prompt
> "Setup the Supabase backend for Ballmandu in 'ballmandu/backend'. Create migrations for grounds, slots (hourly), and bookings. Implement RLS policies so users can only access their own data. Setup bucket storage for futsal pitch photos. Generate TypeScript types."

### 🔴 Checking Agent Prompt
> "Verify the Ballmandu implementation in 'ballmandu/checking'. Test the booking flow end-to-end. Validate the mobile interface for responsiveness. Ensure the Dark/Light mode toggle works correctly across all screens. Use the Android Studio emulator for mobile check."

---

## Mobile Testing Strategy (Android Studio)
1. **Host Connection**: Find your local IP (e.g., `192.168.x.x`).
2. **Dev Server**: Run `npm run dev -- --host` in the frontend directory.
3. **Emulator**: Open Android Studio -> Device Manager -> Start Emulator.
4. **Browser**: Open Chrome in the emulator and navigate to `http://<your-local-ip>:5173`.
5. **Review**: Ensure layout scales correctly and touch targets are mobile-friendly.

---

## Verification Plan

### Automated Tests
- `npm run test`: Run Vitest for units/hooks.
- `PLAYWRIGHT_BASE_URL=... npx playwright test`: End-to-end booking flow test.

### Manual Verification
- Toggle Dark/Light mode and screenshot both states.
- Perform a full booking on the Android Studio emulator and verify the record in Supabase.
