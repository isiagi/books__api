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
const express_1 = __importDefault(require("express"));
const booksRouter_1 = __importDefault(require("./src/routers/booksRouter"));
const orderRouter_1 = __importDefault(require("./src/routers/orderRouter"));
const connect_1 = __importDefault(require("./src/db/connect"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/v1/book/', booksRouter_1.default);
app.use('/api/v1/order/', orderRouter_1.default);
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server,there');
});
const PORT = process.env.PORT || 5000;
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, connect_1.default)();
            app.listen(PORT, () => {
                console.log(`Server Up and Running On http://localhost:${PORT}`);
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
start();
