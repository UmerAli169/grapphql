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
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../lib/db"));
const generatetoken_1 = require("../utils/generatetoken");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password } = req.body;
        const existingUser = yield db_1.default.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = yield db_1.default.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
            }
        });
        const token = (0, generatetoken_1.generateToken)(newUser.id);
        res
            .cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
            .status(201)
            .json({ message: "User registered successfully", user: newUser });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield db_1.default.user.findUnique({ where: { email } });
        if (!user) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, "umeralikhan", {
            expiresIn: "7d",
        });
        res
            .cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
            .json({ message: "Login successful", user, token });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.loginUser = loginUser;
// export const recoverPassword = async (
//     req: Request,
//     res: Response
// ): Promise<void> => {
//     try {
//         const { email } = req.body;
//         const user: any = await User.findOne({ email });
//         if (!user) {
//             res.status(404).json({ message: "User with this email does not exist." });
//             return;
//         }
//         const resetToken = crypto.randomBytes(32).toString("hex");
//         const hashedToken = crypto
//             .createHash("sha256")
//             .update(resetToken)
//             .digest("hex");
//         const resetTokenExpiry = Date.now() + 60 * 60 * 1000;
//         user.resetPasswordToken = hashedToken;
//         user.resetPasswordExpires = resetTokenExpiry;
//         await user.save();
//         const resetUrl = `http://localhost:3000/?token=${resetToken}`;
//         const message = `
//       <h2>Password Reset Request</h2>
//       <p>Click the link below to reset your password:</p>
//       <a href="${resetUrl}" target="_blank">Reset Password</a>
//       <p>This link is valid for 1 hour.</p>
//     `;
//         await sendEmail(user.email, "Password Reset Request", message);
//         res
//             .status(200)
//             .json({ message: "Password reset link sent to your email." });
//     } catch (error) {
//         console.error("Recover password error:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };
// export const resetPassword = async (
//     req: Request,
//     res: Response
// ): Promise<void | any> => {
//     try {
//         const { token } = req.params;
//         const { password } = req.body;
//         if (!token) {
//             return res.status(400).json({ message: "Token is required" });
//         }
//         const hashedToken = crypto
//             .createHash("sha256")
//             .update(token as string)
//             .digest("hex");
//         const user = await User.findOne({
//             resetPasswordToken: hashedToken,
//             resetPasswordExpires: { $gt: Date.now() },
//         });
//         if (!user) {
//             return res.status(400).json({ message: "Invalid or expired token" });
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);
//         user.password = hashedPassword;
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpires = undefined;
//         await user.save();
//         return res.status(200).json({ message: "Password reset successful" });
//     } catch (error) {
//         console.error("Error resetting password:", error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };
// export const updateContactInfo = async (req: any, res: any) => {
//     try {
//         const userId = req.userId;
//         const { firstName, lastName, phone, address, city, country, email } = req.body;
//         const updatedUser = await User.findByIdAndUpdate(
//             userId,
//             { firstName, lastName, phone, address, city, country, email },
//             { new: true }
//         );
//         if (!updatedUser) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         res
//             .status(200)
//             .json({ message: "Contact info updated", user: updatedUser });
//     } catch (error) {
//         res.status(500).json({ message: "Error updating contact info", error });
//     }
// };
// export const changepassword = async (req: any, res: any) => {
//     const { oldPassword, newPassword } = req.body;
//     const userId = req.userId;
//     try {
//         const user: any = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         // Verify old password
//         const isMatch = await bcrypt.compare(oldPassword, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: "Incorrect old password" });
//         }
//         // Hash new password
//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(newPassword, salt);
//         await user.save();
//         res.json({ message: "Password updated successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Server error" });
//     }
// }
