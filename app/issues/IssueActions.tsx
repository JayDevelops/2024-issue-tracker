import Link from "next/link"
import {buttonVariants} from "@/components/ui/button"

const IssueActions = () => {
    //  store the new issues page route in a string variable
    const newIssuePageRoute: string = "/issues/new"

    return (
        <div className="mb-5">
            <Link className={buttonVariants({variant: "primaryBlue"})} href={newIssuePageRoute}>New Issue</Link>
        </div>
    )
}

export default IssueActions