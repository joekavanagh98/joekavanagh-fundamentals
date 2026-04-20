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

## JavaScript (app.js)

### Intl.NumberFormat for currency

Browser built-in. I create one formatter at the top of the file and
reuse it. currency.format(1234.5) gives "$1,234.50". Locale and
currency are config, so no manual string building.

### Pure math functions separate from DOM

compoundInterest and loanPayment take a plain object, return a
number, no DOM access. Easier to reason about and trivial to test.

### Rate comes in as 5, formula wants 0.05

Divide by 100 inside the math function. Lets the UI show a normal
percent.

### 0% interest edge case

Loan formula divides by (1 - (1+r)^-n). At r=0 that's 0, so I guard
with a direct principal/totalPayments return.

### FormData + Object.fromEntries

new FormData(form) walks every named input. Object.fromEntries turns
it into a plain object in one line. Works with inputs and selects.

### form.elements[name] to find fields

When restoring values I don't need separate getElementById calls.
form.elements is indexable by the field's name attribute.

### preventDefault on submit

Without it the browser submits the form and reloads the page,
wiping state.

### localStorage stores strings only

JSON.stringify going in, JSON.parse coming out. I wrapped the parse
in try/catch so a corrupt value can't break page load, just clears
the bad entry.

### 'input' event bubbles up to the form

Attaching one 'input' listener on the form catches every field
change underneath it, no need for per-field listeners.

### 'reset' event for cleanup

The reset button fires a 'reset' event I can listen for. Used it to
clear the output text and remove the localStorage entry.

### output.textContent, not .value

<output> does have a .value, but setting .textContent is consistent
with how I'd write text into any other element.

## What could be better

- The compound result only shows the final total. Most people actually
  want to see how much interest they earned too, so showing both
  numbers would be more useful.
- The loan result only shows the monthly payment. It would be nicer to
  also show the total paid over the life of the loan and how much of
  that is interest.
- If someone types nonsense into a field, parseFloat gives back NaN
  and the result just says "$NaN". I should catch that and show a
  friendly message instead.
- Nothing stops someone entering a 500% interest rate or 200 years.
  The math still runs but the answer is meaningless. Sensible max
  values would help.
- localStorage can throw if it's disabled (private browsing in some
  browsers). I didn't wrap the calls in try/catch, so that would
  break the page. **Fixed.**

## For later

- fieldset/legend for grouping related inputs
- inputmode="decimal" for mobile keyboards
- aria-live on the output so screen readers announce results
