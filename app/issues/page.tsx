import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import prisma from "@/prisma/client"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import IssueStatusBadge from "@/components/IssueStatusBadge";


const IssuesPage = async () => {
    // Retrieve the issues from the DB
    const issues = await prisma.issue.findMany()
    const newIssuePageRoute: string = "/issues/new"

    return (
        <div>
            <div className="mb-5">
                <Link className={buttonVariants({ variant: "primaryBlue" })} href={newIssuePageRoute}>New Issue</Link>
            </div>

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
                                        {issue.title}
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