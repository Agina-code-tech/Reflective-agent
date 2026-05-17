export type EmbeddingVector = number[];

export async function generateEmbedding(input: string): Promise<EmbeddingVector> {
  const tokens = input
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

  return tokens.slice(0, 32).map((token, index) => ((token.charCodeAt(0) + index * 13) % 100) / 100);
}

