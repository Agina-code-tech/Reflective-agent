import { Injectable } from "@nestjs/common";
import { generateEmbedding } from "@ai/embeddings";

@Injectable()
export class EmbeddingsService {
  async createEmbedding(text: string) {
    return generateEmbedding(text);
  }
}

