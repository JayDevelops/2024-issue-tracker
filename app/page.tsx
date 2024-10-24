import IssueSummary from "@/app/IssueSummary"
import IssueChart from "@/app/IssueChart"
import LatestIssues from "@/app/LatestIssues"
import { Metadata } from "next"
import prisma from "@/prisma/client"

export default async function Home() {
    let openCount = 0, inProgressCount = 0, closedCount = 0;

    try {
        // Get each count for the three types of issues statuses
        openCount = await prisma.issue.count({
            where: { status: "OPEN" }
        }) || 0;

        inProgressCount = await prisma.issue.count({
            where: { status: "IN_PROGRESS" }
        }) || 0;

        closedCount = await prisma.issue.count({
            where: { status: "CLOSED" }
        }) || 0;
    } catch (error) {
        console.error("Failed to fetch issue counts:", error);
        // Optionally handle error response or return fallback values
    }

    const sharedIssueProps = { open: openCount, inProgress: inProgressCount, closed: closedCount };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-5">
                <IssueSummary {...sharedIssueProps} />
                <IssueChart {...sharedIssueProps} />
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
