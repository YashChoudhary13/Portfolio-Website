import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetail from "@/components/projects/detail/ProjectDetail";
import Footer from "@/components/layout/Footer";
import { caseStudies, getCaseStudy, getNextCaseStudy } from "@/lib/caseStudies";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return {
    title: `${cs.name} — Case study — Yash Choudhary`,
    description: cs.outcome,
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();
  const next = getNextCaseStudy(cs);

  return (
    <main>
      <ProjectDetail cs={cs} next={next} />
      <Footer />
    </main>
  );
}
