import { Router } from "express";
import * as controller from "../controllers/reservationController";

const router = Router();

router.get("/", controller.getReservations);
router.get("/:id", controller.getReservationById);
router.post("/", controller.createReservation);
router.delete("/:id", controller.cancelReservation);

export default router;