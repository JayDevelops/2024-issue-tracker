import Link from "next/link"
import {buttonVariants} from "@/components/ui/button"
import IssueStatusFilter from "@/app/issues/list/IssueStatusFilter";

interface IssueActionsProps {
    showIssueStatusFilter: boolean,
}

const IssueActions = ({ showIssueStatusFilter }: IssueActionsProps) => {

    return (
        <div className="flex justify-between items-center">
            {showIssueStatusFilter && <IssueStatusFilter />}
            <Link className={buttonVariants({variant: "primaryBlue"})} href="/issues/new">New Issue</Link>
        </div>
    )
}

export default IssueActions;