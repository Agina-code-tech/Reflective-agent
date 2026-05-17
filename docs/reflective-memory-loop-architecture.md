# Reflective Memory Loop Architecture

This document is the product and implementation blueprint for the first MVP of the reflective intelligence platform.

The guiding principle is simple:

Users should feel more coherent over time, not more attached to the system.

## 1. Product Shape

### What this product is
- A reflective environment for externalizing thought.
- A memory system that preserves continuity across entries.
- A calm synthesis layer that helps users notice patterns without claiming authority.

### What this product is not
- A chatbot companion.
- An AI therapist.
- A productivity dashboard.
- A social feed.
- A gamified habit loop.
- An emotionally dependent interface.

### Core emotional outcome
- Longitudinal reflective continuity.
- Users feel their inner life has a coherent thread.

## 2. Folder Structure

Recommended monorepo layout:

```txt
.
├── apps
│   ├── web
│   │   ├── app
│   │   │   ├── (marketing)
│   │   │   │   └── page.tsx
│   │   │   ├── onboarding
│   │   │   │   └── page.tsx
│   │   │   ├── dashboard
│   │   │   │   └── page.tsx
│   │   │   ├── reflect
│   │   │   │   ├── new
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [entryId]
│   │   │   │       └── page.tsx
│   │   │   ├── timeline
│   │   │   │   └── page.tsx
│   │   │   └── weekly
│   │   │       └── page.tsx
│   │   ├── components
│   │   │   ├── layout
│   │   │   ├── reflection
│   │   │   ├── timeline
│   │   │   └── ui
│   │   ├── lib
│   │   │   ├── api
│   │   │   ├── query
│   │   │   ├── state
│   │   │   └── utils
│   │   └── styles
│   └── api
│       └── src
│           ├── modules
│           │   ├── auth
│           │   ├── users
│           │   ├── journal
│           │   ├── embeddings
│           │   ├── memory
│           │   ├── reflections
│           │   ├── weekly-summaries
│           │   └── safety
│           ├── common
│           ├── infra
│           └── main.ts
├── packages
│   ├── shared
│   │   ├── src
│   │   │   ├── types
│   │   │   ├── prompts
│   │   │   ├── safety
│   │   │   └── constants
│   ├── ui
│   │   ├── src
│   │   │   ├── components
│   │   │   └── tokens
│   ├── db
│   │   └── src
│   │       ├── schema
│   │       ├── migrations
│   │       └── queries
│   └── ai
│       └── src
│           ├── prompts
│           ├── orchestrator
│           ├── embeddings
│           └── moderation
├── docs
└── README.md
```

### Why this structure exists
- `apps/web` keeps the experience layer focused on rendering and interaction.
- `apps/api` centralizes orchestration, safety, and persistence.
- `packages/shared` prevents prompt drift and type drift.
- `packages/ai` isolates the reflective intelligence pipeline so prompts do not leak across the app.
- `packages/db` keeps database schema and query logic explicit and testable.

### Tradeoff
- This is slightly more structure than a single app directory, but it prevents the exact failure mode this product must avoid: scattered prompts, duplicated orchestration, and inconsistent tone.

## 3. Frontend Architecture

### Stack
- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Zustand
- React Query

### Frontend responsibilities
- Render the reflective environment.
- Collect journal entries.
- Display reflective synthesis.
- Surface timeline continuity and weekly summaries.
- Keep writing space calm and distraction-free.

### Page map

#### 1. Landing / Entry Page
- Quiet hero section.
- One primary CTA: `Begin Reflecting`.
- Minimal supporting copy.
- No marketing carousel, no metrics, no social proof wall.

#### 2. Onboarding Flow
- 3-step reflective preference intake.
- Stores reflection style, pacing preference, and intent.
- Emotional tone: spacious, non-clinical, low-pressure.

#### 3. Home Dashboard
- Should feel like entering a room, not reading a dashboard.
- Greeting, one prompt, one primary action.
- Quiet recent reflections below the fold.

#### 4. Reflection Composer
- Full-screen or near full-screen writing surface.
- Large typography, generous line height, deep whitespace.
- Autosave draft.
- Optional mood tag.

#### 5. Reflection Response View
- Shows the generated synthesis.
- Split into:
  - Reflection
  - Observed Pattern
  - Reflective Question
- Supports one gentle follow-up action only.

#### 6. Reflection Timeline
- Chronological, editorial, low-density.
- Entries feel like chapters rather than events.

#### 7. Weekly Synthesis Page
- Recurring themes, tensions, moments of clarity, emotional movement.
- Designed for slow reading and return visits.

### State management
- Zustand:
  - onboarding state
  - composer draft state
  - UI preferences
- React Query:
  - fetch user profile
  - fetch journal entries
  - submit reflections
  - fetch synthesis and timeline
  - cache weekly summaries

### UI component system

Core primitives:
- `Shell`
- `ReflectiveHero`
- `PromptCard`
- `EntryComposer`
- `MoodTagPicker`
- `ReflectionCard`
- `PatternCallout`
- `QuestionCard`
- `TimelineEntry`
- `WeeklyThemeBlock`
- `EmptyState`

Shared visual rules:
- Soft borders.
- Low-contrast surfaces.
- Slow fades, not energetic motion.
- One strong typographic hierarchy.

### Why this exists
- The product’s psychological tone depends on consistency.
- Reusable components let the interface feel editorial instead of assembled.

### Tradeoff
- Fewer visual variants means less novelty, but much more trust and coherence.

## 4. Backend Architecture

### Stack
- NestJS
- PostgreSQL
- pgvector
- Supabase Auth
- OpenAI API

### Backend services

#### 1. Auth Service
- Verifies Supabase session.
- Hydrates `users` profile row.
- Syncs onboarding preferences.

#### 2. Journal Service
- Creates, updates, fetches, and lists entries.
- Owns `journal_entries`.

#### 3. Embedding Service
- Generates embeddings for new journal entries.
- Persists vectors for semantic retrieval.

#### 4. Memory Retrieval Service
- Retrieves semantically relevant past entries.
- Includes recent entries and preference context.
- Produces ranked memory context for reflection generation.

#### 5. Reflection Orchestrator
- Centralized pipeline coordinator.
- Builds context.
- Calls the LLM.
- Applies safety filters.
- Persists reflection output.

#### 6. Weekly Synthesis Worker
- Runs on a schedule.
- Aggregates reflections and entries into continuity summaries.
- Writes weekly summary records.

### Why this exists
- The reflection experience needs one deterministic pipeline.
- Central orchestration prevents prompt fragmentation and tone drift.

### Tradeoff
- The backend is a little more opinionated than a loose set of endpoints, but it is far easier to maintain and safer to reason about.

## 5. Database Schema

Use these tables initially:

### `users`
- `id`
- `email`
- `reflection_style`
- `pacing_preference`
- `created_at`

### `journal_entries`
- `id`
- `user_id`
- `content`
- `mood_tag`
- `embedding`
- `created_at`

### `reflections`
- `id`
- `journal_entry_id`
- `reflection_text`
- `created_at`

### `weekly_summaries`
- `id`
- `user_id`
- `summary_text`
- `period_start`
- `period_end`

### Suggested extensions
- `journal_entries.embedding` as `vector(1536)` or the embedding size for the chosen OpenAI model.
- Add indexes on:
  - `user_id`
  - `created_at`
  - vector similarity search

### Why this exists
- The schema is intentionally small so the product can ship quickly.
- It supports both short-term reflection and long-term continuity.

### Tradeoff
- This avoids overbuilding a complex memory graph.
- The downside is less nuance in memory structure, which is acceptable for MVP speed.

## 6. API Routes

Recommended REST shape:

### User and preferences
- `GET /me`
- `PATCH /me/preferences`

### Journal
- `POST /journal-entries`
- `GET /journal-entries`
- `GET /journal-entries/:id`

### Reflection pipeline
- `POST /journal-entries/:id/reflect`
- `GET /reflections/:id`

### Timeline and continuity
- `GET /timeline`
- `GET /weekly-summaries/latest`
- `GET /weekly-summaries`

### Worker / internal
- `POST /internal/weekly-summaries/run`

### Why this exists
- REST keeps the MVP straightforward.
- Route names mirror the user’s mental model.

### Tradeoff
- This is less flexible than a fully generic graph API, but much faster to ship and debug.

## 7. Reflection Orchestration Service

This logic should live in one place.

### Pipeline
1. Receive journal entry.
2. Save entry.
3. Generate embedding.
4. Retrieve semantically relevant memories.
5. Fetch recent entries.
6. Load user reflection preferences.
7. Assemble context.
8. Build prompt.
9. Generate reflection.
10. Run safety filters.
11. Persist reflection.
12. Return structured response.

### Pseudocode

```ts
async function reflectOnEntry(userId: string, entryId: string) {
  const entry = await journalService.getEntry(entryId, userId);
  const profile = await userService.getPreferences(userId);
  const recentEntries = await memoryService.getRecentEntries(userId);
  const relevantMemories = await memoryService.searchByEmbedding(userId, entry.embedding);

  const prompt = promptBuilder.buildReflectionPrompt({
    entry,
    profile,
    recentEntries,
    relevantMemories,
  });

  const draft = await aiService.generateReflection(prompt);
  const safeOutput = safetyService.filterReflection(draft);

  return reflectionsService.create({
    journalEntryId: entryId,
    reflectionText: safeOutput.text,
  });
}
```

### Why this exists
- The system needs one deterministic orchestration path.
- This keeps retrieval, prompt construction, and filtering coherent.

### Tradeoff
- It is more centralized, which means more care is needed in the orchestrator, but that is a good trade for this product category.

## 8. pgvector Retrieval Implementation

### Retrieval strategy
Use a blended context approach:
- semantic match on the current entry embedding
- recent entries from the last 7 to 14 days
- user reflection preferences

### Retrieval ranking
1. Highest semantic similarity
2. Recency boost
3. Diversity penalty to avoid returning near-duplicates

### SQL shape

```sql
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
```

### Why this exists
- Semantic retrieval gives continuity without requiring explicit tagging by the user.
- Recency helps the reflection feel grounded in the current season of life.

### Tradeoff
- Vector search can surface surprising memories.
- That is acceptable as long as safety and tone remain conservative.

## 9. Prompt Templates

### Global system prompt

```txt
You are a reflective intelligence system.

Goal:
Help users observe emotional patterns and narrative continuity.

Rules:
- Never diagnose.
- Never claim certainty.
- Never encourage dependency.
- Never act like a therapist.
- Use observational language.
- Keep tone calm, grounded, and humble.
- Prefer short, clear, emotionally spacious phrasing.

Output structure:
1. Reflection
2. Observed Pattern
3. Reflective Question
```

### Reflection prompt template

```txt
User reflection style: {{reflection_style}}
Pacing preference: {{pacing_preference}}

Current entry:
{{entry_content}}

Relevant past context:
{{relevant_memories}}

Recent entries:
{{recent_entries}}

Write a calm reflection with three sections:
1. Reflection
2. Observed Pattern
3. Reflective Question

Keep the wording observational, non-diagnostic, and emotionally grounded.
Do not use certainty language.
Do not mention the system or the prompt.
```

### Weekly synthesis prompt template

```txt
You are synthesizing one week of reflective writing.

Inputs:
- journal entries
- reflections
- recurring themes
- recent context

Write about:
- recurring emotional themes
- narrative continuity
- emotional movement
- recurring tensions
- moments of clarity

Do not diagnose.
Do not score.
Do not label the user psychologically.
Do not sound like a coach or therapist.

Keep it observational, calm, and editorial.
```

### Why this exists
- A single prompt source reduces drift.
- The templates make the tone reproducible and testable.

### Tradeoff
- The system becomes less improvisational.
- That is a feature here, not a bug.

## 10. Safety Middleware

### Safety goals
- Prevent diagnostic language.
- Prevent dependency cues.
- Prevent emotionally coercive phrasing.
- Prevent therapist simulation.
- Prevent certainty claims.

### Filters

#### Keyword and phrase filter
Block or rewrite outputs containing:
- diagnosis language
- attachment language
- dependency language
- certainty markers like "you definitely", "this proves", "you are traumatized"

#### Tone validator
Check output for:
- humility
- observational phrasing
- absence of authority posturing

#### Structure validator
Require:
- Reflection
- Observed Pattern
- Reflective Question

### Example rewrites
- Bad: "You are unresolved."
- Better: "There seems to be a recurring tension here that may be worth noticing."

### Why this exists
- Safety is a product feature, not a legal afterthought.

### Tradeoff
- Some nuanced output will be softened.
- That is worth it for trust and emotional integrity.

## 11. Tailwind Design Tokens

Use muted warm neutrals and editorial contrast.

### Suggested CSS variables

```css
:root {
  --background: 36 25% 97%;
  --foreground: 25 18% 14%;
  --surface: 36 22% 95%;
  --surface-strong: 32 18% 90%;
  --muted: 30 10% 85%;
  --muted-foreground: 28 8% 40%;
  --border: 28 12% 82%;
  --accent: 26 18% 28%;
  --accent-soft: 26 20% 92%;
  --ring: 25 16% 34%;
}
```

### Visual tone
- background: warm ivory
- text: charcoal brown
- borders: low-contrast stone
- accent: subdued walnut

### Typography suggestion
- Headlines: editorial serif or refined high-contrast serif
- Body: neutral sans-serif with generous line height

### Why this exists
- The interface should feel like a reflective room, not a SaaS panel.

### Tradeoff
- This is intentionally less vibrant than typical startup UI.
- The emotional effect is calmer and more durable.

## 12. Weekly Synthesis Worker

### Job behavior
- Runs once per week per active user.
- Collects entries and reflections from the period.
- Produces one summary record.
- Optionally makes a quiet notification available in-app.

### Scheduling
- Use a cron job or queue worker.
- Keep the job deterministic and idempotent.

### Why this exists
- Weekly synthesis creates continuity across time, not just momentary responses.

### Tradeoff
- It adds background complexity.
- It is the most valuable retention feature in the MVP, so it earns its place.

## 13. Step-by-Step Implementation Order

### Phase 1: Foundations
1. Create monorepo structure.
2. Add shared types and design tokens.
3. Set up NestJS backend skeleton.
4. Set up Next.js frontend skeleton.
5. Connect Supabase Auth.

### Phase 2: Core reflection flow
1. Build landing page.
2. Build onboarding flow.
3. Persist user preferences.
4. Build home dashboard.
5. Build reflection composer.
6. Save journal entries.

### Phase 3: Memory and synthesis
1. Add embeddings.
2. Add pgvector retrieval.
3. Add reflection orchestrator.
4. Add reflection response view.
5. Add timeline page.

### Phase 4: Retention continuity
1. Add weekly synthesis worker.
2. Add weekly synthesis page.
3. Add quiet revisit flows.

### Phase 5: Hardening
1. Add safety middleware tests.
2. Add prompt snapshot tests.
3. Add retrieval tests.
4. Add UI polish and motion tuning.

### Why this sequence exists
- It ships the emotional core first.
- Memory and continuity only matter after the writing experience works cleanly.

### Tradeoff
- Some infrastructure gets delayed.
- That is intentional: the user value is in the reflective loop, not in architectural completeness.

## 14. Emotionally Intelligent UX Rationale

### Why the landing page is quiet
- The product asks for trust, not excitement.
- Quietness signals safety and seriousness.

### Why the composer is spacious
- Reflection deepens when the interface gets out of the way.
- Fewer controls reduce self-consciousness.

### Why the response view is structured
- Structure helps users absorb the synthesis without feeling judged.
- The three-part format creates familiarity and ritual.

### Why the timeline is editorial
- Narrative continuity is easier to feel when entries resemble chapters.
- Editorial spacing creates dignity around the user’s thoughts.

### Why weekly synthesis matters
- Human self-understanding is often seasonal and cumulative.
- A weekly summary helps the user notice change without asking them to track themselves constantly.

### Why the system must avoid attachment cues
- The goal is coherence, not dependency.
- A reflective system should fade into the background once it has helped the user notice themselves.

## 15. MVP Decision Summary

Build these first:
- Landing page
- Onboarding flow
- Home dashboard
- Reflection composer
- Reflection response view
- Timeline view
- Weekly synthesis page

Build these next:
- Authentication
- Journal entry persistence
- Embeddings
- Semantic retrieval
- Reflection orchestrator
- Safety filters
- Weekly synthesis worker

Do not build yet:
- social features
- comments
- reactions
- badges
- progress streaks
- personality profiling
- autonomous agents
- chat-first interaction

## 16. Practical MVP Principle

If a feature does not increase reflective continuity, it should probably wait.

