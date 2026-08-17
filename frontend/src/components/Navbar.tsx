import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface StoredUser {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
}

function Navbar() {
    const userData = localStorage.getItem("user");

    const user: StoredUser | null =
        userData ? JSON.parse(userData) : null;

    const isAdmin = user?.role === "ADMIN";
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
        window.location.reload();
    }
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                🚗 Car Rental System
            </div>

            <div className="navbar-links">
                <NavLink to="/" className="nav-link">
                    Home
                </NavLink>

                <NavLink to="/cars" className="nav-link">
                    Browse Cars
                </NavLink>

                <NavLink to="/recommendations" className="nav-link">
                    AI Recommendations
                </NavLink>

                <NavLink to="/reservations" className="nav-link">
                    Reservations
                </NavLink>

                {isAdmin && (
                    <NavLink to="/admin" className="nav-link">
                        Admin
                    </NavLink>
                )}

                {!user && (
                    <>
                        <NavLink to="/login" className="nav-link">
                            Login
                        </NavLink>

                        <NavLink to="/register" className="nav-link">
                            Register
                        </NavLink>
                    </>
                )}
                {user && (
                    <button
                        type="button"
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;