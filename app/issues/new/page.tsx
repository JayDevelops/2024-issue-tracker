import react from "react"
import {Button} from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

const NewIssuePage = () => {
    return (
        <div className="grid max-w-xl gap-1.5 space-y-3">
            <Input id="title" placeholder="Title" />

            <Textarea placeholder="Write the description of the issue here..." id="message" />

            <Button variant="primaryBlue" className="w-1/4" type="submit">Submit New Issue</Button>
        </div>
    )
}

export default NewIssuePage