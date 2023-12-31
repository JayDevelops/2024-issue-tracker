import Skeleton from "@/components/Skeleton/Skeleton"

const IssueFormSkeleton = () => {
    return (
        <div className="max-w-xl">
            <Skeleton height="2rem" className="mb-2"/>
            <Skeleton height="20rem" />
        </div>
    )
}

export default IssueFormSkeleton