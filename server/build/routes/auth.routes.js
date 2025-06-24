"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const valiator_1 = require("../middleware/authvalidtion/valiator");
const router = express_1.default.Router();
router.post("/register", valiator_1.registerValidation, authController_1.registerUser);
router.post("/login", valiator_1.loginValidation, authController_1.loginUser);
// router.post("/recover-password", recoverPassword);
// router.post("/reset-password/:token", resetPassword);
// router.post("/change-password", authenticateUser, changepassword);
// router.put("/update-contact-info", authenticateUser, updateContactInfo);
// router.get("/me", authenticateUser, async (req: any, res: any) => {
//     const authReq = req as any;
//     try {
//         const user = await User.findById(authReq.user.id).select("-password");
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ message: "Server error" });
//     }
// });
exports.default = router;
