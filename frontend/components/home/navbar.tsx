import { Button } from "@/components/ui/button";
import { NavMenu } from "../ui/nav-menu";
import { NavigationSheet } from "../ui/navigation-sheet";
import ThemeSwitcher from "../theme-toggle";
import Logo from '@/components/logo'


const Navbar = () => {
  return (
    <nav className="h-16 border-b sticky top-0 z-50 bg-background">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-4 ">
        <Logo />

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3">
          <ThemeSwitcher/>
          <Button className="hidden md:inline-flex">Sign In</Button>
          
          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
