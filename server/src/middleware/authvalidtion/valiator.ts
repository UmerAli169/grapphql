import { check } from "express-validator";

export const registerValidation = [
    check("firstName").notEmpty().withMessage("First name is required"),
    check("lastName").notEmpty().withMessage("Last name is required"),
    check("email").isEmail().withMessage("Enter a valid email"),
    check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

export const loginValidation = [
    check("email").isEmail().withMessage("Enter a valid email"),
    check("password").notEmpty().withMessage("Password is required"),
];