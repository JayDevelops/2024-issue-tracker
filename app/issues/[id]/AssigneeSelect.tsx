"use client"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Issue, User} from "@prisma/client"
import axios from "axios"
import {useQuery} from "react-query"
import Skeleton from "@/components/Skeleton/Skeleton"
import {useToast} from "@/components/ui/use-toast"
import {ToastAction} from "@/components/ui/toast"


const AssigneeSelect = ({issue}: {issue: Issue}) => {
    const { toast } = useToast()

    //  User react query to retrieve the user data, then handle errors and isLoading states.
    const {data: users, error, isLoading} = useUsers()

    //  If the data is loading from React Query, then render a Skeleton to the user
    if(isLoading) return <Skeleton />

    // If error occurs three times then return null
    if(error) return null

    //  handleSetAssignee() checks if the user sets an unassigned value or to a different user,
    //  then updates on the database
    const handleSetAssignee = async (userId: string) => {
        //  Check if the userId is unassigned then set to unassigned, else set to the passed userId string
        const assignToUser = userId === "unassigned" ? null : userId;

        //  Patch (update) the issue to the userId or null if unassigned
        await axios
            .patch("/api/issues/" + issue.id, { assignedToUserId: assignToUser })
            .catch(() => {
                toast({
                    variant: "destructive",
                    title: "Something went wrong.",
                    description: "Changes could not be saved",
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                })
            })
    }

    return (
        <Select defaultValue={issue.assignedToUserId || "unassigned"} onValueChange={handleSetAssignee}>
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

const useUsers = () => useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then(res => res.data),
    staleTime: 60 * 1000, // 60 seconds where users are refreshed
    retry: 3,   // every 3 seconds the api will retry to retrieve users
})

export default AssigneeSelect

