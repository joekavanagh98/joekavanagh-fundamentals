# Notes, 01 JavaScript Calculator

## HTML (index.html)

### defer
Script in the head with defer runs after the DOM is parsed. Saves me
from putting the script tag at the bottom of body.

### ids have to be unique across the whole page
Two "Annual Rate" inputs, one per form. Both can share name="rate"
(name is scoped to the form), but ids must differ, so I used
compound-rate and loan-rate. Duplicate ids mean getElementById
silently returns the first match, no warning.

### output element
Forgot this existed. Semantic tag for a calculation result, use it
instead of a div.

### button type default
Buttons inside a form default to type="submit". Being explicit on
every button stops the accidental-submit bug.

### Input attrs worth remembering
step="0.01" on money, step="1" on integer fields. min="0" blocks
negatives. required gets me free client-side validation.

## CSS (style.css)

### CSS variables on :root
All colors and spacing declared once at :root, used with var(--name)
elsewhere. One place to change a value, no magic numbers scattered
around.

### Responsive columns without a media query
grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)) gives me
as many columns as fit at 320px minimum each. Stacks on narrow
screens, side-by-side on wide ones.

### output:empty to hide the result box
output:empty { display: none } hides the result until JS writes into
it. No JS toggling needed.

### tabular-nums
font-variant-numeric: tabular-nums gives every digit the same width
so updating values don't jitter sideways.

### focus-visible
:focus-visible only shows the outline for keyboard nav, not mouse
clicks. Skips the "ugly outline after I click a button" thing.

### Styling buttons by their type attribute
button[type="submit"] and button[type="reset"] instead of class
hooks. The HTML already declares intent.

### Hiding number input spinners
Needs two rules. Chrome/Safari use ::-webkit-inner-spin-button and
::-webkit-outer-spin-button with appearance: none. Firefox uses
-moz-appearance: textfield on the input.

## For later
- fieldset/legend for grouping related inputs
- inputmode="decimal" for mobile keyboards
- aria-live on the output so screen readers announce results
