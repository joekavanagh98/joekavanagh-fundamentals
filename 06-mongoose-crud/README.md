# 06 — Mongoose CRUD

Same `/books` resource as 05, now persisted to MongoDB through
Mongoose. The shape of the project is intentionally identical
(routes → controllers → services), the only structural change is
that the service is async and backed by a Mongoose model instead
of a `Map`.

## What it demonstrates

- Mongoose schema with field validation, custom error messages,
  timestamps, and an index
- A `connectDB` / `disconnectDB` lifecycle module separated from
  the Express app
- Async controllers using `try/catch` + `next(err)` to forward
  errors to a single error handler
- Mapping Mongoose errors (`CastError`, `ValidationError`) to the
  right HTTP status codes
- Graceful shutdown on `SIGINT`/`SIGTERM` so Mongo disconnects
  cleanly

## Prerequisites

A running MongoDB instance. Two easy options:

- **Local**: `brew install mongodb-community` then `brew services start mongodb-community`
- **Docker**: `docker run -d --name mongo -p 27017:27017 mongo:7`

## Environment

Copy `.env.example` to `.env` and adjust if needed. Defaults work
for a local Mongo on the standard port.

```
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/06-books
```

If you don't create a `.env`, the code falls back to those same
defaults.

## How to run

```
npm install
npm run dev
```

Server hits `http://localhost:3000`.

## Endpoints

| Method | Path        | Success      | Errors                |
| ------ | ----------- | ------------ | --------------------- |
| GET    | /books      | 200 + array  | —                     |
| GET    | /books/:id  | 200 + book   | 400 (bad id), 404     |
| POST   | /books      | 201 + book   | 400 (validation)      |
| PATCH  | /books/:id  | 200 + book   | 400 (bad id/validation), 404 |
| DELETE | /books/:id  | 204          | 400 (bad id), 404     |

## Sample curl commands

```sh
# List all books (sorted by title)
curl http://localhost:3000/books

# Create a book
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{"title":"Refactoring","author":"Martin Fowler","year":1999}'

# Get one book (replace ID)
curl http://localhost:3000/books/<id>

# Update a field on a book
curl -X PATCH http://localhost:3000/books/<id> \
  -H "Content-Type: application/json" \
  -d '{"year":2018}'

# Delete a book
curl -X DELETE http://localhost:3000/books/<id> -i

# Validation error: missing required fields → 400
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{"year":2024}'

# Invalid ObjectId → 400
curl http://localhost:3000/books/not-a-real-id
```

## Notes

See `NOTES.md` for learning notes on Mongoose schemas, async
controllers, and the connection lifecycle.
