"use client"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import {FaBug} from "react-icons/fa"
import {ModeToggle} from "@/components/ModeToggle"
import {usePathname} from "next/navigation"
import classNames from "classnames"
import {useSession} from "next-auth/react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {LogOut, User} from "lucide-react"
import Skeleton from '@/components/Skeleton/Skeleton'
import {ReactElement} from "react"


const NavBar = () => {
    return (
        <NavigationMenu
            className="sticky top-0 z-50 border-b border-border/40 list-none mb-5 px-4 h-14 md:container md:mx-auto text-base">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                <div className="flex items-center space-x-2">
                    <NavLinks />
                </div>

                <div className="flex items-center space-x-2 sm:pl-2 md:p-0 md:ml-auto">
                    <AuthStatus />
                    <NavigationMenuItem>
                        <ModeToggle/>
                    </NavigationMenuItem>
                </div>
            </div>
        </NavigationMenu>
    )
}

const NavLinks = () => {
    const currentPath = usePathname()
    const navigationLinks: {id: number, title: string, href: string, icon?: ReactElement}[] = [
        {
            id: 1,
            title: 'Dashboard',
            icon: <FaBug />,
            href: '/'
        },
        {
            id: 2,
            title: 'Issues',
            href: '/issues/list'
        },
    ]

    return (
        <>
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
                            {link.icon}
                            {link.title}
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            ))}
        </>
    )
}

const AuthStatus = () => {
    const { status, data: session} = useSession()

    //  If the user is loading into the session, then return no component
    if (status === "loading") return <Skeleton width="3rem"/>

    //  If no user is logged in, return login component
    if(status === "unauthenticated") {
        return (
            <Link href="/api/auth/signin" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Log In
                </NavigationMenuLink>
            </Link>
        )
    }

    //  Default renders the user details and logout component
    return (
        <NavigationMenuItem className="flex items-center space-x-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                        <AvatarImage src={session!.user?.image!} referrerPolicy="no-referrer"  />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem disabled>
                        <User className="mr-2 h-4 w-4" />
                        {session!.user?.email}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href="/api/auth/signout">
                            <LogOut className="mr-2 h-4 w-4" />
                            Log Out
                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </NavigationMenuItem>
    )
}

export default NavBar