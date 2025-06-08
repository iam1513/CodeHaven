import React from 'react';
import { Button, Layout } from 'antd';
import { useCreateProject } from '../hooks/apis/mutations/useCreateProject'

const CreateProject = () => {

    const { createProjectMutation, isPending, isSuccess, error } = useCreateProject()
    const { Header, Content, Footer } = Layout

    const layoutStyle = {
        borderRadius: 8,
        overflow: 'hidden',
        width: 'calc(50% - 8px)',
        maxWidth: 'calc(50% - 8px)',
    };

    const headerStyle = {
        textAlign: 'center',
        color: '#fff',
        height: 64,
        paddingInline: 48,
        lineHeight: '64px',
        backgroundColor: '#4096ff',
    };

    const contentStyle = {
        textAlign: 'center',
        minHeight: 120,
        lineHeight: '120px',
        color: '#fff',
        backgroundColor: '#0958d9',
    };
    const siderStyle = {
        textAlign: 'center',
        lineHeight: '120px',
        color: '#fff',
        backgroundColor: '#1677ff',
    };
    const footerStyle = {
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#4096ff',
    };

    async function handleCreateProject() {
        console.log("Creating project...")
        try {
            await createProjectMutation()
            console.log("Now we should redirect to the editor")
        } catch (err) {
            console.error("Failed to create project:", err)
        }
    }

    return (
        <Layout style={layoutStyle}>
            <Header style={headerStyle}>
                <h1>Create Project</h1>
            </Header>
            <Content style={contentStyle}>

                <Button
                    onClick={handleCreateProject}>
                    Create Playground
                </Button>

            </Content>
            <Footer style={footerStyle}>
                © 2023 Your Company
            </Footer>
        </Layout>
    )
}

export default CreateProject