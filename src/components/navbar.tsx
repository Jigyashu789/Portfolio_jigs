"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Moon, Sun, Menu } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"

const routes = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/achievements", label: "Achievements" },
    { href: "/ai-advisors", label: "AI Advisors" },
    { href: "/contact", label: "Contact" },
]

export function Navbar() {
    const { setTheme, theme } = useTheme()
    const pathname = usePathname()
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block">
                            Jigyashu Saxena
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        {routes.map((route) => (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={`transition-colors hover:text-foreground/80 ${pathname === route.href ? "text-foreground" : "text-foreground/60"
                                    }`}
                            >
                                {route.label}
                            </Link>
                        ))}
                    </nav>
                </div>
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                        >
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="pr-0">
                        <Link
                            href="/"
                            className="flex items-center"
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="font-bold">Jigyashu Saxena</span>
                        </Link>
                        <div className="my-4 flex flex-col space-y-3">
                            {routes.map((route) => (
                                <Link
                                    key={route.href}
                                    href={route.href}
                                    className={`text-foreground/70 transition-colors hover:text-foreground ${pathname === route.href ? "text-foreground font-medium" : ""
                                        }`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {route.label}
                                </Link>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        {/* Add search or other items here if needed */}
                    </div>
                    <div className="mr-4 flex items-center">
                        <div className="group relative flex cursor-pointer items-center justify-center p-2 transition-transform hover:scale-110">
                            <div className="absolute -inset-1 rounded-full bg-blue-500/20 opacity-0 blur transition-opacity group-hover:opacity-100" />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-6 w-6"
                            >
                                {/* Handle */}
                                <path d="M12 21v-5" className="text-zinc-400" strokeWidth="2.5" />
                                <path d="M10 16h4" className="text-zinc-500" />
                                {/* Blade with Glow */}
                                <path
                                    d="M12 16V3"
                                    className="text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,1)] transition-all group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,1)]"
                                    strokeWidth="2.5"
                                />
                            </svg>
                            <span className="sr-only">Jedi Warrior</span>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Toggle Theme"
                        className="mr-6"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    >
                        <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle Theme</span>
                    </Button>
                </div>
            </div>
        </header>
    )
}
