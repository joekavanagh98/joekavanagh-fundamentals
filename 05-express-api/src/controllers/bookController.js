import * as bookService from "../services/bookService.js";

export function listBooks(req, res) {
  res.json(bookService.getAll());
}

export function getBook(req, res) {
  const book = bookService.getById(req.params.id);
  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }
  res.json(book);
}

export function createBook(req, res) {
  const { title, author, year } = req.body ?? {};
  if (typeof title !== "string" || typeof author !== "string") {
    return res.status(400).json({
      error: "title and author are required strings",
    });
  }
  const book = bookService.create({ title, author, year });
  res.status(201).json(book);
}

export function updateBook(req, res) {
  const updated = bookService.update(req.params.id, req.body ?? {});
  if (!updated) {
    return res.status(404).json({ error: "Book not found" });
  }
  res.json(updated);
}

export function deleteBook(req, res) {
  const deleted = bookService.remove(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: "Book not found" });
  }
  res.status(204).end();
}
