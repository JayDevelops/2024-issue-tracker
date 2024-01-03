import prisma from "@/prisma/client"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import IssueActions from "@/app/issues/list/IssueActions";
import {Link} from "@/components/Link"
import IssueStatusBadge from "@/components/IssueStatusBadge";
import {Status} from "@prisma/client";

interface IssuePageProps {
    searchParams: {status: Status}
}
const IssuesPage = async ({searchParams}: IssuePageProps) => {
    const statuses = Object.values(Status)
    const status  = statuses.includes(searchParams.status) ? searchParams.status : undefined

    // Retrieve the issues from the DB
    const issues = await prisma.issue.findMany({
        where: {status}
    })

    return (
        <div>
            {/*Render the top of the Issue Page.*/}
            <IssueActions />

            {/*Parent divs add border and adjust the table within that border*/}
            <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Issue</TableHead>
                                <TableHead className="hidden md:table-cell">Status</TableHead>
                                <TableHead className="hidden md:table-cell">Created</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {issues.map((issue) => (
                                <TableRow key={issue.id}>
                                    <TableCell>
                                        <Link href={`/issues/${issue.id}`} customColorVariant="primaryBlue">
                                            {issue.title}
                                        </Link>
                                        <div className="block md:hidden">
                                            <IssueStatusBadge status={issue.status} />
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <IssueStatusBadge status={issue.status} />
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">{issue.createdAt.toDateString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

        </div>
    )
}

// Tells Next.js to dynamically re-rendering at browser refresh
export const dynamic = 'force-dynamic'

// Next.js will revalidate the data every 0 seconds when on the Issues Page
// export const revalidate: number = 0;

export default IssuesPage