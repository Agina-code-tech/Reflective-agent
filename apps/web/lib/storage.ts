import type { JournalEntry, ReflectionProfile, WeeklySummary } from "./types";
import { buildReflectionResponse, buildWeeklySummary } from "./reflective-engine";

const PROFILE_KEY = "reflective.profile";
const ENTRIES_KEY = "reflective.entries";
const WEEKLY_KEY = "reflective.weekly";

const seedEntries: JournalEntry[] = [
  {
    id: "sample-1",
    content:
      "I keep returning to the feeling that I should be doing more, but I'm not sure whether the pressure is useful or just loud.",
    moodTag: "uncertain",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    reflection: {
      reflection: "Gently, the writing suggests you are trying to hold feeling, meaning, and next steps in the same frame.",
      observedPattern: "There seems to be a recurring tension between responsibility and exhaustion.",
      reflectiveQuestion: "What would it mean to meet this with a little less pressure and a little more clarity?"
    }
  },
  {
    id: "sample-2",
    content: "This morning felt clear for a moment, and then I noticed how quickly I tried to turn it into a plan.",
    moodTag: "clear",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    reflection: {
      reflection: "As you stay with this, the writing suggests you are trying to hold feeling, meaning, and next steps in the same frame.",
      observedPattern: "A small continuity appears across recent entries: clear and plan keep reappearing.",
      reflectiveQuestion: "What part of this feels most alive if you let it stay unanswered for a moment?"
    }
  }
];

function isBrowser() {
  return typeof window !== "undefined";
}

function readJson<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;

  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  if (!isBrowser()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getProfile(): ReflectionProfile {
  return readJson<ReflectionProfile>(PROFILE_KEY, {
    intent: "reflect consistently",
    reflectionStyle: "gentle",
    pacingPreference: "few-times-weekly"
  });
}

export function saveProfile(profile: ReflectionProfile) {
  writeJson(PROFILE_KEY, profile);
}

export function getEntries(): JournalEntry[] {
  if (!isBrowser()) return seedEntries;

  const raw = window.localStorage.getItem(ENTRIES_KEY);
  if (raw === null) return seedEntries;

  try {
    return JSON.parse(raw) as JournalEntry[];
  } catch {
    return seedEntries;
  }
}

export function saveEntries(entries: JournalEntry[]) {
  writeJson(ENTRIES_KEY, entries);
}

export function upsertEntry(entry: JournalEntry) {
  const entries = getEntries();
  const next = [entry, ...entries.filter((existing) => existing.id !== entry.id)];
  saveEntries(next);
  return next;
}

export function getWeeklySummary(entries: JournalEntry[]): WeeklySummary {
  const stored = readJson<WeeklySummary | null>(WEEKLY_KEY, null);
  if (stored) return stored;

  const summary = buildWeeklySummary(entries);
  writeJson(WEEKLY_KEY, summary);
  return summary;
}

export function refreshWeeklySummary(entries: JournalEntry[]) {
  const summary = buildWeeklySummary(entries);
  writeJson(WEEKLY_KEY, summary);
  return summary;
}

export function clearReflectionStorage() {
  if (!isBrowser()) return;

  window.localStorage.removeItem(PROFILE_KEY);
  window.localStorage.setItem(ENTRIES_KEY, JSON.stringify([]));
  window.localStorage.removeItem(WEEKLY_KEY);
}

export function createReflectionFromEntry(entryContent: string, profile: ReflectionProfile, entries: JournalEntry[]) {
  return buildReflectionResponse({
    entryContent,
    profile,
    recentEntries: entries.slice(0, 4)
  });
}
