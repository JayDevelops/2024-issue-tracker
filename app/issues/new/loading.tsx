import Skeleton from "@/components/Skeleton/Skeleton"

const LoadingNewIssuePage = () => {
    return (
        <div className="max-w-xl">
            <Skeleton />
            <Skeleton height="20rem" />
        </div>
    )
}

export default LoadingNewIssuePage