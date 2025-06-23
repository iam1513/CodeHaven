import { create } from 'zustand';

export const useEditorSocketStore = create((set, get) => ({
    editorSocket: null,
    setEditorSocket: (incomingSocket) => {
        set({ editorSocket: incomingSocket });
    }
}))