export function notFound(req, res) {
  res.status(404).json({ error: `Cannot ${req.method} ${req.originalUrl}` });
}

export function errorHandler(err, req, res, _next) {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  if (err.name === "CastError") {
    return res.status(400).json({ error: `Invalid id: ${err.value}` });
  }

  if (err.name === "ValidationError") {
    const fields = Object.fromEntries(
      Object.entries(err.errors).map(([key, val]) => [key, val.message]),
    );
    return res.status(400).json({ error: "Validation failed", fields });
  }

  console.error(err);
  res.status(500).json({ error: "Internal server error" });
}
