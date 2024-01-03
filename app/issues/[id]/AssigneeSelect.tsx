"use client"
import {
    Select,
    SelectContent, SelectGroup,
    SelectItem, SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {useEffect, useState} from "react"
import {User} from "@prisma/client"
import axios from "axios"


const AssigneeSelect = () => {
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        const fetchUsers = async() => {
            const {data} = await axios.get<User[]>("/api/users")
            setUsers(data)
        }
        fetchUsers()
    }, [])
    return (
        <Select>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Assign..." />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Suggestions</SelectLabel>
                    {users.map((user) => (
                        <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
export default AssigneeSelect