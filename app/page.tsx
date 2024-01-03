import IssueSummary from "@/app/IssueSummary";

export default async function Home() {
    //  Get each count for the three types of issues statuses
    const openCount = await prisma?.issue.count({
        where: {status: "OPEN"}
    })
    const inProgressCount = await prisma?.issue.count({
        where: {status: "IN_PROGRESS"}
    })
    const closedCount = await prisma?.issue.count({
        where: {status: "CLOSED"}
    })


    return (
        <IssueSummary open={openCount || 0} inProgress={inProgressCount || 0} closed={closedCount || 0} />
  )
}