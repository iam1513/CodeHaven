import { createProjectService, getProjectTreeService } from "../services/projectService.js"

export const createProjectController = async (req, res) => {

    const projectId = await createProjectService()

    return res.json({
        message: "Project created successfully",
        data: projectId
    })

}

export const getProjectTreeController = async (req, res) => {
    const tree = await getProjectTreeService(req.params.projectId)
    return res.status(200).json({
        message: "Project tree fetched successfully",
        data: tree,
        success: true
    })
}