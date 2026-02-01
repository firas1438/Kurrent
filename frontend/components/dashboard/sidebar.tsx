import { ChartSplineIcon, HistoryIcon, TextSearchIcon} from 'lucide-react'
import { Sidebar as UISidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, 
SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { NavUser } from './nav-user'
import Logo from '@/components/logo'
import Link from 'next/link'

const data = {
  user: {
    name: "User",
    email: "user@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
}

const Sidebar = () => {
  return (
    <UISidebar className=''>
      <SidebarContent className='p-4'>
        {/* logo */}
        <SidebarGroup className='px-3.5'>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem> 
                <Logo/> 
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* pages */}
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* home */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard">
                    <ChartSplineIcon /> <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* track tasks */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/track">
                    <TextSearchIcon /> <span>Track</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* task archive */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/archive">
                    <HistoryIcon/> <span>Archive</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

    </UISidebar>
  )
}

export default Sidebar