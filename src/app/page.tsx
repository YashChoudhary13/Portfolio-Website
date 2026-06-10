import Hero from "@/components/sections/Hero";
import Metrics from "@/components/sections/Metrics";
import KnobSection from "@/components/sections/knob/KnobSection";
import Projects from "@/components/sections/projects/Projects";
import Architecture from "@/components/sections/architecture/Architecture";
import Experience from "@/components/sections/Experience";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Metrics />
      <KnobSection />
      <Projects />
      <Architecture />
      <Experience />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
