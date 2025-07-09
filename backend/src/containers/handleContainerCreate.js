import Docker from 'dockerode';
import path from 'path';
const docker = new Docker();

export const handleContainerCreate = async (projectId, terminalSocket, req, tcpSocket, head) => {
    console.log("Creating container for project:", projectId);
    try {
        const projectPath = `${process.cwd().replace(/\\/g, '/').replace('/src', '')}/projects/${projectId}`;
        // console.log("Project path:", projectPath);
        // const dockerProjectPath = toDockerPath(projectPath);
        // console.log("Docker project path:", dockerProjectPath);

        const container = await docker.createContainer({
            Image: 'sandbox',
            AttachStdin: true,
            AttachStdout: true,
            AttachStderr: true,
            Cmd: ['/bin/bash'],
            Tty: true,
            User: "sandbox",
            ExposedPorts: {
                '5173/tcp': {}
            },
            Env: ["HOST=0.0.0.0"],
            HostConfig: {
                Binds: [`${projectPath}:/home/sandbox/app`],
                PortBindings: {
                    '5173/tcp': [{ HostPort: "0" }]
                },
            }
        });

        console.log("Container created:", container.id);
        await container.start();
        console.log("Container started successfully");

        terminalSocket.handleUpgrade(req, tcpSocket, head, (establishedWSConn) => {
            terminalSocket.emit("connection", establishedWSConn, req, container)
        })

    } catch (error) {
        console.error("Error creating container:", error);
    }
};
