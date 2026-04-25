import * as bookService from "../services/bookService.js";

export async function listBooks(req, res, next) {
  try {
    const books = await bookService.getAll();
    res.json(books);
  } catch (err) {
    next(err);
  }
}

export async function getBook(req, res, next) {
  try {
    const book = await bookService.getById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    next(err);
  }
}

export async function createBook(req, res, next) {
  try {
    const book = await bookService.create(req.body ?? {});
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
}

export async function updateBook(req, res, next) {
  try {
    const updated = await bookService.update(req.params.id, req.body ?? {});
    if (!updated) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteBook(req, res, next) {
  try {
    const deleted = await bookService.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
