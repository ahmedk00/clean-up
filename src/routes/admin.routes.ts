import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { uploadPreviousWorkImages } from "../middleware/upload";
import * as authController from "../controllers/auth.controller";
import * as previousWorkController from "../controllers/previousWork.controller";

const router = Router();

// Authentication routes
router.post("/login", authController.login);
router.post("/refresh", authController.refresh);
router.post("/logout", authenticate, authController.logout);
router.get("/profile", authenticate, authController.getProfile);

// Previous Work routes (Protected - Admin only)
router.post(
  "/previous-work",
  authenticate,
  uploadPreviousWorkImages.array("images", 10),
  previousWorkController.createPreviousWork
);

router.put(
  "/previous-work/:id",
  authenticate,
  uploadPreviousWorkImages.array("images", 10),
  previousWorkController.updatePreviousWork
);

router.delete("/previous-work/:id", authenticate, previousWorkController.deletePreviousWork);

router.patch("/previous-work/:id/toggle-featured", authenticate, previousWorkController.toggleFeatured);

router.delete("/previous-work/:id/image", authenticate, previousWorkController.deleteImage);

export default router;
