import express  from "express";
import { getALLProjects, getProjectById, getUserCredits, toggleProjectPublic } from "../controllers/userController.js";
import { protect } from "../Middleware/auth.js";

const userRouter = express.Router();

userRouter.get('/credits',protect,getUserCredits)
userRouter.get('/projects',protect,getALLProjects)
userRouter.get("/projects/:projectId", protect, getProjectById)
userRouter.get("/publish/:projectId", protect, toggleProjectPublic)

export default userRouter;