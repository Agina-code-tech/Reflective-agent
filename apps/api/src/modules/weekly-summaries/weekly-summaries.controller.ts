import { Controller, Get } from "@nestjs/common";
import { WeeklySummariesService } from "./weekly-summaries.service";

@Controller("weekly-summaries")
export class WeeklySummariesController {
  constructor(private readonly weeklySummariesService: WeeklySummariesService) {}

  @Get("latest")
  latest() {
    return this.weeklySummariesService.getLatestSummary();
  }

  @Get()
  list() {
    return this.weeklySummariesService.listSummaries();
  }
}

