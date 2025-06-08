import express from 'express';
import { pingController } from "../../controllers/pingController.js";
import projectRouter from "./projects.js";
const router = express.Router();
router.use("/ping", pingController)
router.use("/projects", projectRouter)
export default router;
