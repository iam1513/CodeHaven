import util from 'util';
import fs from 'fs/promises';
import uuid4 from 'uuid4';
import { REACT_PROJECT_COMMAND } from '../config/serverConfig.js';
import directoryTree from 'directory-tree';
import path from 'path';
import { execPromisified } from '../utils/execUtility.js';

export const createProjectService = async () => {
    // Create a unique id and inside a project folder create a new folder of that id
    const projectId = uuid4();
    // console.log("Project ID:", projectId);
    await fs.mkdir(`./projects/${projectId}`);

    // After this , call npm create vite command in newly created folder
    const response = await execPromisified(REACT_PROJECT_COMMAND, {
        cwd: `./projects/${projectId}`,
    });

    return projectId;

}

export const getProjectTreeService = async (projectId) => {
    const projectPath = path.resolve(`./projects/${projectId}`);
    // console.log("Checking path:", projectPath,)
    const tree = directoryTree(projectPath);
    // console.log("In service , ", tree)
    return tree;
}