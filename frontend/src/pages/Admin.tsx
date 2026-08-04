import { useEffect, useState } from "react";
import api from "../services/api";
import type { Car } from "../types/Car";

interface CarFormData {
    brand: string;
    model: string;
    year: string;
    category_id: string;
    daily_rate: string;
    transmission: string;
    fuel_type: string;
    seats: string;
    available: boolean;
}

const emptyForm: CarFormData = {
    brand: "",
    model: "",
    year: "",
    category_id: "",
    daily_rate: "",
    transmission: "Automatic",
    fuel_type: "Gasoline",
    seats: "",
    available: true,
};

function Admin() {
    const [cars, setCars] = useState<Car[]>([]);
    const [form, setForm] = useState<CarFormData>(emptyForm);
    const [editingCarId, setEditingCarId] = useState<number | null>(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        void loadCars();
    }, []);

    async function loadCars() {
        try {
            const response = await api.get("/cars");
            setCars(response.data);
        } catch (error) {
            console.error("Failed to load cars:", error);
            setMessage("Unable to load cars.");
        }
    }

    function handleChange(
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>
    ) {
        const { name, value } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value,
        }));
    }

    function editCar(car: Car) {
        setEditingCarId(car.car_id);

        setForm({
            brand: car.brand,
            model: car.model,
            year: String(car.year),
            category_id: String(car.category_id),
            daily_rate: String(car.daily_rate),
            transmission: car.transmission,
            fuel_type: car.fuel_type,
            seats: String(car.seats),
            available: car.available,
        });

        setMessage("");
    }

    function resetForm() {
        setEditingCarId(null);
        setForm(emptyForm);
    }

    async function saveCar() {
        setMessage("");

        if (
            !form.brand ||
            !form.model ||
            !form.year ||
            !form.category_id ||
            !form.daily_rate ||
            !form.seats
        ) {
            setMessage("Please complete all required fields.");
            return;
        }

        const payload = {
            brand: form.brand,
            model: form.model,
            year: Number(form.year),
            category_id: Number(form.category_id),
            daily_rate: Number(form.daily_rate),
            transmission: form.transmission,
            fuel_type: form.fuel_type,
            seats: Number(form.seats),
            available: form.available,
        };

        try {
            if (editingCarId !== null) {
                await api.put(`/cars/${editingCarId}`, payload);
                setMessage("Car updated successfully.");
            } else {
                await api.post("/cars", payload);
                setMessage("Car added successfully.");
            }

            resetForm();
            await loadCars();
        } catch (error) {
            console.error("Failed to save car:", error);
            setMessage("Unable to save car.");
        }
    }

    async function deleteCar(carId: number) {
        const car = cars.find((item) => item.car_id === carId);

        const confirmed = window.confirm(
            `Are you sure you want to delete ${
                car ? `${car.brand} ${car.model}` : "this car"
            }?`
        );

        if (!confirmed) {
            return;
        }

        try {
            await api.delete(`/cars/${carId}`);
            setMessage("Car deleted successfully.");
            await loadCars();
        } catch (error) {
            console.error("Failed to delete car:", error);
            setMessage("Unable to delete car.");
        }
    }

    return (
        <>
            <h1>Admin</h1>

            <section className="admin-form">
                <h2>{editingCarId ? "Update Car" : "Add Car"}</h2>

                <input
                    name="brand"
                    placeholder="Brand"
                    value={form.brand}
                    onChange={handleChange}
                />

                <input
                    name="model"
                    placeholder="Model"
                    value={form.model}
                    onChange={handleChange}
                />

                <input
                    name="year"
                    type="number"
                    placeholder="Year"
                    value={form.year}
                    onChange={handleChange}
                />

                <select
                    name="category_id"
                    value={form.category_id}
                    onChange={handleChange}
                >
                    <option value="">Select category</option>
                    <option value="1">Sedan</option>
                    <option value="2">SUV</option>
                    <option value="3">Truck</option>
                    <option value="4">Luxury</option>
                </select>

                <input
                    name="daily_rate"
                    type="number"
                    step="0.01"
                    placeholder="Daily rate"
                    value={form.daily_rate}
                    onChange={handleChange}
                />

                <select
                    name="transmission"
                    value={form.transmission}
                    onChange={handleChange}
                >
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                </select>

                <select
                    name="fuel_type"
                    value={form.fuel_type}
                    onChange={handleChange}
                >
                    <option value="Gasoline">Gasoline</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                </select>

                <input
                    name="seats"
                    type="number"
                    placeholder="Seats"
                    value={form.seats}
                    onChange={handleChange}
                />

                <label className="availability-option">
                    <input
                        type="checkbox"
                        checked={form.available}
                        onChange={(event) =>
                            setForm((current) => ({
                                ...current,
                                available: event.target.checked,
                            }))
                        }
                    />
                    Available
                </label>

                <div className="admin-form-actions">
                    <button type="button" onClick={saveCar}>
                        {editingCarId ? "Update Car" : "Add Car"}
                    </button>

                    {editingCarId && (
                        <button type="button" onClick={resetForm}>
                            Cancel Edit
                        </button>
                    )}
                </div>

                {message && (
                    <div
                        className={
                            message.toLowerCase().includes("success")
                                ? "alert alert-success"
                                : "alert alert-error"
                        }
                    >
                        {message}
                    </div>
                )}
            </section>

            <section>
                <h2>Manage Cars</h2>

                <div className="admin-car-list">
                    {cars.map((car) => (
                        <article className="admin-car-row" key={car.car_id}>
                            <div>
                                <strong>
                                    {car.brand} {car.model}
                                </strong>

                                <p>
                                    {car.year} · ${car.daily_rate}/day · {car.seats} seats
                                </p>
                            </div>

                            <div className="admin-row-actions">
                                <button type="button" onClick={() => editCar(car)}>
                                    Edit
                                </button>

                                <button type="button" onClick={() => deleteCar(car.car_id)}>
                                    Delete
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </>
    );
}

export default Admin;