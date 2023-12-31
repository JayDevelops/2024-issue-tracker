import prisma from "@/prisma/client"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import IssueStatusBadge from "@/components/IssueStatusBadge"
import IssueActions from "@/app/issues/IssueActions"
import Link from "next/link"


const IssuesPage = async () => {
    // Retrieve the issues from the DB
    const issues = await prisma.issue.findMany()


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
                                        <Link href={`/issues/${issue.id}`}>
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

export default IssuesPage