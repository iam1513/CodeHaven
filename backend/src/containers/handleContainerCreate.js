import Docker from 'dockerode';
import path from 'path';
const docker = new Docker();

export const handleContainerCreate = async (projectId, socket) => {
    console.log("Creating container for project:", projectId);
    try {
        const projectPath = path.resolve(`../../projects/${projectId}`);

        const container = await docker.createContainer({
            Image: 'sandbox',
            AttachStdin: true,
            AttachStdout: true,
            AttachStderr: true,
            Cmd: ['/bin/bash'],
            Tty: true,
            User: "sandbox",
            HostConfig: {
                Binds: [`${projectPath}:/home/sandbox/app`],
                PortBindings: {
                    '5173/tcp': [{ HostPort: "0" }]
                },
                ExposedPorts: {
                    '5173/tcp': {}
                },
                Env: ["HOST=0.0.0.0"] // ✅ Fixed spacing
            }
        });

        console.log("Container created:", container.id);
        await container.start();
        console.log("Container started successfully");

        container.exec({
            Cmd: ['/bin/bash'],
            User: "sandbox",
            AttachStdin: true,
            AttachStdout: true,
            AttachStderr: true,
            Tty: true
        }, (err, exec) => {
            if (err) {
                console.log("Error in exec:", err);
                return;
            }

            exec.start({ hijack: true, stdin: true }, (err, stream) => {
                if (err) {
                    console.error("Error starting exec:", err);
                    return;
                }

                processStream(stream, socket);

                socket.on('shell-input', (data) => {
                    // console.log("Received shell input:", data);
                    stream.write("pwd\n", (err) => {
                        if (err) {
                            console.error("Error writing to stream:", err);
                        } else {
                            console.log("Sent 'pwd' command to container");
                        }
                    });
                });
            });
        });

    } catch (error) {
        console.error("Error creating container:", error);
    }
};

function processStream(stream, socket) {
    stream.on('data', (data) => {
        socket.emit('shell-output', data.toString());
    });

    stream.on('end', () => {
        console.log("Stream ended");
        socket.emit('shell-output', 'Stream ended');
    });

    stream.on('error', (error) => {
        console.log("Stream error", error);
        socket.emit('shell-output', 'Stream error');
    });
}
