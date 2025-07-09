export const handleTerminalCreation = (container, ws) => {
    container.exec({
        Cmd: ['bash', '-c', 'cd /home/sandbox/app && exec bash'],
        AttachStdin: true,
        AttachStdout: true,
        AttachStderr: true,
        Tty: true,
        User: "sandbox",
    }, (err, exec) => {
        if (err) {
            console.error("Error creating exec instance:", err);
            return;
        }

        exec.start({ hijack: true }, (err, stream) => {
            if (err) {
                console.error("Error starting exec instance:", err);
                return;
            }

            // Step 1 : Stream Processing
            processStreamOutput(stream, ws);

            // Step 2 : Stream Writing
            ws.on('message', (message) => {
                if (stream.writable) {
                    stream.write(message);
                } else {
                    console.warn("Stream is not writable");
                }
            });
        })
    })
}

function processStreamOutput(stream, ws) {

    let nextDataType = null; // Stores the type of data expected next
    let nextDataLength = null; // Stores the length of the next data chunk
    let buffer = Buffer.from(""); // Buffer to accumulate data chunks

    function processStreamData(data) {
        // Helper function to process the stream data
        if (data) {
            buffer = Buffer.concat([buffer, data]); // Concatenate new data to the buffer
        }

        if (!nextDataType) {
            // If we don't know the next data type, we need to read the next 8 bytes to determine the data type
            if (buffer.length >= 8) {
                const header = bufferSlicer(8) // Read the first 8 bytes
                nextDataType = header.readUInt8(0); // Read the first byte as the data type
                nextDataLength = header.readUInt32BE(4); // Read the next 4 bytes as the length of the data
                processStreamData()
            }
        } else {
            if (buffer.length >= nextDataLength) {
                const content = bufferSlicer(nextDataLength); // Slice the buffer to get the data chunk
                ws.send(content) // Send the data chunk to the WebSocket
                nextDataLength = null; // Reset the next data length
                nextDataType = null; // Reset the next data type
                processStreamData(); // Process the next data chunk
            }
        }
    }

    function bufferSlicer(end) {
        // Helper function to slice the buffer
        const output = buffer.slice(0, end); // Header of the chunk
        buffer = Buffer.from(buffer.slice(end, buffer.length)); // Update the buffer to remove the processed data
        return output; // Return the sliced output
    }

    stream.on('data', processStreamData)
}