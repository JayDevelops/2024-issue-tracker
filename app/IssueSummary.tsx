import {Status} from "@prisma/client"
import {Card} from "@/components/ui/card"
import {Link} from "@/components/Link";
import {Text} from "@/components/typography/Text";

interface IssueSummaryProps {
    open: number,
    inProgress: number,
    closed: number,
}
interface Container {
    label: string,
    value: number,
    status: Status,
}
const IssueSummary = ({open, inProgress, closed}: IssueSummaryProps) => {
    const containers: Container[] = [
        {label: "Open Issues", value: open, status: "OPEN"},
        {label: "In-Progress Issues", value: inProgress, status: "IN_PROGRESS"},
        {label: "Closed Issues", value: closed, status: "CLOSED"},
    ]

    return (
        <div className="flex gap-4">
            {containers.map((container) => (
                <Card key={container.label}>
                    <div className="flex flex-col gap-1 p-4">
                        <Link className="text-sm font-medium" href={`/issues/list?status=${container.status}`}>{container.label}</Link>
                        <Text className="font-bold">{container.value}</Text>
                    </div>
                </Card>
            ))}
        </div>
    )
}
export default IssueSummary