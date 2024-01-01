"use client"
import {
    NavigationMenu,
    NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import { FaBug } from "react-icons/fa"
import {ModeToggle} from "@/components/ModeToggle"
import {usePathname} from "next/navigation"
import classNames from "classnames"
import {useSession} from "next-auth/react"


const navigationLinks: {id: number, title: string, href: string}[] = [
    {
        id: 1,
        title: 'Dashboard',
        href: '/dashboard'
    },
    {
        id: 2,
        title: 'Issues',
        href: '/issues/list'
    },
]

const NavBar = () => {
    const currentPath = usePathname()
    const { status, data: session} = useSession()

    return (
        <NavigationMenu className="list-none m-2 w-[100%] md:container md:mx-auto">
            <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className={classNames({
                        'text-blue-500': currentPath === "/",
                        'text-primary': currentPath !== "/",
                        'transition-colors': true,
                    }) + navigationMenuTriggerStyle()
                    }>
                        <FaBug />
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>


            {navigationLinks.map((link) => (
                <NavigationMenuItem key={`link-${link.id}`}>
                    <Link href={link.href} legacyBehavior passHref>
                        <NavigationMenuLink className={classNames({
                            'text-blue-500': link.href === currentPath,
                            'text-primary': link.href !== currentPath,
                            'transition-colors': true,
                        }) + navigationMenuTriggerStyle()
                        }
                        >
                            {link.title}
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            ))}

            {/* Detect user is logged in and conditionally render LogIn or LogOut NavigationMenuLinks. */}
            <NavigationMenuItem>
                {status === "authenticated" && (
                    <Link href="/api/auth/signout" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Log Out
                        </NavigationMenuLink>
                    </Link>
                )}
                {status === "unauthenticated" && (
                    <Link href="/api/auth/signin" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Log In
                        </NavigationMenuLink>
                    </Link>
                )}
            </NavigationMenuItem>

            <NavigationMenuItem className="ml-auto">
                <ModeToggle />
            </NavigationMenuItem>

        </NavigationMenu>
    )
}

export default NavBar