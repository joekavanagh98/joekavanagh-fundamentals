# 04 — Tailwind Showcase

A single-page component library demonstrating Tailwind utility
classes. Each section is a small, self-contained component pattern
I'd reach for in a real app.

## What it demonstrates

- Four button variants (primary, secondary, outline, ghost)
- Three card layouts (basic, media, stats)
- Form inputs with default, error, and success states
- Responsive navigation that collapses to a mobile menu
- Responsive layout using Tailwind's `sm:` / `md:` / `lg:` prefixes
- Hover and focus-visible states throughout

## Files

- `index.html` — Vite entry
- `tailwind.config.js` — content paths and theme extensions
- `postcss.config.js` — Tailwind + autoprefixer pipeline
- `src/main.jsx` — React root
- `src/App.jsx` — lays out each showcase section
- `src/components/` — per-section components
- `src/index.css` — `@tailwind` directives

## How to run

```
npm install
npm run dev
```

Vite prints a local URL (usually `http://localhost:5173`).

## Notes

See `NOTES.md` for learning notes on Tailwind patterns and gotchas.
