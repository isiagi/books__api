import express from 'express';
import orderController from '../controllers/orderController';

const router = express.Router();

router.route('/').get(orderController.getOrders)
router.route('/create').post(orderController.createOrder)
router.route('/:id').get(orderController.getOrderById)
router.route('/delete/:id').delete(orderController.deleteOrder)

export default router