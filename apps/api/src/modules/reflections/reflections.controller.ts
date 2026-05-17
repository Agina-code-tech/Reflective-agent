import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ReflectionsService } from "./reflections.service";

class ReflectEntryDto {
  content!: string;
  moodTag?: string;
}

@Controller()
export class ReflectionsController {
  constructor(private readonly reflectionsService: ReflectionsService) {}

  @Post("journal-entries/:id/reflect")
  reflectOnEntry(@Param("id") entryId: string, @Body() body: ReflectEntryDto) {
    return this.reflectionsService.reflectOnEntry(entryId, body);
  }

  @Get("reflections/:id")
  getReflection(@Param("id") entryId: string) {
    return this.reflectionsService.getReflection(entryId);
  }
}
