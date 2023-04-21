"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: { type: "string", required: true },
    author: { type: "string", required: true },
    description: { type: "string", required: true },
    imageUrl: { type: "string" },
    genre: { type: [] },
});
const Book = (0, mongoose_1.model)("Book", bookSchema);
exports.default = Book;
