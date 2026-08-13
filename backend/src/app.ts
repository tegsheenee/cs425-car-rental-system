import express from "express";
import cors from "cors";
import carRoutes from "./routes/carRoutes";
import reservationRoutes from "./routes/reservationRoutes";
import recommendationRoutes from "./routes/recommendationRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/cars", carRoutes);
app.use("/reservations", reservationRoutes);
app.use("/recommendations", recommendationRoutes);
app.use("/auth", authRoutes);

app.get("/", (_req, res) => {
    res.json({
        message: "Car Rental System API is running",
    });
});

export default app;