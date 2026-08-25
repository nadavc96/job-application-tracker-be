import { Router } from "express";
import { authenticateUser } from "../middleware/authenticate";
import {
  getAllApplications,
  addApplication,
  deleteApplication,
  editApplication,
} from "../controllers/applications-controller";
import {
  validateAddApplication,
  validateDeleteApplication,
  validateEditApplication,
} from "../middleware/validation";

const router = Router();

router.get("/applications", authenticateUser, getAllApplications);
router.post(
  "/applications",
  authenticateUser,
  validateAddApplication,
  addApplication,
);
router.delete(
  "/applications/:id",
  authenticateUser,
  validateDeleteApplication,
  deleteApplication,
);
router.put(
  "/applications/:id",
  authenticateUser,
  validateEditApplication,
  editApplication,
);

export default router;
