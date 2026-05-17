import type { JournalEntry, ReflectionProfile, ReflectionResponse, WeeklySummary } from "./types";

const tokenise = (content: string) =>
  content
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .map((token) => token.trim())
    .filter(Boolean);

function inferPattern(content: string) {
  const text = content.toLowerCase();

  if (text.includes("tired") || text.includes("exhaust")) {
    return "There seems to be a recurring tension between responsibility and exhaustion.";
  }

  if (text.includes("work") || text.includes("career") || text.includes("job")) {
    return "Work may be carrying both meaning and pressure at the same time.";
  }

  if (text.includes("family") || text.includes("home")) {
    return "Home and family appear to shape the emotional weather of this moment.";
  }

  if (text.includes("future") || text.includes("change") || text.includes("uncertain")) {
    return "There may be a pull between wanting direction and staying open to uncertainty.";
  }

  if (text.includes("alone") || text.includes("lonely")) {
    return "Aloneness seems to matter here, not only as absence but as something you are trying to understand.";
  }

  return "A quiet recurring question seems to be how much of yourself to carry, and how much to release.";
}

function inferReflection(content: string, style: ReflectionProfile["reflectionStyle"] | "") {
  const prefix =
    style === "analytical"
      ? "Looking closely, "
      : style === "concise"
        ? "At a glance, "
        : style === "exploratory"
          ? "As you stay with this, "
          : "Gently, ";

  if (content.length < 80) {
    return `${prefix}this entry feels like a first clear signal rather than a full conclusion.`;
  }

  return `${prefix}the writing suggests you are trying to hold feeling, meaning, and next steps in the same frame.`;
}

function inferQuestion(style: ReflectionProfile["reflectionStyle"] | "") {
  if (style === "analytical") {
    return "What becomes easier to notice if you slow this down into one specific pattern?";
  }

  if (style === "concise") {
    return "What matters most here?";
  }

  if (style === "exploratory") {
    return "What part of this feels most alive if you let it stay unanswered for a moment?";
  }

  return "What would it mean to meet this with a little less pressure and a little more clarity?";
}

export function buildReflectionResponse(params: {
  entryContent: string;
  profile: ReflectionProfile;
  recentEntries: JournalEntry[];
}): ReflectionResponse {
  const content = params.entryContent.trim();
  const tone = params.profile.reflectionStyle;
  const recentThemes = params.recentEntries.flatMap((entry) => tokenise(entry.content)).slice(0, 24);
  const repeatedWords = [...new Set(recentThemes.filter((word, index, all) => all.indexOf(word) !== index))].slice(0, 2);

  const observedPattern = repeatedWords.length
    ? `A small continuity appears across recent entries: ${repeatedWords.join(" and ")} keep reappearing.`
    : inferPattern(content);

  return {
    reflection: inferReflection(content, tone),
    observedPattern,
    reflectiveQuestion: inferQuestion(tone)
  };
}

export function buildWeeklySummary(entries: JournalEntry[]): WeeklySummary {
  const createdAtSorted = [...entries].sort((left, right) => right.createdAt.localeCompare(left.createdAt));
  const first = createdAtSorted[createdAtSorted.length - 1];
  const last = createdAtSorted[0];
  const tokens = entries.flatMap((entry) => tokenise(entry.content));
  const themeCounts = new Map<string, number>();

  for (const token of tokens) {
    if (token.length < 4) continue;
    themeCounts.set(token, (themeCounts.get(token) ?? 0) + 1);
  }

  const themes = [...themeCounts.entries()]
    .sort((left, right) => right[1] - left[1])
    .slice(0, 4)
    .map(([token]) => token);

  const summaryText =
    entries.length === 0
      ? "No entries yet. This week is still waiting to be written."
      : `This week moves between ${themes[0] ?? "small details"} and ${themes[1] ?? "larger questions"}. The writing suggests continuity without forcing certainty.`;

  return {
    id: `weekly-${last?.createdAt ?? Date.now().toString()}`,
    title: "Weekly synthesis",
    periodStart: first?.createdAt ?? new Date().toISOString(),
    periodEnd: last?.createdAt ?? new Date().toISOString(),
    summaryText,
    themes: themes.length > 0 ? themes : ["continuity", "clarity", "tension"]
  };
}

