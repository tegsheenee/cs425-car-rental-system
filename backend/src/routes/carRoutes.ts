import {
    authenticateToken,
    requireAdmin,
} from "../middleware/authMiddleware";
import { Router } from "express";
import * as controller from "../controllers/carController";
import { body } from "express-validator";
import {validateRequest} from "../middleware/validationMiddleware";

const router = Router();
const carValidationRules = [
    body("brand")
        .trim()
        .notEmpty()
        .withMessage("Brand is required"),

    body("model")
        .trim()
        .notEmpty()
        .withMessage("Model is required"),

    body("year")
        .isInt({ min: 2000, max: 2035 })
        .withMessage("Year must be between 2000 and 2035"),

    body("category_id")
        .isInt({ min: 1 })
        .withMessage("Valid category ID is required"),

    body("daily_rate")
        .isFloat({ min: 1 })
        .withMessage("Daily rate must be greater than 0"),

    body("transmission")
        .isIn(["Automatic", "Manual"])
        .withMessage("Transmission must be Automatic or Manual"),

    body("fuel_type")
        .isIn(["Gasoline", "Electric", "Hybrid"])
        .withMessage("Invalid fuel type"),

    body("seats")
        .isInt({ min: 1, max: 15 })
        .withMessage("Seats must be between 1 and 15"),

    body("available")
        .isBoolean()
        .withMessage("Available must be true or false"),
];
router.get("/", controller.getCars);
router.get("/search", controller.searchCars);
router.get("/:id", controller.getCarById);
// router.post("/", controller.addCar);
// router.put("/:id", controller.updateCar);
// router.delete("/:id", controller.deleteCar);
router.post(
    "/",
    authenticateToken,
    requireAdmin,
    carValidationRules,
    validateRequest,
    controller.addCar
);

router.put(
    "/:id",
    authenticateToken,
    requireAdmin,
    carValidationRules,
    validateRequest,
    controller.updateCar
);

router.delete(
    "/:id",
    authenticateToken,
    requireAdmin,
    controller.deleteCar
);
export default router;