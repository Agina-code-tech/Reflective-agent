import { Injectable } from "@nestjs/common";
import { buildWeeklySummaryPipeline } from "@ai/orchestrator";
import { JournalService } from "../journal/journal.service";
import { DEMO_USER_ID } from "../auth/auth.service";

@Injectable()
export class WeeklySummariesService {
  constructor(private readonly journalService: JournalService) {}

  listSummaries() {
    const entries = this.journalService.listEntries(DEMO_USER_ID);
    return [this.buildSummary(entries)];
  }

  getLatestSummary() {
    const entries = this.journalService.listEntries(DEMO_USER_ID);
    return this.buildSummary(entries);
  }

  private buildSummary(entries: Array<{ content: string; createdAt: string }>) {
    const themes = entries
      .flatMap((entry) => entry.content.toLowerCase().split(/[^a-z0-9]+/))
      .filter((token) => token.length > 3)
      .slice(0, 4);

    const prompt = buildWeeklySummaryPipeline({
      entries: entries.map((entry) => entry.content),
      reflections: entries.map((entry) => entry.content),
      themes
    });

    return {
      id: "weekly-summary-demo",
      userId: DEMO_USER_ID,
      summaryText:
        entries.length === 0
          ? "No entries yet. This week is still waiting to be written."
          : "This week moves between pressure, clarity, and the effort to stay coherent without rushing the meaning.",
      periodStart: entries.at(-1)?.createdAt ?? new Date().toISOString(),
      periodEnd: entries[0]?.createdAt ?? new Date().toISOString(),
      prompt,
      themes: themes.length > 0 ? [...new Set(themes)].slice(0, 4) : ["continuity", "clarity", "tension"]
    };
  }
}

