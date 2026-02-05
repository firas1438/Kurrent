import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, 
AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { LogOutIcon } from "lucide-react"
import { logout } from "@/api"
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast"

const LogOutButton = () => {

  const router = useRouter();

  // handle logout
  const handleLogout = async () => {
    try {
      await logout(); 
      toast({ title: "Logged out successfully!", description: "You have been successfully signed out.", variant:"secondary", duration:10000 });
      router.push("/login"); 
    } catch (err: any) {
      toast({ title: "Error", description: (err.response?.data?.message || "Logout failed, please try again later."), variant: "destructive", });
      console.error(err);
    }
  };

  return (
    <div>
      {/* logout button */}
      <AlertDialog>
        {/* trigger */}
        <AlertDialogTrigger asChild>
          <DropdownMenuItem variant="destructive" className="text-sm" onSelect={(e) => e.preventDefault()} >
            <LogOutIcon />
            <span>Logout</span>
          </DropdownMenuItem>
        </AlertDialogTrigger>
        {/* dialog */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to logout?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You will be signed out of your account and you will have to login
              again to access it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel> Cancel </AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}> Logout </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default LogOutButton