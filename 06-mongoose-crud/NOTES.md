# Notes, 06 Mongoose CRUD

## Mongoose schema (models/Book.js)

### Defining shape upfront
With Mongoose I declare the schema in code: title is a string,
required, trimmed, max 200 chars. Then Mongoose enforces that
shape when I save or update. The plain Mongo driver doesn't care
what you write to a document; the schema layer is what stops me
from putting a number where a string should go.

### Validator with a custom message
The `[true, "title is required"]` tuple form lets me set both the
constraint and the message in one go. Without the message,
Mongoose's default ("Path `title` is required.") shows up in
errors and ends up in the API response. The custom message reads
cleaner.

### timestamps: true
Gives me createdAt and updatedAt automatically. Cleaner than the
manual `new Date().toISOString()` I had in 05. Also kept
`versionKey: false` to drop the `__v` field, which is a Mongoose
internal that consumers don't need to see.

### bookSchema.index({ title: 1 })
Tells Mongo to keep a sorted index on title. Pays off when I
query with `.sort({ title: 1 })` since it can read the index
directly instead of sorting in memory. Real apps would have more
of these based on how the data is queried.

## Connection lifecycle (config/db.js)

### Why a separate module
The connection logic belongs apart from the Express app. server.js
imports both, calls connectDB before app.listen, and the app
itself never knows about Mongoose. Easier to test and easier to
swap the connection pieces out later.

### Connection events
`mongoose.connection.on("error")` and `on("disconnected")` give me
visibility when something goes wrong with the database after the
initial connection succeeded. Without them, an unstable connection
shows up as confusing query failures.

### Fallback URI
`process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/06-books"`
means the demo runs without any setup if Mongo is on the standard
port. .env is documented but optional.

## Async service (services/bookService.js)

### Same names as 05, now returning promises
getAll, getById, create, update, remove. The interface is
identical, the bodies are async. This is the swap point we set up
in 05's layered architecture, and it actually paid off here.

### findByIdAndUpdate options
`{ new: true, runValidators: true }`. Without `new: true` Mongoose
returns the document *before* the update, which is rarely what I
want. Without `runValidators: true` the schema rules don't run on
updates, only on saves, which would let me PATCH past the year
limits.

### Boolean(deleted) for the remove return
findByIdAndDelete returns the deleted document, or null if nothing
matched. The controller wants a yes/no for the 404 vs 204
decision, so I cast to boolean here and let the controller stay
ignorant of the document.

## Async controller and error mapping

### try/catch + next(err)
Each handler wraps its await calls in try/catch and forwards any
error to next. Express picks that up and runs the error
middleware. Without the wrap, an awaited promise rejection becomes
an unhandled rejection and the request hangs forever.

### Mapping Mongoose errors to status codes
The error middleware checks err.name. CastError means I sent an
invalid ObjectId in the URL, which is a 400 not a 500. Validation
errors come back as ValidationError with a `.errors` map of field
names to messages, which I unpack into the response body so the
client can show field-specific errors.

### 404 stays in the controller
When a service returns null because the id didn't match anything,
the controller sends 404 directly. That's distinct from a
CastError, which says the id was malformed in the first place. Two
different problems, two different responses.

## What could be better

- No tests. The natural fit here is supertest plus
  mongodb-memory-server, which spins up a real Mongo in memory for
  each test run.
- The connection has no retry. If Mongo is briefly unavailable at
  boot, the server crashes. Capstone v6 adds retry handling.
- I'm validating the document via Mongoose, but not validating the
  shape of the request body before it gets there. A bad payload
  still hits the database before being rejected. Zod or a similar
  library at the controller boundary would catch it earlier.
- No pagination. GET /books returns everything. Fine for a demo,
  not fine if there were ten thousand books.

## For later

- Aggregation pipelines for things that don't fit a single
  collection (joins via $lookup, grouped stats)
- Transactions for operations that touch multiple documents
- Mongoose plugins for repeated schema patterns (soft delete,
  audit trail)
- supertest with mongodb-memory-server for integration tests
- Connection retry with backoff
