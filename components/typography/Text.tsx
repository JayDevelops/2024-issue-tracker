import {PropsWithChildren} from "react";

export function Text({children}: PropsWithChildren) {
    return (
        <p className="leading-7 [&:not(:first-child)]:mt-6">
            {children}
        </p>
    )
}
