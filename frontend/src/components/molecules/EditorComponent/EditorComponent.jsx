import Editor from '@monaco-editor/react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useEditorSocketStore } from '../../../store/editorSocketStore';
import { useActiveFileTabStore } from '../../../store/activeFileTab';

export const EditorComponent = () => {

    const [editorState, setEditorState] = useState({
        theme: null
    })

    const { editorSocket } = useEditorSocketStore()
    const { activeFileTab, setActiveFileTab } = useActiveFileTabStore()

    async function downloadTheme() {
        const response = await fetch("/Dracula.json")
        const data = await response.json()
        setEditorState({ ...editorState, theme: data })
    }

    function handleEditorTheme(editor, monaco) {

        monaco.editor.defineTheme('dracula', editorState.theme);
        monaco.editor.setTheme('dracula');

    }

    if (editorSocket) {
        editorSocket.on("readFileSuccess", (data) => {
            console.log("File read successfully:", data);
            setActiveFileTab(data.path, data.value);
            console.log("Active file tab set:", activeFileTab);
        })
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
                    value={activeFileTab?.value !== undefined ? activeFileTab?.value : "// Welcome to the Playground"}
                    onMount={handleEditorTheme}
                />

            )}
        </>
    );
};
