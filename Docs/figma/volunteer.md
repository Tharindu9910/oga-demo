# Active Volunteer page (`1:1649`) — `get_design_context` call #12, 2026-09-13

Full frame captured in one call, no truncation. Hardcoded page per
`plans/plan.md` ("Not in the editable doc: 4.2 Active Volunteer") and
`Docs/editable_content.md` ("4.2 None") — no CMS/mock-data-layer types or
queries added, content lives directly in the page component.

## Sections

1. **Hero** — "Be an Active Volunteer" headline, "Join Us Now →" primary
   CTA (routes through `siteConfig.ctaUrls.activeVolunteer`, currently
   empty — same "coming soon" `Button` treatment as every other CTA).
2. **Volunteer role cards** — 6 cards, icon + label: Event Planning,
   Social Media & Communications, Fundraising, Outreach & Alumni
   Engagement, Securing Sponsors, Blogging/Vlogging.
3. **Events** — a sage-tinted island with circular photo cards for
   volunteer-driven event categories.

## Real images used

- Role icons: the 6 line-icon PNGs in `New Website Images/4 - Member/4.2 -
  Active volunteer/Categories/` — used instead of Figma's re-hosted
  exports. Figma's card order doesn't correspond to the folder's `1.png`–
  `6.png` numbering, so icon-to-label pairing was done by visual content
  match, not filename order:
  - `Categories/2.png` (calendar + checklist) → Event Planning
  - `Categories/5.png` (phone with like/heart/hashtag) → Social Media &
    Communications
  - `Categories/1.png` (hands holding a coin) → Fundraising
  - `Categories/4.png` (handshake with checkmark) → Outreach & Alumni
    Engagement
  - `Categories/6.png` (mentor/graduate figures) → Securing Sponsors
    (weakest fit of the six — no icon in the folder maps cleanly to
    "sponsors", this was the correct icon by elimination)
  - `Categories/3.png` (photo + video play button) → Blogging/Vlogging
  - Copied to `public/images/volunteer/roles/*.png`, unchanged (already
    small transparent PNGs).

- Event photos: **the Figma design shows only 6 circular cards** (Fairs,
  Annual Reunions, Career Guidance, Netball Tournament, Badminton
  Tournament, Sports Carnival), but the source folder has **8 real
  photos**. Per your instruction (2026-09-13), all 8 are shown — real
  content takes precedence over the design mockup's card count, same
  precedent as About's added video section.
  - `1.jpeg` (welcome arch, "Ilma Pre-Ramadan fair") → Fairs
  - `2.png` (festive table setting) → Annual Reunions
  - `3.png` (Career Guidance Fair 2022 badge) → Career Guidance — exact
    match, Figma's own layer name for this slot is identical
  - `4.png` (netball hoop against sky) → Netball Tournament
  - `5.jpg` (badminton racket + shuttlecock) → Badminton Tournament
  - `6.jpeg` (Sports Festival poster) → Sports Carnival
  - `7.png` (medical kit) → **Health Camps** (new 7th card, not in
    Figma) — matches Figma's own internal (hidden) layer name for one of
    the six slots, "Health Awareness Programs", and matches the real
    "Health Camp" events already seeded in `events.json`
  - `8.jpg` (donations in a collection bowl) → **Community Service** (new
    8th card, not in Figma) — matches Figma's internal layer name for
    another slot, "Social and Community Services"
  - All re-encoded to JPEG (quality ~80, longest side capped at 400–500px)
    via `sips`, saved to `public/images/volunteer/events/*.jpg`.

## Adaptation notes

- Figma's Events section is an interactive carousel with prev/next arrow
  buttons (`Button - Previous/Next events`). Since this page is fully
  hardcoded (no state to page through) and now shows 8 cards instead of
  6, this was built as a static CSS grid on `sm:` and up (4 columns × 2
  rows) with a horizontal `snap-x` scroll strip on mobile, rather than a
  JS-driven carousel — avoids a `'use client'` component for a purely
  cosmetic paging control.
- The 44px role-card icons use `alt=""` (decorative — the adjacent label
  already conveys the meaning), matching the icon treatment already used
  elsewhere on the site (e.g. About's checkmark bullets).
