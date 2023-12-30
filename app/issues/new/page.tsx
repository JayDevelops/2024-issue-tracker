'use client'
import {Button} from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"

const NewIssuePage = () => {

    return (
        <div className="grid max-w-xl gap-1.5 space-y-3">
            <Input name="title" id="title" placeholder="Title" />

            <SimpleMDE placeholder="Write Your Issue Description Here..."/>

            <Button variant="primaryBlue" className="w-1/4" type="submit">Submit New Issue</Button>
        </div>
    )
}

export default NewIssuePage