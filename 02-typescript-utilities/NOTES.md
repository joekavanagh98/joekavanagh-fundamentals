# 02-typescript-utilities Notes

## TypeScript

### Union types as a return shape
`type CreditScoreCategory = "subprime" | "near-prime" | "prime" | "super-prime"`.
Once the function says it returns that type, I can only return one
of those four strings. Anything else is a compile error. On the
caller side, comparing the result to one of those strings gives
autocomplete.

### Writing return types out on exported functions
TypeScript can infer them, but I wrote them anyway on the exports.
It makes the public shape of the module obvious at a glance, and if
I later change the function in a way that returns something
different, the error shows up right there instead of at some
downstream caller.

### Re-exporting a type from index.ts
Had to write `export { type CreditScoreCategory }` with the word
`type` inline. Without it, the compiled JavaScript tries to import
a name that only exists in TypeScript, which fails at runtime. The
inline `type` tells the compiler to drop the import from the output.

### Number.isFinite instead of isNaN
`isNaN("hello")` returns true because it converts the string to NaN
first and then checks. Almost never what I want. `Number.isFinite`
doesn't convert, and it returns false for NaN, Infinity, and
-Infinity. One check covers all three values I want to reject.

### RangeError when a value is out of range
When the input was a number but the number itself was wrong, I
throw RangeError instead of plain Error. Communicates the nature of
the problem without reading the message.

## tsconfig

### strict: true
Turns on the whole set of strict checks as a bundle. The big ones:
no implicit `any`, null and undefined must be handled, function
parameter types are checked strictly. It's the setting I'd turn on
for any new project.

### noUncheckedIndexedAccess
When I write `arr[0]`, the result is typed as "the item or
undefined" instead of just "the item." Stops me from assuming an
index exists when TypeScript can't prove it. Didn't hit me in this
folder because I don't index into arrays, but I'd always want it on.

### noImplicitReturns
If any branch of a function returns a value, every branch has to
explicitly return. Catches the "forgot to return in the else case"
mistake. It's about whether a return happens on each path, not
about what gets returned.

### moduleResolution: "bundler" with type: "module"
This combination lets me write imports like `from "./file.js"` in my
.ts files, even though the .ts file has no .js on disk. TypeScript
resolves it to the source file at compile time, and the emitted
code points to the compiled .js. Without this combo, the import
specifier rules get stricter.

### declaration: true
Outputs .d.ts files next to the compiled .js. Those are the type
signatures a consumer would see if this were a published package.
Useful for checking that the types I meant to expose are actually
the ones getting exposed.

## Per utility

### `formatCurrency`
One Intl.NumberFormat instance at the top of the file, reused on
every call. Building one is slow compared to using one. The
function throws when the input is NaN or Infinity, because Intl
would otherwise return the string "$NaN" and the bug would be
invisible until a user saw it on screen.

### `validateEmail`
Regex is `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`. Reads as "some characters
that aren't space or @, an @, some more, a dot, some more." Rejects
obvious junk like `foo@bar` (no dot) or `foo@.com` (no text between
the @ and the dot) without trying to follow the full email spec,
which is huge and rejects addresses people actually use. Trimming
first handles pasted addresses with trailing whitespace.

### `creditScoreCategory`
The union-typed return is the whole point of the utility. Check
order matters and took some thought:

1. NaN/Infinity check first. If I skipped this, `Math.floor(NaN)`
   is still NaN, and every comparison against NaN returns false, so
   the function would fall through to the default branch and
   confidently return "super-prime" for bad input.
2. Math.floor second, so a score like 579.9 becomes 579.
3. Range check last, on the floored value. This is the lenient
   choice: 900.4 gets floored to 900 and accepted. The strict
   alternative would be range-check first and reject 900.4
   outright. I went lenient.

Range is 300-900 to cover FICO Auto and Bankcard industry scores
on top of the base 300-850 scale.

## What could be better

- `formatCurrency` is USD-only. Adding locale and currency code
  parameters with defaults would make it actually reusable. Would
  also want to cache a formatter per combination rather than
  building a new one every call.
- `creditScoreCategory` has hardcoded cutoffs. A caller using a
  different scoring model would want to pass in their own. An
  options object with sensible defaults would solve it.
- `validateEmail` doesn't catch typos like "gmial.com" or
  disposable-email services. That needs a domain list or a DNS
  lookup, which is outside what a regex can do.
- No tests. Types catch a lot, but they don't catch me writing `<`
  where I meant `<=`. A small assertions file would be cheap
  insurance for the boundary values.
