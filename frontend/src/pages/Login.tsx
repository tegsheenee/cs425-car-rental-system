import { useState } from "react";
import api from "../services/api";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    async function handleLogin() {
        setMessage("");

        try {
            const response = await api.post("/auth/login", {
                email,
                password,
            });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            setMessage("Login successful.");

            window.location.href = "/";
        } catch (error: any) {
            setMessage(
                error.response?.data?.message ?? "Login failed."
            );
        }
    }

    return (
        <div className="auth-form">
            <h1>Login</h1>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />

            <button type="button" onClick={handleLogin}>
                Login
            </button>

            {message && <p>{message}</p>}
        </div>
    );
}

export default Login;