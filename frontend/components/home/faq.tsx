import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Container from "../global/container";

const FAQS = [
  {
    question: "How do I get started with Kurrent?",
    answer: "Simply sign in with your account and start adding your tasks. No hassle or credit card required.",
  },
  {
    question: "What makes Kurrent different from other task managers?",
    answer: "Our platform focuses on simplicity, speed, and intuitive design without overwhelming features.",
  },
  {
    question: "Is there a limit to how many tasks I can create?",
    answer: "No limits! You can create as many tasks as you need.",
  },
  {
    question: "How do I track my productivity over time?",
    answer: "Our dashboard provides detailed stats & analytics showing your task completion rate and progress status.",
  },
  {
    question: "What happens when I complete a task?",
    answer: "Tasks move to your completed list, and you can review your task archive whenever.",
  },
  {
    question: "How do I share feedback or request features?",
    answer: "We welcome feedback! You're welcome to contact us anytime directly via email.",
  },
];

const Faq = () => {
    return (
      <section id="faq">
        <div className="flex flex-col items-center justify-center relative w-full py-16 lg:pt-24 overflow-hidden">

          {/* grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.1)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-size-[3rem_3rem] mask-[radial-gradient(ellipse_60%_70%_at_90%_0%,#000_20%,transparent_70%)] h-full -z-10" />
          
          {/* page content */}
          <section className="h-full mx-auto w-full lg:max-w-7xl px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-6">
              
              {/* left side */}
              <Container delay={0.4} animation="fadeLeft" className="flex flex-col">
                {/* header */}
                <div className="flex flex-col items-start justify-start ">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-left lg:text-start tracking-tight text-transparent bg-clip-text bg-linear-to-b from-foreground dark:to-neutral-400 to-neutral-500">
                    Frequently asked questions
                  </h2>
                  <p className="text-medium font-normal text-muted-foreground text-left lg:text-start mt-4 max-w-md">
                    For any other questions, feel welcome to reach out through our
                    email.
                  </p>
                </div>
                {/* accordion */}
                <div className="mt-10">
                  <Accordion type="single" collapsible className="w-full">
                    {FAQS.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-sm font-base font-medium">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </Container>

              {/* right side */}
              <Container delay={0.4} animation="fadeRight" className="col-span-1 w-full z-10">
                <div className="flex w-full">
                  <Image src="/faq.svg" alt="Box" width={1024} height={1024} className="w-full dark:filter-[invert(0)] filter-[invert(1)] opacity-100" />
                </div>
              </Container>

            </div>
          </section>
        </div>
      </section>
    );
};

export default Faq