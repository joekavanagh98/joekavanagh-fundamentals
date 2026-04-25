import mongoose from "mongoose";

const currentYear = new Date().getFullYear();

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
      maxlength: [200, "title must be 200 characters or fewer"],
    },
    author: {
      type: String,
      required: [true, "author is required"],
      trim: true,
      maxlength: [120, "author must be 120 characters or fewer"],
    },
    year: {
      type: Number,
      min: [-3000, "year is too far in the past"],
      max: [currentYear + 1, "year cannot be in the future"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

bookSchema.index({ title: 1 });

export default mongoose.model("Book", bookSchema);
