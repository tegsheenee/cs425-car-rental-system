import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                🚗 Car Rental System
            </div>

            <div className="navbar-links">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    Home
                </NavLink>

                <NavLink
                    to="/cars"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    Browse Cars
                </NavLink>

                <NavLink
                    to="/recommendations"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    AI Recommendations
                </NavLink>

                <NavLink
                    to="/reservations"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    Reservations
                </NavLink>

                <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    Admin
                </NavLink>
            </div>
        </nav>
    );
}

export default Navbar;