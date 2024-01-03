"use client"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Status} from "@prisma/client"
import {ReadonlyURLSearchParams, useRouter, useSearchParams} from "next/navigation"
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
    const searchParams: ReadonlyURLSearchParams = useSearchParams()

    return (
        <Select defaultValue={searchParams.get("status") || ""} onValueChange={(status) => {
            const params = new URLSearchParams()

            // If there is a status, then append the status to the passed status parameter
            if(status) params.append("status", status)

            // If there is a parameter with orderBy then append to the query parameters
            if(searchParams.get("orderBy")) {
                params.append("orderBy", searchParams.get("orderBy")!)
            }
            //  If the passed status is set to "All" then return a blank query, else set to mapped status
            const query = params.size ? "?" + params.toString(): ""
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