import { Router } from "express";
import * as controller from "../controllers/carController";

const router = Router();

router.get("/", controller.getCars);

export default router;