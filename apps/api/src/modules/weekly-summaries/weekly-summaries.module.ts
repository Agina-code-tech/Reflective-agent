import { Module } from "@nestjs/common";
import { WeeklySummariesController } from "./weekly-summaries.controller";
import { WeeklySummariesService } from "./weekly-summaries.service";
import { JournalModule } from "../journal/journal.module";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [JournalModule, UsersModule],
  controllers: [WeeklySummariesController],
  providers: [WeeklySummariesService],
  exports: [WeeklySummariesService]
})
export class WeeklySummariesModule {}

