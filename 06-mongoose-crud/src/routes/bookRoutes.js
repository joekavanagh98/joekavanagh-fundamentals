import { Router } from "express";
import {
  listBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";

const router = Router();

router.get("/", listBooks);
router.get("/:id", getBook);
router.post("/", createBook);
router.patch("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
