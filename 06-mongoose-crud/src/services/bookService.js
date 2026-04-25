import Book from "../models/Book.js";

export async function getAll() {
  return Book.find().sort({ title: 1 });
}

export async function getById(id) {
  return Book.findById(id);
}

export async function create(data) {
  return Book.create(data);
}

export async function update(id, patch) {
  return Book.findByIdAndUpdate(id, patch, {
    new: true,
    runValidators: true,
  });
}

export async function remove(id) {
  const deleted = await Book.findByIdAndDelete(id);
  return Boolean(deleted);
}
