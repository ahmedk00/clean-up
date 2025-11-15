import { Router } from "express";
import * as previousWorkController from "../controllers/previousWork.controller";

const router = Router();

// Public Previous Work routes
router.get("/previous-work", previousWorkController.getAllPreviousWork);
router.get("/previous-work/featured", previousWorkController.getFeaturedPreviousWork);
router.get("/previous-work/:id", previousWorkController.getPreviousWorkById);

export default router;
