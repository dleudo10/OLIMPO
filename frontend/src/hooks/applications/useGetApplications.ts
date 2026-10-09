import { useQuery } from "@tanstack/react-query"
import { getApplications } from "../../services/applications.api"

export const useGetApplications = () => {
    return useQuery({
        queryKey: ["applications"],
        queryFn: ({ signal }) => getApplications({
            signal
        }),
    })
}  