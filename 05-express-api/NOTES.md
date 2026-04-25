# Notes, 05 Express API

## Express setup (server.js, src/app.js)

### Splitting server.js from app.js
server.js only does two things: read the port and start listening.
src/app.js builds the Express app and exports it. The point of the
split is that I can import the app in a test file later and hit it
with something like supertest without binding a real port.

### type: "module" and .js on imports
package.json has `"type": "module"`, so my files are ES modules. The
quirk is that imports between my own files have to spell out the
.js extension, even though the source files don't end in .js for
TypeScript projects. Plain JS in this folder still has .js, but
the rule is the same.

## Layered architecture (routes, controllers, services)

### Why three folders for what feels like one job
Each layer answers a different question. The route file answers
"what URL goes where." The controller answers "how do I translate
the HTTP request into a function call and back." The service
answers "what's the business rule and where's the data." Keeping
them apart means each one is small and testable on its own.

### Why this pays off in 06
06 swaps in-memory storage for MongoDB. With this layout, the
swap is one file: services/bookService.js. The controller still
calls the same function names with the same shapes, the routes
don't move, the response codes don't change. That's the whole
reason for the layering.

### Express Router for mounting
Router() gives me a mini-app I can attach paths to with
.get/.post/etc, then app.use("/books", router) mounts everything
at /books. The route file doesn't know what URL prefix it'll be
attached at, which makes it portable.

## Storage (services/bookService.js)

### Map instead of a plain object
Map has a real .delete(), .has(), and .size, plus it doesn't share
keys with Object.prototype quirks. For a keyed store this is the
better default.

### crypto.randomUUID for ids
Built into Node since 14.17, no extra dependency. Returns a v4 UUID
string. Good enough for any use that doesn't need cryptographic
guarantees about order.

### Update patches preserve the id
`{ ...existing, ...patch, id: existing.id }`. The trailing
`id: existing.id` means even if a malicious or sloppy client
includes an id in the patch body, it gets overwritten with the
real one. Same trick for createdAt if I added it later.

## Controllers and HTTP

### Status codes I used
200 for any successful read or update with a body. 201 for a new
resource just created. 204 for a successful delete (no body).
400 for a validation failure on POST. 404 for a missing resource
by id. 500 for anything unexpected, set by the error handler.

### req.body ?? {}
The nullish coalescing means if the request had no body at all,
I get an empty object instead of crashing on destructuring. Came
up in createBook and updateBook.

### res.status(204).end()
For 204 No Content I use .end() instead of .json() because there
is no body. Sending JSON would technically work but contradict
the status code's contract.

## Error handling and 404s

### The 404 middleware
After all the route definitions, I added a middleware that runs
when no earlier route matched. It reads req.method and
req.originalUrl to give a clear "Cannot GET /unknown" message.

### The error handler is the four-argument middleware
Express identifies error handlers by their function arity. The
signature `(err, req, res, next)` is how it knows to call this
one when a route or middleware throws. It goes last in the chain.

### Catching JSON parse errors
When express.json() hits malformed JSON, it forwards an error with
`err.type === "entity.parse.failed"`. I check for that specifically
and return 400 instead of letting it become a generic 500. Without
this, every malformed POST is a confusing internal-error response.

## What could be better

- No automated tests. Even one supertest file hitting each
  endpoint would be a strong signal.
- Validation is hand-rolled in the controller. Zod would let me
  declare a schema once and get parsed-and-typed input back. The
  capstone v5 backend uses this pattern.
- Storage doesn't survive a restart. Fine for this demo since the
  point is the structure, but the seed data is the only thing
  you'll see after a fresh boot.
- The error handler logs with console.error. A real logger like
  pino would give structured output, levels, and request IDs.

## For later

- supertest + node:test for integration tests against the app
- Zod (or another runtime validator) for request shapes
- An asyncHandler utility for clean async/await in controllers
  once the service goes async (which it will in 06)
- Helmet, CORS, and rate limiting middleware for anything
  customer-facing
- Environment variable loading via dotenv and a small validator
  so missing PORT/etc fails loudly at boot
