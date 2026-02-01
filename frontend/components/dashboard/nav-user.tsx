"use client"

import { ChevronsUpDown, LogOutIcon, } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, 
DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar, } from "@/components/ui/sidebar"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, 
AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"


export function NavUser({ user, }: { user: { name: string, email: string, avatar: string } }) {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>

          {/* trigger */}
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground" >
              <Avatar className="h-9 w-9 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">U</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          {/* content */}
          <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg p-2"
            side={isMobile ? "bottom" : "top"} align="end" sideOffset={4}
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex items-center gap-2 text-left text-sm pb-2">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">U</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Account</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="mb-2"/>
            {/* logout button */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                  <DropdownMenuItem variant='destructive' className='text-sm' onSelect={(e) => e.preventDefault()} >
                  <LogOutIcon />
                  <span>Logout</span>
                  </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                  <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                  <AlertDialogDescription>
                      You will be signed out of your account and you will have to login again to access it.
                  </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction > Logout </AlertDialogAction>
                  </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
