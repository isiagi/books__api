import express from 'express';
import booksController from '../controllers/booksController';

const router = express.Router();

router.route('/').get(booksController.getAllBooks)
router.route('/create').post(booksController.createBook)
router.route('/:id').get(booksController.bookById)
router.route('/query/:bookquery').get(booksController.getAllBooksByAuthorOrId)
router.route('/delete/:id').delete(booksController.deleteBook)

export default router