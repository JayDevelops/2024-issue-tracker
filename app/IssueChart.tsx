"use client"
import {Card} from "@/components/ui/card"
import {ResponsiveContainer, BarChart, XAxis, YAxis, Bar} from "recharts"
import {useEffect, useState} from "react";

interface IssueChartProps {
    open: number,
    inProgress: number,
    closed: number,
}

interface DataProps {
    label: string,
    value: number,
}

const IssueChart = ({open, inProgress, closed}: IssueChartProps) => {
    const [chartData, setChartData] = useState<DataProps[]>([]);

    useEffect(() => {
        // Update the chart data whenever the props change
        setChartData([
            { label: "Open", value: open },
            { label: "In Progress", value: inProgress },
            { label: "Closed", value: closed },
        ]);
    }, [open, inProgress, closed]);

    // const data: DataProps[] = [
    //     {label: "Open", value: open},
    //     {label: "In Progress", value: inProgress},
    //     {label: "Closed", value: closed},
    // ]

    return (
        <Card>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} className="recharts-surface">
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Bar dataKey="value" barSize={60} style={{
                        fill: "hsl(var(--primary))"
                    }}/>
                </BarChart>
            </ResponsiveContainer>
        </Card>
    )
}
export default IssueChart
