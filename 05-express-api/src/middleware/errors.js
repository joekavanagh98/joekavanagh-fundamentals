export function notFound(req, res) {
  res.status(404).json({ error: `Cannot ${req.method} ${req.originalUrl}` });
}

export function errorHandler(err, req, res, _next) {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Invalid JSON body" });
  }
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
}
