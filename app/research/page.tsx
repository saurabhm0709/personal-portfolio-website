import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { Callout, Metrics } from "@/components/content-blocks";
import { GithubIcon } from "@/components/icons";
import { Container, Eyebrow } from "@/components/page-shell";
import { FigurePlaceholder, Placeholder, TextWithPlaceholders } from "@/components/placeholder";
import { SmartLink } from "@/components/smart-link";
import { Tex } from "@/components/tex";
import { TableOfContents } from "@/components/toc";
import { publications, research } from "@/data/research";

export const metadata: Metadata = {
  title: "Research",
  description:
    "M.Tech research by Saurabh on application-aware proactive scheduling in the edge-cloud continuum: forecasting application behaviour with ARIMA and LSTM models to prevent SLA violations, evaluated on the iContinuum emulator.",
  alternates: { canonical: "/research" },
};

// The table of contents and the section ids come from this one list.
const sections = [
  { id: "question", text: "Research question" },
  { id: "motivation", text: "Motivation" },
  { id: "architecture", text: "System architecture" },
  { id: "icontinuum", text: "iContinuum" },
  { id: "prediction", text: "Prediction model" },
  { id: "scheduling", text: "Scheduling strategy" },
  { id: "methodology", text: "Experimental methodology" },
  { id: "metrics", text: "Evaluation metrics" },
  { id: "results", text: "Results" },
  { id: "publications", text: "Publications" },
  { id: "future-work", text: "Future work" },
];

function Section({ id, children }: { id: string; children: React.ReactNode }) {
  const i = sections.findIndex((s) => s.id === id);
  return (
    <section aria-labelledby={id} className="border-t border-border py-12 first:border-t-0 first:pt-0">
      <h2 id={id} className="mb-5 flex items-baseline gap-3 font-heading text-[1.75rem] leading-tight font-medium tracking-tight">
        <span className="font-mono text-sm font-normal text-brand">{String(i + 1).padStart(2, "0")}</span>
        {sections[i].text}
      </h2>
      <div className="space-y-4 text-[1.0625rem] leading-[1.75] text-foreground/90">{children}</div>
    </section>
  );
}

const facts: { label: string; value: string }[] = [
  { label: "Status", value: research.status },
  { label: "Institution", value: research.institution },
  { label: "Supervisor", value: research.supervisor },
  { label: "Period", value: research.period },
  { label: "Platform", value: research.platform },
  { label: "Methods", value: "Time-series forecasting (ARIMA, LSTM)" },
];

export default function ResearchPage() {
  return (
    <Container>
      {/* ---------- Header ---------- */}
      <header className="grid gap-10 pt-16 pb-12 sm:pt-24 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
        <div>
          <Eyebrow className="mb-4">Research · M.Tech thesis</Eyebrow>
          <h1 className="max-w-3xl font-heading text-4xl leading-[1.1] font-medium tracking-tight text-balance sm:text-5xl">
            {research.title}
          </h1>

          <div className="mt-8 max-w-2xl rounded-xl border border-border bg-card p-5 sm:p-6">
            <p className="mb-2 font-mono text-[11px] tracking-wider text-muted-foreground uppercase">In short</p>
            <p className="leading-relaxed">
              Applications spread across edge devices and cloud servers don&apos;t behave the same all the
              time: their load and resource needs rise and fall. If a scheduler waits until a performance
              guarantee (an SLA) is broken before reacting, users have already been affected. My research
              forecasts how applications will behave and uses those forecasts to make scheduling decisions{" "}
              <em>early</em>, then measures whether that actually reduces SLA violations compared with
              reacting after the fact.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <SmartLink
              href={research.links.code}
              className="inline-flex h-9 items-center gap-2 rounded-md border border-border px-3.5 font-medium transition-colors hover:bg-muted"
            >
              <GithubIcon className="size-4" /> Code
            </SmartLink>
            <Link
              href="/projects/sla-aware-scheduling-edge-cloud"
              className="inline-flex h-9 items-center gap-2 rounded-md px-3.5 font-medium text-brand hover:underline hover:underline-offset-4"
            >
              Experiment log <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <dl className="grid content-start gap-4 self-start border-t border-border pt-6 text-sm lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">{f.label}</dt>
              <dd className="mt-1">
                <TextWithPlaceholders text={f.value} />
              </dd>
            </div>
          ))}
        </dl>
      </header>

      {/* ---------- Body ---------- */}
      <div className="grid gap-12 border-t border-border pt-12 lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-16">
        <article className="max-w-[46rem] min-w-0">
          <Section id="question">
            <blockquote className="border-l-2 border-brand pl-5 font-heading text-xl leading-snug text-foreground sm:text-2xl">
              Can forecasting application behaviour let a scheduler in the edge-cloud continuum act{" "}
              <em>before</em> SLA violations occur, and how does such a proactive approach compare with a
              reactive one?
            </blockquote>
            {/* [REVIEW] Sub-questions below are inferred from the project scope. Edit to match your thesis. */}
            <p>This breaks down into two narrower questions:</p>
            <ul className="list-disc space-y-1.5 pl-6 marker:text-muted-foreground">
              <li>
                How well can application behaviour be forecast, and which model (a classical statistical
                model such as ARIMA, or a neural model such as an LSTM) gives forecasts that are useful for
                scheduling?
              </li>
              <li>
                Given those forecasts, how much does proactive scheduling change SLA outcomes compared with
                a reactive baseline?
              </li>
            </ul>
          </Section>

          <Section id="motivation">
            <p>
              The edge-cloud continuum places computation anywhere from small edge nodes close to users to
              large cloud data centres. Edge resources are limited and heterogeneous, and the applications
              running on them are dynamic: demand changes over time.
            </p>
            <p>
              A reactive scheduler only moves or re-allocates work after it observes a problem. In a
              latency-sensitive setting, the SLA has already been violated by then. Prediction offers{" "}
              <strong>lead time</strong>: if a violation can be anticipated, the scheduler can act while
              there is still headroom.
            </p>
            <p>
              <Placeholder>ADD SPECIFIC MOTIVATION AND THE GAP IN RELATED WORK THIS RESEARCH ADDRESSES</Placeholder>
            </p>
          </Section>

          <Section id="architecture">
            <p>
              At a high level the system is a control loop: observe the applications, forecast their
              behaviour, and feed those forecasts into scheduling decisions.
            </p>
            <ArchitectureDiagram />
            <FigurePlaceholder
              label="ADD FINAL SYSTEM ARCHITECTURE DIAGRAM"
              caption="Detailed architecture of the implemented system."
            />
          </Section>

          <Section id="icontinuum">
            <p>
              Experiments run on <strong>iContinuum</strong>, an emulator for the edge-cloud continuum.
              Emulation makes it possible to reproduce the same scenario many times and compare scheduling
              strategies under identical conditions, which is difficult on live infrastructure.
            </p>
            <p>
              <Placeholder>ADD HOW iCONTINUUM IS CONFIGURED: TOPOLOGY, NODES, APPLICATIONS, MONITORING</Placeholder>
            </p>
            <p className="text-sm text-muted-foreground">
              Reference: <Placeholder>ADD iCONTINUUM CITATION</Placeholder>
            </p>
          </Section>

          <Section id="prediction">
            <p>
              The prediction task is framed as time-series forecasting: given the recent history of a
              monitored signal <Tex tex="y" />, estimate its value <Tex tex="h" /> steps ahead.
            </p>
            <div className="rounded-lg border border-border bg-card px-4 py-2">
              <Tex block tex="\hat{y}_{t+h \mid t} = f\left(y_t,\, y_{t-1},\, \dots,\, y_{t-k+1}\right)" />
            </div>
            <p>
              <strong>ARIMA(p, d, q)</strong> models the <Tex tex="d" />-times differenced series as a linear
              function of its own past values and past forecast errors:
            </p>
            <div className="rounded-lg border border-border bg-card px-4 py-2">
              <Tex
                block
                tex="\Big(1 - \sum_{i=1}^{p} \phi_i L^i\Big)(1 - L)^d\, y_t = c + \Big(1 + \sum_{j=1}^{q} \theta_j L^j\Big)\varepsilon_t"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              where <Tex tex="L" /> is the lag operator (<Tex tex="L y_t = y_{t-1}" />) and{" "}
              <Tex tex="\varepsilon_t" /> is white noise.
            </p>
            <p>
              An <strong>LSTM</strong> is a recurrent neural network whose gated memory cell can learn
              non-linear temporal dependencies directly from data, without the linearity assumption.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <caption className="sr-only">Comparison of ARIMA and LSTM for forecasting</caption>
                <thead>
                  <tr className="border-b border-border text-left">
                    <th scope="col" className="py-2 pr-4 font-medium" />
                    <th scope="col" className="py-2 pr-4 font-medium">ARIMA</th>
                    <th scope="col" className="py-2 font-medium">LSTM</th>
                  </tr>
                </thead>
                <tbody className="text-foreground/85">
                  {[
                    ["Structure", "Linear in past values and errors", "Non-linear, learned representation"],
                    ["Data needed", "Works with short histories", "Generally needs more data"],
                    ["Interpretability", "Coefficients are inspectable", "Largely a black box"],
                    ["Cost", "Cheap to fit and to refit", "Higher training and tuning cost"],
                  ].map(([k, a, b]) => (
                    <tr key={k} className="border-b border-border/60">
                      <th scope="row" className="py-2 pr-4 text-left font-mono text-xs font-normal text-muted-foreground">
                        {k}
                      </th>
                      <td className="py-2 pr-4">{a}</td>
                      <td className="py-2">{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              <Placeholder>ADD WHICH SIGNALS ARE FORECAST, HORIZON h, WINDOW k, TRAINING / VALIDATION SETUP</Placeholder>
            </p>
          </Section>

          <Section id="scheduling">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-border p-4">
                <p className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">Reactive (baseline)</p>
                <p className="mt-2 text-base">Act once a violation is <em>observed</em>.</p>
                <div className="mt-2 text-sm">
                  <Tex tex="\text{act at } t \iff y_t > \tau" />
                </div>
              </div>
              <div className="rounded-lg border border-brand/30 bg-brand-soft p-4">
                <p className="font-mono text-[11px] tracking-wider text-brand uppercase">Proactive</p>
                <p className="mt-2 text-base">Act once a violation is <em>predicted</em>.</p>
                <div className="mt-2 text-sm">
                  <Tex tex="\text{act at } t \iff \exists\, k \le h:\ \hat{y}_{t+k \mid t} > \tau" />
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              <Tex tex="\tau" /> is the SLA threshold. These are the general forms only; the exact decision
              rule is described below.
            </p>
            <p>
              <Placeholder>ADD THE SCHEDULING POLICY: WHAT ACTIONS ARE AVAILABLE AND HOW FORECASTS TRIGGER THEM</Placeholder>
            </p>
          </Section>

          <Section id="methodology">
            <ol className="list-decimal space-y-2 pl-6 marker:font-mono marker:text-sm marker:text-muted-foreground">
              <li>
                Scenarios and workloads: <Placeholder>ADD</Placeholder>
              </li>
              <li>
                Baseline: reactive scheduling under the same scenarios.
              </li>
              <li>
                Predictors compared: ARIMA, LSTM <Placeholder>ADD OTHERS IF ANY</Placeholder>
              </li>
              <li>
                Repetitions and statistical treatment: <Placeholder>ADD NUMBER OF RUNS, CONFIDENCE INTERVALS</Placeholder>
              </li>
            </ol>
          </Section>

          <Section id="metrics">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-border p-4">
                <p className="font-medium">Prediction quality</p>
                <p className="mt-1 text-sm text-muted-foreground">How accurate are the forecasts?</p>
                <p className="mt-3 text-sm">
                  <Placeholder>ADD FORECAST METRICS, e.g. MAE, RMSE</Placeholder>
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <p className="font-medium">Scheduling outcome</p>
                <p className="mt-1 text-sm text-muted-foreground">Does acting early help?</p>
                <p className="mt-3 text-sm">
                  <Placeholder>ADD OUTCOME METRICS, e.g. SLA VIOLATION COUNT / RATE</Placeholder>
                </p>
              </div>
            </div>
          </Section>

          <Section id="results">
            <Callout title="Results pending">
              Experiments are ongoing. Results will be published here once they are final.
            </Callout>
            <Metrics
              items={[
                { label: "SLA violations (reactive)", value: "[ADD RESULT]" },
                { label: "SLA violations (proactive)", value: "[ADD RESULT]" },
                { label: "Best forecaster", value: "[ADD RESULT]" },
                { label: "Forecast error", value: "[ADD RESULT]" },
              ]}
            />
            <FigurePlaceholder label="ADD FORECAST VS ACTUAL PLOT" caption="Forecast vs. observed application behaviour." />
            <FigurePlaceholder
              label="ADD REACTIVE VS PROACTIVE COMPARISON"
              caption="SLA violations under reactive and proactive scheduling."
            />
          </Section>

          <Section id="publications">
            {publications.length === 0 ? (
              <p>
                <Placeholder>ADD PUBLICATIONS IN data/research.ts, OR REMOVE THIS SECTION</Placeholder>
              </p>
            ) : (
              <ul className="space-y-4">
                {publications.map((p) => (
                  <li key={p.title}>
                    <p className="font-medium">
                      {p.url ? <SmartLink href={p.url} className="hover:text-brand">{p.title}</SmartLink> : p.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {p.venue} · {p.status}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </Section>

          <Section id="future-work">
            <ul className="list-disc space-y-1.5 pl-6 marker:text-muted-foreground">
              <li>
                <Placeholder>ADD FUTURE DIRECTION</Placeholder>
              </li>
              <li>
                <Placeholder>ADD FUTURE DIRECTION</Placeholder>
              </li>
            </ul>
          </Section>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents headings={sections} />
          </div>
        </aside>
      </div>
    </Container>
  );
}
