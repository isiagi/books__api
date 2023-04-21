import { Schema, model, Types } from "mongoose";

interface IOrder {
  userId: string;
  bookId: [Types.ObjectId];
}

const orderSchema = new Schema<IOrder>({
  userId: String,
  bookId: {
    type: [{
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    }],
    required: true,
  },
});

const Order = model<IOrder>("Order", orderSchema);

export default Order;
