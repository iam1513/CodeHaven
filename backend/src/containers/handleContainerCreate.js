import Docker from 'dockerode';
// import path from 'path';
const docker = new Docker();
import fs from 'fs';
export const listContainer = async () => {

    const containers = await docker.listContainers();
    console.log("Containers", containers);
    // PRINT PORTS ARRAY FROM ALL CONTAINER
    containers.forEach((containerInfo) => {
        console.log(containerInfo.Ports);
    })
}


export const handleContainerCreate = async (projectId) => {
    console.log("Project id received for container create:", projectId);

    //  Set a proper path or it will create much of issue
    // TOOK LIKE & HRS TO FIX THIS 
    const hostPath = `${process.cwd().replace(/\\/g, '/').replace('/src', '')}/projects/${projectId}`;
    if (!fs.existsSync(hostPath)) {
        console.error("Project folder missing at:", hostPath);
        throw new Error("Project directory does not exist");
    }

    try {
        const existingContainers = await docker.listContainers({
            all: true,
            filters: { name: [projectId] }
        });

        if (existingContainers.length > 0) {
            console.log("Removing existing container:", projectId);
            const container = docker.getContainer(existingContainers[0].Id);
            await container.remove({ force: true });
        }

        const container = await docker.createContainer({
            Image: 'sandbox',
            AttachStdin: true,
            AttachStdout: true,
            AttachStderr: true,
            Cmd: ['/bin/bash'],
            name: projectId,
            Tty: true,
            User: 'sandbox',
            Volumes: {
                "/home/sandbox/app": {}
            },
            ExposedPorts: {
                "5173/tcp": {}
            },
            Env: ["HOST=0.0.0.0"],
            HostConfig: {
                Binds: [
                    `${hostPath}:/home/sandbox/app`
                ],
                PortBindings: {
                    "5173/tcp": [{ HostPort: "0" }]
                }
            }
        });

        await container.start();
        console.log("Container started:", container.id);

        return container;
    } catch (error) {
        console.error("Error while creating container:", error);
        throw error;
    }
};



export async function getContainerPort(containerName) {
    const container = await docker.listContainers({
        name: containerName
    });

    if (container.length > 0) {
        const containerInfo = await docker.getContainer(container[0].Id).inspect();
        console.log("Container info", containerInfo);
        try {
            return containerInfo?.NetworkSettings?.Ports["5173/tcp"][0].HostPort;
        } catch (error) {
            console.log("port not present");
            return undefined;
        }

    }
}