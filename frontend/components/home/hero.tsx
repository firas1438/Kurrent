import Wrapper from "../global/wrapper"
import Icons from "../global/icons"
import Image from "next/image"
import Container from "../global/container"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { CheckCircle2Icon, ArrowRightIcon } from "lucide-react"
import Link from "next/link"

const featureCards = [
  {
    title: "Task Prioritization",
    description: "Create and organize tasks with customizable lists and priority levels for your workflow.",
    image: "/hourglass.png",
    alt: "widget1"
  },
  {
    title: "Daily Planning",
    description: "Plan your day with a timeline view that helps manage tasks effectively throughout the day.",
    image: "/clock.png",
    alt: "widget2"
  },
  {
    title: "Progress Tracking",
    description: "Monitor task completion and better visualize productivity with progress indicators.",
    image: "/reminder.png",
    alt: "widget3"
  }
]

const Hero = () => {
  return (
    <section id="home">
      <div className="relative z-0 w-full h-full">
        {/* background */}
        <div>
          <div className="absolute inset-0 bg-cover bg-center opacity-40 dark:opacity-60"
            style={{ backgroundImage: "url(/background.jpg)", }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-background/80 via-background/60 to-background" />
          <div className="absolute inset-0 bg-linear-to-b from-background/20 via-background/50 to-background/90" />
        </div>

        {/* page content */}
        <Wrapper className="py-16 sm:py-14 px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 w-full ">
            {/* left side */}
            <div className="flex flex-col w-full z-10 items-center lg:items-start text-center lg:text-left lg:col-span-3">
              <Container className="sm:hidden">
                <div className="flex text-white items-center gap-x-1 px-2 pr-4 py-1.5 relative w-max rounded-full before:absolute before:inset-0 before:-z-10 before:p-px before:rounded-3xl before:bg-linear-to-b before:from-neutral-700 before:to-neutral-900 before:content-[''] after:absolute after:inset-px after:-z-10 after:rounded-[22px] after:bg-[#181818]/60">
                  <Icons.stars className="size-5" />
                  <span className="text-sm">Kurrent v1.0.0</span>
                </div>
              </Container>

              <Container delay={0.1}>
                <h2 className="text-balance leading-tight! text-4xl md:text-5xl font-semibold tracking-tight mt-6 w-full dark:text-transparent dark:bg-clip-text dark:bg-linear-to-b dark:from-foreground dark:to-neutral-400">
                  Organize Your Tasks
                  <br className="hidden lg:inline-block" /> & Simplify Your Day.
                </h2>
              </Container>

              <Container delay={0.2}>
                <p className="text-base md:text-lg font-normal text-balance text-muted-foreground max-w-2xl mt-6">
                  A modern task management platform that helps you stay
                  productive, visualize progress & prioritize effectively in one
                  intuitive workspace.
                </p>
              </Container>

              <Container delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-2 mt-6 items-center lg:items-start">
                  <div className="flex items-center gap-2">
                    <CheckCircle2Icon className="size-4 text-primary" />
                    <span className="text-sm text-muted-foreground font-medium">
                      Open to Everyone
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2Icon className="size-4 text-primary" />
                    <span className="text-sm text-muted-foreground font-medium">
                      Easy to Use
                    </span>
                  </div>
                </div>
              </Container>

              <Container delay={0.3}>
                <div className="mt-8 lg:mt-6">
                  <Link href="/login">
                    <Button size="lg">
                      Get started now{" "}
                      <ArrowRightIcon className="rtl:rotate-180" data-icon="inline-end" />
                    </Button>
                  </Link>
                </div>
              </Container>
            </div>

            {/* right side */}
            <Container className="w-full z-30 lg:col-span-2 flex items-start">
              <div className="w-5/6 mx-auto lg:mx-0">
                <Image src="/button.png" alt="logo" priority width={2932} height={1664} loading="eager" className="w-full h-full" />
              </div>
            </Container>
          </div>

          {/* feature cards */}
          <Container>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featureCards.map((card, index) => (
                <Card
                  key={index}
                  className="bg-secondary/20 backdrop-blur border-muted overflow-hidden rounded-4xl hover:border-primary/30 hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="flex">
                    {/* image */}
                    <div className="w-1/5 min-w-[120px] relative">
                      <Image src={card.image} alt={card.alt} fill className="object-contain" />
                    </div>

                    {/* text */}
                    <div className="w-4/5 py-0 px-2">
                      <CardHeader className="p-0">
                        <CardTitle className="text-md font-semibold">
                          {card.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <p className="text-sm text-muted-foreground">
                          {card.description}
                        </p>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </Wrapper>
      </div>
    </section>
  );
}

export default Hero