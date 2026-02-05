import Cta from "@/components/home/cta";
import Faq from "@/components/home/faq";
import Features from "@/components/home/features";
import Footer from "@/components/home/footer";
import Hero from "@/components/home/hero";
import Navbar from "@/components/home/navbar";
import Testimonials from "@/components/home/testimonials";


export default function HomePage() {
  return (
    <main>
      <Navbar/>
      <Hero/>
      <Features/>
      <Faq/>
      <Testimonials/>
      <Cta/>
      <Footer/>
    </main>
  );
}