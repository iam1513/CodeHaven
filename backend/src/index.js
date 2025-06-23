import express from 'express';
import cors from 'cors';
import { PORT } from "./config/serverConfig.js";
import apiRouter from "./routes/index.js";
import { Server } from "socket.io"
import { createServer } from "node:http"
import chokidar from "chokidar"
import path from "path"
import { handleEditorSocketEvents } from './socketHandlers/editorHandler.js';
import queryString from 'query-string';

const app = express();
const server = createServer(app)

// Need to set cors again for socket
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

io.on('connection', (socket) => {
    console.log("User Connected")
})

app.use("/api", apiRouter);
app.get('/', (req, res) => {
    return res.json({
        "message": "Welcome to the backend server",
    })
})

// Use namespace to separate socket connection for editor and terminal
const editorNamespace = io.of('/editor')

editorNamespace.on("connection", (socket) => {
    console.log("Editor connected")

    const queryParams = socket.handshake.query;
    let projectId = queryParams.projectId;

    console.log("Project ID from query params:", projectId);

    // Exclude Node_Module changes all the time 
    if (projectId) {
        // Scope wont be limited to the function when var is used
        var watcher = chokidar.watch(`./projects/${projectId}`, {
            ignored: (path) => path.includes("node_modules"),
            persistent: true, // keeps the watcher in  runnning stage till the time app is running 
            // Wait for sometime before sending an event
            awaitWriteFinish: {
                stabilityThreshold: 2000 // Ensures stability of files before triggering events
            },
            ignoreInitial: true // Ignore the initialized files 
        })

        watcher.on("all", (event, path) => {
            console.log(event, path)
        })

    }

    handleEditorSocketEvents(socket, editorNamespace);

    socket.on("disconnect", async () => {
        await watcher.close()
        console.log("Editor disconnected")
    })

})

// Instead of app , we will use server so we can use both http nd socket on same port
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})