"use client"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Status} from "@prisma/client"
import {useRouter} from "next/navigation"
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime"

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
    const router: AppRouterInstance = useRouter()

    return (
        <Select onValueChange={(status) => {
            //  If the passed status is set to "All" then return a blank query, else set to mapped status
            const query = status === "ALL" ? "" : `?status=${status}`
            router.push(`/issues/list${query}`)
        }}>
            <SelectTrigger className="flex items-center w-[40%] md:w-[16%]">
                <SelectValue placeholder="Filter By Status..." />
                <SelectContent>
                    {statuses.map((status) => (
                        <SelectItem key={status.value} value={status.value ?? 'ALL'}>
                            {status.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </SelectTrigger>
        </Select>
    )
}
export default IssueStatusFilter