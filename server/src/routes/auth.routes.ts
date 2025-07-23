import express from "express";
// import User from "../models/User";
import authenticateUser from "../utils/authMiddleware";
import { OAuth2Client } from "google-auth-library";
import prisma from "../lib/db"; // your prisma client
import { generateToken } from "../utils/generatetoken";
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

router.post("/me", authenticateUser, async (req: any, res: any) => {
  try {
    return res.status(200).json({ message: "User not found" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

const client = new OAuth2Client(
  "566898322531-0ka8vs2s22tf7vh7n0gdno9jvt1pas4c.apps.googleusercontent.com"
);

router.post("/google", async (req, res) => {
  const { token, mode } = req.body;

  if (!token || !mode) {
    return res.status(400).json({ error: "Token and mode are required" });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience:
        "566898322531-0ka8vs2s22tf7vh7n0gdno9jvt1pas4c.apps.googleusercontent.com",
    });

    const payload = ticket.getPayload();
    if (!payload)
      return res.status(401).json({ error: "Invalid Google token payload" });

    const {
      sub: googleId,
      email,
      given_name: firstName,
      family_name: lastName,
    } = payload;

    if (!email)
      return res.status(400).json({ error: "Email not provided by Google" });

    let user = await prisma.user.findUnique({ where: { email } });

    if (mode === "register") {
      if (user) {
        return res
          .status(409)
          .json({ error: "User already exists. Please log in." });
      }

      user = await prisma.user.create({
        data: {
          email,
          firstName: firstName || "",
          lastName: lastName || "",
          googleId,
          provider: "google",
          password: null,
        },
      });
    } else if (mode === "login") {
      if (!user) {
        return res
          .status(404)
          .json({ error: "No account found. Please register first." });
      }

      if (user.provider !== "google") {
        return res.status(409).json({ error: "Use email/password to login." });
      }
    } else {
      return res.status(400).json({ error: "Invalid mode" });
    }

    // Generate JWT
    const jwtToken = generateToken(user.id);
    const { password, ...safeUser } = user;
    res.cookie("token", jwtToken, {
  httpOnly: true,
  secure: true,
  sameSite: "None" as any, // for cross-site cookies
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
});


    return res.status(200).json({
      message: safeUser ? "Login successful" : "Registered successfully",
      user,
     
    });
  } catch (error) {
    console.error("Google auth error:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
});

export default router;
