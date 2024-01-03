import prisma from "@/prisma/client"
import IssueActions from "@/app/issues/list/IssueActions"
import {Status} from "@prisma/client"
import Pagination from "@/components/Pagination"
import IssueTable, {columnNames, IssueQuery} from "@/app/issues/list/IssueTable"

interface IssuePageProps {
    searchParams: IssueQuery,
}

const IssuesPage = async ({searchParams}: IssuePageProps) => {
    //  Check if the status is a valid status from the passed searchParams
    const statuses = Object.values(Status)
    const status  = statuses.includes(searchParams.status) ? searchParams.status : undefined
    const where = {status}

    // Check if the orderBy params are valid
    const orderBy = columnNames.includes(searchParams.orderBy)
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
        <div className="flex flex-col gap-3">
            {/*Render the top of the Issue Page.*/}
            <IssueActions />

            {/*Parent divs add border and adjust the table within that border*/}
            <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                    <IssueTable searchParams={searchParams} issues={issues} />
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