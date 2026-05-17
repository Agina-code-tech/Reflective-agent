import { Controller, Get } from "@nestjs/common";
import { JournalService } from "./journal.service";
import { DEMO_USER_ID } from "../auth/auth.service";

@Controller()
export class TimelineController {
  constructor(private readonly journalService: JournalService) {}

  @Get("timeline")
  listTimeline() {
    return this.journalService.listEntries(DEMO_USER_ID);
  }
}

