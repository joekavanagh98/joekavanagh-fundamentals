import { randomUUID } from "node:crypto";

const books = new Map();

function seed() {
  const seedData = [
    { title: "The Pragmatic Programmer", author: "Hunt & Thomas", year: 1999 },
    { title: "Designing Data-Intensive Applications", author: "Kleppmann", year: 2017 },
  ];
  for (const data of seedData) {
    const id = randomUUID();
    books.set(id, { id, ...data, createdAt: new Date().toISOString() });
  }
}
seed();

export function getAll() {
  return Array.from(books.values());
}

export function getById(id) {
  return books.get(id);
}

export function create({ title, author, year }) {
  const id = randomUUID();
  const book = {
    id,
    title,
    author,
    year,
    createdAt: new Date().toISOString(),
  };
  books.set(id, book);
  return book;
}

export function update(id, patch) {
  const existing = books.get(id);
  if (!existing) return undefined;
  const updated = { ...existing, ...patch, id: existing.id };
  books.set(id, updated);
  return updated;
}

export function remove(id) {
  return books.delete(id);
}
