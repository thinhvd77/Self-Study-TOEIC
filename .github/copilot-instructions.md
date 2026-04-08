# Copilot Instructions for Self-Study-TOEIC

## Build, test, and lint commands

- `npm run dev` — start Vite dev server.
- `npm run build` — run TypeScript project build (`tsc -b`) and Vite production build.
- `npm test` — run full test suite once (`vitest run`).
- Single test file: `npx vitest run src/data/__tests__/task2-data.test.ts` (or replace with another test path).
- Linting: there is currently no lint script in `package.json`; do not assume ESLint is configured.

## High-level architecture

- Current implementation is a foundation stage SPA:
  - `src/App.tsx` contains a route shell with four top-level routes (`/`, `/practice/*`, `/vocabulary/*`, `/grammar/*`) and placeholder pages.
  - `src/main.tsx` mounts the app and imports `src/index.css`.
- The domain model is centralized in `src/types/index.ts` (Practice, Vocabulary, Grammar, Roadmap, and UserProgress interfaces).
- App content is static typed data under `src/data/**`:
  - `src/data/tests/part5.ts`
  - `src/data/vocabulary/business.ts`
  - `src/data/grammar/parts-of-speech.ts`
  - `src/data/roadmap.ts`
- `src/data/__tests__/task2-data.test.ts` validates both sample data shape/counts and type contracts.
- Tooling stack details spread across config files:
  - Tailwind CSS v4 via `@tailwindcss/vite` plugin in `vite.config.ts` + `@import "tailwindcss";` in `src/index.css`
  - Vitest in `vitest.config.ts` with `jsdom`, globals, and setup file `src/test/setup.ts`

## Key conventions

- Keep learner-facing text/content in Vietnamese (project rule in `CLAUDE.md`).
- Treat `src/types/index.ts` as the single source of truth for domain interfaces; import these types into data/features.
- Keep data local and static in `src/data/**`; no backend/API assumptions.
- Maintain existing content ID patterns by domain (for example `p5-*`, `v-biz-*`, `gram-*`, `w*-*`) and keep `correctAnswer` as a zero-based option index.
- For grammar lessons, store long-form lesson text as Markdown strings and trim with `.trim()`.
- Test style in this repo uses Vitest globals (`describe`, `it`, `expect`) and colocated `__tests__` directories.
- From `CLAUDE.md` style guide: prefer Tailwind utility classes, keep page modules on default export, and use named exports for reusable components when adding them.

## MCP server setup

- Repository-level MCP config lives at `.vscode/mcp.json`.
- Playwright MCP server is preconfigured with `npx -y @playwright/mcp@latest`.
