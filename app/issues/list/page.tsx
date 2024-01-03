import prisma from "@/prisma/client"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import IssueActions from "@/app/issues/list/IssueActions";
import {Link} from "@/components/Link"
import NextLink from "next/link"
import IssueStatusBadge from "@/components/IssueStatusBadge";
import {Issue, Status} from "@prisma/client";
import {ArrowUpIcon} from "@radix-ui/react-icons";
import Pagination from "@/components/Pagination";

interface IssuePageProps {
    searchParams: {
        status: Status,
        orderBy: keyof Issue,
        page: string,
    }
}
type columnLabels = {label: string, value: keyof Issue, className?: string,}

const IssuesPage = async ({searchParams}: IssuePageProps) => {
    //  Columns for the table headers below
    const columns: columnLabels[] = [
        {label: "Issue", value: "title"},
        {label: "Status", value: "status", className: "hidden md:table-cell"},
        {label: "Created", value: "createdAt", className: "hidden md:table-cell"},
    ]

    //  Check if the status is a valid status from the passed searchParams
    const statuses = Object.values(Status)
    const status  = statuses.includes(searchParams.status) ? searchParams.status : undefined
    const where = {status}

    // Check if the orderBy params are valid
    const orderBy = columns.map(column => column.value).includes(searchParams.orderBy)
        ? { [searchParams.orderBy]: "asc"}
        : undefined

    //  Get the current page for pagination from the parameters
    const page: number = parseInt(searchParams.page) || 1
    const pageSize: number  = 10

    // Retrieve the issues from the DB
    const issues = await prisma.issue.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
    })

    //  Get the total issue count from prisma
    const issueCount = await prisma.issue.count({where,})

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
                                {columns.map((column) => (
                                    <TableHead key={column.value} className={column.className}>
                                        <NextLink href={{
                                            query: { ...searchParams, orderBy: column.value},
                                        }} className="underline font-bold">
                                            {column.label}
                                        </NextLink>
                                        {column.value === searchParams.orderBy && <ArrowUpIcon className="inline"/>}
                                    </TableHead>
                                ))}
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
            <Pagination itemCount={issueCount} pageSize={pageSize} currentPage={page} />
        </div>
    )
}

// Tells Next.js to dynamically re-rendering at browser refresh
export const dynamic = 'force-dynamic'

// Next.js will revalidate the data every 0 seconds when on the Issues Page
// export const revalidate: number = 0;

export default IssuesPage