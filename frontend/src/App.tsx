import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Cars from "./pages/Cars";
import Reservations from "./pages/Reservations";
import Recommendations from "./pages/Recommendations";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Navigate } from "react-router-dom";

function App() {
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;
    const isAdmin = user?.role === "ADMIN";
    return (
        <BrowserRouter>
            <div className="app-layout">
                <Navbar />

                <div className="page-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/cars" element={<Cars />} />
                        <Route
                            path="/recommendations"
                            element={<Recommendations />}
                        />
                        <Route
                            path="/reservations"
                            element={
                                user
                                    ? <Reservations />
                                    : <Navigate to="/login" replace />
                            }
                        />
                        <Route
                            path="/admin"
                            element={
                                isAdmin
                                    ? <Admin />
                                    : <Navigate to="/" replace />
                            }
                        />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </div>

                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;