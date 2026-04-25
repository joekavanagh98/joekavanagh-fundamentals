# 05 — Express REST API

A small Node + Express service exposing a `/books` resource. The
shape of the project is deliberate: routes know URLs, controllers
know HTTP, services know data. Swap the storage layer in a future
version (06 will move from an in-memory `Map` to MongoDB) and
nothing above it has to change.

## What it demonstrates

- Express app composition: `server.js` boots, `src/app.js` builds
- Layered architecture: `routes → controllers → services`
- Five RESTful endpoints with conventional status codes
  (200, 201, 204, 400, 404, 500)
- In-memory storage with `Map` keyed by `crypto.randomUUID()`
- JSON body parsing via `express.json()`
- Centralized 404 + error middleware

## Files

```
05-express-api/
├── server.js               # entry: reads PORT, starts listener
├── package.json            # type: module, no dev deps
├── .env.example            # PORT=3000
└── src/
    ├── app.js              # builds the Express app
    ├── routes/
    │   └── bookRoutes.js   # URL → controller dispatch
    ├── controllers/
    │   └── bookController.js  # HTTP ↔ service adapter
    ├── services/
    │   └── bookService.js  # data + business rules
    └── middleware/
        └── errors.js       # 404 + error handler
```

## How to run

```
npm install
npm run dev      # node --watch server.js
```

Then hit `http://localhost:3000`.

## Endpoints

| Method | Path        | Success      | Errors |
| ------ | ----------- | ------------ | ------ |
| GET    | /books      | 200 + array  | —      |
| GET    | /books/:id  | 200 + book   | 404    |
| POST   | /books      | 201 + book   | 400    |
| PATCH  | /books/:id  | 200 + book   | 404    |
| DELETE | /books/:id  | 204          | 404    |

## Sample curl commands

```sh
# List all books
curl http://localhost:3000/books

# Get one book (replace ID)
curl http://localhost:3000/books/<id>

# Create a book
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{"title":"Refactoring","author":"Martin Fowler","year":1999}'

# Update fields on a book (replace ID)
curl -X PATCH http://localhost:3000/books/<id> \
  -H "Content-Type: application/json" \
  -d '{"year":2018}'

# Delete a book (replace ID)
curl -X DELETE http://localhost:3000/books/<id> -i
```

## Notes

See `NOTES.md` for learning notes on Express patterns and the
layered architecture.
