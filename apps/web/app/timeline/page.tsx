"use client";

import { PageTransition } from "../../components/layout/page-transition";
import { Shell } from "../../components/layout/shell";
import { Timeline } from "../../components/reflection/timeline";

export default function TimelinePage() {
  return (
    <Shell eyebrow="Timeline">
      <PageTransition>
        <div className="mb-8 max-w-2xl space-y-4">
          <div className="text-xs uppercase tracking-[0.22em] text-[hsl(var(--muted-foreground))]">Reflection timeline</div>
          <h1 className="font-serif text-5xl leading-none text-[hsl(var(--foreground))]">Revisit the chapters quietly.</h1>
          <p className="text-lg leading-8 text-[hsl(var(--muted-foreground))]">
            Entries are arranged as a calm chronology, so continuity can be felt rather than analyzed.
          </p>
        </div>
        <Timeline />
      </PageTransition>
    </Shell>
  );
}

