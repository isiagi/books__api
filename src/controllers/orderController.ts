import { Request, Response } from "express";
import Order from "../models/orderModel";
import { log } from "console";

const orderController = {
  getOrders: async (req: Request, res: Response) => {
    try {
      const orders = await Order.find();
      res.status(200).json({ data: orders });
    } catch (error) {
        log(error)
      res.status(500).json({ error });
    }
  },
  createOrder: async (req: Request, res: Response) => {
    try {
        const userOrders = await Order.findOne({userId: req.body.userId})
      const createOrder = await Order.create(req.body);

      await createOrder.save();
      res.status(200).json({ success: userOrders });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  getOrderById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const order = await Order.findById(id).populate({
        path: 'bookId',
        
      }).exec();
      res.status(200).json({ data: order });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  deleteOrder: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const order = await Order.findByIdAndDelete(id);
      if (order === null) {
        return res.status(400).json({ message: "Book Not Found" });
      }
      res.status(200).json({ message: `order successfully deleted` });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

export default orderController;
