"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getEntries, getProfile } from "../../lib/storage";
import type { JournalEntry, ReflectionProfile } from "../../lib/types";
import { Button } from "../ui/button";
import { Panel } from "../ui/panel";
import { EntryCard } from "./entry-card";

function greetingForHour(hour: number) {
  if (hour < 12) return "Good morning.";
  if (hour < 18) return "Good afternoon.";
  return "Good evening.";
}

export function Dashboard() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [profile, setProfile] = useState<ReflectionProfile>({
    intent: "",
    reflectionStyle: "",
    pacingPreference: ""
  });

  useEffect(() => {
    setEntries(getEntries());
    setProfile(getProfile());
  }, []);

  const latestEntries = useMemo(() => entries.slice(0, 3), [entries]);
  const greeting = greetingForHour(new Date().getHours());

  return (
    <div className="space-y-8">
      <Panel className="p-7 md:p-10">
        <div className="max-w-3xl space-y-5">
          <div className="text-xs uppercase tracking-[0.24em] text-[hsl(var(--muted-foreground))]">Home</div>
          <h1 className="font-serif text-5xl leading-none text-[hsl(var(--foreground))] md:text-6xl">{greeting}</h1>
          <p className="max-w-2xl text-xl leading-9 text-[hsl(var(--foreground))]">
            What feels worth reflecting on today?
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button href="/reflect/new" className="px-6">
              Begin reflection
            </Button>
            <Button href="/timeline" variant="secondary" className="px-6">
              Open timeline
            </Button>
          </div>
          <div className="text-sm text-[hsl(var(--muted-foreground))]">
            {profile.intent ? `You came here to ${profile.intent}.` : "Your preferences are ready when you are."}
          </div>
        </div>
      </Panel>

      <section className="space-y-4">
        <div className="text-xs uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">Recent reflections</div>
        <div className="grid gap-4 md:grid-cols-3">
          {latestEntries.length > 0 ? (
            latestEntries.map((entry) => (
              <Link key={entry.id} href={`/reflect/${entry.id}`}>
                <EntryCard entry={entry} />
              </Link>
            ))
          ) : (
            <Panel className="p-6 text-sm text-[hsl(var(--muted-foreground))]">No reflections yet. Your first entry will appear here.</Panel>
          )}
        </div>
      </section>
    </div>
  );
}
