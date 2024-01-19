import IssueSummary from "@/app/IssueSummary"
import IssueChart from "@/app/IssueChart"
import LatestIssues from "@/app/LatestIssues"
import {Metadata} from "next"
import prisma from "@/prisma/client"

export default async function Home() {
    //  Get each count for the three types of issues statuses
    const openCount = await prisma.issue.count({
        where: {status: "OPEN"}
    })
    const inProgressCount = await prisma?.issue.count({
        where: {status: "IN_PROGRESS"}
    })
    const closedCount = await prisma?.issue.count({
        where: {status: "CLOSED"}
    })

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-5">
                <IssueSummary open={openCount} inProgress={inProgressCount} closed={closedCount}/>
                <IssueChart open={openCount} inProgress={inProgressCount} closed={closedCount} />
            </div>
            <LatestIssues />
        </div>
  )
}

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: "Issue Tracker - Dashboard",
    description:
        "Effortlessly manage and monitor project issues with the Issue Tracker Dashboard. Gain insights into open, in-progress, and closed issues, ensuring seamless collaboration and efficient problem resolution. Experience streamlined issue tracking for enhanced project management.",
}