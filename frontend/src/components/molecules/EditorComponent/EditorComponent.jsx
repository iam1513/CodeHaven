import Editor from '@monaco-editor/react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useActiveFileTabStore } from '../../../store/activeFileTab';
import { useEditorSocketStore } from '../../../store/editorSocketStore';

export const EditorComponent = () => {

    const [editorState, setEditorState] = useState({
        theme: null
    })
    const { activeFileTab } = useActiveFileTabStore()
    const { editorSocket } = useEditorSocketStore()

    async function downloadTheme() {
        const response = await fetch("/Dracula.json")
        const data = await response.json()
        setEditorState({ ...editorState, theme: data })
    }

    function handleEditorTheme(editor, monaco) {

        monaco.editor.defineTheme('dracula', editorState.theme);
        monaco.editor.setTheme('dracula');

    }

    let timerID = null;

    function handleChange(value) {

        // DEBOUNCING 

        // Clear the previous timer if it exists
        if (timerID !== null) {
            clearTimeout(timerID);
        }

        // Set a new timer
        timerID = setTimeout(() => {
            const editorContent = value;
            editorSocket.emit("writeFile", {
                data: editorContent,
                pathToFileOrFolder: activeFileTab?.path
            })
        }, 2000)
    }

    useEffect(() => {
        downloadTheme();
    }, [])

    return (
        <>
            {editorState.theme && (
                <Editor
                    height="100vh"
                    width="100%"
                    defaultLanguage={undefined}
                    defaultValue="// Welcome to the Playground"
                    theme="vs-dark"
                    options={{
                        fontSize: 24,
                        fontFamily: 'Fira Code, monospace',
                    }}
                    onChange={handleChange}
                    value={activeFileTab?.value !== undefined ? activeFileTab?.value : "// Welcome to the Playground"}
                    onMount={handleEditorTheme}
                />

            )}
        </>
    );
};
