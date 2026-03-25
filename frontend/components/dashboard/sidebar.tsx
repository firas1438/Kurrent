'use client'

import { ChartSplineIcon, HistoryIcon, TextSearchIcon } from 'lucide-react'
import { 
  Sidebar as UISidebar, SidebarContent, SidebarFooter, SidebarGroup, 
  SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem 
} from '@/components/ui/sidebar'
import { NavUser } from './nav-user'
import Logo from '@/components/logo'
import Link from 'next/link'
import { useAuthStore } from '@/store/auth-state'
import { Calendar } from '@/components/ui/calendar'
import * as React from 'react'

const Sidebar = () => {
  const { user } = useAuthStore()
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <UISidebar>
      <SidebarContent className='p-4'>
        {/* logo */}
        <SidebarGroup className='px-3.5'>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/">
                  <Logo />
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* pages */}
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard">
                    <ChartSplineIcon /> <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/track">
                    <TextSearchIcon /> <span>Track</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/archive">
                    <HistoryIcon /> <span>Archive</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* footer */}
      <SidebarFooter className="flex flex-col items-center space-y-2 p-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-lg border"
          captionLayout="dropdown"
        />
        {user && <NavUser user={user} />}
      </SidebarFooter>
    </UISidebar>
  )
}

export default Sidebar