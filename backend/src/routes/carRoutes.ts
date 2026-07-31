import { Router } from "express";
import * as controller from "../controllers/carController";

const router = Router();

router.get("/", controller.getCars);
router.get("/search", controller.searchCars);
router.get("/:id", controller.getCarById);
router.post("/", controller.addCar);
router.put("/:id", controller.updateCar);
router.delete("/:id", controller.deleteCar);
export default router;