"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booksController_1 = __importDefault(require("../controllers/booksController"));
const router = express_1.default.Router();
router.route('/').get(booksController_1.default.getAllBooks);
router.route('/create').post(booksController_1.default.createBook);
router.route('/:id').get(booksController_1.default.bookById);
router.route('/query/:bookquery').get(booksController_1.default.getAllBooksByAuthorOrId);
router.route('/delete/:id').delete(booksController_1.default.deleteBook);
exports.default = router;
