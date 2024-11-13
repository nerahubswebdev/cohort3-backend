import express from "express";
import {
  createProject,
  testProject,
} from "../controllers/project.controllers.js";
import { validateUser } from "../middlewares/validate-user.js";
import { rolevalidation } from "../middlewares/role-validation.js";

const router = express.Router();

router.post("/test", validateUser, rolevalidation, testProject);
router.post("/create-project", validateUser, rolevalidation, createProject);
router.patch("/update-project");
router.get("/getall-projects");
router.get("/getsingle-project");
router.delete("/delete-project");

export default router;
