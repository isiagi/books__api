// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import express from 'express';
import booksController from '../controllers/booksController';
import { authenticationMiddleware } from '../middleware/auth';

const router = express.Router();

router.route('/').get(booksController.getAllBooks)
router.route('/create').post(authenticationMiddleware,booksController.createBook)
router.route('/:id').get(booksController.bookById)
router.route('/query/:bookquery').get(booksController.getAllBooksByAuthorOrId)
router.route('/delete/:id').delete(authenticationMiddleware, booksController.deleteBook)

export default router