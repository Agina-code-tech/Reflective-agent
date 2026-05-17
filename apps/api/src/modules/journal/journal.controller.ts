import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { JournalService } from "./journal.service";

class CreateJournalEntryDto {
  content!: string;
  moodTag?: string;
}

@Controller("journal-entries")
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Post()
  create(@Body() body: CreateJournalEntryDto) {
    return this.journalService.createForDemoUser(body);
  }

  @Get()
  list() {
    return this.journalService.listForDemoUser();
  }

  @Get(":id")
  getOne(@Param("id") id: string) {
    return this.journalService.findById(id);
  }
}

