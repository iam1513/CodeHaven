import { create } from 'zustand';
import { useActiveFileTabStore } from './activeFileTab';

export const useEditorSocketStore = create((set, get) => ({
    editorSocket: null,

    setEditorSocket: (incomingSocket) => {

        // Dont do generic hook call instead zustand gives us the ability to call the store directly
        const activeFileTabSetter = useActiveFileTabStore.getState().setActiveFileTab;

        if (incomingSocket) {
            incomingSocket.on("readFileSuccess", (data) => {
                activeFileTabSetter(data.path, data.value);
            })
        }

        incomingSocket?.on("writeFileSuccess", (data) => {
            console.log("File written successfully", data);
            // incomingSocket.emit("readFile", {
            //     pathToFileOrFolder: data.path
            // });
        })

        set({ editorSocket: incomingSocket });
    }
}))