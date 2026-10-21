import { levelLabel, type SkillLevel, skillGroups } from "@/data/skills";
import { cn } from "@/lib/utils";

/*
 * Skills are shown as plain chips with a small marker for the level, never as
 * progress bars or percentages (a "90% Python" bar means nothing to a reader).
 */

function LevelMark({ level }: { level: SkillLevel }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block size-2 shrink-0 rounded-full",
        level === "comfortable" && "bg-foreground/80",
        level === "familiar" && "border border-foreground/60 bg-[linear-gradient(90deg,currentColor_50%,transparent_50%)] text-foreground/60",
        level === "learning" && "border border-dashed border-foreground/50",
      )}
    />
  );
}

export function SkillLegend() {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground" aria-label="Skill levels">
      {(Object.keys(levelLabel) as SkillLevel[]).map((level) => (
        <li key={level} className="flex items-center gap-2">
          <LevelMark level={level} />
          {levelLabel[level]}
        </li>
      ))}
    </ul>
  );
}

export function SkillsGrid() {
  return (
    <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {skillGroups.map((group) => (
        <div key={group.category}>
          <h3 className="mb-3 border-b border-border pb-2 font-mono text-xs tracking-wider text-muted-foreground uppercase">
            {group.category}
          </h3>
          <ul className="flex flex-wrap gap-2">
            {group.skills.map((s) => (
              <li
                key={s.name}
                className={cn(
                  "flex items-center gap-2 rounded-md border px-2.5 py-1 text-sm",
                  s.level === "learning"
                    ? "border-dashed border-border text-muted-foreground"
                    : "border-border bg-card",
                )}
              >
                <LevelMark level={s.level} />
                {s.name}
                <span className="sr-only">({levelLabel[s.level]})</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
