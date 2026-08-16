import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8765,
  },
  build: {
    // Vite's default target is `baseline-widely-available`, which resolves to
    // Safari 16.0 and lets the CSS minifier rewrite `(max-width: 40rem)` into
    // media query *range* syntax, `(width <= 40rem)`. Range syntax actually
    // needs Safari 16.4, so the rewrite overshoots by a patch release: on iOS
    // 16.0-16.3 the query became unparseable and was dropped entirely, taking
    // the touch-device tab grid with it. Pinning CSS to Safari 14 keeps the
    // long-hand form.
    cssTarget: ['chrome87', 'edge88', 'firefox78', 'safari14'],
    // Pinned to match `cssTarget` so the two can't drift apart. Today's bundle
    // already parses on Safari 14 -- its newest syntax is logical assignment
    // (`??=`) and optional chaining -- so this is a guard against future drift
    // rather than a downgrade. It costs 0.6 kB, 0.1% of the bundle.
    target: ['chrome87', 'edge88', 'firefox78', 'safari14'],
  },
})
