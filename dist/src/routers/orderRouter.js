"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = __importDefault(require("../controllers/orderController"));
const router = express_1.default.Router();
router.route('/').get(orderController_1.default.getOrders);
router.route('/create').post(orderController_1.default.createOrder);
router.route('/:id').get(orderController_1.default.getOrderById);
router.route('/delete/:id').delete(orderController_1.default.deleteOrder);
exports.default = router;
