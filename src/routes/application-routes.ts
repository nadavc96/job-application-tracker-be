import { Router } from "express";
import { authenticateUser } from "../middleware/authenticate";
import {
  getAllApplications,
  addApplication,
  deleteApplication,
} from "../controllers/applications-controller";
import {
  validateAddApplicationSchema,
  validateDeleteApplicationSchema,
} from "../middleware/validation";

const router = Router();

router.get("/applications", authenticateUser, getAllApplications);
router.post(
  "/applications",
  authenticateUser,
  validateAddApplicationSchema,
  addApplication,
);
router.delete(
  "/applications/:id",
  authenticateUser,
  validateDeleteApplicationSchema,
  deleteApplication,
);
router.put("/applications/:id", authenticateUser, editApplication);

export default router;
