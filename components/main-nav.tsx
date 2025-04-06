"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { PlaneTakeoff, Map, Users, Calendar, Home } from "lucide-react"
import { HTMLAttributes } from "react"

interface MainNavProps extends HTMLAttributes<HTMLElement> {
  className?: string
}

export function MainNav({ className, ...props }: MainNavProps) {
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      label: "Home",
      icon: Home,
      active: pathname === "/"
    },
    {
      href: "/explore",
      label: "Explore",
      icon: Map,
      active: pathname === "/explore"
    },
    {
      href: "/trips",
      label: "My Trips",
      icon: PlaneTakeoff,
      active: pathname === "/trips"
    },
    {
      href: "/friends",
      label: "Friends",
      icon: Users,
      active: pathname === "/friends"
    },
    {
      href: "/planner",
      label: "Trip Planner",
      icon: Calendar,
      active: pathname === "/planner"
    },
  ]

  return (
    <nav className={cn("hidden md:flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      {routes.map((route) => {
        const Icon = route.icon
        return (
          <Button
            key={route.href}
            variant={route.active ? "default" : "ghost"}
            className="w-full md:w-auto justify-start md:justify-center"
            asChild
          >
            <Link
              href={route.href}
              className="flex items-center space-x-2"
            >
              <Icon className="h-4 w-4" />
              <span>{route.label}</span>
            </Link>
          </Button>
        )
      })}
    </nav>
  )
}