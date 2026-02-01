import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Rating } from '../ui/rating'
import Container from '../global/container'
import ShinyText from '../ui/shiny-text'


const testimonials = [
{
    name: 'Craig Bator',
    role: 'Project Manager',
    company: 'TaskFlow',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png?width=40&height=40&format=auto',
    rating: 5,
    content: "I've been using Kurrent for a while now, and it's made organizing my daily tasks and priorities incredibly efficient."
  },
  {
    name: 'Maria Dorwart',
    role: 'Freelance Developer',
    company: 'SoloDev',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png?width=40&height=40&format=auto',
    rating: 4,
    content: "With Kurrent, I can easily track my personal project deadlines and see my daily workload at a glance. Perfect for independent work."
  },
  {
    name: 'Alex Chen',
    role: 'Student',
    company: 'University',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png?width=40&height=40&format=auto',
    rating: 5,
    content: "The interface is beautifully intuitive for managing my coursework. It's transformed how I organize my study schedule and assignments."
  },
  {
    name: 'Sarah McKenny',
    role: 'Entrepreneur',
    company: 'StartupSol',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-4.png?width=40&height=40&format=auto',
    rating: 4,
    content: 'Kurrent has saved me countless hours in personal project planning. The task organization is comprehensive yet simple to use daily.'
  }
]
const Testimonials = () => {
return (
    <section id="testimonials">
      <Container delay={0.3} className='py-8 sm:py-12'>
        <Carousel
          className='mx-auto flex max-w-7xl flex-col-reverse gap-12 px-6 sm:px-2 sm:flex-row sm:items-center sm:gap-16  lg:gap-20 '
          opts={{ align: 'start', slidesToScroll: 1 }}
        >

          {/* carousel */}
          <div className='relative max-w-196 sm:w-1/2 lg:w-2/3'>
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className='sm:pl-6 lg:basis-1/2'>
                  <Card className=' h-full transition-colors duration-300'>
                    <CardContent className='space-y-5'>
                      <div className='flex items-center gap-3'>
                        <Avatar className='size-10 rounded-full'>
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          <AvatarFallback className='rounded-full text-sm'>
                            {testimonial.name.split(' ', 2).map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>

                        <div className='flex-1'>
                          <h4 className='font-medium'>{testimonial.name}</h4>
                          <p className='text-muted-foreground text-sm'>
                            {testimonial.role} at{' '}
                            <span className='text-card-foreground font-semibold'>{testimonial.company}</span>
                          </p>
                        </div>
                      </div>

                      <Rating readOnly variant='gray' size={24} value={testimonial.rating} precision={0.5} />
                      <p className='text-sm'>{testimonial.content}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>

          {/* content */}
          <div className='space-y-4 sm:w-1/2 lg:w-1/3'>
            <ShinyText text="Real users" speed={2} pauseOnHover className='text-primary text-sm font-medium uppercase' />

            <h2 className='text-2xl font-semibold sm:text-3xl lg:text-4xl text-transparent bg-clip-text bg-linear-to-b from-foreground dark:to-neutral-400 to-neutral-500'>
              Customers Feedback
            </h2>

            <p className='text-muted-foreground text-medium'>
              From students to professionals, see how Kurrent helps everyone stay productive.
            </p>

            <div className='flex items-center gap-4'>
              <CarouselPrevious variant='default'
                className='disabled:bg-primary/10 disabled:text-primary static translate-y-0 rounded-md disabled:opacity-100'
              />
              <CarouselNext variant='default'
                className='disabled:bg-primary/10 disabled:text-primary static translate-y-0 rounded-md disabled:opacity-100'
              />
            </div>
          </div>

        </Carousel>
      </Container>
    </section>
  );
}

export default Testimonials
