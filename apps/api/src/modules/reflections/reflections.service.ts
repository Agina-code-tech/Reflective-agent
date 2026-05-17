import { Injectable } from "@nestjs/common";
import { buildReflectionPipeline, finalizeReflectionOutput } from "@ai/orchestrator";
import { JournalService } from "../journal/journal.service";
import { MemoryService } from "../memory/memory.service";
import { SafetyService } from "../safety/safety.service";
import { EmbeddingsService } from "../embeddings/embeddings.service";
import { UsersService } from "../users/users.service";
import { DEMO_USER_ID } from "../auth/auth.service";

@Injectable()
export class ReflectionsService {
  private readonly reflections = new Map<string, string>();

  constructor(
    private readonly journalService: JournalService,
    private readonly memoryService: MemoryService,
    private readonly usersService: UsersService,
    private readonly safetyService: SafetyService,
    private readonly embeddingsService: EmbeddingsService
  ) {}

  async reflectOnEntry(entryId: string, body: { content: string; moodTag?: string }) {
    const profile = this.usersService.getProfile(DEMO_USER_ID);
    const entry =
      this.journalService.findById(entryId) ??
      this.journalService.createEntry({
        userId: DEMO_USER_ID,
        id: entryId,
        content: body.content,
        moodTag: body.moodTag ?? ""
      });

    const embedding = await this.embeddingsService.createEmbedding(entry.content);
    const relevantMemories = this.memoryService.searchRelevantMemories(DEMO_USER_ID, embedding);
    const recentEntries = this.memoryService.getRecentEntries(DEMO_USER_ID);
    const pipeline = await buildReflectionPipeline({
      profile,
      entryContent: entry.content,
      relevantMemories,
      recentEntries
    });

    const draft = [
      "Reflection",
      "The entry holds a quiet mix of noticing and making sense.",
      "Observed Pattern",
      "There may be a recurring tension between what feels necessary and what feels sustainable.",
      "Reflective Question",
      "What would become clearer if you gave this a little more room?"
    ].join("\n");

    const safe = this.safetyService.filterReflection(draft);
    const finalized = finalizeReflectionOutput(safe.text);
    this.reflections.set(entryId, finalized.text);

    return {
      entry,
      embedding: pipeline.embedding,
      prompt: pipeline.prompt,
      reflection: finalized.text,
      safe: finalized.safe
    };
  }

  getReflection(entryId: string) {
    return {
      journalEntryId: entryId,
      reflectionText: this.reflections.get(entryId) ?? null
    };
  }
}
