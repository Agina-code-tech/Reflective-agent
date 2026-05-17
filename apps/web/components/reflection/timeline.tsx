"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getEntries } from "../../lib/storage";
import type { JournalEntry } from "../../lib/types";
import { Panel } from "../ui/panel";

export function Timeline() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  useEffect(() => {
    setEntries(getEntries());
  }, []);

  return (
    <div className="space-y-6">
      {entries.length === 0 ? (
        <Panel className="p-6 text-sm text-[hsl(var(--muted-foreground))]">No entries yet. Your chapters will appear here.</Panel>
      ) : (
        entries.map((entry, index) => (
          <Panel key={entry.id} className="p-6 md:p-8">
            <div className="grid gap-5 md:grid-cols-[180px_1fr]">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">
                  {new Date(entry.createdAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  })}
                </div>
                <div className="mt-3 font-serif text-3xl text-[hsl(var(--foreground))]">
                  Chapter {entries.length - index}
                </div>
              </div>
              <Link href={`/reflect/${entry.id}`} className="space-y-4">
                <p className="text-[20px] leading-9 text-[hsl(var(--foreground))]">{entry.content}</p>
                <div className="text-sm leading-7 text-[hsl(var(--muted-foreground))]">{entry.reflection.reflection}</div>
              </Link>
            </div>
          </Panel>
        ))
      )}
    </div>
  );
}
