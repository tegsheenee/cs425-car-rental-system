import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    async function handleRegister() {
        setMessage("");

        try {
            await api.post("/auth/register", {
                firstName,
                lastName,
                email,
                password,
            });

            setMessage("Registration successful.");

            setTimeout(() => {
                navigate("/login");
            }, 800);
        } catch (error: any) {
            const errors = error.response?.data?.errors;

            if (errors && errors.length > 0) {
                const errorMessages = errors
                    .map((err: any) => err.msg)
                    .join(", ");

                setMessage(errorMessages);
            } else {
                setMessage(
                    error.response?.data?.message ?? "Registration failed."
                );
            }
        }
    }

    return (
        <div className="auth-form">
            <h1>Create Account</h1>

            <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
            />

            <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
            />

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

            <button type="button" onClick={handleRegister}>
                Register
            </button>

            {message && <p>{message}</p>}
        </div>
    );
}

export default Register;