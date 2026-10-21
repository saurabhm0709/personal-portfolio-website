import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { type Project, type ProjectStatus, statusLabel } from "@/data/projects";
import { cn } from "@/lib/utils";

const statusStyle: Record<ProjectStatus, string> = {
  complete: "text-foreground border-border",
  "in-progress": "text-brand border-brand/30",
  research: "text-brand border-brand/30",
  planned: "text-muted-foreground border-dashed border-border",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px]",
        statusStyle[status],
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-1.5 rounded-full",
          status === "planned" ? "border border-current" : "bg-current",
        )}
      />
      {statusLabel[status]}
    </span>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded border border-border bg-muted/60 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
      {children}
    </span>
  );
}

/** Card linking to a project page. The whole card is clickable via the title link's ::after overlay. */
export function ProjectCard({ project, index }: { project: Project; index?: number }) {
  return (
    <article className="group relative flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-foreground/25">
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="font-mono text-xs text-muted-foreground">
          {index !== undefined ? String(index + 1).padStart(2, "0") + " · " : ""}
          {project.category}
        </span>
        <ArrowUpRight
          className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
          aria-hidden="true"
        />
      </div>

      <h3 className="font-heading text-xl leading-snug font-medium tracking-tight text-balance">
        <Link
          href={`/projects/${project.slug}`}
          className="after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-ring"
        >
          {project.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <StatusBadge status={project.status} />
        {project.tags.slice(0, 4).map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
    </article>
  );
}
