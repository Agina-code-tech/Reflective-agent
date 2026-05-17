import { Module } from "@nestjs/common";
import { ReflectionsController } from "./reflections.controller";
import { ReflectionsService } from "./reflections.service";
import { JournalModule } from "../journal/journal.module";
import { MemoryModule } from "../memory/memory.module";
import { UsersModule } from "../users/users.module";
import { SafetyModule } from "../safety/safety.module";
import { EmbeddingsModule } from "../embeddings/embeddings.module";

@Module({
  imports: [JournalModule, MemoryModule, UsersModule, SafetyModule, EmbeddingsModule],
  controllers: [ReflectionsController],
  providers: [ReflectionsService],
  exports: [ReflectionsService]
})
export class ReflectionsModule {}

