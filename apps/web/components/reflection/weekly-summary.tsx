"use client";

import { useEffect, useState } from "react";
import { getEntries, getWeeklySummary } from "../../lib/storage";
import type { WeeklySummary } from "../../lib/types";
import { Panel } from "../ui/panel";

export function WeeklySummaryView() {
  const [summary, setSummary] = useState<WeeklySummary | null>(null);

  useEffect(() => {
    const entries = getEntries();
    setSummary(getWeeklySummary(entries));
  }, []);

  return (
    <Panel className="p-6 md:p-8">
      {summary ? (
        <div className="grid gap-6 md:grid-cols-[1fr_280px]">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-[hsl(var(--muted-foreground))]">Weekly synthesis</div>
            <h1 className="mt-3 font-serif text-4xl leading-none text-[hsl(var(--foreground))]">{summary.title}</h1>
            <p className="mt-5 max-w-3xl text-[19px] leading-9 text-[hsl(var(--foreground))]">{summary.summaryText}</p>
          </div>
          <div className="rounded-[24px] border border-[hsl(var(--border))] bg-white/50 p-5">
            <div className="text-xs uppercase tracking-[0.22em] text-[hsl(var(--muted-foreground))]">Recurring themes</div>
            <ul className="mt-4 space-y-3">
              {summary.themes.map((theme) => (
                <li
                  key={theme}
                  className="rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-4 py-2 text-sm capitalize"
                >
                  {theme}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="text-sm text-[hsl(var(--muted-foreground))]">Loading weekly synthesis...</div>
      )}
    </Panel>
  );
}
