import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, PageHeader, SectionHeading } from "@/components/page-shell";
import { Placeholder } from "@/components/placeholder";
import { SkillLegend, SkillsGrid } from "@/components/skills-grid";
import { Timeline } from "@/components/timeline";
import { education } from "@/data/experience";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Saurabh: Computer Science graduate and M.Tech student in Mathematics and Computing, working on machine learning, statistics and edge-cloud computing.",
  alternates: { canonical: "/about" },
};

/*
 * [REVIEW] This text is a first draft written in your voice from the details you
 * gave. Read it carefully and rewrite anything that doesn't sound like you.
 */

const interests = [
  {
    title: "Statistics & probability",
    body: "Most practical questions in data science are statistical ones: how confident am I in this estimate, is this difference real, what happens to this model when the data shifts? I'm deliberately strengthening this foundation.",
  },
  {
    title: "Machine learning",
    body: "I'm interested in models I can reason about: why a method works, what it assumes, and how to evaluate it honestly, from linear models to deep networks.",
  },
  {
    title: "Mathematical foundations",
    body: "Linear algebra, calculus and optimization are the language machine learning is written in. Understanding them turns methods from recipes into tools.",
  },
  {
    title: "Distributed, cloud & edge computing",
    body: "Models are only useful if they run somewhere. My research sits where prediction meets systems: using forecasts to make scheduling decisions across edge and cloud resources.",
  },
];

export default function AboutPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="About"
        title="Mathematics, machine learning and computing"
        description="I'm Saurabh, an M.Tech student in Mathematics and Computing with a bachelor's degree in Computer Science, about a year away from finishing my master's."
      />

      <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="max-w-2xl space-y-5 text-[1.0625rem] leading-[1.75] text-foreground/90">
          <h2 className="font-heading text-2xl font-medium tracking-tight text-foreground">Background</h2>
          <p>
            My undergraduate degree was in Computer Science, which gave me a grounding in programming,
            algorithms and systems. For my master&apos;s I moved to Mathematics and Computing, to build a
            deeper understanding of the mathematics behind the methods I was using: probability, statistics,
            linear algebra and optimization.
          </p>
          <p>
            <Placeholder>ADD A SENTENCE OR TWO ON WHAT SPECIFICALLY PROMPTED THE MOVE, IN YOUR OWN WORDS</Placeholder>
          </p>
          <p>
            That combination is what I&apos;m aiming for professionally: the engineering habits of a computer
            scientist, with enough mathematical depth to understand <em>why</em> a model behaves the way it
            does. I&apos;m preparing for roles as a Data Scientist, Machine Learning Engineer or AI Engineer.
          </p>

          <h2 className="pt-6 font-heading text-2xl font-medium tracking-tight text-foreground">Current research</h2>
          <p>
            My M.Tech research looks at the edge-cloud continuum, where applications run across small edge
            nodes and larger cloud resources. I study whether forecasting application behaviour with
            time-series models (ARIMA and LSTM) lets a scheduler act before service-level agreements are
            violated, rather than after. Experiments run on the iContinuum emulator.
          </p>
          <p>
            <Link href="/research" className="inline-flex items-center gap-1.5 font-medium text-brand hover:underline hover:underline-offset-4">
              Read the research overview <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </p>
        </div>

        <aside className="space-y-3 self-start rounded-xl border border-border bg-card p-6 text-sm">
          <p className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">At a glance</p>
          <dl className="space-y-3">
            {[
              ["Studying", "M.Tech, Mathematics & Computing"],
              ["Background", "Computer Science"],
              ["Research", "Proactive scheduling in the edge-cloud continuum"],
              ["Looking for", "Data Scientist / ML Engineer / AI Engineer roles"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="mt-0.5 font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      <section className="mt-24" aria-labelledby="interests">
        <SectionHeading id="interests" title="What I'm interested in" />
        <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
          {interests.map((it) => (
            <div key={it.title} className="bg-background p-6 sm:p-8">
              <h3 className="font-semibold tracking-tight">{it.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24" aria-labelledby="education">
        <SectionHeading id="education" title="Education" />
        <div className="max-w-2xl">
          <Timeline entries={education} />
        </div>
      </section>

      <section className="mt-24" aria-labelledby="skills">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading id="skills" title="Skills" />
          <div className="mb-8">
            <SkillLegend />
          </div>
        </div>
        <SkillsGrid />
      </section>
    </Container>
  );
}
