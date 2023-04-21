import { Request, Response } from "express";
import Book from "../models/bookModel";
import mongoose from "mongoose";

const booksController = {
  getAllBooks: async (req: Request, res: Response) => {
    try {
      const books = await Book.find();
      res.status(200).json({ data: books });
    } catch (error) {
      console.log(error);
    }
  },
  createBook: async (req: Request, res: Response) => {
    try {
      const createBook = await Book.create(req.body);

      await createBook.save();

      res.status(200).json({ data: `Book with title ${createBook.title} created` });
    } catch (error) {
      console.log(error);
    }
  },
  bookById: async (req: Request, res: Response) => {

    
    try {
      const { id } = req.params;
      // if (!mongoose.Types.ObjectId.isValid(id)) {
      //   return res.status(400).json({ message: "Invalid Book ID" });
      // }
      const book = await Book.findOne({_id:id});

      if (book === null) {
        return res.status(400).json({ message: "Book Not Found" });
      }

      res.status(200).json({ data: book });
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
