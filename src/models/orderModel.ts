import { Schema, model, Types } from "mongoose";

interface IOrder {
  userId: Types.ObjectId;
  bookId: [Types.ObjectId];
  createdAt: any;
}

const orderSchema = new Schema<IOrder>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
},
  bookId: {
    type: [{
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    }],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

const Order = model<IOrder>("Order", orderSchema);

export default Order;
