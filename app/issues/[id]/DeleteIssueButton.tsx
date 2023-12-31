import React from 'react'
import {Button} from "@/components/ui/button"
import Link from "next/link"

const DeleteIssueButton = ({issueId}: {issueId: number}) => {
    return (
        <Button asChild variant="destructive">
            <Link href={`/issues/${issueId}/edit`}>Delete Issue</Link>
        </Button>
    )
}

export default DeleteIssueButton