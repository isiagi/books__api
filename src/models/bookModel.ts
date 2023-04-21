import { Schema, model } from "mongoose";

interface IBook {
  title: string;
  author: string;
  description: string;
  imageUrl: string;
  genre: Array<string>;
}

const bookSchema = new Schema<IBook>({
  title: { type: "string", required: true },
  author: { type: "string", required: true },
  description: { type: "string", required: true },
  imageUrl: { type: "string" },
  genre: { type: [] },
});

const Book = model<IBook>("Book", bookSchema);

export default Book;
