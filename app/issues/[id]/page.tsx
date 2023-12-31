import prisma from "@/prisma/client"
import {notFound} from "next/navigation"
import {HeadingOneH1} from "@/components/typography/headings/heading-one";
import IssueStatusBadge from "@/components/IssueStatusBadge";
import {Text} from "@/components/typography/Text";
import {Card, CardDescription, CardHeader} from "@/components/ui/card";
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
            <HeadingOneH1>{issue.title}</HeadingOneH1>
            <div className="flex flex-row space-x-3">
                <Text>{issue.createdAt.toDateString()}</Text>
                <IssueStatusBadge status={issue.status} />
            </div>

            <Card className="my-4">
                <CardHeader>
                    <CardDescription>{issue.description}</CardDescription>
                </CardHeader>
            </Card>
        </div>
    )
}


export default IssueDetailPage