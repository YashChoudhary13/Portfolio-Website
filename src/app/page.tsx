import Hero from "@/components/sections/Hero";
import KnobSection from "@/components/sections/knob/KnobSection";
import Architecture from "@/components/sections/architecture/Architecture";
import Experience from "@/components/sections/Experience";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import MoodBlend from "@/components/shared/MoodBlend";
import AnchorScroll from "@/components/providers/AnchorScroll";

/**
 * One premium dark atmosphere with tonal acts — charcoal opening, a deep
 * indigo "how I build" band, back to charcoal for experience, a dark plum
 * "about" band, closing charcoal under the contact glow. Every seam is a
 * soft MoodBlend tonal shift, never a hard cut.
 */
export default function Home() {
  return (
    <main>
      <Hero />
      <KnobSection />

      <MoodBlend to="light" dark="#050505" light="#161221" vivid />
      <div className="mood-indigo">
        <Architecture />
      </div>

      <MoodBlend to="dark" light="#1b1530" dark="#050505" />
      <Experience />

      <MoodBlend to="light" dark="#050505" light="#1c1533" />
      <div className="mood-plum">
        <About />
      </div>

      <MoodBlend to="dark" light="#241a3d" dark="#050505" vivid />
      <Contact />
      <Footer />
      <AnchorScroll />
    </main>
  );
}
