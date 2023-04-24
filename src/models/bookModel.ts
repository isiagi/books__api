import mongoose, { Schema, model } from "mongoose";

interface IBook {
  title: string;
  author: string;
  description: string;
  imageUrl: string;
  genre: Array<string>;
}

const bookSchema = new Schema({
  author: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  genre: { type: [String] },
});

bookSchema.index({
  author: "text",
  title: "text"
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
