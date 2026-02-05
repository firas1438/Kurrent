import Image from "next/image"
import Logo from "@/components/logo"
import Link from "next/link"
import Container from "@/components/global/container"

export default function AuthLayout({ children, }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 overflow-x-hidden">
      {/* content side */}
      <Container animation="fadeLeft" delay={0.2} className="flex flex-col py-6 px-8">
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
      </Container>

      {/* image side */}
      <Container animation="fadeRight" delay={0.2} className="relative hidden lg:block">
        <Image src="/poster.jpg" alt="Poster" width={2048} height={2048} className="absolute inset-0 h-full w-full object-contain 
          object-left pl-0 pr-12 py-12" />
      </Container>

    </div>
  )
}
