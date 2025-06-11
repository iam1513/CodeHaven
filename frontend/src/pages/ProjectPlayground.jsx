import React from 'react'
import { useParams } from 'react-router-dom'
import { EditorComponent } from '../components/molecules/EditorComponent/EditorComponent'
import { EditorButton } from '../components/atoms/EditorButton/EditorButton'

const ProjectPlayground = () => {

    const { projectId } = useParams()

    return (
        <div>
            Project ID : {projectId}
            <EditorComponent />
            <EditorButton isActive={true} />
            <EditorButton isActive={false} />
        </div>
    )
}

export default ProjectPlayground