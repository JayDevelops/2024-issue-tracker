"use client"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Status} from "@prisma/client"

type statusLabelValue = {
    label: string,
    value?: Status,
}

const statuses:statusLabelValue[] = [
    {label: "All"},
    {label: "Open", value: "OPEN"},
    {label: "Closed", value: "CLOSED"},
    {label: "In Progress", value: "IN_PROGRESS"},
]

const IssueStatusFilter = () => {
    return (
        <Select>
            <SelectTrigger className="flex items-center w-[40%] md:w-[16%]">
                <SelectValue placeholder="Filter By Status..." />
                <SelectContent>
                    {statuses.map((status) => (
                        <SelectItem key={status.value} value={status.value || "null"}>
                            {status.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </SelectTrigger>
        </Select>
    )
}
export default IssueStatusFilter