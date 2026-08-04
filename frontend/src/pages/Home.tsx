import { Link } from "react-router-dom";

function Home() {
    return (
        <main className="home-page">
            <section className="hero-section">
                <div>
                    <p className="hero-label">Car Rental System</p>

                    <h1>Find the right car for your next trip</h1>

                    <p className="hero-text">
                        Browse available vehicles, compare rental rates, get personalized
                        recommendations, and manage reservations from one place.
                    </p>

                    <div className="hero-actions">
                        <Link className="primary-link" to="/cars">
                            Browse Cars
                        </Link>

                        <Link className="secondary-link" to="/recommendations">
                            Get Recommendations
                        </Link>
                    </div>
                </div>
            </section>

            <section className="home-features">
                <article className="feature-card">
                    <h2>Browse Cars</h2>
                    <p>
                        Search available vehicles by category, price, seats, transmission,
                        and fuel type.
                    </p>
                    <Link to="/cars">View available cars</Link>
                </article>

                <article className="feature-card">
                    <h2>AI Recommendations</h2>
                    <p>
                        Enter your preferences and receive ranked vehicle recommendations.
                    </p>
                    <Link to="/recommendations">Find a suitable car</Link>
                </article>

                <article className="feature-card">
                    <h2>Reservations</h2>
                    <p>
                        Create a reservation, view reservation details, and cancel an
                        existing reservation.
                    </p>
                    <Link to="/reservations">Manage reservations</Link>
                </article>

                <article className="feature-card">
                    <h2>Admin</h2>
                    <p>
                        Add, update, and remove cars from the rental inventory.
                    </p>
                    <Link to="/admin">Manage inventory</Link>
                </article>
            </section>
        </main>
    );
}

export default Home;