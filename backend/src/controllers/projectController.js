import util from 'util';
import child_process from 'child_process';
import fs from 'fs/promises';
import uuid4 from 'uuid4';

// Promisify exec to use async/await
const execPromisified = util.promisify(child_process.exec);

export const createProjectController = async (req, res) => {

    // Create a unique id and inside a project folder create a new folder of that id
    const projectId = uuid4();
    console.log("Project ID:", projectId);

    await fs.mkdir(`./projects/${projectId}`)

    // After this , call npm create vite command in newly created folder
    const response = await execPromisified(`npm create vite@latest codehaven -- --template react-ts`, {
        cwd: `./projects/${projectId}`,
    });

    return res.json({
        "message": "Project created successfully",
        "data": projectId
    });

}