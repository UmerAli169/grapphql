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
exports.context = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const context = (_a) => __awaiter(void 0, [_a], void 0, function* ({ req }) {
    const token = req.cookie;
    console.log(token, 'pppp');
    let user = null;
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, "umeralikhan");
            user = yield prisma.user.findUnique({
                where: { id: decoded.userId },
            });
        }
        catch (err) {
            console.error("Token verification failed:", err);
        }
    }
    return {
        user,
        prisma,
    };
});
exports.context = context;
