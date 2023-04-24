import { Request, Response } from "express";
import Book from "../models/bookModel";
import mongoose from "mongoose";

const booksController = {
  getAllBooks: async (req: Request, res: Response) => {
    try {
      const books = await Book.find();
      res.status(200).json(books);
    } catch (error) {
      console.log(error);
    }
  },
  getAllBooksByAuthorOrId: async (req: Request, res: Response) => {
    try {
      const books = await Book.find({$or:[{ author: { $regex: req.params.bookquery, $options: "i" } },{ title: { $regex: req.params.bookquery, $options: "i" } }]});

      res.status(200).json(books);
    } catch (error) {
      console.log(error);
    }
  },
  createBook: async (req: Request, res: Response) => {
    try {
      const createBook = await Book.create(req.body);

      await createBook.save();

      res
        .status(200)
        .json({ data: `Book with title ${createBook.title} created` });
    } catch (error) {
      console.log(error);
    }
  },
  bookById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (mongoose.Types.ObjectId.isValid(id)) {

        const book = await Book.findById(id);

        if (book === null) {
          return res.status(400).json({ message: "Book Not Found!" });
        }

        return res.status(200).json(book);
      }

      return res.status(400).json({ message: "Invalid Book ID" });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  deleteBook: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedBook = await Book.findByIdAndDelete(id);

      if (deletedBook === null) {
        return res.status(400).json({ message: "Book Not Found" });
      }
      res.status(200).json({ message: `Book successfully delete` });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

export default booksController;
