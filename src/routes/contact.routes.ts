import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { getContact, postContact, patchContact } from "../controllers/contact.controller";






const router = Router();

router.get('/contact', getContact);
router.post('/contact',authenticate , postContact) //add or replace contact
router.patch('/contact', authenticate, patchContact); // Partial update (protected)

export default router;