import { Module } from "@nestjs/common";
import { JournalController } from "./journal.controller";
import { JournalService } from "./journal.service";
import { TimelineController } from "./timeline.controller";

@Module({
  controllers: [JournalController, TimelineController],
  providers: [JournalService],
  exports: [JournalService]
})
export class JournalModule {}
