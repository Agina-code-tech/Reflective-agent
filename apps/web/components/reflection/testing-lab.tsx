"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { buildWeeklySummary } from "../../lib/reflective-engine";
import { clearReflectionStorage, getEntries, getProfile, refreshWeeklySummary, saveEntries, saveProfile } from "../../lib/storage";
import type { JournalEntry, ReflectionProfile, ReflectionResponse, WeeklySummary } from "../../lib/types";
import { Button } from "../ui/button";
import { Panel } from "../ui/panel";
import { Textarea } from "../ui/textarea";

const sampleEntries: Array<Omit<JournalEntry, "reflection"> & { reflection: ReflectionResponse }> = [
  {
    id: "lab-1",
    content: "I keep noticing how quickly I turn uncertainty into a task.",
    moodTag: "uncertain",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
    reflection: {
      reflection: "Gently, the writing suggests you are trying to hold feeling, meaning, and next steps in the same frame.",
      observedPattern: "There may be a recurring tension between responsibility and exhaustion.",
      reflectiveQuestion: "What would change if you let the uncertainty stay visible a little longer?"
    }
  },
  {
    id: "lab-2",
    content: "There was a moment of clarity today, and I almost immediately tried to explain it away.",
    moodTag: "clear",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    reflection: {
      reflection: "As you stay with this, the writing suggests you are trying to hold feeling, meaning, and next steps in the same frame.",
      observedPattern: "Clarity appears alongside the urge to organize it quickly.",
      reflectiveQuestion: "What stays true if you do not rush to name the whole shape of it?"
    }
  }
];

const sampleProfile: ReflectionProfile = {
  intent: "reflect consistently",
  reflectionStyle: "gentle",
  pacingPreference: "few-times-weekly"
};

function formatCount(value: number) {
  return new Intl.NumberFormat().format(value);
}

export function TestingLab() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [profile, setProfile] = useState<ReflectionProfile>(sampleProfile);
  const [draft, setDraft] = useState("I want to understand the shape of this season without over-explaining it.");
  const [moodTag, setMoodTag] = useState<JournalEntry["moodTag"]>("uncertain");
  const [preview, setPreview] = useState<ReflectionResponse | null>(null);
  const [summary, setSummary] = useState<WeeklySummary | null>(null);

  useEffect(() => {
    setEntries(getEntries());
    setProfile(getProfile());
  }, []);

  const metrics = useMemo(
    () => [
      { label: "Entries", value: formatCount(entries.length) },
      { label: "Profile tone", value: profile.reflectionStyle || "unset" },
      { label: "Pacing", value: profile.pacingPreference || "unset" }
    ],
    [entries.length, profile.pacingPreference, profile.reflectionStyle]
  );

  function seedLabContent() {
    saveProfile(sampleProfile);
    saveEntries(sampleEntries as JournalEntry[]);
    const seededEntries = sampleEntries as JournalEntry[];
    setProfile(sampleProfile);
    setEntries(seededEntries);
    setPreview(seededEntries[0]?.reflection ?? null);
    const nextSummary = buildWeeklySummary(seededEntries);
    refreshWeeklySummary(seededEntries);
    setSummary(nextSummary);
  }

  function clearLabContent() {
    clearReflectionStorage();
    setEntries([]);
    setProfile(sampleProfile);
    setPreview(null);
    setSummary(null);
  }

  function generatePreview() {
    const nextPreview = buildWeeklySummary(
      [
        {
          id: "preview-1",
          userId: "lab",
          content: draft,
          moodTag,
          createdAt: new Date().toISOString()
        }
      ].map((entry, index) => ({
        ...entry,
        id: `${entry.id}-${index}`,
        reflection: sampleEntries[0].reflection
      }))
    );

    setPreview({
      reflection: `Gently, ${draft.slice(0, 90) || "this entry"} feels like a place where meaning is still forming.`,
      observedPattern: nextPreview.themes.length > 0 ? `Recurring themes: ${nextPreview.themes.join(", ")}.` : "A small continuity appears, but it is still soft.",
      reflectiveQuestion: "What would you notice if you let this stay unfinished for one more pass?"
    });
  }

  return (
    <div className="space-y-8">
      <Panel className="p-7 md:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            <div className="text-xs uppercase tracking-[0.24em] text-[hsl(var(--muted-foreground))]">Testing lab</div>
            <h1 className="font-serif text-5xl leading-none text-[hsl(var(--foreground))]">A control room for calm testing.</h1>
            <p className="max-w-2xl text-lg leading-8 text-[hsl(var(--muted-foreground))]">
              Use this page to seed local reflection data, preview weekly synthesis, and jump between the core product states without losing your place.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button href="/dashboard">Dashboard</Button>
              <Button href="/reflect/new" variant="secondary">
                Composer
              </Button>
              <Button href="/timeline" variant="secondary">
                Timeline
              </Button>
              <Button href="/weekly" variant="secondary">
                Weekly synthesis
              </Button>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-1">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-[20px] border border-[hsl(var(--border))] bg-white/50 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-[hsl(var(--muted-foreground))]">{metric.label}</div>
                <div className="mt-2 font-serif text-3xl text-[hsl(var(--foreground))]">{metric.value}</div>
              </div>
            ))}
          </div>
        </div>
      </Panel>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Panel className="p-6 md:p-8">
          <div className="text-xs uppercase tracking-[0.22em] text-[hsl(var(--muted-foreground))]">Lab actions</div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button onClick={seedLabContent}>Seed demo data</Button>
            <Button onClick={clearLabContent} variant="secondary">
              Clear local memory
            </Button>
            <Button onClick={generatePreview} variant="secondary">
              Generate preview
            </Button>
          </div>

          <div className="mt-8 space-y-6">
            <div>
              <div className="text-sm uppercase tracking-[0.18em] text-[hsl(var(--muted-foreground))]">Sample reflection input</div>
              <Textarea
                className="mt-3 min-h-44 text-[18px] leading-8"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {["", "calm", "heavy", "uncertain", "clear", "tender", "mixed"].map((option) => (
                <button
                  key={option || "none"}
                  type="button"
                  onClick={() => setMoodTag(option as JournalEntry["moodTag"])}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    moodTag === option
                      ? "border-[hsl(var(--foreground))] bg-[hsl(var(--foreground))] text-[hsl(var(--background))]"
                      : "border-[hsl(var(--border))] bg-white/50 text-[hsl(var(--foreground))] hover:bg-[hsl(var(--surface-strong))]"
                  }`}
                >
                  {option || "none"}
                </button>
              ))}
            </div>
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel className="p-6 md:p-8">
            <div className="text-xs uppercase tracking-[0.22em] text-[hsl(var(--muted-foreground))]">Live previews</div>

            <div className="mt-5 space-y-4">
              <div className="rounded-[20px] border border-[hsl(var(--border))] bg-white/50 p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-[hsl(var(--muted-foreground))]">Reflection response</div>
                <div className="mt-3 space-y-3 text-sm leading-7 text-[hsl(var(--foreground))]">
                  <p>{preview?.reflection ?? "Generate a preview to inspect a sample response."}</p>
                  <p>{preview?.observedPattern ?? "The observed pattern will appear here."}</p>
                  <p>{preview?.reflectiveQuestion ?? "The reflective question will appear here."}</p>
                </div>
              </div>

              <div className="rounded-[20px] border border-[hsl(var(--border))] bg-white/50 p-5">
                <div className="text-xs uppercase tracking-[0.18em] text-[hsl(var(--muted-foreground))]">Weekly synthesis</div>
                <p className="mt-3 text-sm leading-7 text-[hsl(var(--foreground))]">
                  {summary?.summaryText ?? "Seed demo data to preview the weekly continuity view."}
                </p>
                {summary ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {summary.themes.map((theme) => (
                      <span key={theme} className="rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-3 py-1 text-xs capitalize">
                        {theme}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </Panel>

          <Panel className="p-6 md:p-8">
            <div className="text-xs uppercase tracking-[0.22em] text-[hsl(var(--muted-foreground))]">Entry shortcuts</div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <Button href="/onboarding" variant="secondary">
                Onboarding
              </Button>
              <Button href="/reflect/new" variant="secondary">
                New reflection
              </Button>
              <Button href="/reflect/sample-1" variant="secondary">
                Sample reflection A
              </Button>
              <Button href="/reflect/sample-2" variant="secondary">
                Sample reflection B
              </Button>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
