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
// import User from "../models/User";
const authMiddleware_1 = __importDefault(require("../utils/authMiddleware"));
const authController_1 = require("../controllers/authController");
const valiator_1 = require("../middleware/authvalidtion/valiator");
const router = express_1.default.Router();
router.post("/register", valiator_1.registerValidation, authController_1.registerUser);
router.post("/login", valiator_1.loginValidation, authController_1.loginUser);
// router.post("/recover-password", recoverPassword);
// router.post("/reset-password/:token", resetPassword);
// router.post("/change-password", authenticateUser, changepassword);
// router.put("/update-contact-info", authenticateUser, updateContactInfo);
router.get("/me", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.status(200).json({ message: "User not found" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}));
exports.default = router;
