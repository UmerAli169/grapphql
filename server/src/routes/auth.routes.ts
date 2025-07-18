import express from "express";
// import User from "../models/User";
import authenticateUser from "../utils/authMiddleware";
import {
    registerUser,
    loginUser,
    // resetPassword,
    // recoverPassword,
    // updateContactInfo,
    // changepassword,
} from "../controllers/authController";
import {
    registerValidation,
    loginValidation,
} from "../middleware/authvalidtion/valiator";

const router = express.Router();

router.post("/register", registerValidation, registerUser);
router.post("/login", loginValidation, loginUser);
// router.post("/recover-password", recoverPassword);
// router.post("/reset-password/:token", resetPassword);
// router.post("/change-password", authenticateUser, changepassword);
// router.put("/update-contact-info", authenticateUser, updateContactInfo);

router.get("/me", authenticateUser, async (req: any, res: any) => {

    try {
            return res.status(200).json({ message: "User not found" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});



export default router;