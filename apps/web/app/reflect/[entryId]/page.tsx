"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PageTransition } from "../../../components/layout/page-transition";
import { Shell } from "../../../components/layout/shell";
import { ReflectionResponseView } from "../../../components/reflection/reflection-response";
import { getEntries } from "../../../lib/storage";
import type { JournalEntry } from "../../../lib/types";
import { Button } from "../../../components/ui/button";
import { Panel } from "../../../components/ui/panel";

export default function ReflectionDetailPage() {
  const params = useParams<{ entryId: string }>();
  const [entry, setEntry] = useState<JournalEntry | null>(null);

  useEffect(() => {
    setEntry(getEntries().find((item) => item.id === params.entryId) ?? null);
  }, [params.entryId]);

  return (
    <Shell eyebrow="Reflection response">
      <PageTransition>
        <div className="space-y-6">
          <Panel className="p-7">
            <div className="text-xs uppercase tracking-[0.22em] text-[hsl(var(--muted-foreground))]">Entry</div>
            <h1 className="mt-3 font-serif text-5xl leading-none text-[hsl(var(--foreground))]">A reflective response</h1>
            <p className="mt-5 max-w-3xl text-[20px] leading-9 text-[hsl(var(--foreground))]">
              {entry?.content ?? "This entry could not be found in the current local memory."}
            </p>
          </Panel>

          {entry ? <ReflectionResponseView entry={entry} /> : <div className="text-sm text-[hsl(var(--muted-foreground))]">Loading reflection...</div>}

          <div className="flex flex-wrap gap-3">
            <Button href="/reflect/new">Write another reflection</Button>
            <Button href="/timeline" variant="secondary">
              View timeline
            </Button>
          </div>
        </div>
      </PageTransition>
    </Shell>
  );
}
