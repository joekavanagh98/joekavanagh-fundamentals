# 03 — React Counter and Timer

Two small React components demonstrating the two hooks you reach
for constantly: `useState` and `useEffect`.

## What it demonstrates

- Functional components with props-free local state
- `useState` for counter value and timer state
- `useEffect` with a cleanup function (stops `setInterval` on unmount
  or when dependencies change)
- Functional state updates (`setCount((c) => c + 1)`) to avoid stale
  closures over state
- Vite + React 18 project setup with `StrictMode`

## Files

- `index.html` — Vite entry, mounts to `#root`
- `src/main.jsx` — React root using `createRoot`
- `src/App.jsx` — renders the two components
- `src/components/Counter.jsx` — increment, decrement, reset
- `src/components/Timer.jsx` — start, pause, reset, formatted `mm:ss`
- `src/styles.css` — minimal shared styles

## How to run

```
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

## Notes

See `NOTES.md` for learning notes from this demo.
