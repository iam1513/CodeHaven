import axios from "../config/axiosConfig"

export const pingApi = async () => {
    try {
        const response = await axios.get("/api/v1/ping");
        console.log("Response from pingApi:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error in pingApi:", error);
        throw error;
    }
}