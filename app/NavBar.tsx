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
        <NavigationMenu
            className="sticky top-0 z-50 border-b border-border/40 list-none mb-5 px-4 h-14 md:container md:mx-auto text-base">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                <div className="flex items-center space-x-2">
                    <NavigationMenuItem className="flex items-center space-x-2">
                        <Link href="/" legacyBehavior passHref>
                            <NavigationMenuLink className={classNames({
                                'text-blue-500': currentPath === "/",
                                'text-primary': currentPath !== "/",
                                'transition-colors': true,
                            }) + navigationMenuTriggerStyle()
                            }>
                                <FaBug/>
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
                                    'flex items-center gap-2 text-sm': true,
                                }) + navigationMenuTriggerStyle()
                                }
                                >
                                    {link.title}
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    ))}
                </div>

                <div className="flex items-center space-x-2 sm:pl-2 md:p-0 md:ml-auto">
                    {/* Detect user is logged in and conditionally render LogIn or LogOut NavigationMenuLinks. */}
                    <NavigationMenuItem className="flex items-center space-x-2">
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

                    <NavigationMenuItem>
                        <ModeToggle/>
                    </NavigationMenuItem>
                </div>
            </div>
        </NavigationMenu>
    )
}

export default NavBar