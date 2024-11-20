import express from "express";
import {
  login,
  logout,
  register,
  validate,
} from "../controllers/auth.controllers.js";
import { validateUser } from "../middlewares/validate-user.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/validate", validateUser, validate);
router.post("/logout", validateUser, logout);

export default router;
