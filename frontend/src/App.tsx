import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Cars from "./pages/Cars";
import Reservations from "./pages/Reservations";
import Recommendations from "./pages/Recommendations";
import Admin from "./pages/Admin";

function App() {
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
                            element={<Reservations />}
                        />
                        <Route path="/admin" element={<Admin />} />
                    </Routes>
                </div>

                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;