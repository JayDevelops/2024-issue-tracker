import {PropsWithChildren} from "react"
import {Label} from "@/components/ui/label";

const ErrorMessage = ({children}: PropsWithChildren) => {
    // If the passed children react node is falsy, then return nothing
    if(!children) return null

    //  Otherwise, return a red label message from shadcn
    return (
        <Label className="text-red-500 font-semibold">{children}</Label>
    )
}

export default ErrorMessage