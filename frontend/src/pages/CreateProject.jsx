import React from 'react';
import { Button, Col, Row } from 'antd';
import { useCreateProject } from '../hooks/apis/mutations/useCreateProject'
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {

    const { createProjectMutation, isPending, isSuccess, error } = useCreateProject()

    const navigate = useNavigate()

    async function handleCreateProject() {
        console.log("Creating project...")
        try {
            const response = await createProjectMutation()
            console.log("Now we should redirect to the editor")
            navigate(`/projects/${response.data}`)
        } catch (err) {
            console.error("Failed to create project:", err)
        }
    }
    return (
        <>
            <Row>
                <Col span={24}>
                    <Button
                        type='primary'
                        onClick={handleCreateProject}>
                        Create Playground
                    </Button>
                </Col>
            </Row>
        </>
    )
}

export default CreateProject