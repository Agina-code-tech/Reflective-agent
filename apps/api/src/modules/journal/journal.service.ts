import { Injectable } from "@nestjs/common";
import type { JournalEntry } from "@shared/types";
import { DEMO_USER_ID } from "../auth/auth.service";

type StoredEntry = JournalEntry & {
  reflectionText?: string;
};

@Injectable()
export class JournalService {
  private readonly entries = new Map<string, StoredEntry>();

  createEntry(input: { userId: string; id?: string; content: string; moodTag?: string }) {
    const id = input.id ?? crypto.randomUUID();
    const entry: StoredEntry = {
      id,
      userId: input.userId,
      content: input.content,
      moodTag: (input.moodTag ?? "") as StoredEntry["moodTag"],
      createdAt: new Date().toISOString()
    };

    this.entries.set(id, entry);
    return entry;
  }

  createForDemoUser(input: { content: string; moodTag?: string }) {
    return this.createEntry({
      userId: DEMO_USER_ID,
      content: input.content,
      moodTag: input.moodTag
    });
  }

  listEntries(userId: string) {
    return [...this.entries.values()]
      .filter((entry) => entry.userId === userId)
      .sort((left, right) => right.createdAt.localeCompare(left.createdAt));
  }

  listForDemoUser() {
    return this.listEntries(DEMO_USER_ID);
  }

  findById(id: string) {
    return this.entries.get(id) ?? null;
  }
}

