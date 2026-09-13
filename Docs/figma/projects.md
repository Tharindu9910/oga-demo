# Projects page (`1:2`) — `get_design_context` call #7, 2026-09-13

Full frame in one call (no reserve needed). Frame is 1280×5856, output truncated
by the MCP server after the "Make a Difference" donation widget's first card,
but every section up to and including the widget was captured — nothing past
the truncation point (just the tail of the "Custom Amount" card) was needed.

## Sections, in order

1. **Hero — Ilma Dehiwala Project** (`1:4`–`1:26`): two-line heading
   ("Ilma Dehiwala" / "Project"), 3 body paragraphs, a bold closing line, and
   a "Ground Breaking Ceremony Highlights →" link. Right side: a 4-photo
   collage (tower drape unveiling, 3D model render, ground plot, dignitaries
   turning soil). Verbatim copy is in `src/content/data/projectsPage.json`
   (`dehiwala`).
2. **Drone Video feature** (`1:46`–`1:82`): dark card, video poster + play
   button, "Ilma International Girls' School Drone Video" heading.
   **Not built** — no compressed video asset exists yet (that's Phase 8), and
   this section isn't in `Docs/editable_content.md`'s Projects page spec
   (only Dehiwala, Ongoing, Completed are listed there), so it's out of
   scope for now rather than faked with a non-functional player.
3. **Ongoing Projects** (`1:82`–`1:248`): "5 Elevated Cards Grid: 3 top, 2
   bottom" — Homescience room (50%), Computer Labs Senior & Junior (80%),
   Staff room Renovation (50%), Office Area (80%), Sick room (50%). Same
   sage-container treatment as Home's "Ongoing Projects".
4. **Completed Projects** (`1:248`–`1:366`): "10 Completed Projects
   Comprehensive Grid" — Physics Lab, Biology Lab, Netball Court, Coaster
   Bus, Basketball Poles, Class room Partitioning, Solar Lights Grounds, 5
   Smart Boards, Stage for Auditorium, Water Filter. Each card: photo, name,
   "✓ Completed" pill.
5. **Donations & Relief Drives** (`1:366`–`1:434`): heading "Donations", two
   story cards (Cancer Hospital handover, Palestine Fund Raise) — verbatim
   copy in `src/app/(site)/projects/page.tsx` (`donationStories`, hardcoded:
   not in `editable_content.md`).
6. **Make a Difference donation widget** (`1:434`+): 3 tiers — LKR 1,000,
   LKR 5,000 (highlighted), Custom Amount — each with a "Donate Now" button.
   Hardcoded (`donationTiers`); buttons use `siteConfig.ctaUrls.donate`
   (empty → renders the Button component's built-in "coming soon" state).

## Image mapping (real photos, not Figma's transient exports)

Figma's card names for Ongoing/Completed are real project names from the
client, but its photos are stock/reused placeholders. Real photos live in
`New Website Images/3-Projects/`, copied into `public/images/projects/`:

- Dehiwala hero: `dehiwala.png` → `dehiwala-hero.jpg` (the source is already
  a 4-photo collage flyer, used as a single hero image rather than
  recreating Figma's 4-way grid from un-watermarked separates we don't have).
- Ongoing projects: only one real photo exists (`Ongoing/WhatsApp Image
  2026-08-19 at 20.16.42.jpeg`, already in `public/images/home/ongoing-1.jpg`)
  — reused across all 5 ongoing cards, same gap noted in `plans/plan.md` for
  Home.
- Completed projects: `Completed projects/` has 13 files for 10 projects
  (some numbered `N.1`/`N.2` — multiple photos or duplicate uploads of the
  same project). Verified by viewing each file and matching content to the
  Figma names:
  - `2.jpg` → Physics Lab, `3.jpg` → Biology Lab, `4.jpg` → Coaster Bus
    (thank-you flyer), `8.jpg` → Solar Lights Grounds (night floodlit
    court), `9.jpg` → Water Filter, `10.jpg` → Stage for Auditorium
    (matches `11.jpg`, a confirmed duplicate — same photo, byte-identical).
  - `5.1` → Netball Court (empty gravel court being prepared), `6.1` →
    Netball Court second photo (hoop visible) — used `6.1` as the more
    legible representative image.
  - `5.2` → Basketball Poles (hoop with backboard installed); `6.2` is a
    byte-identical duplicate of `5.2`, not used.
  - `7.1` → Class room Partitioning (workers installing partition walls),
    `7.3` → 5 Smart Boards (mounted smart TV) — two different projects
    despite sharing the `7` prefix; the `.1`/`.2`/`.3` suffixes are just
    OS-appended duplicate-filename markers, not a photo-grouping convention.
- Donations: `Donations/1.png` → Cancer Hospital handover (box handover
  photo, matches the Figma story exactly), `Donations/2.jpg` → Palestine
  Fund Raise (fair stall, booth "B17 Palestine", matches exactly).
  `Donations/3.jpg` (Apeksha Hospital gate) wasn't used — the handover photo
  was the better match for the story as written.

## Adaptation notes

- Dehiwala's "Ground Breaking Ceremony Highlights" link had no defined
  target in Figma or the plan. Linked to `/events` (consistent with Home's
  "Check out Event Highlights" → `/events` pattern) rather than treating it
  as an external "coming soon" CTA, since it's an internal navigation link,
  not an unconfirmed external URL.
- `projectsPage.dehiwala` mock singleton mirrors the plan's schema (`show`
  toggle, `title`, `body`, `images`) with two additions not in the plan's
  schema table (`highlightsLabel`, `highlightsUrl`) needed to render the
  link without hardcoding copy in the component.
