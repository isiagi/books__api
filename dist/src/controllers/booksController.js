"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bookModel_1 = __importDefault(require("../models/bookModel"));
const booksController = {
    getAllBooks: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const books = yield bookModel_1.default.find();
            res.status(200).json({ data: books });
        }
        catch (error) {
            console.log(error);
        }
    }),
    createBook: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const createBook = yield bookModel_1.default.create(req.body);
            yield createBook.save();
            res.status(200).json({ data: `Book with title ${createBook.title} created` });
        }
        catch (error) {
            console.log(error);
        }
    }),
    bookById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            // if (!mongoose.Types.ObjectId.isValid(id)) {
            //   return res.status(400).json({ message: "Invalid Book ID" });
            // }
            const book = yield bookModel_1.default.findOne({ _id: id });
            if (book === null) {
                return res.status(400).json({ message: "Book Not Found" });
            }
            res.status(200).json({ data: book });
        }
        catch (error) {
            res.status(500).json({ error });
        }
    }),
    deleteBook: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const deletedBook = yield bookModel_1.default.findByIdAndDelete(id);
            if (deletedBook === null) {
                return res.status(400).json({ message: "Book Not Found" });
            }
            res.status(200).json({ message: `Book successfully delete` });
        }
        catch (error) {
            res.status(500).json({ error });
        }
    }),
};
exports.default = booksController;
