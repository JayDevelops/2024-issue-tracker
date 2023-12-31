import NextLink from "next/link";
import { cn } from "@/lib/utils";

interface LinkProps {
    href: string,
    children: string,
    customColorVariant?: string,
}

const CustomLink = ({ href, children, customColorVariant }: LinkProps) => {
    // Define the mapping of custom color variants to Tailwind CSS class names
    const colorVariantMapping: Record<string, string> = {
        default: "text-primary hover:text-secondary",
        destructive: "text-red-500 dark:text-red-600 hover:text-red-400 dark:hover:text-red-500",
        primaryBlue: "text-blue-500 dark:text-blue-600 hover:text-blue-400 dark:hover:text-blue-500",
        // Add more variants as needed
    };

    // Determine the class name based on the customColorVariant prop
    const colorVariantClassName = customColorVariant ? colorVariantMapping[customColorVariant] || "" : "";

    // Concatenate the base class with the custom color variant class name
    const combinedClassName = cn(
        "font-medium hover:underline underline-offset-4 transition-all",
        colorVariantClassName
    );

    return (
        <NextLink href={href} className={combinedClassName}>
            {children}
        </NextLink>
    );
};
export {CustomLink};