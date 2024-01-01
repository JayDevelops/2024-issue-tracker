import Link from "next/link"
import {buttonVariants} from "@/components/ui/button"

const IssueActions = () => {

    return (
        <div className="mb-5">
            <Link className={buttonVariants({variant: "primaryBlue"})} href="/issues/new">New Issue</Link>
        </div>
    )
}

export default IssueActions;