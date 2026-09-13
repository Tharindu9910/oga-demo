# ILMA International Old Girls' Association: Website Build Plan

## Context

ILMA OGA needs a new organization website of 11 pages, with lots of images (events, projects, chapters). Non-technical editors will change the content every month. The site is built from a Figma design with the assets in `New Website Images/`. The content in [Docs/editable_content.md](Docs/editable_content.md) must support add, edit and remove in Sanity, with draft preview before publishing. Everything else is hardcoded. The workspace is empty right now: no git and no code.

**Stack:** Next.js 16.3.x (App Router), React 19.3, TypeScript 6.0.x, Tailwind CSS 4.3.x, Motion 13.2 (formerly Framer Motion, `motion/react`), Sanity Studio 6.13 + `next-sanity` 13.3 (Studio embedded at `/studio`), pnpm, GitHub, and Vercel for production only. Exact versions verified against the npm registry and vendor docs on 2026‑09‑13 — see the table below.

### Decisions confirmed with you

| Topic                                             | Decision                                                                                                                                                                                                            |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Figma                                             | Stay on Starter (**20 MCP read calls/month**) and budget them carefully                                                                                                                                             |
| Detail pages                                      | Only blog posts (`/blogs/[slug]`). Everything else is cards on listing pages                                                                                                                                        |
| About video (60 MB)                               | Compress to about 5–10 MB and upload to Sanity as a file field                                                                                                                                                      |
| Not in the editable doc                           | Hardcoded: 4.2 Active Volunteer, Sports page, header/footer                                                                                                                                                         |
| Pages (11)                                        | Home, About, Projects (incl. Dehiwala + Donations), Become a Member, Active Volunteer, Overseas Chapters, Events, Loyalty Program, Blogs list, Blog post, Sports                                                    |
| Home "Ongoing Projects" / "Past Event Highlights" | Picked automatically: the latest 3 of each                                                                                                                                                                          |
| Membership / Volunteer / Donation buttons         | External links (**you still need to send the URLs**)                                                                                                                                                                |
| Figma                                             | Stay on Starter (**20 MCP read calls/month, verified against Figma's official rate-limit docs — see Figma call budget below; 1 already spent on an unrelated test call → 19 left this month**) and budget carefully |

### Tool versions (verified against the npm registry and vendor docs, 2026‑09‑13)

| Package                                    | Latest published | Use                                                                       |
| ------------------------------------------ | ---------------- | ------------------------------------------------------------------------- |
| `next`                                     | 16.3.5           | `^16.3.0`                                                                 |
| `react` / `react-dom`                      | 19.3.0           | `^19.3.0`                                                                 |
| `typescript`                               | 7.0.2 (GA)       | **pin `6.0.3`** — see note below                                          |
| `tailwindcss`                              | 4.3.3            | `^4.3.0`                                                                  |
| `motion`                                   | 13.2.0           | `^13.2.0` (install as `motion`, not the deprecated `framer-motion` alias) |
| `sanity`                                   | 6.13.2           | `^6.13.0`                                                                 |
| `next-sanity`                              | 13.3.4           | `^13.3.0`                                                                 |
| `@sanity/image-url`                        | 2.1.1            | `^2.1.0`                                                                  |
| `@portabletext/react`                      | 8.0.1            | `^8.0.0`                                                                  |
| `eslint` / `eslint-config-next`            | 10.10.0 / 16.3.5 | **pin `eslint@^9`** — see note below                                      |
| `prettier` / `prettier-plugin-tailwindcss` | 3.9.6 / 0.8.1    | latest                                                                    |

**Why ESLint stays on 9.x, not 10:** confirmed by actually running it during Phase 1 scaffolding, not just checking version numbers — `eslint-config-next@16.3.5`'s transitive `eslint-plugin-react` dependency calls the old `context.getFilename()` API that ESLint 10 removed, so `pnpm lint` crashes outright (`contextOrFilename.getFilename is not a function`) the moment ESLint 10 is installed. Revisit once `eslint-config-next` ships a version built against ESLint 10.

**Why TypeScript stays on 6.0.x, not 7:** TypeScript 7 went GA on 2026‑07‑08 — a Go-native compiler rewrite that's 8–12× faster — but it shipped without a stable programmatic API (targeted for 7.1, still months out). `typescript-eslint`'s type-aware rules depend on that API and closed TS7 support as "not planned" on day one, and Next.js's own TypeScript-version detection currently misreports TS7 as not installed. Since `create-next-app` and `tsc --init` will happily resolve `typescript@latest` → 7.x, Phase 1 must **explicitly install `typescript@6.0.3`** instead of trusting the default. Revisit once `eslint-config-next`/`typescript-eslint` confirm 7.1 support.

### Sanity Free plan limits and how the plan handles them

- **Only Administrator and Viewer roles**, so every editor is an admin. Keep the number of admins small and require 2FA on their login provider.
- **Draft history is kept for only 3 days**, so a monthly dataset backup is added (Phase 9).
- **The dataset is public**: published content can be read without a token. That's fine for a public website. Drafts still need a token, which stays on the server only.
- **2 webhooks**: 1 is used for on-demand revalidation.
- 100 GB assets and 100 GB bandwidth: enough for the images and the compressed video.

### Still needed from you before or during the build

1. Figma file URL (the first Figma step lists all frames, so you don't need to send a link per frame).
2. Exported PNGs of each page frame in `Docs/design/`. Exporting from Figma doesn't use the MCP budget, and I'll use them for visual checks.
3. External URLs for the Become a Member, Active Volunteer and Donations buttons.
4. Sanity account/project, GitHub repo, Vercel account, and DNS access for the domain.

---

## Architecture

**Single repo, single deploy.** The Studio is embedded at `/studio`, so there's no separate Studio hosting.

```
src/
  app/
    (site)/layout.tsx                  header, footer, <VisualEditing/> when draft mode is on
    (site)/page.tsx                    Home
    (site)/about/  projects/  events/  loyalty-program/  sports/
    (site)/membership/  membership/active-volunteer/  membership/overseas-chapters/
    (site)/blogs/  blogs/[slug]/
    studio/[[...tool]]/page.tsx        embedded Studio (noindex)
    api/revalidate/route.ts            Sanity webhook → revalidateTag
    api/draft-mode/enable|disable      next-sanity defineEnableDraftMode
    sitemap.ts  robots.ts  opengraph-image.tsx
  sanity/
    env.ts          validated env access (fails fast)
    client.ts       createClient (useCdn true, stega only in draft)
    fetch.ts        sanityFetch({query, params, tags}): draft-aware, tag-based caching
    queries.ts      defineQuery GROQ, projections return only the fields in use
    image.ts        urlFor + Sanity CDN loader for next/image
    schemaTypes/    documents/, singletons/, objects/
    structure.ts    Studio sidebar: singletons pinned, grouped lists
  components/ ui/ (Button, Container, SectionHeading)  sections/  motion/Reveal.tsx
              SanityImage.tsx  PortableText.tsx  ExternalLink.tsx
  config/site.ts    nav, social links, hardcoded CTA URLs, SEO defaults
sanity.config.ts  sanity.cli.ts  sanity.types.ts (TypeGen)
```

The paths above are placeholders. The final route slugs will follow the Figma navigation labels.

### Scaffolding gotchas found while building Phase 1 (not obvious from docs alone)

- **Cache Components is on** (`cacheComponents: true` in `next.config.ts`). Verified the app still builds under it, so every later phase should write data fetching against `use cache`/`cacheTag`/`revalidateTag(tag, profile)` (the two-argument form — the one-argument call is deprecated), not the old fetch-tags-only model. For the revalidation webhook specifically, use `revalidateTag(tag, { expire: 0 })` rather than `profile="max"`, since a webhook needs the next request to see fresh content immediately, not stale-while-revalidate.
- **`sanity.config.ts` must never be imported from a Server Component.** Importing it directly in `src/app/studio/[[...tool]]/page.tsx` pulled the full Studio bundle into the RSC graph and broke the build (`swr`'s `react-server` export condition has no default export, which `sanity`'s internal `validationUtils` needs). Fix: the page stays a Server Component (for the `metadata`/`viewport` export), but it renders a separate `'use client'` child (`StudioClient.tsx`) that is the only place importing `sanity.config` and `NextStudio`.
- **The Studio route needs `export const instant = false`.** It reads Sanity env vars at module scope, so Cache Components' prerender-everything-by-default behavior tries to build a static shell for it at build time and fails without real env vars present. `instant = false` opts it out of that instant-navigation validation — correct anyway, since an authenticated per-editor tool should never be served from a static shell. Real `NEXT_PUBLIC_SANITY_*` values still have to exist wherever the app actually runs (local `.env.local`, Vercel project settings) — this flag doesn't remove that requirement, it just stops the _build_ from demanding them for a route nothing should statically cache.
- **`next-sanity` ships more than the old `sanityFetch`/`revalidateTag` combo now** — it has subpath exports for `./live` (`defineLive`, the Live Content API), `./webhook`, `./draft-mode`, and `./visual-editing`. Check these in Phase 4 before hand-rolling what they already do.

### Content model (Sanity)

**Singletons** (one document each; create/delete disabled in the Studio):

- `homePage`: hero {headline (max length), image, ctaLabel, ctaUrl}, milestones[] {value (string, e.g. "1,200+"), label}
- `aboutPage`: president {name, role, photo, message (portable text)}, team[] {name, role}, video (file) + poster image
- `projectsPage`: dehiwala {show toggle, title, body (portable text), images[]}
- `membershipPage`: image, body (portable text), ctaUrl
- `loyaltyPage`: merchants[] {name, logo}, orderable by drag and drop

**Collections** (add/edit/remove):

- `project`: title, status (`ongoing`/`completed`), image, description, progress 0–100 (required and shown only when status is ongoing), date for sorting
- `event`: title, date, description, images[] (optional), links[] {label, url}. **Upcoming or past is worked out from the date**, so editors never move events manually. Upcoming events show text only, as the doc specifies.
- `chapter`: country, description, images[]
- `post`: title, slug, publishedAt, excerpt, coverImage, body (portable text with inline images), optional SEO description

**Shared rules:** image fields use hotspot and a **required alt text**. URL fields accept only `http/https` (this blocks `javascript:` links). Text fields that could break the layout get character limits. Previews show thumbnails in the Studio lists.

### Data flow and freshness

- **Published site:** GROQ fetches are cached with tags (e.g. `project`, `event`, `post:slug`). When a document is published, the Sanity webhook calls `/api/revalidate`, which checks the signature with `parseBody` + `SANITY_REVALIDATE_SECRET` and calls `revalidateTag` for that type. As a fallback, pages also revalidate every 24 hours, so an event moves from "upcoming" to "past" on its own. The daily rebuilds use very few API calls.
- **Draft preview:** the Studio's Presentation tool opens the site in an iframe and turns on Next draft mode. Draft fetches use `perspective: 'drafts'`, `useCdn: false`, the server-only Viewer token and stega. `<VisualEditing/>` loads only when draft mode is on, so public visitors get none of this JavaScript.
- Use the caching API that matches the installed Next.js version (fetch tags, or `cacheTag` with Cache Components). Check the next-sanity docs when scaffolding.

### Images and performance

- Sanity images go through **next/image with a per-component loader that uses Sanity CDN transforms** (`w`, `q`, `auto=format`). This avoids Vercel Hobby's image optimization quota. Images get responsive `sizes`, an LQIP blur placeholder (`metadata: ['lqip']`) and `priority` only on the hero.
- Hardcoded images (Sports, Active Volunteer, logo, social icons) are compressed once and placed in `public/images/`, then imported statically. Raw `New Website Images/` goes in `.gitignore` because it's 80 MB, including the video.
- Most of the site is React Server Components. Client components are limited to the mobile nav, motion wrappers and Visual Editing.
- Video: compressed with ffmpeg (720p H.264, CRF ~28, `+faststart`), with `preload="none"`, a poster, `controls` and `playsInline`.

### UI/UX

- The Figma design is the source of truth. Tokens (colors, fonts, spacing, radii) go into the Tailwind v4 `@theme` in `globals.css`, and fonts load through `next/font`.
- Mobile-first layouts. An accessible header with a mobile menu (Esc to close, focus management, `aria-expanded`). A skip link, semantic headings, `:focus-visible` styles and AA contrast.
- **Empty states for every CMS section.** If there are no upcoming events, the section shows a short message or is hidden. The page never looks broken.
- Motion: one `Reveal` component (fade/slide on scroll) using `LazyMotion` + `domAnimation` + `m.*` to keep the bundle small, and `MotionConfig reducedMotion="user"`. Hover effects use Tailwind transitions, not JavaScript.

### SEO

- `metadataBase`, a title template, and a description per route in `config/site.ts`. Blog posts use `generateMetadata` from the post's fields.
- `sitemap.ts` lists the static routes plus post slugs. `robots.ts` disallows `/studio` and `/api`.
- OG images: a default `opengraph-image.tsx` (logo on the brand color, built with next/og). Blog posts use the cover image at 1200×630 from the Sanity CDN.
- JSON-LD: `Organization` on Home, `Article` on blog posts. Canonical URLs on every page.

### Security

- **Secrets:** `SANITY_API_READ_TOKEN` (Viewer) and `SANITY_REVALIDATE_SECRET` are server-only. Only the project ID, dataset and API version use the `NEXT_PUBLIC_` prefix. `.env.local` stays in `.gitignore` and `.env.example` is committed.
- The one-time seed write token is used only locally and revoked after seeding.
- **Sanity CORS:** only `http://localhost:3000` and the production domain, with credentials allowed.
- **Rendering:** portable text goes through `@portabletext/react` and there's no `dangerouslySetInnerHTML` anywhere. JSON-LD is serialized safely. External links get `rel="noopener noreferrer"`.
- **Headers** (`next.config`): `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, and `frame-ancestors 'self'` so the Presentation iframe still works while outside sites can't frame this one.
- `/studio` has noindex. Editors sign in with their Sanity login, so the Studio needs no secrets.
- Webhook signatures are verified, and requests with a bad signature get a 401.
- Dependencies: pnpm lockfile committed, Dependabot enabled, and `pnpm audit` run before launch.
- **Backup:** a monthly GitHub Action runs `sanity dataset export` with a read token and saves the export as a workflow artifact. This covers the 3-day history limit.
- ⚠️ Vercel Hobby's terms say "personal, non-commercial" use. An association website may be a gray area. Check before launch; Pro costs $20/month if needed.

---

## Figma call budget (19 left this month, verified 2026‑09‑13)

**Verified against Figma's official docs** (`developers.figma.com/docs/figma-mcp-server/rate-limits-access`): a **Starter-plan seat is capped at 20 MCP tool calls/month** — this is the highest allowance a View/Collab-type seat gets on _any_ plan (Professional, Organization and Enterprise View/Collab seats are actually capped lower, at 6/month). Only a paid **Dev or Full seat** unlocks the bigger 200/day (Professional/Organization) or 600/day (Enterprise) allowance. Rate limits apply per-minute too, but at our volume that never binds. Tools that write to Figma or return account info (`create_new_file`, `add_code_connect_map`, `whoami`) are exempt and don't count — everything we use here (`get_metadata`, `get_variable_defs`, `get_design_context`, `get_screenshot`) does count. Figma exposes no usage dashboard, so `Docs/figma/_budget.md` is the only source of truth for calls remaining — log every call there immediately, including the 1 already spent this month on an unrelated test (call #0, no output kept).

All output is saved to `Docs/figma/<page>.md` so **nothing is fetched twice**.

| #     | Call                       | Purpose                                                                        |
| ----- | -------------------------- | ------------------------------------------------------------------------------ |
| 0     | _(already spent)_          | Test call, not tied to any page — logged for the count only                    |
| 1     | `get_metadata` (file/page) | List frame node IDs for all 11 pages                                           |
| 2     | `get_variable_defs`        | Design tokens                                                                  |
| 3–13  | `get_design_context` × 11  | One per page frame. The header and footer come from the Home frame             |
| 14–19 | Reserve (6 calls)          | Section-level re-fetches for frames too large or complex to return in one call |

**Using the budget intelligently:**

- Always fetch metadata and tokens (calls 1–2) before any page frame — they're reused across all 11 pages and never need refetching.
- Batch: if a page frame is simple, get everything needed for that page in a single `get_design_context` call rather than drilling into child nodes with follow-up calls.
- Before spending a reserve call, check whether the exported PNG in `Docs/design/` already answers the question (layout/spacing can often be read off the PNG at 2x).

**If the 19 calls run out before all 11 pages are captured (alternates, cheapest first):**

1. **Free — keep building from PNGs.** You've already committed to exporting a PNG per page frame (no MCP cost); for any page that hasn't had its `get_design_context` call yet, build from the PNG plus Figma's own web Inspect panel (copy spacing/color/font values by hand in the browser — this doesn't touch the MCP server at all).
2. **Free — wait for the monthly reset.** Figma doesn't publish the exact reset day in the docs; check your Figma account/billing page for the renewal date and treat it conservatively (assume calendar-month reset unless the account page says otherwise).
3. **Cheap, one month only — upgrade a _Dev or Full_ seat, not Collab/View.** A single Professional Dev seat (~$12–15/mo) unlocks 200 calls/day for that billing month; finish the remaining Figma work, then drop back to Starter afterward if ongoing Figma access isn't needed. **Do not** upgrade the plan while keeping a Collab/View seat — that would drop the monthly cap from 20 to 6, making things worse, not better.
4. **Avoid:** re-fetching a page "just to double check" — always check `Docs/figma/<page>.md` first; that's the entire reason the budget log exists.

---

## Build phases (one Claude Code session per phase, each ending in a commit)

**0. Setup:** `git init` and `.gitignore` (node_modules, .env*, `New Website Images/`, .next). Add a `CLAUDE.md` with the conventions: server components by default, GROQ only in `queries.ts`, no hardcoded copy in Sanity-driven sections, and budget-logged Figma calls.

**1. Scaffold:** `create-next-app` (TS, Tailwind, ESLint, App Router, `src/`, pnpm), then immediately pin `typescript@6.0.3` (the default install resolves to TS7, which currently breaks Next's TS detection and `typescript-eslint` — see Tool versions above). Then `pnpm create sanity` into the same repo with the Next.js integration. Install `next-sanity @sanity/image-url @portabletext/react motion`, plus Prettier with `prettier-plugin-tailwindcss`. Add `env.ts`, `.env.example` and scripts: `typecheck`, `typegen`.

**2. Figma extraction:** make calls 1–13, write the tokens into `@theme`, set up fonts, and save a per-page spec for each page.

**3. Sanity schemas + Studio:** create the schema types above, `structure.ts` (singletons pinned, Projects split into Ongoing/Completed views, Events split into Upcoming/Past views), validation, previews, and the Presentation tool with `resolve` locations. Run `sanity typegen generate`.

**4. Data layer:** `client.ts`, `fetch.ts`, `queries.ts`, `image.ts`, `SanityImage`, `PortableText`, the draft-mode routes, `/api/revalidate` and `<VisualEditing/>`.

**5. Layout + primitives:** `config/site.ts`, header and mobile nav, footer, `Container`/`Button`/`SectionHeading`, `Reveal` and the security headers.

**6. Pages:** build in this order: Projects → Events → Blogs + post detail → Home (reuses the project and event cards) → About (video) → Membership → Overseas Chapters → Loyalty → then the hardcoded Active Volunteer and Sports pages. Each page gets an empty state, and I check it against its PNG at 375, 768 and 1440 px.

**7. SEO:** metadata, sitemap, robots, OG image and JSON-LD.

**8. Content seed:** compress the video with ffmpeg. A one-time `scripts/seed.ts` uploads the provided images with alt text and creates starter documents using the Figma copy, so editors begin with a filled-in site.

**9. Hardening + review:** run `/code-review` and `/security-review`, `pnpm audit`, and Lighthouse. Add the monthly backup workflow and Dependabot.

**10. Launch:** push to GitHub. Set up the Vercel project with env vars, the Sanity webhook (on publish/unpublish/delete → `/api/revalidate`), CORS origins and the Presentation preview URL. Connect the domain (apex + `www` redirect). Write a short `Docs/editor-guide.md` covering login, draft → preview → publish, image alt text, and the fact that upcoming/past events switch automatically.

---

## Verification

- **Local:** `pnpm lint && pnpm typecheck && pnpm build` pass with no type errors after `typegen`.
- **Content round trip:**
  - Edit a project in the Studio and see the draft in Presentation without publishing.
  - Publish it: the production page updates within seconds through the webhook.
  - Delete it: it disappears from both Projects and Home.
- **Rules:** an event dated yesterday shows under Past. A progress value of 120 or a `javascript:` URL is rejected in the Studio. An image without alt text can't be published.
- **Empty states:** with no upcoming events or ongoing projects, the pages still render cleanly.
- **Security:**
  - `curl` a draft document from the public API: it isn't returned.
  - POST to `/api/revalidate` with a bad signature: 401.
  - Check the response headers.
  - Confirm no token appears in the client bundle (grep `.next/static`).
- **SEO:** `/sitemap.xml` and `/robots.txt` are correct. Test OG tags with a social preview debugger. Lighthouse on Home and a blog post scores ≥90 for Performance, Accessibility, Best Practices and SEO on mobile.
- **Visual:** each page matches its Figma PNG at mobile, tablet and desktop widths. Keyboard-only navigation works through the menu and links.
