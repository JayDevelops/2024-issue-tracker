import React from 'react'
import {Status} from '@prisma/client'
import { Badge } from "@/components/ui/badge"


/* Map the passed status parameter to its appropriate badgeVariant and label.
* Destructive badgeVariant is red (means the issue is open/needs to be fixed)
* resolved badgeVariant is green (means the issue was resolved)
* inProgress badgeVariant is blue (means the issue is pending)
* */
const statusMap: Record<Status, {label: string, badgeVariant: 'destructive' | 'inProgress' | 'resolved'}> = {
    OPEN: {
        label: 'Open',
        badgeVariant: 'destructive'
    },
    IN_PROGRESS: {
        label: 'In Progress',
        badgeVariant: 'inProgress',
    },
    CLOSED: {
        label: 'Closed',
        badgeVariant: 'resolved',
    },
}

const IssueStatusBadge = ({status}: { status: Status }) => {
    return (
        <Badge variant={statusMap[status].badgeVariant}>
            {statusMap[status].label}
        </Badge>
    )
}

export default IssueStatusBadge