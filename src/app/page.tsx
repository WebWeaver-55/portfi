import AnimatedAboutMe from "@/sections/abbout";
import Hero from "@/sections/animation";
import FreeElectronSimulation from "@/sections/bg";
import { Header } from "@/sections/Header";
import Hero3D from "@/sections/Hero";
import ProjectsSection from "@/sections/Projects";
import ContactMe from "@/sections/Contact";
import TestimonialsSection from "@/sections/Testimonials";

export default function Home() {
  return (
    <section className="relative min-h-screen overflow-hidden ">
   
      <div className="absolute top-0 left-0 w-full h-full ">
        <FreeElectronSimulation />
      </div>

      {/* Header stays on top */}
      <Header />

      <section id="home" className="md:flex md:space-x-2 lg:flex lg:space-x-4 ">
        <div className="lg:w-1/2 md:w-1/2">
          <Hero />
        </div>
        <div className="lg:w-1/2 md:w-1/2">
          <Hero3D />
        </div>
      </section>

      {/* Other sections */}
      <section id="projects">
        <ProjectsSection />
      </section>

      <section id="about" >
        <AnimatedAboutMe />
      </section>
      <section  id="testi"  className="z-50">
        <TestimonialsSection />
      </section>
      <section id="contact" >
        <ContactMe />
      </section>
      
    
    </section>
  );
}
