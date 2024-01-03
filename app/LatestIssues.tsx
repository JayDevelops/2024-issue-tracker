import prisma from "@/prisma/client"
import {Table, TableBody, TableCell, TableRow} from "@/components/ui/table"
import {Link} from "@/components/Link"
import IssueStatusBadge from "@/components/IssueStatusBadge"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

const LatestIssues = async () => {
    const issues = await prisma?.issue.findMany({
        orderBy: {
            createdAt: "desc",
        },
        take: 5,
        include: {
            assignedToUser: true,
        }
    })
    return (
        <Card>
            <CardHeader>
                <CardTitle>Latest Issues </CardTitle>
                <CardDescription>Overview of latest posted issues.</CardDescription>
            </CardHeader>
            <Table>
                <TableBody>
                    {issues.map((issue) => (
                        <TableRow key={issue.id}>
                            <TableCell>
                                <div className="flex flex-row justify-between">
                                    <div className="flex flex-col items-start gap-2">
                                        <Link href={`/issues/${issue.id}`}>
                                            {issue.title}
                                        </Link>

                                        <IssueStatusBadge status={issue.status}/>
                                    </div>
                                    {issue.assignedToUser && (
                                        <Avatar>
                                            <AvatarImage src={issue.assignedToUser.image!} />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    )}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    )
}

export default LatestIssues