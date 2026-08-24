import { Router } from "express";

const router = Router();

router.get("/applications", getAllApplications);
router.post("/applications", addApplication);
router.delete("/applications/:id", deleteApplication);
router.put("/applications/:id", editApplication);

export default router;
