import { Router } from "express";

const router = Router();

router.post("/register", registerUser);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;
