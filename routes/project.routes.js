import express from "express";
import { createProject } from "../controllers/project.controllers.js";
import { validateUser } from "../middlewares/validate-user.js";

const router = express.Router();

router.post("/create-project", validateUser, createProject);
router.patch("/update-project");
router.get("/getall-projects");
router.get("/getsingle-project");
router.delete("/delete-project");

export default router;
