"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.registerValidation = void 0;
const express_validator_1 = require("express-validator");
exports.registerValidation = [
    (0, express_validator_1.check)("firstName").notEmpty().withMessage("First name is required"),
    (0, express_validator_1.check)("lastName").notEmpty().withMessage("Last name is required"),
    (0, express_validator_1.check)("email").isEmail().withMessage("Enter a valid email"),
    (0, express_validator_1.check)("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];
exports.loginValidation = [
    (0, express_validator_1.check)("email").isEmail().withMessage("Enter a valid email"),
    (0, express_validator_1.check)("password").notEmpty().withMessage("Password is required"),
];
