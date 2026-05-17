export type ReflectionStyle = "gentle" | "analytical" | "exploratory" | "concise";

export type ReflectionPacing = "daily" | "few-times-weekly" | "weekly";

export type ReflectionIntent =
  | "understand emotions"
  | "organize thoughts"
  | "reflect consistently"
  | "process experiences";

export type MoodTag = "calm" | "heavy" | "uncertain" | "clear" | "tender" | "mixed";

export type ReflectionProfile = {
  intent: ReflectionIntent | "";
  reflectionStyle: ReflectionStyle | "";
  pacingPreference: ReflectionPacing | "";
};

export type ReflectionResponse = {
  reflection: string;
  observedPattern: string;
  reflectiveQuestion: string;
};

export type JournalEntry = {
  id: string;
  content: string;
  moodTag: MoodTag | "";
  createdAt: string;
  reflection: ReflectionResponse;
};

export type WeeklySummary = {
  id: string;
  title: string;
  periodStart: string;
  periodEnd: string;
  summaryText: string;
  themes: string[];
};

