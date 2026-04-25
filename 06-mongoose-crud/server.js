import app from "./src/app.js";
import { connectDB, disconnectDB } from "./src/config/db.js";

const PORT = process.env.PORT || 3000;

async function start() {
  await connectDB();
  const server = app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });

  const shutdown = async (signal) => {
    console.log(`\n${signal} received, shutting down`);
    server.close(async () => {
      await disconnectDB();
      process.exit(0);
    });
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}

start().catch((err) => {
  console.error("Startup failed:", err);
  process.exit(1);
});
