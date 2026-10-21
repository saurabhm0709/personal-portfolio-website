import type { Heading } from "@/lib/content";

/** "On this page" list for long pages. Shown in a sticky sidebar on large screens. */
export function TableOfContents({ headings }: { headings: Heading[] }) {
  if (headings.length === 0) return null;
  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="mb-3 font-mono text-[11px] tracking-wider text-muted-foreground uppercase">On this page</p>
      <ol className="space-y-1 border-l border-border">
        {headings.map((h, i) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className="-ml-px flex gap-2 border-l border-transparent py-1 pl-4 text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
            >
              <span className="font-mono text-[11px] text-muted-foreground/70 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
