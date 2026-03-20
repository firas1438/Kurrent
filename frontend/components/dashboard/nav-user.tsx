"use client"

import { ChevronsUpDown } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, 
DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar, } from "@/components/ui/sidebar"
import LogOutButton from "./logout-button"
import type { User } from "@/types"

export function NavUser({ user }: { user: User }) {
  const { isMobile } = useSidebar()
  const initial = user.name?.trim()?.[0]?.toUpperCase() ?? user.email?.trim()?.[0]?.toUpperCase() ?? "?"

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>

          {/* trigger */}
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground" >
              <Avatar className="h-9 w-9 rounded-lg">
                <AvatarFallback className="rounded-lg">{initial}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium text-[0.8rem]">{user.name}</span>
                <span className="truncate text-[0.7rem] text-muted-foreground font-medium">Kurrent</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          {/* content */}
          <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "top"} align="end" sideOffset={4}
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1 px-2 py-1.5">
                <p className="text-[0.8rem] font-medium leading-none">{user.email}</p>
                <p className="text-xs leading-none text-muted-foreground">Kurrent Account</p>
              </div>
            </DropdownMenuLabel>
            
            <DropdownMenuSeparator />
            
            {/* logout button */}
            <LogOutButton/>

          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}