import prisma from "@/prisma/client"
import {notFound} from "next/navigation"
import EditIssueButton from "@/app/issues/[id]/EditIssueButton"
import DeleteIssueButton from "@/app/issues/[id]/DeleteIssueButton"
import IssueDetails from "@/app/issues/[id]/IssueDetails"
import {getServerSession} from "next-auth";
import authOptions from "@/app/api/auth/authOptions";
import AssigneeSelect from "@/app/issues/[id]/AssigneeSelect";

interface IssueDetailPageProps {
    params: {id: string}
}

const IssueDetailPage = async ({params}: IssueDetailPageProps) => {
    const session = await getServerSession(authOptions)

    //  Find/Grab the requested clicked issue
    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(params.id)}
    })

    //  If the issue doesn't exist, then redirect the user to the not-found page
    if(!issue) {
        return notFound()
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            <div className="md:col-span-4">
                <IssueDetails issue={issue} />
            </div>


            {session && <div className="md:mt-0 max-w-full md:col-span-1">
                <div className="flex flex-col gap-4">
                    <AssigneeSelect />
                    <EditIssueButton issueId={issue.id}/>
                    <DeleteIssueButton issueId={issue.id} issueTitle={issue.title}/>
                </div>
            </div>
            }
        </div>
    )
}


export default IssueDetailPage