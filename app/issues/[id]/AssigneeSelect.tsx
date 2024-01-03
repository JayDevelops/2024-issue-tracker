"use client"
import {
    Select,
    SelectContent, SelectGroup,
    SelectItem, SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


const AssigneeSelect = () => {
    return (
        <Select>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Assign..." />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Suggestions</SelectLabel>
                    <SelectItem value="1">test@email.com</SelectItem>
                    <SelectItem value="2">jaymations1234@gmail.com</SelectItem>
                    <SelectItem value="3">jesusariasthedeveloper@gmail.com</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
export default AssigneeSelect