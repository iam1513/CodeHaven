import fs from "fs/promises"
import path from "path"

export const handleEditorSocketEvents = (socket) => {
    socket.on("writeFile", async ({ data, pathToFileOrFolder }) => {
        try {
            await fs.writeFile(pathToFileOrFolder, data)
            socket.emit("fileWriteSuccessfull", {
                data: "File written successfully"
            })
        } catch (error) {
            console.log("errror writing file", error)
            socket.emit("error", {
                data: "Error writing the file"
            })
        }
    })

    socket.on("createFile", async ({ pathToFileOrFolder }) => {
        const isFileAlreadyPresent = await fs.stat(pathToFileOrFolder)
        if (isFileAlreadyPresent) {
            console.log("errror creating file", error)
            socket.emit("error", {
                data: "File already exists"
            })
            return
        }

        try {
            const response = await fs.writeFile(pathToFileOrFolder, "")
            socket.emit("createFileSuccess", {
                data: "File created successfully"
            })
        } catch (error) {
            console.log("error creating a file", error)
            socket.emit("error", {
                data: "Error creating the file"
            })
        }
    })

    socket.on("readFile", async ({ pathToFileOrFolder }) => {
        try {
            const response = await fs.readFile(pathToFileOrFolder)
            // console.log("response from reading a file", response.toString())
            socket.emit("readFileSuccess", {
                value: response.toString(),
                path: pathToFileOrFolder
            })
        } catch (error) {
            console.log("error reading a file", error)
            socket.emit("error", {
                data: "Error reading the file"
            })
        }
    })

    socket.on("deleteFile", async ({ pathToFileOrFolder }) => {
        try {
            const response = fs.unlink(pathToFileOrFolder)
            socket.emit("deleteFileSuccess", {
                data: "File deleted successfully"
            })
        } catch (error) {
            console.log("error deleting a file", error)
            socket.emit("error", {
                data: "Error deleting the file"
            })
        }
    })

    socket.on("createFolder", async ({ pathToFileOrFolder }) => {
        try {
            const response = fs.mkdir(pathToFileOrFolder)
            socket.emit("createFolderSuccess", {
                data: "folder created successfully"
            })
        } catch (error) {
            console.log("Error creating a folder", error)
            socket.emit("error", {
                data: "Error creating a folder"
            })
        }
    })

    socket.on("deleteFolder", async ({ pathToFileOrFolder }) => {
        try {
            const response = await fs.rmdir(pathToFileOrFolder, { recursive: true })
            socket.emit("deleteFolderSuccess", {
                data: "folder deleted successfully"
            })
        } catch (error) {
            console.log("Error deleting a folder", error)
            socket.emit("error", {
                data: "Error deleting a folder"
            })
        }
    })
}