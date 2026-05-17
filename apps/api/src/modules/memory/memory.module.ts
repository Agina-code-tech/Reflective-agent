import { Module } from "@nestjs/common";
import { MemoryService } from "./memory.service";
import { JournalModule } from "../journal/journal.module";

@Module({
  imports: [JournalModule],
  providers: [MemoryService],
  exports: [MemoryService]
})
export class MemoryModule {}

