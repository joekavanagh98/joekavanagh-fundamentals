# 01 — JavaScript Calculator

Vanilla JavaScript demo: a compound interest and loan payment
calculator that saves the most recent inputs to `localStorage` so they
survive a page refresh.

## What it demonstrates

- DOM selection and event handling without a framework
- Form input parsing and numeric validation
- Two finance formulas implemented in plain JS:
  - Compound interest: `A = P(1 + r/n)^(nt)`
  - Fixed-rate loan payment: `M = P·(r/n) / (1 − (1 + r/n)^(−nt))`
- Persisting state across reloads with `localStorage`
- Formatting currency output with `Intl.NumberFormat`

## Files

- `index.html` — markup and form structure
- `style.css` — layout and styling
- `app.js` — calculator logic, event listeners, and storage

## How to run

Open `index.html` directly in a browser. No build step, no server,
no dependencies.

## Notes

See `NOTES.md` (if present) for learning notes and gotchas hit
while building this.
