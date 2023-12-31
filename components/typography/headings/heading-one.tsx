import {PropsWithChildren} from "react"

export function HeadingOneH1({children}: PropsWithChildren) {
    // If the passed children react node is falsy(empty), then return nothing
    if(!children) return null

    return (
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
            {children}
        </h1>
    )
}
