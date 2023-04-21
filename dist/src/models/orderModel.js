"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    userId: String,
    bookId: {
        type: [{
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Book',
                required: true
            }],
        required: true,
    },
});
const Order = (0, mongoose_1.model)("Order", orderSchema);
exports.default = Order;
