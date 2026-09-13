@AGENTS.md

# ILMA OGA website — conventions

See [plans/plan.md](plans/plan.md) for the full build plan, architecture, and phase list. This file is the quick-reference for conventions that apply across every phase.

- **Server Components by default.** Client components are limited to the mobile nav, motion wrappers, and Visual Editing — nothing else gets a `'use client'` unless it genuinely needs interactivity or browser APIs.
- **GROQ lives only in `src/sanity/queries.ts`**, written with `defineQuery` so `sanity typegen generate` can see it. No inline GROQ strings in components or route files.
- **No hardcoded copy in Sanity-driven sections.** If content is in the CMS schema, the component reads it from Sanity — never a fallback string baked into the component. The only hardcoded pages/sections are the ones the plan explicitly names: 4.2 Active Volunteer, Sports, header/footer.
- **Every CMS-driven section needs an empty state.** No upcoming events / no ongoing projects must render a short message or hide the section — never a broken-looking gap.
- **Figma calls are budget-logged.** Before calling any Figma MCP read tool (`get_metadata`, `get_variable_defs`, `get_design_context`, `get_screenshot`), check `Docs/figma/_budget.md` and `Docs/figma/<page>.md` first — never refetch something already saved. Log every call immediately after making it. See "Figma call budget" in the plan for the current balance and fallback order if it runs out.
- **Version drift is real, not hypothetical.** This repo runs Next.js 16.3.x with Cache Components / `use cache` as the caching model (not the old `fetch`-tags-only model), and TypeScript is pinned to 6.0.x rather than the `latest` 7.x tag (see "Tool versions" in the plan for why). Before implementing a data-fetching or caching pattern, check `node_modules/next/dist/docs/` and the installed `next-sanity` package (it now ships `defineLive`/`sanityFetch` under `next-sanity/live`, a draft-mode-aware webhook helper under `next-sanity/webhook`, and `next-sanity/visual-editing` — check these before hand-rolling the equivalent) rather than relying on training-data patterns.
- **Secrets stay server-only.** Only `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and `NEXT_PUBLIC_SANITY_API_VERSION` get the `NEXT_PUBLIC_` prefix. `SANITY_API_READ_TOKEN` and `SANITY_REVALIDATE_SECRET` are read only in server-only modules. `.env.local` is gitignored; `.env.example` is the committed template — keep it in sync when you add an env var.
- **Each build phase ends in a commit.** Don't bundle unrelated phases into one commit; it makes the history useless for the next session picking up the plan.
