import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import ThemeSwitcher from '@/components/theme-toggle'

const Header = () => {
  return (
    <header className='bg-card sticky top-0 z-50 border-b'>
      <div className='mx-auto flex items-center justify-between gap-6 px-4 py-4 sm:px-6'>
        <div className='flex items-center gap-4'>
          <SidebarTrigger />
          <Separator orientation='vertical' className='hidden h-4! sm:block' />
          <span>Welcome back to Kurrent!</span>
        </div>
        {/* profile dropdown */}
        {/* <div className='flex items-center gap-1'> */}
          <ThemeSwitcher />
        {/* </div> */}
      </div>
    </header>
  )
}

export default Header