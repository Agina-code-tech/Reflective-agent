export type ReflectionStyle = "gentle" | "analytical" | "exploratory" | "concise";

export type ReflectionPacing = "daily" | "few-times-weekly" | "weekly";

export type ReflectionIntent =
  | "understand emotions"
  | "organize thoughts"
  | "reflect consistently"
  | "process experiences";

export type ReflectionProfile = {
  intent: ReflectionIntent | "";
  reflectionStyle: ReflectionStyle | "";
  pacingPreference: ReflectionPacing | "";
};

export type MoodTag = "calm" | "heavy" | "uncertain" | "clear" | "tender" | "mixed";

export type ReflectionResponse = {
  reflection: string;
  observedPattern: string;
  reflectiveQuestion: string;
};

export type JournalEntry = {
  id: string;
  userId: string;
  content: string;
  moodTag: MoodTag | "";
  embedding?: number[];
  createdAt: string;
};

export type WeeklySummary = {
  id: string;
  userId: string;
  summaryText: string;
  periodStart: string;
  periodEnd: string;
};

