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

## For later
- fieldset/legend for grouping related inputs
- inputmode="decimal" for mobile keyboards
- aria-live on the output so screen readers announce results
