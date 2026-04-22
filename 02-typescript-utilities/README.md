# 02-typescript-utilities

Three small utility functions written in TypeScript with strict types.
First demo in this repo to use a compiler and a config file.

## What this demonstrates

- TypeScript strict mode and how the compiler catches type errors
- Union types for finite sets of string values
- JSDoc on exported functions
- `tsconfig.json` with the strictest sensible settings

## Utilities

- `formatCurrency` - format a number as USD currency
- `validateEmail` - validate an email address string
- `creditScoreCategory` - classify a credit score into a category
  (`subprime` | `near-prime` | `prime` | `super-prime`)

## Running

```
npm install
npm run typecheck
npm run build
```

`typecheck` runs `tsc --noEmit` and reports type errors without
writing files. `build` compiles `src/` to `dist/` as ES modules with
`.d.ts` declaration files alongside.

## tsconfig settings worth noting

- `strict: true` turns on all the strict-family checks at once.
- `noUncheckedIndexedAccess: true` makes array and object index
  accesses return `T | undefined` instead of `T`. Catches a whole
  class of off-by-one and missing-key bugs.
- `noImplicitReturns: true` requires every code path in a function to
  return a value (when the return type is non-void).
- `moduleResolution: bundler` lets imports drop the `.js` extension
  even with `type: module` in `package.json`.
