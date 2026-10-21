import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/page-shell";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Data science, machine learning and research projects by Saurabh: house price regression, SLA-aware scheduling in the edge-cloud continuum, and recommender systems.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Projects"
        title="Projects"
        description="Each project is written up end to end: the problem, the data, the decisions I made and why, and what I'd do differently. Results are reported only when they exist."
      />
      <ul className="grid gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <li key={p.slug}>
            <Reveal delay={i * 0.05} className="h-full">
              <ProjectCard project={p} index={i} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Container>
  );
}
