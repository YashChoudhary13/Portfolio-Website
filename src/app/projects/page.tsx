import type { Metadata } from "next";
import ProjectsIndex from "@/components/projects/ProjectsIndex";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Projects — Yash Choudhary",
  description:
    "The archive: DeepVerify, REVO and The MEX — production systems with the architecture, decisions and numbers behind each one.",
};

export default function ProjectsPage() {
  return (
    <main>
      <ProjectsIndex />
      <Footer />
    </main>
  );
}
