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
 * The page alternates moods — dark opening act, then light/dark/light
 * through the body, closing dark under the contact glow. Every seam is a
 * MoodBlend aurora (reference recording), never a hard cut.
 */
export default function Home() {
  return (
    <main>
      <Hero />
      <KnobSection />

      <MoodBlend to="light" dark="#0a0a0b" light="#f4f2ed" vivid />
      <div className="theme-light">
        <Architecture />
      </div>

      <MoodBlend to="dark" light="#eae8e2" dark="#050505" />
      <Experience />

      <MoodBlend to="light" dark="#050505" light="#f4f2ed" />
      <div className="theme-light">
        <About />
      </div>

      <MoodBlend to="dark" light="#eae8e2" dark="#050505" vivid />
      <Contact />
      <Footer />
      <AnchorScroll />
    </main>
  );
}
