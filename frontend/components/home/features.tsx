import Wrapper from '@/components/global/wrapper';
import { AnimatedTooltip } from '../ui/animated-tooltip';
import { Button } from "../ui/button";
import Image from "next/image";
import Link from 'next/link';
import Container from '../global/container';
import ShinyText from '../ui/shiny-text';

const features = [
    {
        id: 1,
        title: "Task Dashboard",
        description: "View all tasks, deadlines, and priorities in one clean overview.",
        illustration: "/images/features/feature1.png",
        icon: "layout-dashboard"
    },
    {
        id: 2,
        title: "Project Timeline",
        description: "Manage tasks and deadlines with a simple timeline and kanban board view.",
        illustration: "/images/features/feature2.png",
        icon: "timeline"
    },
    {
        id: 3,
        title: "Productivity Boost",
        description: "Be the most productive out of your group using our platform.",
        illustration: "/images/features/feature3.png",
        icon: "users"
    },
    {
        id: 4,
        title: "Progress Analytics",
        description: "Track productivity and completion rates with detailed reports.",
        illustration: "/images/features/feature4.png",
        icon: "bar-chart"
    }
]

const avatars = [
    {
        id: 1,
        name: "Sarah Chen",
        designation: "Project Manager",
        image: "/images/avatars/avatar1.jpg"
    },
    {
        id: 2,
        name: "Mike Johnson",
        designation: "Team Lead",
        image: "/images/avatars/avatar2.jpg"
    },
    {
        id: 3,
        name: "Ethan Wilson",
        designation: "Developer",
        image: "/images/avatars/avatar3.jpg"
    },
    {
        id: 4,
        name: "Lisa Park",
        designation: "Designer",
        image: "/images/avatars/avatar4.jpg"
    },
    {
        id: 5,
        name: "Alex Rivera",
        designation: "Director",
        image: "/images/avatars/avatar5.jpg"
    }
]

const stats = [
    {
        id: 1,
        value: "100+",
        label: "Professionals",
        avatars: [
            "/images/avatars/avatar1.jpg",
            "/images/avatars/avatar2.jpg",
            "/images/avatars/avatar3.jpg",
            "/images/avatars/avatar4.jpg",
            "/images/avatars/avatar5.jpg"
        ]
    },
    {
        id: 2,
        value: "5K+",
        label: "Tasks Completed",
        description: "Track and complete tasks with our intuitive management system now!",
        button: {
            text: "Track tasks",
            href: "/dashboard"
        }
    }
];


const Features = () => {
    return (
      <section id="features" className="w-full py-16 lg:pb-24 relative">
        <Container>
        <Wrapper>
          {/* header */}
          <div className="flex flex-col items-center text-center">
            <ShinyText text="Features" speed={2} pauseOnHover className='text-primary text-sm font-medium uppercase' />

            <h2 className='text-2xl font-semibold leading-tight! sm:text-3xl lg:text-4xl mt-2 text-transparent bg-clip-text bg-linear-to-b from-foreground dark:to-neutral-400 to-neutral-500'>
              A Complete Toolkit for Task Management
            </h2>
          </div>

          {/* content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-8 max-w-7xl mx-auto">
            {/* block 1 */}
            <div className="lg:col-span-7 relative group rounded-xl lg:rounded-2xl p-8 overflow-hidden dark:bg-transparent border border-dotted bg-secondary/70 transition-all duration-500">
              {/* background image */}
              <div className="absolute inset-0 bg-[url('/background.jpg')] bg-cover bg-center dark:opacity-10 opacity-0 z-0"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold">
                    {features[0].title}
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  {features[0].description}
                </p>
              </div>

              <div className="mt-6 relative grow h-48 transition-colors duration-300 z-10">
                <Image src={features[0].illustration} alt="Client" width={500} height={500} unoptimized className="w-full mx-auto h-full object-contain object-center" />
              </div>
            </div>
            
            {/* block 2 */}
            <div className="lg:col-span-5 relative group rounded-xl lg:rounded-2xl p-8 overflow-hidden dark:bg-transparent border border-dotted bg-secondary/70 transition-all duration-500">
              {/* background image */}
              <div className="absolute inset-0 bg-[url('/background.jpg')] bg-cover bg-center dark:opacity-10 opacity-0 z-0"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold">
                    {features[1].title}
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  {features[1].description}
                </p>
              </div>

              <div className="mt-6 relative grow h-48 transition-colors duration-300 z-10">
                <Image src={features[1].illustration} alt="Project" width={500} height={500} unoptimized className="w-full mx-auto h-full object-contain object-center" />
              </div>
            </div>
            
            {/* block 3 */}
            <div className="lg:col-span-4 relative group rounded-xl lg:rounded-2xl p-6 overflow-hidden dark:bg-transparent border border-dotted bg-secondary/70 transition-all duration-500">
              {/* background image */}
              <div className="absolute inset-0 bg-[url('/background.jpg')] bg-cover bg-center dark:opacity-10 opacity-0 z-0"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold">
                    {features[2].title}
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {features[2].description}
                </p>
              </div>

              <div className="mt-6 relative grow h-48 transition-colors duration-300 z-10">
                <Image src={features[2].illustration} alt="Team" width={500} height={500} unoptimized className="w-full mx-auto h-full object-contain object-center" />
              </div>
            </div>
            
            {/* block 4 */}
            <div className="lg:col-span-4 relative group rounded-xl lg:rounded-2xl p-6 overflow-hidden dark:bg-transparent border border-dotted bg-secondary/70 transition-all duration-500">
              {/* background image */}
              <div className="absolute inset-0 bg-[url('/background.jpg')] bg-cover bg-center dark:opacity-10 opacity-0 z-0"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold">
                    {features[3].title}
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {features[3].description}
                </p>
              </div>

              <div className="mt-6 relative grow h-48 transition-colors duration-300 z-10">
                <Image src={features[3].illustration} alt="Team" width={500} height={500} unoptimized className="w-full mx-auto h-full object-contain object-center" />
              </div>
            </div>
            
            {/* block 5 */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="relative group rounded-xl lg:rounded-2xl p-6 overflow-visible dark:bg-transparent border border-dotted bg-secondary/70 transition-all duration-500">
                {/* background image */}
                <div className="absolute inset-0 bg-[url('/background.jpg')] bg-cover bg-center dark:opacity-10 opacity-0 z-0"></div>
                
                <div className="relative overflow-visible z-10">
                  <div className="flex overflow-visible">
                    <AnimatedTooltip items={avatars} />
                  </div>
                  <h3 className="text-2xl bg-linear-to-r from-foreground to-foreground/70 text-transparent bg-clip-text font-medium mt-4">
                    {stats[0]?.value} {stats[0]?.label}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    already use Kurrent. Be one of them!
                  </p>
                </div>
              </div>

              <div className="relative group rounded-xl lg:rounded-2xl p-6 overflow-hidden dark:bg-transparent border border-dotted bg-secondary/70 transition-all duration-500">
                {/* background image */}
                <div className="absolute inset-0 bg-[url('/background.jpg')] bg-cover bg-center dark:opacity-10 opacity-0 z-0"></div>
                
                <div className="relative z-10">
                  <div className="flex items-baseline gap-1">
                    <h3 className="text-2xl bg-linear-to-r from-foreground to-foreground/70 text-transparent bg-clip-text font-semibold">
                      {stats[1]?.value} {stats[1]?.label}
                    </h3>
                  </div>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {stats[1]?.description}
                  </p>
                  <Link href="/login">
                    <Button size="sm" variant="outline" className="mt-3 text-sm">
                      {stats[1]?.button?.text}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </Wrapper>
        </Container>
      </section>
    );
};

export default Features;