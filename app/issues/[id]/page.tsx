import prisma from "@/prisma/client"
import {notFound} from "next/navigation"
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
        <div>
            <p>{issue.title}</p>
            <p>{issue.description}</p>
            <p>{issue.status}</p>
            <p>{issue.createdAt.toDateString()}</p>
        </div>
    )
}


export default IssueDetailPage