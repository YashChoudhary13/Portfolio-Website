import Eyebrow from "@/components/shared/Eyebrow";
import CaseStudy from "./CaseStudy";
import { projects } from "@/lib/content";

/**
 * S4 — Selected work (DESIGN_ANALYSIS §S4). Two editorial case studies,
 * alternating orientation. Not cards.
 */
export default function Projects() {
  return (
    <section
      id="work"
      className="container-x py-[clamp(6rem,14vh,12.5rem)]"
      aria-label="Selected work"
    >
      <Eyebrow right="2025 — 2026">03 — Selected work</Eyebrow>

      <div className="mt-8 flex flex-col gap-[clamp(6rem,12vh,10rem)]">
        {projects.map((project, i) => (
          <CaseStudy key={project.id} project={project} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
