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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import User from "../models/User";
const authMiddleware_1 = __importDefault(require("../utils/authMiddleware"));
const google_auth_library_1 = require("google-auth-library");
const db_1 = __importDefault(require("../lib/db")); // your prisma client
const generatetoken_1 = require("../utils/generatetoken");
const authController_1 = require("../controllers/authController");
const valiator_1 = require("../middleware/authvalidtion/valiator");
const router = express_1.default.Router();
router.post("/register", valiator_1.registerValidation, authController_1.registerUser);
router.post("/login", valiator_1.loginValidation, authController_1.loginUser);
// router.post("/recover-password", recoverPassword);
// router.post("/reset-password/:token", resetPassword);
// router.post("/change-password", authenticateUser, changepassword);
// router.put("/update-contact-info", authenticateUser, updateContactInfo);
router.post("/me", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.status(200).json({ message: "User not found" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}));
const client = new google_auth_library_1.OAuth2Client("566898322531-0ka8vs2s22tf7vh7n0gdno9jvt1pas4c.apps.googleusercontent.com");
router.post("/google", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, mode } = req.body;
    if (!token || !mode) {
        return res.status(400).json({ error: "Token and mode are required" });
    }
    try {
        const ticket = yield client.verifyIdToken({
            idToken: token,
            audience: "566898322531-0ka8vs2s22tf7vh7n0gdno9jvt1pas4c.apps.googleusercontent.com",
        });
        const payload = ticket.getPayload();
        if (!payload)
            return res.status(401).json({ error: "Invalid Google token payload" });
        const { sub: googleId, email, given_name: firstName, family_name: lastName, } = payload;
        if (!email)
            return res.status(400).json({ error: "Email not provided by Google" });
        let user = yield db_1.default.user.findUnique({ where: { email } });
        if (mode === "register") {
            if (user) {
                return res
                    .status(409)
                    .json({ error: "User already exists. Please log in." });
            }
            user = yield db_1.default.user.create({
                data: {
                    email,
                    firstName: firstName || "",
                    lastName: lastName || "",
                    googleId,
                    provider: "google",
                    password: null,
                },
            });
        }
        else if (mode === "login") {
            if (!user) {
                return res
                    .status(404)
                    .json({ error: "No account found. Please register first." });
            }
            if (user.provider !== "google") {
                return res.status(409).json({ error: "Use email/password to login." });
            }
        }
        else {
            return res.status(400).json({ error: "Invalid mode" });
        }
        // Generate JWT
        const jwtToken = (0, generatetoken_1.generateToken)(user.id);
        const { password } = user, safeUser = __rest(user, ["password"]);
        res.cookie("token", jwtToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None", // for cross-site cookies
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        return res.status(200).json({
            message: safeUser ? "Login successful" : "Registered successfully",
            user,
        });
    }
    catch (error) {
        console.error("Google auth error:", error);
        res.status(500).json({ error: "Authentication failed" });
    }
}));
exports.default = router;
