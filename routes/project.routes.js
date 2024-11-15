import express from "express";
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  testProject,
  updateProject,
} from "../controllers/project.controllers.js";
import { validateUser } from "../middlewares/validate-user.js";
import { rolevalidation } from "../middlewares/role-validation.js";

const router = express.Router();

router.post("/test", validateUser, rolevalidation, testProject);
router.post("/create-project", validateUser, rolevalidation, createProject);
router.patch("/update-project/:id", validateUser, updateProject);
router.get("/getall-projects", getProjects);
router.get("/getsingle-project/:id", getProject);
router.delete("/delete-project/:id", validateUser, deleteProject);

export default router;
