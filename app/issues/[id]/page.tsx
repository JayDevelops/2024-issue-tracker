import prisma from "@/prisma/client"
import {notFound} from "next/navigation"
import {HeadingOneH1} from "@/components/typography/headings/heading-one"
import IssueStatusBadge from "@/components/IssueStatusBadge"
import {Text} from "@/components/typography/Text"
import {Card} from "@/components/ui/card"
import ReactMarkdown from "react-markdown"
import {Button} from "@/components/ui/button"
import {Pencil2Icon} from "@radix-ui/react-icons"
import Link from "next/link";

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
                <HeadingOneH1>{issue.title}</HeadingOneH1>
                <div className="flex flex-row space-x-3">
                    <Text>{issue.createdAt.toDateString()}</Text>
                    <IssueStatusBadge status={issue.status}/>
                </div>

                <Card className="my-4">
                    <ReactMarkdown className="prose prose-stone dark:prose-invert p-3">
                        {issue.description}
                    </ReactMarkdown>

                </Card>
            </div>

            <div className="md:mt-0">
                <Button asChild variant="primaryBlue">
                    <Link href={`/issues/${issue.id}/edit`}> <Pencil2Icon /> &nbsp; Edit Issue</Link>
                </Button>

            </div>
        </div>
    )
}


export default IssueDetailPage