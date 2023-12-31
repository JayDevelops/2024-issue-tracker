import React from 'react'
import {Button} from "@/components/ui/button";
import Link from "next/link"
import {Pencil2Icon} from "@radix-ui/react-icons"

const EditIssueButton = ({issueId}: {issueId: number}) => {
    return (
        <Button asChild variant="primaryBlue">
            <Link href={`/issues/edit/${issueId}`}> <Pencil2Icon /> &nbsp; Edit Issue</Link>
        </Button>
    )
}

export default EditIssueButton