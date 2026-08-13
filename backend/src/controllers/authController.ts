import { Request, Response } from "express";
import * as authService from "../services/authService";

export async function register(req: Request, res: Response) {
    try {
        const user = await authService.registerUser({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
        });

        return res.status(201).json({
            message: "User registered successfully",
            user,
        });
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : "Unable to register user";

        return res.status(400).json({
            message,
        });
    }
}

export async function login(req: Request, res: Response) {
    try {
        const result = await authService.loginUser({
            email: req.body.email,
            password: req.body.password,
        });

        return res.status(200).json(result);
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : "Unable to login";

        return res.status(401).json({
            message,
        });
    }
}