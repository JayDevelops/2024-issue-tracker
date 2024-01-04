import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import NextLink from "next/link"
import {ArrowUpIcon} from "@radix-ui/react-icons"
import {Link} from "@/components/Link"
import IssueStatusBadge from "@/components/IssueStatusBadge"
import {Issue, Status} from "@prisma/client"

export interface IssueQuery {
    status: Status,
    orderBy: keyof Issue,
    page: string,
}
interface IssueTableProps {
    searchParams: IssueQuery,
    issues: Issue[],
}

const IssueTable = ({searchParams, issues}: IssueTableProps) => {
    if (!issues || issues.length === 0) {
        return null
    }

    return (
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
    )
}


//  Columns for the table headers below and it's associated types
type columnLabels = {label: string, value: keyof Issue, className?: string}

const columns: columnLabels[] = [
    {label: "Issue", value: "title"},
    {label: "Status", value: "status", className: "hidden md:table-cell"},
    {label: "Created", value: "createdAt", className: "hidden md:table-cell"},
]

//  Export only the column names for the list/page.tsx component
export const columnNames = columns.map(column => column.value)
export default IssueTable