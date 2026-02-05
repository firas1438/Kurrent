"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "@/components/dashboard/sidebar";
import Header from "@/components/dashboard/header";
import Footer from "@/components/dashboard/footer";
import { useAuthStore } from "@/store/auth-state";
import Loader from "@/components/loader";

export default function DashboardLayout({ children, }: { children: React.ReactNode; }) {
  const router = useRouter();
  const { isAuthenticated, loading, fetchUser } = useAuthStore();

  // check auth state (redirect to login if not authenticated)
  useEffect(() => {
    const checkAuth = async () => {
      await fetchUser();
      if (!useAuthStore.getState().isAuthenticated) {
        router.push("/login");
      }
    };
    checkAuth();
  }, [fetchUser, router]);

  // Show loading state
  if (loading) { return <Loader/> }
  // dont render if not authenticated
  if (!isAuthenticated) { return null; }

  return (
    <div className="flex min-h-dvh w-full">
      <SidebarProvider>
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="mx-auto size-full flex-1 px-10 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </SidebarProvider>
    </div>
  );
}