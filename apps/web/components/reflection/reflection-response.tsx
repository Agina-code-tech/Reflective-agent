import type { JournalEntry } from "../../lib/types";
import { Panel } from "../ui/panel";

export function ReflectionResponseView({ entry }: { entry: JournalEntry }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      <Panel className="p-6">
        <div className="text-xs uppercase tracking-[0.22em] text-[hsl(var(--muted-foreground))]">Reflection</div>
        <p className="mt-4 text-[17px] leading-8">{entry.reflection.reflection}</p>
      </Panel>
      <Panel className="p-6">
        <div className="text-xs uppercase tracking-[0.22em] text-[hsl(var(--muted-foreground))]">Observed pattern</div>
        <p className="mt-4 text-[17px] leading-8">{entry.reflection.observedPattern}</p>
      </Panel>
      <Panel className="p-6">
        <div className="text-xs uppercase tracking-[0.22em] text-[hsl(var(--muted-foreground))]">Reflective question</div>
        <p className="mt-4 text-[17px] leading-8">{entry.reflection.reflectiveQuestion}</p>
      </Panel>
    </div>
  );
}

