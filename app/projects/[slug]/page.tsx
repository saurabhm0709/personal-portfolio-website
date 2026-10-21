import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { Container, Eyebrow } from "@/components/page-shell";
import { StatusBadge, Tag } from "@/components/project-card";
import { SmartLink } from "@/components/smart-link";
import { TableOfContents } from "@/components/toc";
import { getProject, projects } from "@/data/projects";
import { getHeadings, listSlugs } from "@/lib/content";

/*
 * One template for every project. The [slug] folder name means this file
 * handles /projects/<anything>; `params.slug` holds the <anything> part.
 */

// Pre-render a page for each project at build time...
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
// ...and return 404 for any slug not in that list.
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    // Setting openGraph here replaces the inherited object, so the image is re-added explicitly.
    openGraph: { title: project.title, description: project.summary, type: "article", images: ["/opengraph-image"] },
    alternates: { canonical: `/projects/${slug}` },
  };
}

const linkButton =
  "inline-flex h-9 items-center gap-2 rounded-md border border-border px-3.5 text-sm font-medium transition-colors hover:bg-muted";

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || !listSlugs("projects").includes(slug)) notFound();

  // Load the MDX write-up for this project (content/projects/<slug>.mdx).
  const { default: Content } = await import(`@/content/projects/${slug}.mdx`);
  const headings = getHeadings("projects", slug);

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <Container>
      <div className="pt-10">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" /> All projects
        </Link>
      </div>

      <header className="max-w-3xl pt-10 pb-10">
        <Eyebrow className="mb-4">{project.category}</Eyebrow>
        <h1 className="font-heading text-4xl leading-[1.1] font-medium tracking-tight text-balance sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-pretty">{project.summary}</p>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <StatusBadge status={project.status} />
          <span className="font-mono text-xs text-muted-foreground">{project.period}</span>
        </div>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies and topics">
          {project.tags.map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap gap-3">
          {project.links.github && (
            <SmartLink href={project.links.github} className={linkButton}>
              <GithubIcon className="size-4" /> Code
            </SmartLink>
          )}
          {project.links.demo && (
            <SmartLink href={project.links.demo} className={linkButton}>
              <ExternalLink className="size-4" aria-hidden="true" /> Demo
            </SmartLink>
          )}
        </div>
      </header>

      <div className="grid gap-12 border-t border-border pt-4 lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-16">
        <article className="prose-content max-w-[44rem] min-w-0">
          <Content />
        </article>
        <aside className="hidden lg:block">
          <div className="sticky top-24 pt-10">
            <TableOfContents headings={headings} />
          </div>
        </aside>
      </div>

      {next && next.slug !== slug && (
        <nav aria-label="Next project" className="mt-20 border-t border-border pt-8">
          <Link href={`/projects/${next.slug}`} className="group inline-flex flex-col gap-1">
            <span className="font-mono text-xs text-muted-foreground">Next project</span>
            <span className="inline-flex items-center gap-2 font-heading text-xl font-medium group-hover:text-brand">
              {next.title}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </Link>
        </nav>
      )}
    </Container>
  );
}
