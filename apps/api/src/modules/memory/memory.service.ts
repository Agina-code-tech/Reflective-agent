import { Injectable } from "@nestjs/common";
import { JournalService } from "../journal/journal.service";

@Injectable()
export class MemoryService {
  constructor(private readonly journalService: JournalService) {}

  getRecentEntries(userId: string, limit = 5) {
    return this.journalService.listEntries(userId).slice(0, limit);
  }

  searchRelevantMemories(userId: string, _embedding: number[]) {
    const entries = this.journalService.listEntries(userId);
    return entries.slice(0, 8);
  }
}

