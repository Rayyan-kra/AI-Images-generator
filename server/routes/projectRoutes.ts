import express from "express";
import {
  createProject,
  deleteProject,
  getALLPublishedProjects,
} from "../controllers/projectController.js";
import { protect } from "../Middleware/auth.js";
import upload from "../configs/multer.js";

const projectRouter = express.Router();

projectRouter.post("/create", upload.array("images", 2), protect, createProject);
projectRouter.get("/published", getALLPublishedProjects);
projectRouter.delete("/:projectId", protect, deleteProject);

export default projectRouter;
