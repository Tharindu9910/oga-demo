# Overseas Chapters page (`1:1375`) — `get_design_context` call #13, 2026-09-13

Full frame captured in one call, including the repeated header/footer
(already covered by calls #4/#5). `chapter` is a real Sanity **collection**
(`country, description, images[]`, plans/plan.md line 120,
`Docs/editable_content.md` "4.3 Overseas Chapters: Add/remove/edit — Text,
Images") — added `Chapter` type + `getChapters()` to the mock content
layer, same pattern as `project`/`event`/`post`.

## Sections in the Figma frame

Five country sections, each a full-bleed dark band with a large country
name and a photo grid: **Dubai** (9 photos, 3-top + 6-bottom irregular
span grid), **Australia** (4 photos, 4/3/3/2-column span grid), **UK**
(heading only, zero photos), **Canada** (4 photos, 5/3/2/2-column span
grid), **Saudi Arabia** (heading only, zero photos).

## Real content used — and what was deliberately left out

- `New Website Images/4 - Member/4.3-Overseas chapters/` has real photo
  folders for **Dubai, Australia, and Canada only** — no folder exists for
  UK or Saudi Arabia, and the Figma design itself has zero photos or body
  text for those two (just the bare country name). Same precedent as
  Blogs' single real post: **only 3 `chapter` documents were seeded**
  (Dubai, Australia, Canada) — UK and Saudi Arabia are not fabricated.
- Every photo in each local folder was visually matched to its Figma card
  by content (delegates-with-bags photo → "Dubai Chapter delegates group
  photo", the flyer PNG → "Poster flyer" card, etc.) — all 9 Dubai, all 4
  Australia, all 4 Canada real photos are used, none invented.
- `description` text for each chapter is not present as body copy
  anywhere in Figma (the design is photos-only) — real event-flyer text
  found in the source photos themselves was used instead: Australia's
  flyer ("IIOGA presents Old Girls Lunch... Old School Pizza, Thornbury")
  and Canada's flyer ("Old Girls of ILMA in Toronto... Summer Picnic,
  Knob Hill Park, Scarborough") gave real, sourced one-sentence
  descriptions. Dubai has no single flyer, so its description was
  synthesized from what's visible across its photos (netball delegate
  bags, "Sports Carnival 2024/2025 Dubai U.A.E." trophy plaques, multiple
  colour-themed reunion backdrops) — a factual summary of real evidence,
  not invented content.
- All images copied from `New Website Images/.../4.3-Overseas chapters/`
  to `public/images/chapters/{dubai,australia,canada}/`, re-encoded to
  JPEG (quality 78, longest side capped at 700px) via `sips`.

## Adaptation notes

- Figma's country headings use `font-['Cinzel:Black']`, a serif display
  font not in this project's 3-token font system (`globals.css` only has
  Poppins/Plus Jakarta Sans/Inter) — same situation as About's
  `Liberation_Serif` fallback. Rendered as `font-poppins` extrabold
  instead of introducing an arbitrary fourth typeface.
- Figma's photo grids use fixed, irregular column-span layouts sized
  exactly to each chapter's photo count (Dubai's 3-top/6-bottom, Canada's
  5/3/2/2 spans). Since `chapter.images[]` is an editable collection field
  editors will add to and remove from monthly, a fixed span grid tied to
  today's exact photo count would break on the next edit. Built instead
  as a simple responsive grid (2 cols mobile → 3 → 4) that reflows to any
  number of images, rather than replicating the exact Figma spans.
- Section background colors alternate between the two dark greens Figma
  uses across the five country bands (`#14271f` / `--color-brand-600`),
  applied by list index so it still alternates sensibly if a chapter is
  added or removed later.
