import {HeadingOneH1} from "@/components/typography/headings/heading-one"
import {Text} from "@/components/typography/Text"
import IssueStatusBadge from "@/components/IssueStatusBadge"
import {Card} from "@/components/ui/card"
import ReactMarkdown from "react-markdown"
import {Issue} from "@prisma/client"

const IssueDetails = ({issue}: {issue: Issue}) => {
    return (
        <>
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
        </>
    )
}

export default IssueDetails