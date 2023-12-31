import dynamic from "next/dynamic";
import IssueFormSkeleton from "@/app/issues/_components/IssueFormSkeleton";

// Dynamically import the entire IssueFormComponent with no Server Side Rendering.
const IssueForm = dynamic(
    () => import('@/app/issues/_components/IssueForm'),
    {
        ssr: false,
        loading: () => <IssueFormSkeleton />
    }
)
const NewIssuePage = () => {
    return (
        <IssueForm />
    )
}

export default NewIssuePage