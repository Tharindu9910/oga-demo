# Blogs page (`1:2839`) — `get_design_context` call #9, 2026-09-13

Output truncated after the repeated Header/Footer content at the end of the
frame (already covered by calls #4/#5) — every Blogs-specific section was
captured before the cutoff.

## Sections, in order

1. **Hero** — "Blogs & Feedback", centered, no subtitle.
2. **Blog cards grid** (4 cols desktop, 8 cards): each card has a square
   image placeholder, a "Sep 2026"-style month/year label, and a title.
   **Known gap, same treatment as Home's placeholder milestone numbers**:
   all 8 titles are the literal string "Blog Headline" — Figma's own
   placeholder, not real copy. Only the month/year labels are distinct
   (Sep/Aug/Jul/Jun/May/Apr/Mar/Feb 2026, descending). Since there is no
   real title, excerpt, or body for 7 of these 8 cards anywhere (not in
   Figma, not in `New Website Images/7- Blogs/`, which has exactly one
   file — a scanned sketch, not blog copy), inventing 7 distinct fake
   posts would violate the "no hardcoded copy in Sanity-driven sections"
   rule. `src/content/data/posts.json` intentionally contains only the one
   real post below; the Blogs list renders whatever's really there instead
   of a hardcoded 8-slot grid.
3. **Memorial tribute editorial** (`1:3061`+): a full real blog post —
   "With Moist Eyes and a Heavy Heart We Bid Farewell to You, Dear
   Madam…." — a tribute to Mrs Rasheeda Mohideen, Ilma's founder
   principal, by Abeeda Sulaiman (Vice Patron of IIOGA). Real, substantial
   body copy (7 paragraphs, verbatim in `src/content/data/posts.json`),
   with an editorial illustration.

## Real image used (not Figma's transient export)

The editorial illustration Figma's own asset export
(`imgEditorialArchitecturalSketchPortraitOf...`) turned out to be a
downloaded copy of a real asset the client already provided:
`New Website Images/7- Blogs/Section.png` (a scanned ink sketch, dated
18/1/2018 — likely tied to the school's 18 January 1988 founding). Used
the local original (copied to
`public/images/blogs/mohideen-tribute-sketch.jpg`) instead of the Figma
export, per the "real photos, not Figma's transient exports" rule.

## Adaptation notes

- `Post` mock type follows the plan's schema (`title`, `slug`,
  `publishedAt`, `excerpt`, `coverImage`, `body`) with no extra fields —
  the real byline ("Abeeda Sulaiman (Vice Patron of IIOGA)") is folded in
  as the last `body` paragraph rather than added as a new schema field,
  since the plan's schema has no author field and this is the only post
  that needs one.
- `body` is `string[]` (paragraphs), same stand-in used for
  `projectsPage.dehiwala.body` — real Portable Text rendering
  (`@portabletext/react`) is deferred to when Sanity exists (Phase 3/4).
- Detail route is `/blogs/[slug]` per the plan ("Detail pages: only blog
  posts — everything else is cards on listing pages").
