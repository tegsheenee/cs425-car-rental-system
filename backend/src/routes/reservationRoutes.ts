import { Router } from "express";
import {
    createReservation,
    getReservations,
    cancelReservation,
} from "../controllers/reservationController";

import {
    authenticateToken,
} from "../middleware/authMiddleware";

const router = Router();

router.get("/", authenticateToken, getReservations);

router.post(
    "/",
    authenticateToken,
    createReservation
);

router.delete(
    "/:id",
    authenticateToken,
    cancelReservation
);

export default router;