# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start Vite dev server
npm run build        # Production build
npm run lint         # ESLint check
npm run lint:fix     # ESLint auto-fix
npm run format       # Prettier check
npm run format:fix   # Prettier auto-fix
npm run test         # Run Vitest (watch mode)
npm run preview      # Preview production build
```

Run a single test file:
```bash
npx vitest run src/home-feed/home-feed.test.tsx
```

## Architecture

This is a React + Vite + TypeScript SPA for bookmarked link sharing. Data lives in Firebase Firestore; the app is read-only from the client's perspective (no auth, no writes from the UI).

**Routing** ([src/index.tsx](src/index.tsx)) — React Router v7 with four routes under a shared `<Layout>` shell:
- `/` → `HomeFeed` — all links from every user
- `/:user` → `UserFeed` — links filtered by username
- `/link/:id` → `LinkDetail` — single link detail page
- `/about` → `About`

Sentry is initialized in non-development environments and wraps `createBrowserRouter`.

**Data layer** ([src/shared/infrastructure/firestore-client.tsx](src/shared/infrastructure/firestore-client.tsx)) — Three thin Firestore helpers (`getDocuments`, `getUserDocuments`, `getDocument`) that read from a single `links` collection. Firebase credentials come from `import.meta.env` variables; the project ID (`db-test-a2b82`) is the only hardcoded value.

**Core data shape** ([src/types.ts](src/types.ts)) — Everything flows through the `LinkInfo` type: `id`, `url`, `title`, `text`, `serviceIcon`, `service`, `imageUrl`, `userName`, `perplexitySummary`.

**Shared UI** ([src/shared/components/](src/shared/components/)) — `Feed` renders a list of `LinkPreview` cards. `Feed` manages a background-image hover effect by manipulating a CSS custom property (`--main-bg-image`) directly on its root `<main>` ref. Styling uses CSS Modules throughout.

**Tests** use Vitest + React Testing Library. `firestore-client` is always mocked via `vi.mock`; tests render components inside `<MemoryRouter>`. The setup file ([src/tests/setup.ts](src/tests/setup.ts)) imports `@testing-library/jest-dom/vitest` and calls `cleanup()` after each test.

**Deployment** — Vercel with a catch-all rewrite to `/` for SPA navigation.

## Code style

Prettier enforces single quotes, 100-char line width, 2-space indent, trailing commas (ES5), semicolons. ESLint extends `typescript-eslint` recommended + react-hooks rules. Both run together before committing.
