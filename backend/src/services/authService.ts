import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as authRepository from "../repositories/authRepository";

interface RegisterInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface LoginInput {
    email: string;
    password: string;
}

export async function registerUser(input: RegisterInput) {
    const existingUser =
        await authRepository.findUserByEmail(input.email);

    if (existingUser) {
        throw new Error("Email is already registered");
    }

    const passwordHash = await bcrypt.hash(input.password, 10);

    const user = await authRepository.createUser(
        input.firstName,
        input.lastName,
        input.email,
        passwordHash
    );

    return {
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
    };
}

export async function loginUser(input: LoginInput) {
    const user =
        await authRepository.findUserByEmail(input.email);

    if (!user || !user.password_hash) {
        throw new Error("Invalid email or password");
    }

    const passwordMatches = await bcrypt.compare(
        input.password,
        user.password_hash
    );

    if (!passwordMatches) {
        throw new Error("Invalid email or password");
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        throw new Error("JWT_SECRET is not configured");
    }

    const token = jwt.sign(
        {
            userId: user.user_id,
            email: user.email,
            role: user.role,
        },
        jwtSecret,
        {
            expiresIn: "1h",
        }
    );

    return {
        token,
        user: {
            user_id: user.user_id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role,
        },
    };
}