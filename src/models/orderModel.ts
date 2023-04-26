import { Schema, model, Types } from "mongoose";

interface IOrder {
  userId: Types.ObjectId;
  books: any;
  createdAt: any;
  qty: number;
  totalPrice: number;
}

const orderSchema = new Schema<IOrder>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  books: [{
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
  }],
  totalPrice: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = model<IOrder>("Order", orderSchema);

export default Order;
