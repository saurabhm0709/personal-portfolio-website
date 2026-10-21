import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/*
 * Visible placeholders for content that doesn't exist yet (metrics, figures,
 * links). They are styled loudly on purpose (amber, dashed) so they're impossible
 * to miss before publishing. Search the codebase for "[ADD" to find them all.
 */

/** Inline placeholder text, e.g. <Placeholder>ADD FINAL MODEL RMSE</Placeholder>. */
export function Placeholder({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "rounded border border-dashed border-placeholder/50 bg-placeholder-soft px-1.5 py-0.5 font-mono text-[0.8em] text-placeholder",
        className,
      )}
    >
      [{children}]
    </span>
  );
}

/** A box reserving space for a figure, chart, screenshot or diagram. */
export function FigurePlaceholder({
  label,
  caption,
  aspect = "h-44 sm:h-52",
  className,
}: {
  label: string;
  caption?: string;
  aspect?: string;
  className?: string;
}) {
  return (
    <figure className={cn("my-8", className)}>
      <div
        className={cn(
          "flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-placeholder/40 bg-placeholder-soft p-6 text-center",
          aspect,
        )}
      >
        <ImageIcon className="size-6 text-placeholder" aria-hidden="true" />
        <span className="font-mono text-xs text-placeholder">[{label}]</span>
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground">{caption}</figcaption>
      )}
    </figure>
  );
}

/**
 * Renders a plain string, highlighting any "[ADD ...]" / "[REVIEW ...]" parts as placeholders.
 * Lets data files mix real text and placeholders: "Relevant coursework: [ADD COURSES]".
 */
export function TextWithPlaceholders({ text }: { text: string }) {
  const parts = text.split(/(\[(?:ADD|REVIEW)[^\]]*\])/g);
  return (
    <>
      {parts.map((part, i) =>
        /^\[(ADD|REVIEW)/.test(part) ? <Placeholder key={i}>{part.slice(1, -1)}</Placeholder> : part,
      )}
    </>
  );
}
