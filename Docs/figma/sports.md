# Sports page (`1:2039`) — `get_design_context` call #15, 2026-09-13

Full frame captured in one call, including the repeated header/footer
(already covered by calls #4/#5), no truncation. Sports has no schema
entry in plans/plan.md's Content model — same hardcoded-content
treatment as Active Volunteer (plan line 218: "Sports (hardcoded
content, still needs the design)"). No JSON/query layer added; content
lives directly in `page.tsx` as a `sportsSections` array, matching the
`volunteerRoles`/`volunteerEvents` precedent in the Active Volunteer
page.

## Sections in the Figma frame

1. **Hero** — centered "Sports" heading + 3 verbatim paragraphs
   explaining the rotational Netball / Badminton / Sports Carnival
   calendar and the Under 30 / Over 30 categories.
2. **Three alternating banner+photo rows** — a dark green (`#235946`)
   copy banner with a "Join Us" pill button, paired with a photo in a
   navy-bordered rounded card. Netball and Sports Carnival have the
   photo on the right (banner left); Badminton reverses (photo left,
   banner right).
3. **Closing CTA panel** — sage background, centered verbatim copy
   ending in "OGA sporting spirit", with a WhatsApp "Click to
   chat" button (`#25D366`).

## Real content used

- `New Website Images/8-Sports page/1.png` — a real official IIOGA
  social-media collage (main netball delegation photo + 3 supporting
  shots: night match, group photo, gift exchange). Used whole rather
  than cropped, same treatment as the Loyalty Program's real card
  graphic — copied to `public/images/sports/netball.jpg` (converted
  from PNG and downsized with `sips` to match the repo's existing
  image-size convention, ~450KB before/1.3MB after→468KB).
- `New Website Images/8-Sports page/2.jpg` — a real single photo of the
  IIOGA EXCO badminton team huddle on court — copied to
  `public/images/sports/badminton.jpg`.
- `New Website Images/8-Sports page/3.png` — a real official "Inaugural
  IIOGA Sports Carnival" collage (trophies, event banner, opening
  parade) — copied to `public/images/sports/sports-carnival.jpg`
  (same PNG→JPEG downsize treatment).
- All hero and per-sport paragraph copy is verbatim from the Figma
  frame (light copy-editing only: added missing punctuation the design
  was missing, e.g. em dashes around "Netball, Badminton, and the
  Sports Carnival").

## Deviations from the literal Figma layout

- No real WhatsApp group links exist yet for Netball/Badminton/Sports
  Carnival individually, nor for the closing general CTA — added
  `sportsNetballWhatsapp` / `sportsBadmintonWhatsapp` /
  `sportsCarnivalWhatsapp` / `sportsWhatsapp` to `siteConfig.ctaUrls`,
  all left empty per the established convention (`becomeAMember` /
  `activeVolunteer` / `donate` / `loyaltyWhatsapp`). Every "Join Us" /
  "WhatsApp" button renders via the existing `Button` empty-href
  disabled fallback.
- Figma's absolute-positioned 12-column grid (with each banner
  interlocking asymmetrically into the photo frame) was rebuilt as a
  simple flex row that reverses direction per section — same visual
  result, ordinary responsive flow instead of fixed pixel offsets.
