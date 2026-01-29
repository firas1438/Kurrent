import Image from "next/image"
import Logo from "@/components/logo"
import Link from "next/link"

export default function AuthLayout({ children, }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* content side */}
      <div className="flex flex-col p-6">
        {/* logo */}
        <div className="flex justify-center gap-2 md:justify-start"> 
          <Link href="/" className="flex items-center gap-2 font-medium">
            <Logo /> 
          </Link>
        </div>
        {/* forms */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs"> 
            {children} 
          </div>
        </div>
      </div>
      {/* image side */}
      <div className="bg-muted relative hidden lg:block">
        <Image src="/poster.png" alt="Poster" fill className="absolute inset-0 h-full w-full object-cover dark:grayscale" />
      </div>
    </div>
  )
}
