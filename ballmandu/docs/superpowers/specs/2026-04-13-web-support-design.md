# Ballmandu Web Support — Design Spec

**Date:** 2026-04-13
**Status:** Approved

---

## Goal

Enable the existing Ballmandu Expo app to run in a desktop browser at `localhost` via `expo start --web`, alongside the existing Android/iOS mobile app. No separate codebase. No separate website.

---

## Approach

Use Expo's built-in Metro web bundler (default in SDK 54). The same React Native screens render in the browser using `react-native-web` under the hood. All existing screens, NativeWind styles, fonts, and Supabase auth work without modification.

---

## Changes Required

### 1. `app.json` — Enable Metro web bundler

The `web` block already exists in `app.json` with just a favicon. Extend it to explicitly set the Metro bundler and output mode:

```json
"web": {
  "bundler": "metro",
  "output": "single",
  "favicon": "./assets/favicon.png"
}
```

### 2. `metro.config.js` — SVG transformer web compatibility

The current SVG transformer config removes `svg` from `assetExts` and adds it to `sourceExts`. This works for native but Metro web needs the same treatment confirmed. No additional change expected — the existing config handles both platforms.

### 3. `react-native-url-polyfill` — Already handled

Already imported at the top of `lib/supabase.ts` (`import 'react-native-url-polyfill/auto'`). No action needed.

### 4. `Platform.OS` guards — Audit

Screens using `Platform.OS === 'ios'` for `KeyboardAvoidingView` behavior already have an `'android'` fallback using `'height'` — web will use the `'height'` path, which is acceptable.

### 5. `AsyncStorage` on web

`@react-native-async-storage/async-storage` falls back to `localStorage` on web automatically. Supabase session persistence works on web with no changes.

### 6. `react-native-chart-kit` on web

Uses `react-native-svg` under the hood, which has full web support via `react-native-svg`'s web implementation. No changes needed.

### 7. `react-native-reanimated` on web

Reanimated 4 (used in this project) supports web via its own web implementation. No changes needed.

---

## What Does NOT Change

- All screen files (`app/`, `components/`)
- NativeWind styles and Tailwind config
- Font loading (`useFonts`)
- Supabase client (`lib/supabase.ts`)
- Mock data (`data/mockData.ts`)
- Mobile app behavior

---

## Running on Web

```bash
# Start web (Metro dev server)
npx expo start --web

# Or from the Expo dev menu, press 'w'
```

Opens at `http://localhost:8081` in the default browser.

---

## Out of Scope

- Responsive/desktop layout (wider screens will show the mobile layout centered)
- PWA configuration
- Web-specific navigation patterns
- SEO / server-side rendering
