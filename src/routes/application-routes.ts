import { Router } from "express";
import { authenticateUser } from "../middleware/authenticate";

const router = Router();

router.get("/applications", authenticateUser, getAllApplications);
router.post("/applications", authenticateUser, addApplication);
router.delete("/applications/:id", authenticateUser, deleteApplication);
router.put("/applications/:id", authenticateUser, editApplication);

export default router;
