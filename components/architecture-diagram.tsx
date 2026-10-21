import { Activity, ArrowDown, ArrowLeft, ArrowRight, ArrowUp, ChartLine, Cloud, Cpu, Workflow } from "lucide-react";

/**
 * Conceptual architecture of the research: infrastructure emulated in
 * iContinuum on the left, the proactive control loop on the right.
 * Built with HTML/CSS rather than an image so it stays sharp, readable in both
 * themes, and reflows on mobile. Replace it with your real architecture
 * figure when ready (see the FigurePlaceholder below it on the research page).
 */
export function ArchitectureDiagram() {
  return (
    <figure className="my-8">
      <div className="grid gap-4 rounded-xl border border-border bg-card p-4 sm:p-6 lg:grid-cols-[1.1fr_auto_1fr] lg:items-stretch">
        {/* Infrastructure */}
        <div className="rounded-lg border border-dashed border-border p-4">
          <p className="mb-4 font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
            Edge-cloud continuum · emulated in iContinuum
          </p>
          <div className="rounded-lg border border-border bg-background p-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Cloud className="size-4 text-muted-foreground" aria-hidden="true" /> Cloud
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Larger, centralised resources</p>
          </div>
          <div className="my-2 flex justify-center">
            <span className="h-4 w-px bg-border" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {["Edge", "Edge", "Edge"].map((label, i) => (
              <div key={i} className="rounded-lg border border-border bg-background p-2.5">
                <div className="flex items-center gap-1.5 text-xs font-medium">
                  <Cpu className="size-3.5 text-muted-foreground" aria-hidden="true" /> {label}
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  <span className="rounded bg-brand-soft px-1.5 py-0.5 font-mono text-[10px] text-brand">app</span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Applications run across tiers; their behaviour varies over time.
          </p>
        </div>

        {/* Connector */}
        <div className="flex flex-row items-center justify-center gap-3 font-mono text-[10px] text-muted-foreground lg:flex-col">
          <span className="flex items-center gap-1">
            metrics <ArrowRight className="hidden size-3 lg:block" aria-hidden="true" />
            <ArrowDown className="size-3 lg:hidden" aria-hidden="true" />
          </span>
          <span className="flex items-center gap-1">
            <ArrowLeft className="hidden size-3 lg:block" aria-hidden="true" />
            <ArrowUp className="size-3 lg:hidden" aria-hidden="true" /> decisions
          </span>
        </div>

        {/* Control loop */}
        <ol className="flex flex-col gap-2">
          {[
            { icon: Activity, title: "Monitoring", body: "Observe application behaviour over time" },
            { icon: ChartLine, title: "Prediction", body: "Forecast future behaviour (ARIMA / LSTM)" },
            { icon: Workflow, title: "Proactive scheduling", body: "Act when an SLA violation is anticipated" },
          ].map(({ icon: Icon, title, body }, i, arr) => (
            <li key={title} className="flex flex-col items-center gap-2">
              <div className="w-full rounded-lg border border-border bg-background p-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <span className="font-mono text-[11px] text-brand">{String(i + 1).padStart(2, "0")}</span>
                  <Icon className="size-4 text-muted-foreground" aria-hidden="true" />
                  {title}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{body}</p>
              </div>
              {i < arr.length - 1 && <ArrowDown className="size-3.5 text-muted-foreground" aria-hidden="true" />}
            </li>
          ))}
        </ol>
      </div>
      <figcaption className="mt-3 text-sm text-muted-foreground">
        Conceptual overview of the proactive control loop. Not the final system diagram.
      </figcaption>
    </figure>
  );
}
