import mongoose from "mongoose";

const DEFAULT_URI = "mongodb://127.0.0.1:27017/06-books";

mongoose.connection.on("error", (err) => {
  console.error("MongoDB error:", err.message);
});

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected");
});

export async function connectDB(uri = process.env.MONGODB_URI || DEFAULT_URI) {
  await mongoose.connect(uri);
  console.log(`MongoDB connected: ${uri}`);
}

export async function disconnectDB() {
  await mongoose.disconnect();
}
