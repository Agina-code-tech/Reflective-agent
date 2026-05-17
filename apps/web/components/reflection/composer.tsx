"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { createReflectionFromEntry, getEntries, getProfile, refreshWeeklySummary, upsertEntry } from "../../lib/storage";
import type { MoodTag } from "../../lib/types";
import { Button } from "../ui/button";
import { Panel } from "../ui/panel";
import { Textarea } from "../ui/textarea";

const moodOptions: Array<MoodTag | ""> = ["", "calm", "heavy", "uncertain", "clear", "tender", "mixed"];

export function Composer() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [moodTag, setMoodTag] = useState<MoodTag | "">("");
  const [draftSaved, setDraftSaved] = useState(false);

  useEffect(() => {
    const draft = window.localStorage.getItem("reflective.draft");
    if (draft) setContent(draft);
    const mood = window.localStorage.getItem("reflective.draftMood") as MoodTag | null;
    if (mood) setMoodTag(mood);
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      window.localStorage.setItem("reflective.draft", content);
      window.localStorage.setItem("reflective.draftMood", moodTag);
      setDraftSaved(true);
    }, 250);

    return () => window.clearTimeout(timeout);
  }, [content, moodTag]);

  const helperText = useMemo(() => {
    if (!content.trim()) return "Start wherever the thought is most available.";
    if (content.length < 80) return "A short entry is enough. Continuity grows through return, not volume.";
    return "The writing can stay unpolished. This space is for making thought visible.";
  }, [content]);

  function submit() {
    const profile = getProfile();
    const entries = getEntries();
    const reflection = createReflectionFromEntry(content, profile, entries);
    const entryId = crypto.randomUUID();
    const entry = {
      id: entryId,
      content: content.trim(),
      moodTag,
      createdAt: new Date().toISOString(),
      reflection
    };

    upsertEntry(entry);
    refreshWeeklySummary([entry, ...entries]);
    window.localStorage.removeItem("reflective.draft");
    window.localStorage.removeItem("reflective.draftMood");
    router.push(`/reflect/${entryId}`);
  }

  return (
    <Panel className="mx-auto max-w-4xl p-5 md:p-8">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-[hsl(var(--muted-foreground))]">Reflection composer</div>
          <h1 className="mt-2 font-serif text-4xl leading-none text-[hsl(var(--foreground))] md:text-5xl">Write without having to perform.</h1>
        </div>
        <div className="text-sm text-[hsl(var(--muted-foreground))]">{draftSaved ? "Draft saved" : "Autosaving"}</div>
      </div>

      <div className="space-y-5">
        <Textarea
          aria-label="Journal entry"
          autoFocus
          placeholder="What feels worth placing into words today?"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          className="min-h-[340px] text-[20px] leading-9 md:min-h-[420px] md:text-[22px]"
        />

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">Optional mood tag</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {moodOptions.map((option) => (
                <button
                  key={option || "none"}
                  type="button"
                  onClick={() => setMoodTag(option)}
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

          <div className="flex flex-col items-start gap-3 md:items-end">
            <div className="max-w-sm text-sm leading-7 text-[hsl(var(--muted-foreground))]">{helperText}</div>
            <Button disabled={!content.trim()} onClick={submit}>
              Reflect on this entry
            </Button>
          </div>
        </div>
      </div>
    </Panel>
  );
}

