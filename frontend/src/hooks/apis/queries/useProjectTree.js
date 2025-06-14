import { useQuery } from "@tanstack/react-query"
import { getProjectTree } from "../../../apis/projects"

export const useProjectTree = (projectId) => {
    const { isError, isLoading, error, data } = useQuery({
        queryFn: () => {
            getProjectTree(projectId)
        }
    })

    return {
        isError,
        isLoading,
        error,
        data
    }
}