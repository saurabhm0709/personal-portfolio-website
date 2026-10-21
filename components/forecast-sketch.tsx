/**
 * Conceptual sketch of the research idea (NOT real data):
 * observed metric → forecast with uncertainty → predicted SLA crossing → act early.
 * Pure SVG, rendered on the server; colours come from CSS variables so it
 * works in both themes.
 */
export function ForecastSketch({ className }: { className?: string }) {
  const observed = "10,105 30,100 50,108 70,96 90,99 110,88 130,92 150,80 170,84 190,72 200,74";
  const forecast = "200,74 220,66 240,57 260,46 280,38 300,30";
  const band =
    "200,74 220,60 240,47 260,33 280,22 300,12 300,48 280,54 260,59 240,67 220,72 200,74";

  return (
    <svg
      viewBox="0 0 320 150"
      className={className}
      role="img"
      aria-labelledby="forecast-sketch-title"
    >
      <title id="forecast-sketch-title">
        Illustration: a monitored metric is forecast forward in time; the forecast crosses the SLA
        threshold, so the scheduler acts before the violation occurs.
      </title>

      {/* SLA threshold */}
      <line x1="10" x2="310" y1="44" y2="44" stroke="var(--placeholder)" strokeWidth="1" strokeDasharray="4 4" />
      <text x="12" y="38" fontSize="9" fill="var(--placeholder)" fontFamily="var(--font-geist-mono)">
        SLA threshold
      </text>

      {/* "now" marker */}
      <line x1="200" x2="200" y1="20" y2="125" stroke="var(--border)" strokeWidth="1" />
      <text x="203" y="134" fontSize="9" fill="var(--muted-foreground)" fontFamily="var(--font-geist-mono)">
        now
      </text>

      {/* forecast uncertainty band + forecast */}
      <polygon points={band} fill="var(--brand-soft)" />
      <polyline points={forecast} fill="none" stroke="var(--brand)" strokeWidth="1.75" strokeDasharray="5 4" />

      {/* observed history */}
      <polyline points={observed} fill="none" stroke="var(--foreground)" strokeWidth="1.75" strokeLinejoin="round" />

      {/* predicted crossing */}
      <circle cx="262" cy="44" r="3.5" fill="var(--background)" stroke="var(--brand)" strokeWidth="1.5" />
      <text x="232" y="146" fontSize="9" fill="var(--brand)" fontFamily="var(--font-geist-mono)">
        act before t*
      </text>
      <line x1="262" x2="262" y1="48" y2="136" stroke="var(--brand)" strokeWidth="0.75" strokeDasharray="2 3" />

      {/* axis */}
      <line x1="10" x2="310" y1="125" y2="125" stroke="var(--border)" strokeWidth="1" />
    </svg>
  );
}
