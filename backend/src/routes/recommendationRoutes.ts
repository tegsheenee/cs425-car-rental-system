import { Router } from "express";
import * as controller from "../controllers/recommendationController";

const router = Router();

router.get("/", controller.getRecommendations);

export default router;