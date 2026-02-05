import Wrapper from "../global/wrapper"
import Container from "../global/container"
import { ArrowUpRight, Forward } from "lucide-react";
import { Button } from "../ui/button";
import { AnimatedGridPattern } from "../ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import Link from "next/link";


function Cta() {
  return (
    <section id="cta" className="w-full relative flex items-center justify-center flex-col px-2 pb-12 md:px-0">
      <Wrapper>
        <Container>
          <div className="relative overflow-hidden w-full mx-auto rounded-2xl my-10 py-14 md:py-16 px-10 md:px-14 bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark border border-neutral-200 dark:border-neutral-800" >
            {/* background */}
            <AnimatedGridPattern numSquares={30} maxOpacity={0.8} duration={3} className={cn( "mask-[radial-gradient(300px_circle_at_right,white,rgba(255,255,255,0.6),transparent)] sm:mask-[radial-gradient(400px_circle_at_right,white,rgba(255,255,255,0.6),transparent)] md:mask-[radial-gradient(500px_circle_at_right,white,rgba(255,255,255,0.6),transparent)] lg:mask-[radial-gradient(600px_circle_at_right,white,rgba(255,255,255,0.6),transparent)]", "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 text-neutral-300 dark:text-neutral-700 absolute" )} />
            <AnimatedGridPattern numSquares={30} maxOpacity={0.8} duration={3} className={cn( "mask-[radial-gradient(300px_circle_at_top_left,white,rgba(255,255,255,0.6),transparent)] sm:mask-[radial-gradient(400px_circle_at_top_left,white,rgba(255,255,255,0.6),transparent)] md:mask-[radial-gradient(500px_circle_at_top_left,white,rgba(255,255,255,0.6),transparent)] lg:mask-[radial-gradient(600px_circle_at_top_left,white,rgba(255,255,255,0.6),transparent)]", "inset-x-0 inset-y-0 h-[200%] skew-y-12 text-neutral-300 dark:text-neutral-700 absolute" )} />
            {/* text content */}
            <div className="relative z-10 flex flex-col gap-3">
              <h3 className="text-3xl md:text-4xl leading-tight! font-semibold text-transparent bg-clip-text bg-linear-to-b from-foreground dark:to-neutral-400 to-neutral-500">
                Ready to Organize Your Day?
              </h3>
              <p className="mt-2 text-base md:text-lg text-muted-foreground">
                Kurrently used by thousands to boost productivity. Join them and achieve more every day!
              </p>
            </div>
            {/* buttons */}
            <div className="relative z-10 mt-14 flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="gap-2">
                  Get Started Now <ArrowUpRight className="h-5! w-5!" />
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline" className="gap-2">
                  Create Account <Forward className="h-5! w-5!" />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Wrapper>
    </section>
  );
}

export default Cta
