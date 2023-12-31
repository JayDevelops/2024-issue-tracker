import React from 'react'
import {Button} from "@/components/ui/button";
import Link from "next/link"
import {Pencil2Icon} from "@radix-ui/react-icons"

const Editor = ({issueId}: {issueId: number}) => {
    return (
        <Button asChild variant="primaryBlue">
            <Link href={`/issues/${issueId}/edit`}> <Pencil2Icon /> &nbsp; Edit Issue</Link>
        </Button>
    )
}

export default Editor