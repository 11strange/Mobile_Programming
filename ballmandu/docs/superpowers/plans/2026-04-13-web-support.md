# Web Support Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enable the Ballmandu Expo app to run in a browser at `localhost` via `expo start --web`, alongside the existing Android/iOS mobile app.

**Architecture:** Expo SDK 54 uses Metro as the web bundler by default. The same React Native codebase renders in the browser via `react-native-web`. The primary change is adding `bundler: metro` and `output: single` to the `web` block in `app.json`. A few compatibility issues with `react-native-worklets` on web require a Metro resolver alias.

**Tech Stack:** Expo SDK 54 · Metro web bundler · react-native-web · react-native-svg-transformer v1.5.3 · NativeWind v4

---

## File Map

| File | Change |
|------|--------|
| `app.json` | Add `bundler` and `output` to existing `web` block |
| `metro.config.js` | Add web alias for `react-native-worklets` if it has no web entry |

---

### Task 1: Update `app.json` web block

**Files:**
- Modify: `app.json`

- [ ] **Step 1: Update the `web` block**

Open `app.json`. The existing `web` block is:

```json
"web": {
  "favicon": "./assets/favicon.png"
}
```

Replace it with:

```json
"web": {
  "bundler": "metro",
  "output": "single",
  "favicon": "./assets/favicon.png"
}
```

- [ ] **Step 2: Verify JSON is valid**

Run:
```bash
node -e "require('./app.json'); console.log('valid')"
```
Expected output: `valid`

- [ ] **Step 3: Commit**

```bash
git add app.json
git commit -m "feat: enable Metro web bundler in app.json"
```

---

### Task 2: Fix `react-native-worklets` web compatibility

`react-native-worklets` has no `"browser"` field in its package.json. Metro web will try to resolve it using the native entry, which may fail in a browser environment. We add a resolver alias that points Metro's web platform to the module entry.

**Files:**
- Modify: `metro.config.js`

- [ ] **Step 1: Update `metro.config.js` to add a web-safe alias**

Replace the entire contents of `metro.config.js` with:

```js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const config = getDefaultConfig(__dirname);

const { transformer, resolver } = config;

// SVG transformer — handles both native and web (v1.5.3+)
config.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer"),
};
config.resolver = {
  ...resolver,
  assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
  sourceExts: [...resolver.sourceExts, "svg"],
  // Point web platform to the module build of react-native-worklets
  // to avoid resolving native-only entry points in the browser
  extraNodeModules: {
    ...resolver.extraNodeModules,
  },
  resolveRequest: (context, moduleName, platform) => {
    if (
      platform === "web" &&
      moduleName === "react-native-worklets"
    ) {
      return {
        filePath: path.resolve(
          __dirname,
          "node_modules/react-native-worklets/lib/module/index.js"
        ),
        type: "sourceFile",
      };
    }
    return context.resolveRequest(context, moduleName, platform);
  },
};

module.exports = withNativeWind(config, { input: "./global.css" });
```

- [ ] **Step 2: Verify the module entry exists**

Run:
```bash
ls node_modules/react-native-worklets/lib/module/index.js
```
Expected: the file path is printed (no error).

If the file does not exist, run:
```bash
ls node_modules/react-native-worklets/lib/module/
```
and use the correct entry filename in the `filePath` above.

- [ ] **Step 3: Commit**

```bash
git add metro.config.js
git commit -m "fix: add web resolver alias for react-native-worklets"
```

---

### Task 3: Run on web and verify

**Files:** None modified — this is a verification task.

- [ ] **Step 1: Start the web dev server**

```bash
npx expo start --web --clear
```

The browser should open automatically at `http://localhost:8081`. If not, open it manually.

- [ ] **Step 2: Verify the splash screen plays**

You should see the animated ball drop and logo fade-in on the dark `#0e0e0e` background.

- [ ] **Step 3: Verify the mode selector screen**

After the splash, the mode selector should show the `logo-dark.svg` logo and two cards: "I'm a Player" and "I'm a Court Owner", plus "Log In" / "Sign Up" buttons at the bottom.

- [ ] **Step 4: Verify player flow**

Tap "I'm a Player". Confirm the bottom tab bar renders (Home, Search, Bookings, Profile) and court cards load from mock data.

- [ ] **Step 5: Verify owner flow**

Go back (browser back button or switch mode) and tap "I'm a Court Owner". Confirm the Dashboard, Bookings, Courts, and Analytics tabs all render.

- [ ] **Step 6: Verify auth screens**

Tap "Log In" from the mode selector. Confirm the login screen renders with phone input and Google button. Tap "Create an account" to verify the register screen renders.

- [ ] **Step 7: Fix any console errors**

Open browser DevTools (F12 → Console). If any module resolution errors appear, address them:

- **`Cannot find module 'X'`** — add another `resolveRequest` branch in `metro.config.js` for the failing module, pointing to its `lib/module/index.js` entry (same pattern as the worklets alias in Task 2)
- **`Element type is invalid`** — a component is exporting incorrectly for web; check if it uses `Platform.select` and add a `web` case returning the same as `default`
- **SVG rendering issues** — verify `react-native-svg` is resolving via its web build by checking `node_modules/react-native-svg/src/index.tsx` exports

- [ ] **Step 8: Commit if any fixes were needed**

```bash
git add -p
git commit -m "fix: web compatibility patches"
```

---

### Task 4: Update CLAUDE.md

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Add web command and note**

In the `## Commands` section of `CLAUDE.md`, add:

```bash
# Start web dev server
npx expo start --web --clear
# Opens at http://localhost:8081
```

In the `## Current Status` table under Phase 2, add a row:

```
| Web support | `app.json` + Metro config — app runs at localhost:8081 | ✅ |
```

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md with web support status and command"
```
