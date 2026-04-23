# Notes, 04 Tailwind Showcase

## Tailwind setup

### The three @tailwind directives
`@tailwind base; @tailwind components; @tailwind utilities;` in
src/index.css. Base is a reset and sensible defaults, utilities are
the one-class-does-one-thing classes I use everywhere, components
is for my own reusable class sets (didn't use it here).

### content paths in tailwind.config.js
`content: ["./index.html", "./src/**/*.{js,jsx}"]`. Tailwind scans
those files, figures out which utility classes I actually used, and
only ships those to the bundle. If my paths are wrong, classes
silently don't apply.

### postcss.config.js
Tailwind runs as a PostCSS plugin, alongside autoprefixer. Vite
picks up postcss.config.js automatically, so I didn't touch
vite.config.js for any of this.

## Utility-first styling

### Classes instead of CSS files
Every visual choice is a class in the markup. No .button class
with 20 properties in a .css file. At first it looks ugly, but
after a few components it's faster because I'm not context-switching
between JSX and CSS.

### Class ordering
Tailwind's own convention is loose, but the general pattern that
sticks is: layout → spacing → sizing → colors → typography →
states. Makes long class strings a bit easier to scan.

### Extracting repeated class strings
For the three input states I pulled the shared classes into a
const `inputBase` and template-string'd the state-specific classes
after it. Cleaner than copy-pasting the base into three places.

## Responsive design

### Mobile-first prefixes
No prefix means "all screens." `md:` means "at medium screens and
up." So `hidden md:flex` reads as "hidden by default, flex at md
and up." Default styles are the mobile version, breakpoints add on
top.

### Responsive grid in one class string
`grid gap-4 sm:grid-cols-2 lg:grid-cols-3` gives me a one-column
layout on mobile, two columns at small, three at large. No media
query written by me.

### The nav switch
Three pieces working together: `hidden md:flex` hides the
horizontal link list on mobile and shows it on desktop. `md:hidden`
hides the hamburger button on desktop. The mobile dropdown is
inside an `{open && ...}` conditional so it doesn't render at all
when closed.

## State classes

### hover: and focus-visible:
`hover:bg-blue-700` applies the background on hover only.
`focus-visible:` applies only when the browser decides the focus
ring is warranted (keyboard nav, not mouse clicks). Used both on
every button.

### aria-invalid and aria-describedby
On the error input I set aria-invalid="true" and pointed
aria-describedby at the message element. Screen readers announce
the error when the input gets focus. The visual error styling is
still driven by Tailwind classes, but the accessibility info is
real.

### Focus rings with ring utilities
`focus:ring-2 focus:ring-blue-200` draws a soft outline around the
input on focus. Pairs with `focus:border-blue-500` for a stronger
border color. Two layers of visual feedback that both fire together.

## Component pattern

### useState for the mobile menu toggle
Same pattern as 03's timer: `const [open, setOpen] = useState(false)`.
The hamburger button calls `setOpen(prev => !prev)` to flip it.
Used the functional setter even though a boolean flip doesn't
strictly need it, consistency helps.

### Conditional rendering vs. conditional classes
The mobile menu uses `{open && <nav>...</nav>}` because I don't
want the element in the DOM at all when closed. For the hamburger
icon I used a ternary inside the SVG to swap lines between "menu"
and "close." Two different tools for two different situations.

## What could be better

- The class strings are getting long. For a real project I'd pull
  each button variant into a function with props and use something
  like `clsx` or `cva` to compose classes conditionally.
- No dark mode. Tailwind's `dark:` prefix would make it a
  five-minute add, but I wanted to keep the showcase small.
- The form inputs are display-only. Real validation would need
  useState per field, a submit handler, and probably a library
  like Zod for the actual checks.
- No custom theme tokens. I used Tailwind's defaults throughout.
  Real projects usually extend the theme in tailwind.config.js
  with brand colors and custom spacing.

## For later

- `clsx` or `cva` for conditional class composition
- Tailwind plugins (forms, typography) that ship sensible defaults
  for common elements
- Dark mode with the `dark:` prefix and a toggle
- Extracting reusable variants into small components instead of
  raw tag + classes in the app file
