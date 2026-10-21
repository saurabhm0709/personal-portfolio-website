import { TextWithPlaceholders } from "@/components/placeholder";
import type { TimelineEntry } from "@/data/experience";

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="relative space-y-10 border-l border-border pl-6 sm:pl-8">
      {entries.map((e) => (
        <li key={e.title + e.period} className="relative">
          <span
            aria-hidden="true"
            className="absolute top-2 -left-[calc(1.5rem+4.5px)] size-2 rounded-full border border-foreground/40 bg-background sm:-left-[calc(2rem+4.5px)]"
          />
          <p className="font-mono text-xs text-muted-foreground">
            <TextWithPlaceholders text={e.period} />
          </p>
          <h3 className="mt-1.5 text-lg font-semibold tracking-tight">{e.title}</h3>
          <p className="text-muted-foreground">
            <TextWithPlaceholders text={e.organisation} />
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[0.95rem] leading-relaxed marker:text-muted-foreground">
            {e.points.map((p) => (
              <li key={p}>
                <TextWithPlaceholders text={p} />
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
