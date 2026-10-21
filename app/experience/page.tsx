import type { Metadata } from "next";
import { Container, PageHeader, SectionHeading } from "@/components/page-shell";
import { Timeline } from "@/components/timeline";
import { education, experience } from "@/data/experience";

export const metadata: Metadata = {
  title: "Experience",
  description: "Research experience and education of Saurabh, M.Tech student in Mathematics and Computing.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <Container size="narrow">
      <PageHeader eyebrow="Experience" title="Experience & education" />
      <section className="mb-16">
        <SectionHeading title="Experience" />
        <Timeline entries={experience} />
      </section>
      <section>
        <SectionHeading title="Education" />
        <Timeline entries={education} />
      </section>
    </Container>
  );
}
