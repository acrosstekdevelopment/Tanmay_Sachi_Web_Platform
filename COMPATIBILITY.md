# Compatibility

Agreement clause 3.1: responsive from **360px**, **Android 7+**, **iOS 14+**, and the current and
previous versions of major desktop browsers.

## Targets

`apps/web/package.json` → `browserslist`:

```
Android >= 7, iOS >= 14, Chrome >= 64, Safari >= 14, Firefox >= 78, Edge >= 79,
last 2 versions, > 0.5%, not dead
```

SWC (Next.js) and Autoprefixer read this list. The build console suggested `Chrome >= 60`; the floor
is set at **Chrome 64** because that is the oldest Chromium that Next.js 15 supports. Android 7
devices with an updated Android System WebView / Chrome run far newer engines; validation task
**V2** (TDD §15.4) confirms what real Android 7 devices in the field run.

## Guards

- ESLint `no-restricted-syntax` (`apps/web/eslint.config.mjs`) blocks `structuredClone`,
  `Array/String.prototype.at`, `Object.hasOwn` and `String.prototype.replaceAll` in app code.
  Add a polyfill and record it here before lifting a rule.
- `overflow-x: clip` (with a `hidden` fallback on `<html>` for engines without `clip`) keeps
  `position: sticky` working for the headers and tab bar.
- No `:has()` or container queries are used.

## Polyfills

None so far.

## Test matrix

Playwright runs Chromium, WebKit and Firefox at 360, 375, 414 and 1280px (`npm run test:e2e`).
These approximate the floor but cannot replace real devices. **Before each delivery gate**, check on:

- a real Android 7 device (Chrome and the in-app WebView)
- a real iOS 14 device (Safari)
- current and previous Chrome, Safari, Firefox and Edge on desktop
- keyboard only, NVDA and VoiceOver, in English and Hindi
