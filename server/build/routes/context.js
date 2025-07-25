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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const context = (_a) => __awaiter(void 0, [_a], void 0, function* ({ req }) {
    const token = req.cookies.token; // or from headers
    let user = null;
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, "umeralikhan");
            user = { id: decoded.userId }; // attach decoded info
        }
        catch (err) {
            console.error("Token verification failed:", err.message);
        }
    }
    return { user };
});
