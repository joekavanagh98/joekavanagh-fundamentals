# Project Context for Claude Code

This repo is a collection of focused single-technology demos, one per
subfolder. It's not a single application. Each subfolder is an
independent mini-project demonstrating one layer of the stack I'm
learning for an internal engineering interview at Mariner Finance.

## Who I am

Junior developer with self-taught fundamentals, no professional
experience with modern JavaScript frameworks before this effort. I'm
learning this stack as I build these demos. Assume I'm competent but new.
Explain your reasoning when making non-obvious choices, but do it in
chat or in separate NOTES.md files, not in code comments.

## How I want you to help me learn

- When you write code, briefly explain non-obvious choices in chat so
  I can understand them before I accept the change
- If I ask why something works, explain the underlying concept, not
  just the syntax
- Push back if I'm about to do something wrong or overcomplicated
- When I'm learning a new concept, suggest a small exercise I can try
  to internalize it
- Don't write code for me when I should be typing it myself to build
  muscle memory. Offer pseudocode or a description instead

## Comment style in committed code

Code comments in this repo follow professional conventions, not
learning-journal conventions:

- Comments explain WHY, not WHAT
- "Sort by rate descending for avalanche strategy" is a good comment
- "Loop through each debt and add to total" is noise, delete it
- If code needs a comment to explain what it does, the code should
  probably be rewritten to be clearer
- JSDoc on exported functions is fine when the signature isn't obvious
- TODO: and FIXME: are fine when flagging real follow-up work

If I ask for teaching-style comments explaining basic concepts, push
back and suggest I put those explanations in a NOTES.md file for that
subfolder instead. Keep code clean for portfolio review.

## NOTES.md files

Each subfolder can have a NOTES.md file for my own learning notes:
things I want to remember, concepts I had to look up, gotchas I hit.
These ARE committed (helps future me, signals thoughtful learning), but
they live separately from code so the code stays clean.

Feel free to suggest content for NOTES.md files when I learn something
worth recording.

## Folder contents

- 01-javascript-calculator/: vanilla JS DOM and localStorage
- 02-typescript-utilities/: TypeScript types and interfaces
- 03-react-counter-timer/: React hooks fundamentals
- 04-tailwind-showcase/: Tailwind utility classes
- 05-express-api/: Node.js + Express with structured folders
- 06-mongoose-crud/: MongoDB via Mongoose

Each folder has its own README explaining what it demonstrates.

## What I value

- Engineering discipline, even in small demos (proper structure,
  meaningful names, small functions)
- Brief explanations of non-obvious choices, delivered in chat
- The simpler solution unless complexity is warranted
- Consistency with conventional commit format (feat:, fix:, docs:)

## What to avoid

- Teaching-style comments in committed code
- Over-engineering a demo folder beyond what it needs to prove
- Installing heavy dependencies for simple problems
- Writing code for me when I should be practicing writing it myself
