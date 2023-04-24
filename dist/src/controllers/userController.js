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
const userModel_1 = __importDefault(require("../models/userModel"));
const userController = {
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        const user = yield userModel_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        const isMatch = yield user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        return signToken(res, 200, user);
    }),
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { username, password, email } = req.body;
        const user = yield userModel_1.default.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        try {
            const newUser = yield userModel_1.default.create({
                username: username,
                password: password,
                email: email,
            });
            return signToken(res, 200, newUser);
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }),
};
const signToken = function (res, status, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield user.getSignedJwtToken();
        return res.status(status).json({ message: "success", token });
    });
};
exports.default = userController;
