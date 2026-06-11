import Hero from "@/components/sections/Hero";
import KnobSection from "@/components/sections/knob/KnobSection";
import Architecture from "@/components/sections/architecture/Architecture";
import Experience from "@/components/sections/Experience";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import AnchorScroll from "@/components/providers/AnchorScroll";

export default function Home() {
  return (
    <main>
      <Hero />
      <KnobSection />
      <Architecture />

      {/* light editorial band — the page breathes between the dark blocks.
          No overflow-hidden: About clips its own watermark; the gradient
          already paints inside the radius. */}
      <div className="theme-light relative rounded-[2rem] sm:rounded-[3rem]">
        <Experience />
        <About />
      </div>

      <Contact />
      <Footer />
      <AnchorScroll />
    </main>
  );
}
