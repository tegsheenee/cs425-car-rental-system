import express from "express";
import cors from "cors";
import carRoutes from "./routes/carRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/cars", carRoutes);

app.get("/", (_req, res) => {
    res.json({
        message: "Car Rental System API is running",
    });
});

export default app;