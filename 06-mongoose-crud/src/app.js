import express from "express";
import bookRoutes from "./routes/bookRoutes.js";
import { notFound, errorHandler } from "./middleware/errors.js";

const app = express();

app.use(express.json());

app.use("/books", bookRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
