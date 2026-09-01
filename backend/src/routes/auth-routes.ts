import { Router } from "express";
import {
  register,
  login,
  refresh,
  logout,
} from "../controllers/auth-controller";
import { validateAuth } from "../middleware/validation";

const router = Router();

router.post("/register", validateAuth, register);
router.post("/login", validateAuth, login);
router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;
