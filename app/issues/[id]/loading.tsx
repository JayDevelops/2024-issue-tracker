import {Card} from "@/components/ui/card"
import Skeleton from "@/components/Skeleton/Skeleton"

const LoadingIssueDetailPage = () => {
    return (
        <div className="max-w-xl">
            <Skeleton />
            <div className="flex flex-row space-x-3">
                <Skeleton width="8rem"/>
                <Skeleton width="5rem"/>
            </div>

            <Card className="my-4">
                <Skeleton count={3}/>
            </Card>
        </div>
    )
}

export default LoadingIssueDetailPage