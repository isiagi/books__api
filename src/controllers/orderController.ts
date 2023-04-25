// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { Request, Response } from "express";
import Order from "../models/orderModel";
import { log } from "console";

const orderController = {
  getOrders: async (req: Request, res: Response) => {
    try {
      let orders;
      if (req.user.role === true) {
        orders = await Order.find()
          .populate({
            path: "bookId",
          })
          .populate({ path: "userId", select: "_id email" });
      }

      orders = await Order.find({ userId: req.user.id })
        .populate({
          path: "bookId",
        })
        .populate({ path: "userId", select: "_id email" });

      res.status(200).json({ data: orders });
    } catch (error) {
      log(error);
      res.status(500).json({ error });
    }
  },
  createOrder: async (req: Request, res: Response) => {
    try {
      // const userOrders = await Order.findOne({userId: req.body.userId})

      const createOrder = await new Order(req.body);

      createOrder.userId = req.user.id;

      await createOrder.save();

      res.status(200).json({ success: createOrder });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  getOrderById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const order = await Order.findById(id)
        .populate({
          path: "bookId",
        })
        .populate({ path: "userId", select: "_id email" });

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
