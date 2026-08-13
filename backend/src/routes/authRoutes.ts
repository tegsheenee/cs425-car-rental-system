import { Router } from "express";
import { body } from "express-validator";

import {
    login,
    register,
} from "../controllers/authController";

import { validateRequest } from "../middleware/validationMiddleware";

const router = Router();

router.post(
    "/register",
    [
        body("firstName")
            .trim()
            .notEmpty()
            .withMessage("First name is required"),

        body("lastName")
            .trim()
            .notEmpty()
            .withMessage("Last name is required"),

        body("email")
            .isEmail()
            .withMessage("Valid email is required")
            .normalizeEmail(),

        body("password")
            .isLength({ min: 8 })
            .withMessage("Password must be at least 8 characters"),
    ],
    validateRequest,
    register
);

router.post(
    "/login",
    [
        body("email")
            .isEmail()
            .withMessage("Valid email is required")
            .normalizeEmail(),

        body("password")
            .notEmpty()
            .withMessage("Password is required"),
    ],
    validateRequest,
    login
);

export default router;