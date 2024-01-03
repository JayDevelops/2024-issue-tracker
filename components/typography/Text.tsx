import { PropsWithChildren } from "react"
import classNames from "classnames"

type TextProps = PropsWithChildren<{
    variant?: "small" | "normal" | "large"
}>

export function Text({ children, variant = "normal" }: TextProps) {
    const textSizeClasses = {
        small: "text-sm",
        normal: "text-base",
        large: "text-lg",
    }

    return (
        <p
            className={classNames("leading-7", textSizeClasses[variant], {
                "&:not(:first-child)": "mt-6",
            })}
        >
            {children}
        </p>
    )
}
