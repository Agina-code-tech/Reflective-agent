import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { EmbeddingsModule } from "./modules/embeddings/embeddings.module";
import { JournalModule } from "./modules/journal/journal.module";
import { MemoryModule } from "./modules/memory/memory.module";
import { ReflectionsModule } from "./modules/reflections/reflections.module";
import { SafetyModule } from "./modules/safety/safety.module";
import { UsersModule } from "./modules/users/users.module";
import { WeeklySummariesModule } from "./modules/weekly-summaries/weekly-summaries.module";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    JournalModule,
    EmbeddingsModule,
    MemoryModule,
    ReflectionsModule,
    SafetyModule,
    WeeklySummariesModule
  ]
})
export class AppModule {}

