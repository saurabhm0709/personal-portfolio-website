import Image from "next/image";
import { ArrowDown, ArrowRight, Info } from "lucide-react";
import { isPlaceholder } from "@/data/site";
import { cn } from "@/lib/utils";

/*
 * Components used inside MDX write-ups (registered in /mdx-components.tsx, so
 * .mdx files can use them without importing). Example:
 *
 *   <Pipeline steps={["Scrape", "Clean", "Model"]} />
 *   <Metrics items={[{ label: "RMSE", value: "[ADD FINAL MODEL RMSE]" }]} />
 */

/** A left-to-right workflow diagram (stacks vertically on phones). */
export function Pipeline({
  steps,
  caption,
}: {
  steps: (string | { title: string; detail?: string })[];
  caption?: string;
}) {
  const items = steps.map((s) => (typeof s === "string" ? { title: s, detail: undefined } : s));
  return (
    <figure className="my-8">
      <ol className="flex list-none flex-col items-stretch gap-2 pl-0 md:flex-row md:flex-wrap md:items-center">
        {items.map((step, i) => (
          <li key={step.title} className="m-0 flex flex-col items-center gap-2 md:flex-row">
            <div className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 md:w-auto">
              <span className="mr-2 font-mono text-[11px] text-brand">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-sm font-medium text-foreground">{step.title}</span>
              {step.detail && <p className="mt-0.5 text-xs text-muted-foreground">{step.detail}</p>}
            </div>
            {i < items.length - 1 && (
              <>
                <ArrowRight className="hidden size-3.5 text-muted-foreground md:block" aria-hidden="true" />
                <ArrowDown className="size-3.5 text-muted-foreground md:hidden" aria-hidden="true" />
              </>
            )}
          </li>
        ))}
      </ol>
      {caption && <figcaption className="mt-3 text-sm text-muted-foreground">{caption}</figcaption>}
    </figure>
  );
}

/** A row of headline numbers. Values written as "[ADD ...]" render as placeholders. */
export function Metrics({ items }: { items: { label: string; value: string; note?: string }[] }) {
  return (
    <dl className="my-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4">
      {items.map((m) => {
        const missing = isPlaceholder(m.value);
        return (
          <div key={m.label} className="bg-card p-4">
            <dt className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">{m.label}</dt>
            <dd
              className={cn(
                "mt-2",
                missing
                  ? "font-mono text-xs leading-snug text-placeholder"
                  : "font-heading text-2xl font-medium text-foreground",
              )}
            >
              {m.value}
            </dd>
            {m.note && <dd className="mt-1 text-xs text-muted-foreground">{m.note}</dd>}
          </div>
        );
      })}
    </dl>
  );
}

/** A highlighted note box. */
export function Callout({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <aside className="my-8 flex gap-3 rounded-lg border border-brand/25 bg-brand-soft p-4 text-[0.95rem] leading-relaxed">
      <Info className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
      <div>
        {title && <p className="mb-1 font-medium text-foreground">{title}</p>}
        <div className="text-foreground/85 [&_p+p]:mt-2">{children}</div>
      </div>
    </aside>
  );
}

/**
 * A real figure (plot, screenshot, diagram). Put the image in /public/images/...
 * and pass its path, e.g. <Figure src="/images/house/residuals.png" alt="..." width={1200} height={700} />.
 * next/image automatically resizes and serves modern formats.
 */
export function Figure({
  src,
  alt,
  caption,
  width,
  height,
}: {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
}) {
  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 768px) 720px, 100vw"
        className="h-auto w-full rounded-lg border border-border bg-white"
      />
      {caption && <figcaption className="mt-3 text-center text-sm text-muted-foreground">{caption}</figcaption>}
    </figure>
  );
}
