import { cn } from "@/lib/utils";

/** Centers content and applies the site's horizontal padding. */
export function Container({
  className,
  children,
  size = "default",
}: {
  className?: string;
  children: React.ReactNode;
  size?: "default" | "narrow";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8",
        size === "narrow" ? "max-w-3xl" : "max-w-6xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Small monospace label used above headings, e.g. "01 · Projects". */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("font-mono text-xs tracking-wider text-muted-foreground uppercase", className)}>
      {children}
    </p>
  );
}

/** Title block at the top of every inner page. Renders the page's single <h1>. */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="pt-16 pb-10 sm:pt-24 sm:pb-14">
      {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
      <h1 className="max-w-3xl font-heading text-4xl leading-[1.1] font-medium tracking-tight text-balance sm:text-5xl">
        {title}
      </h1>
      {description && (
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
          {description}
        </p>
      )}
      {children}
    </header>
  );
}

/** Heading for a section within a page (an <h2>), with optional index number. */
export function SectionHeading({
  index,
  title,
  description,
  id,
  className,
}: {
  index?: string;
  title: string;
  description?: React.ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-8", className)}>
      <h2 id={id} className="flex items-baseline gap-3 font-heading text-2xl font-medium tracking-tight sm:text-3xl">
        {index && <span className="font-mono text-sm font-normal text-brand">{index}</span>}
        {title}
      </h2>
      {description && <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p>}
    </div>
  );
}
