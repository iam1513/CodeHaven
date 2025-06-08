import axiosInstance from "../config/axiosConfig";
export const createProjectApi = async () => {
    try {
        const response = await axiosInstance.post("/api/v1/projects");
        console.log("Project created successfully:", response.data);
        return response.data; // Return the project ID or any other relevant data
    } catch (error) {
        console.error("Error creating project:", error);
        throw error; // Re-throw the error to be handled by the calling function
    }
}