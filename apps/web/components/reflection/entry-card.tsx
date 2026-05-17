import type { JournalEntry } from "../../lib/types";
import { Panel } from "../ui/panel";

export function EntryCard({ entry }: { entry: JournalEntry }) {
  return (
    <Panel className="p-5">
      <div className="flex items-center justify-between gap-4">
        <div className="text-sm uppercase tracking-[0.18em] text-[hsl(var(--muted-foreground))]">
          {new Date(entry.createdAt).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric"
          })}
        </div>
        <div className="rounded-full border border-[hsl(var(--border))] px-3 py-1 text-xs text-[hsl(var(--muted-foreground))]">
          {entry.moodTag || "unlabeled"}
        </div>
      </div>
      <p className="mt-4 line-clamp-3 font-serif text-2xl leading-tight text-[hsl(var(--foreground))]">{entry.content}</p>
      <div className="mt-4 border-t border-[hsl(var(--border))] pt-4 text-sm leading-7 text-[hsl(var(--muted-foreground))]">
        {entry.reflection.observedPattern}
      </div>
    </Panel>
  );
}

