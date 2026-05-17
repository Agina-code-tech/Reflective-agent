export const searchRelevantMemoriesSql = `
SELECT
  id,
  user_id,
  content,
  mood_tag,
  created_at,
  1 - (embedding <=> $1) AS similarity
FROM journal_entries
WHERE user_id = $2
ORDER BY embedding <=> $1
LIMIT 8;
`;

export const fetchRecentEntriesSql = `
SELECT id, user_id, content, mood_tag, created_at
FROM journal_entries
WHERE user_id = $1
ORDER BY created_at DESC
LIMIT $2;
`;

