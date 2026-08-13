import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
    userId: number;
    email: string;
    role: string;
}

export interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
}

export function authenticateToken(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Authentication token is required",
        });
    }

    const token = authHeader.split(" ")[1];

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        return res.status(500).json({
            message: "JWT secret is not configured",
        });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

        req.user = decoded;

        next();
    } catch {
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
}

export function requireAdmin(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) {
    if (!req.user) {
        return res.status(401).json({
            message: "Authentication required",
        });
    }

    if (req.user.role !== "ADMIN") {
        return res.status(403).json({
            message: "Admin access required",
        });
    }

    next();
}