# Reflective-agent

See [docs/reflective-memory-loop-architecture.md](docs/reflective-memory-loop-architecture.md) for the full product and implementation blueprint for the reflective intelligence MVP.

## Workspace

- `apps/web`: Next.js 15 reflective UI prototype
- `apps/api`: NestJS orchestration scaffold
- `packages/shared`: prompt, safety, and type primitives
- `packages/ai`: deterministic AI pipeline scaffolding
- `packages/db`: pgvector schema and retrieval SQL

## Testing

- Open `/lab` in the web app for a dedicated testing interface.
- The lab includes quick navigation, sample seeding, local-memory reset, and response previews.
- Open `/ui.html` for the standalone HTML/CSS version of the reflective UI.

## Notes

- The current implementation ships a local-memory prototype in the web app so the reflective loop can be experienced immediately.
- The backend services are scaffolded to match the MVP architecture and can be wired to Postgres, pgvector, Supabase Auth, and OpenAI in the next pass.
