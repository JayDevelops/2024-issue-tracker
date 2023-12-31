import prisma from "@/prisma/client"
import {notFound} from "next/navigation"
import EditIssueButton from "@/app/issues/[id]/EditIssueButton"
import IssueDetails from "@/app/issues/[id]/IssueDetails"

interface IssueDetailPageProps {
    params: {id: string}
}

const IssueDetailPage = async ({params}: IssueDetailPageProps) => {
    //  Find/Grab the requested clicked issue
    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(params.id)}
    })

    //  If the issue doesn't exist, then redirect the user to the not-found page
    if(!issue) {
        return notFound()
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <IssueDetails issue={issue} />
            </div>

            <div className="md:mt-0">
                <EditIssueButton issueId={issue.id} />
            </div>
        </div>
    )
}


export default IssueDetailPage