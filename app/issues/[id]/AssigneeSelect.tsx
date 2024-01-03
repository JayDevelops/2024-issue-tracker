"use client"
import {
    Select,
    SelectContent, SelectGroup,
    SelectItem, SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Issue, User} from "@prisma/client"
import axios from "axios"
import {useQuery} from "react-query"
import Skeleton from "@/components/Skeleton/Skeleton"


const AssigneeSelect = ({issue}: {issue: Issue}) => {
    //  User react query to retrieve the user data, then handle errors and isLoading states.
    const {data: users, error, isLoading} = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: () => axios.get("/api/users").then(res => res.data),
        staleTime: 60 * 1000, // 60 seconds where users are refreshed
        retry: 3,   // every 3 seconds the api will retry to retrieve users
    })

    //  If the data is loading from React Query, then render a Skeleton to the user
    if(isLoading) return <Skeleton />

    // If error occurs three times then return null
    if(error) return null

    return (
        <Select defaultValue={issue.assignedToUserId || "unassigned"} onValueChange={(userId) => {
            const assignToUser = userId === "unassigned" ? null : userId
            axios.patch("/api/issues/" + issue.id, {assignedToUserId: assignToUser})
        }}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Assign..." />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Suggestions</SelectLabel>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                    {users?.map((user) => (
                        <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
export default AssigneeSelect