import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { Container, Eyebrow, SectionHeading } from "@/components/page-shell";
import { ForecastSketch } from "@/components/forecast-sketch";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { SkillLegend, SkillsGrid } from "@/components/skills-grid";
import { SmartLink } from "@/components/smart-link";
import { buttonVariants } from "@/components/ui/button";
import { projects } from "@/data/projects";
import { isPlaceholder, now, nowUpdated, site } from "@/data/site";
import { formatDate, getAllPosts } from "@/lib/posts";
import { cn } from "@/lib/utils";

const focusAreas = [
  {
    title: "Mathematics & statistics",
    body: "Probability, statistics, linear algebra and optimization: the parts of machine learning that explain why a model works, or why it doesn't.",
  },
  {
    title: "Machine learning",
    body: "Regression, classification and time-series forecasting, with attention to evaluation: honest train/test splits, leakage checks and sensible baselines.",
  },
  {
    title: "Systems & edge-cloud",
    body: "Distributed and edge-cloud computing, where my research uses prediction to make scheduling decisions before problems occur.",
  },
];

export default async function Home() {
  const featured = projects.filter((p) => p.featured);
  const latestPosts = (await getAllPosts()).slice(0, 3);

  // Structured data that helps search engines understand this is a person's profile.
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    jobTitle: "M.Tech student, Mathematics & Computing",
    knowsAbout: ["Machine Learning", "Data Science", "Statistics", "Time Series", "Edge Computing"],
    sameAs: [site.links.github, site.links.linkedin].filter((u) => !isPlaceholder(u)),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <Container className="relative grid gap-12 py-20 sm:py-28 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-16">
          <div>
            <Eyebrow className="mb-6">M.Tech · Mathematics &amp; Computing</Eyebrow>
            <h1 className="font-heading text-5xl leading-none font-medium tracking-tight sm:text-6xl">
              {site.name}
            </h1>
            <p className="mt-4 text-xl text-foreground/80 sm:text-2xl">
              Data Science &amp; Machine Learning
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              I work where mathematics, machine learning and computing meet: building models I can
              reason about statistically, and systems that put them to use. My M.Tech research applies
              time-series prediction to proactive, SLA-aware scheduling in the edge-cloud continuum.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/projects" className={cn(buttonVariants({ size: "lg" }), "h-10 px-4")}>
                View projects <ArrowRight aria-hidden="true" />
              </Link>
              <Link
                href="/research"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-10 px-4")}
              >
                Research
              </Link>
              <Link
                href="/resume"
                className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "h-10 px-4")}
              >
                <FileText aria-hidden="true" /> Resume
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-5 text-sm text-muted-foreground">
              <SmartLink
                href={site.links.github}
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <GithubIcon className="size-4" /> GitHub
              </SmartLink>
              <SmartLink
                href={site.links.linkedin}
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <LinkedinIcon className="size-4" /> LinkedIn
              </SmartLink>
            </div>
          </div>

          <figure className="rounded-xl border border-border bg-card/80 p-5 shadow-[0_1px_0_0_var(--border)] backdrop-blur-sm sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
                Research idea
              </span>
              <span className="font-mono text-[11px] text-muted-foreground">illustrative</span>
            </div>
            <ForecastSketch className="h-auto w-full" />
            <figcaption className="mt-4 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
              <span className="text-foreground">Reactive</span> schedulers respond after an SLA is
              violated. A <span className="text-brand">proactive</span> one forecasts application
              behaviour and moves work <em>before</em> the threshold is crossed.
            </figcaption>
          </figure>
        </Container>
      </section>

      {/* ---------- Focus areas ---------- */}
      <Container className="py-20">
        <Reveal>
          <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
            {focusAreas.map((f, i) => (
              <div key={f.title} className="bg-background p-6 sm:p-8">
                <span className="font-mono text-xs text-brand">0{i + 1}</span>
                <h2 className="mt-3 text-lg font-semibold tracking-tight">{f.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>

      {/* ---------- Selected projects ---------- */}
      <Container className="py-12">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading title="Selected work" description="Research and data science projects, documented end to end." />
            <Link
              href="/projects"
              className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              All projects <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <li key={p.slug}>
              <Reveal delay={i * 0.06} className="h-full">
                <ProjectCard project={p} index={i} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>

      {/* ---------- Research highlight ---------- */}
      <Container className="py-20">
        <Reveal>
          <section
            aria-labelledby="research-highlight"
            className="grid gap-10 rounded-2xl border border-border bg-card p-6 sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14"
          >
            <div>
              <Eyebrow className="mb-4">Current research · M.Tech</Eyebrow>
              <h2
                id="research-highlight"
                className="font-heading text-2xl leading-snug font-medium tracking-tight text-balance sm:text-3xl"
              >
                Application-Aware Proactive Scheduling in the Edge-Cloud Continuum
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Applications running across edge and cloud resources change their behaviour over
                time. My research asks whether forecasting that behaviour lets a scheduler act before
                service-level agreements are violated, rather than after. Experiments are run on the{" "}
                <span className="text-foreground">iContinuum</span> emulator, comparing reactive and
                proactive strategies using ARIMA- and LSTM-based predictors.
              </p>
              <Link
                href="/research"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline hover:underline-offset-4"
              >
                Read the research overview <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>

            <dl className="grid content-start gap-4 text-sm">
              <div className="rounded-lg border border-border p-4">
                <dt className="font-mono text-xs tracking-wider text-muted-foreground uppercase">Reactive</dt>
                <dd className="mt-2 leading-relaxed">
                  Monitor → detect a violation → respond. By the time the scheduler acts, the SLA has
                  already been broken.
                </dd>
              </div>
              <div className="rounded-lg border border-brand/30 bg-brand-soft p-4">
                <dt className="font-mono text-xs tracking-wider text-brand uppercase">Proactive</dt>
                <dd className="mt-2 leading-relaxed">
                  Monitor → forecast → act while there is still headroom, aiming to prevent the
                  violation altogether.
                </dd>
              </div>
            </dl>
          </section>
        </Reveal>
      </Container>

      {/* ---------- Skills ---------- */}
      <Container className="py-12">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading title="Skills" description="Grouped by area, with an honest note on depth." />
            <div className="mb-8">
              <SkillLegend />
            </div>
          </div>
          <SkillsGrid />
        </Reveal>
      </Container>

      {/* ---------- Currently ---------- */}
      <Container className="py-20">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-14">
            <div>
              <SectionHeading title="Currently" className="mb-3" />
              <p className="font-mono text-xs text-muted-foreground">Updated {nowUpdated}</p>
            </div>
            <ul className="divide-y divide-border border-y border-border">
              {now.map((item) => (
                <li key={item.label} className="grid gap-1 py-4 sm:grid-cols-[14rem_1fr] sm:gap-6">
                  <span className="font-medium">{item.label}</span>
                  <span className="text-muted-foreground">{item.detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>

      {/* ---------- Notes ---------- */}
      {latestPosts.length > 0 && (
        <Container className="py-12">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading title="Notes" description="Technical writing on probability, statistics and ML." />
              <Link
                href="/blog"
                className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                All notes <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
            <ul className="divide-y divide-border border-y border-border">
              {latestPosts.map((post) => (
                <li key={post.slug} className="group relative grid gap-1 py-5 sm:grid-cols-[8rem_1fr] sm:gap-8">
                  <time dateTime={post.date} className="font-mono text-xs text-muted-foreground sm:pt-1">
                    {formatDate(post.date)}
                  </time>
                  <div>
                    <h3 className="font-medium group-hover:text-brand">
                      <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{post.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      )}

      {/* ---------- Contact strip ---------- */}
      <Container className="pt-8">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 border-t border-border pt-12 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-heading text-2xl font-medium tracking-tight">Let&apos;s talk</h2>
              <p className="mt-2 text-muted-foreground">
                I&apos;m preparing for Data Scientist and ML Engineer roles.
              </p>
            </div>
            <Link href="/contact" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-10 px-4")}>
              Get in touch <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
