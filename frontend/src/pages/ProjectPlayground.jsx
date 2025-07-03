import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { EditorComponent } from '../components/molecules/EditorComponent/EditorComponent'
import { EditorButton } from '../components/atoms/EditorButton/EditorButton'
import { TreeStructure } from '../components/organisms/treeStructure/treeStructure'
import { useTreeStructureStore } from '../store/treeStructureStore'
import { useEditorSocketStore } from '../store/editorSocketStore'
import { io } from "socket.io-client"
import BrowserTerminal from '../components/molecules/BrowserTerminal/BrowserTerminal'

const ProjectPlayground = () => {

    const { projectId: projectIdFromUrl } = useParams()

    const { setProjectId, projectId } = useTreeStructureStore()

    const { setEditorSocket } = useEditorSocketStore()

    useEffect(() => {
        console.log("projectIdFromUrl from route:", projectIdFromUrl); // <== LOG THIS
        if (projectIdFromUrl && projectIdFromUrl !== "undefined") {
            setProjectId(projectIdFromUrl)
            const editorSocketConn = io(`${import.meta.env.VITE_BACKEND_URL}/editor`, {
                query: {
                    projectId: projectIdFromUrl
                }
            })
            setEditorSocket(editorSocketConn)
        }
    }, [setProjectId, projectIdFromUrl, setEditorSocket])

    return (

        <>
            <div style={{
                display: "flex"
            }}>
                {projectId && (
                    <div
                        style={{
                            backgroundColor: "#22213c",
                            paddingRight: "10px",
                            paddingTop: "0.3vh",
                            minWidth: "250px",
                            maxWidth: "25%",
                            height: "99.7vh",
                            overflow: "auto"
                        }}
                    >
                        <TreeStructure />
                    </div>
                )}
                <EditorComponent />
            </div>
            <EditorButton isActive={true} />
            <EditorButton isActive={false} />
            <div>
                <div>
                    <BrowserTerminal />
                </div>
            </div>
        </ >
    )
}

export default ProjectPlayground