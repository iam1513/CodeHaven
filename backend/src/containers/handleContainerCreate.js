import Docker from 'dockerode';
import path from 'path';
const docker = new Docker();

export const handleContainerCreate = async (projectId, socket) => {
    console.log("Creating container for project:", projectId);
    try {

        const projectPath = path.resolve(`../../projects/${projectId}`);

        const container = await docker.createContainer({
            Image: 'sandbox', // Name given by me for the writtem Dockerfile
            AttachStdin: true,
            AttachStdout: true,
            AttachStderr: true,
            Cmd: ['/bin/bash'],
            Tty: true,
            User: "sandbox", // User created in Dockerfile
            HostConfig: {
                Binds: [
                    // Mounting the project directory to the container
                    `${projectPath}:/home/sandbox/app`, // Loading project directory as it to the container
                ],
                PortBindings: {
                    '5173/tcp': [{
                        "HostPort": "0" // Setting HostPort to 0 to let Docker assign a random port
                    }]
                },
                ExposedPorts: {
                    '5173/tcp': {}  // Exposing port 5173 for the container
                },
                Env: ["HOST = 0.0.0.0"]
            }
        })

        console.log("Container created:", container.id);

        await container.start();
        console.log("Container started successfully");

    } catch (error) {
        console.error("Error creating container:", error);
    }
}