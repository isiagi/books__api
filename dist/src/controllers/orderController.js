"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orderModel_1 = __importDefault(require("../models/orderModel"));
const console_1 = require("console");
const orderController = {
    getOrders: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const orders = yield orderModel_1.default.find();
            res.status(200).json({ data: orders });
        }
        catch (error) {
            (0, console_1.log)(error);
            res.status(500).json({ error });
        }
    }),
    createOrder: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userOrders = yield orderModel_1.default.findOne({ userId: req.body.userId });
            const createOrder = yield orderModel_1.default.create(req.body);
            yield createOrder.save();
            res.status(200).json({ success: userOrders });
        }
        catch (error) {
            res.status(500).json({ error });
        }
    }),
    getOrderById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const order = yield orderModel_1.default.findById(id).populate({
                path: 'bookId',
            }).exec();
            res.status(200).json({ data: order });
        }
        catch (error) {
            res.status(500).json({ error });
        }
    }),
    deleteOrder: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const order = yield orderModel_1.default.findByIdAndDelete(id);
            if (order === null) {
                return res.status(400).json({ message: "Book Not Found" });
            }
            res.status(200).json({ message: `order successfully deleted` });
        }
        catch (error) {
            res.status(500).json({ error });
        }
    }),
};
exports.default = orderController;
