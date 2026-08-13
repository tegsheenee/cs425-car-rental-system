import { pool } from "../db/database";

export interface UserRecord {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string | null;
    password_hash: string | null;
    role: string;
}

export async function findUserByEmail(
    email: string
): Promise<UserRecord | null> {
    const result = await pool.query(
        `
      SELECT
        user_id,
        first_name,
        last_name,
        email,
        phone,
        password_hash,
        role
      FROM users
      WHERE email = $1
    `,
        [email]
    );

    return result.rows[0] ?? null;
}

export async function createUser(
    firstName: string,
    lastName: string,
    email: string,
    passwordHash: string
): Promise<UserRecord> {
    const result = await pool.query(
        `
      INSERT INTO users
        (first_name, last_name, email, password_hash, role)
      VALUES
        ($1, $2, $3, $4, 'CUSTOMER')
      RETURNING
        user_id,
        first_name,
        last_name,
        email,
        phone,
        password_hash,
        role
    `,
        [firstName, lastName, email, passwordHash]
    );

    return result.rows[0];
}