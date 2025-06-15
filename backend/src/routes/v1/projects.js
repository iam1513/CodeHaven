import express from 'express';
import { createProjectController, getProjectTreeController } from '../../controllers/projectContoller.js';
// import { createProjectController } from '../../controllers/projectController.js';

const router = express.Router();

router.post("/", createProjectController)

router.get("/:projectId/tree", getProjectTreeController)

export default router;