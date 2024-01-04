import IssueSummary from "@/app/IssueSummary";
import IssueChart from "@/app/IssueChart";
import LatestIssues from "@/app/LatestIssues";

export default async function Home() {
    //  Get each count for the three types of issues statuses
    const openCount = await prisma?.issue.count({
        where: {status: "OPEN"}
    }) || 0
    const inProgressCount = await prisma?.issue.count({
        where: {status: "IN_PROGRESS"}
    }) || 0
    const closedCount = await prisma?.issue.count({
        where: {status: "CLOSED"}
    }) || 0

    // Here we will have one object to share between the IssueSummary and IssueChart
    const sharedIssueProps = {open: openCount, inProgress: inProgressCount, closed: closedCount}


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