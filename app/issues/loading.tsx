import React from 'react'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import IssueActions from "@/app/issues/IssueActions"

const LoadingIssuesPage = () => {
    const issues: number[] = [1, 2, 3, 4, 5]

    return (
        <div>
            <IssueActions />

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
                                <TableRow key={issue}>
                                    <TableCell>
                                        <Skeleton/>
                                        <div className="block md:hidden">
                                            <Skeleton/>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <Skeleton/>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <Skeleton/>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}


export default LoadingIssuesPage