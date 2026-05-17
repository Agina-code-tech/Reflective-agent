import type { ReflectionProfile } from "@shared/types";
import { buildReflectionPrompt, buildWeeklySummaryPrompt } from "@shared/prompts";
import { isSafeReflection, sanitizeReflectionText } from "@shared/safety";
import { generateEmbedding } from "./embeddings";

export type MemoryRecord = {
  content: string;
  createdAt: string;
};

export async function buildReflectionPipeline(input: {
  profile: ReflectionProfile;
  entryContent: string;
  relevantMemories: MemoryRecord[];
  recentEntries: MemoryRecord[];
}) {
  const embedding = await generateEmbedding(input.entryContent);
  const prompt = buildReflectionPrompt({
    profile: input.profile,
    entryContent: input.entryContent,
    relevantMemories: input.relevantMemories.map((memory) => memory.content),
    recentEntries: input.recentEntries.map((entry) => entry.content)
  });

  return {
    embedding,
    prompt
  };
}

export function finalizeReflectionOutput(rawText: string) {
  const safeText = sanitizeReflectionText(rawText);
  return {
    text: safeText,
    safe: isSafeReflection(safeText)
  };
}

export function buildWeeklySummaryPipeline(input: {
  entries: string[];
  reflections: string[];
  themes: string[];
}) {
  return buildWeeklySummaryPrompt(input);
}

