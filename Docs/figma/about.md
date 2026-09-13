# About Us page (`1:672`) — `get_design_context` call #10, 2026-09-13

Output truncated after the repeated Header/Footer content at the end of the
frame (already covered by calls #4/#5) — every About-specific section was
captured before the cutoff.

## Sections, in order

1. **Hero** — "About Us", three pill badges (Established 1998 / Colombo,
   Sri Lanka / 28+ Years), three real intro paragraphs about IIOGA.
2. **Vision & Mission** — two dark emerald cards side by side, each with an
   icon and a short paragraph. Real copy for both.
3. **Message from the President** — a full letter, signed "Shahena Iqbal,
   President, IIOGA". Only `editable_content.md`-listed section that maps
   directly to the plan's `aboutPage.president` schema field.
4. **Our Team** — two columns, "Patrons" (1 Patron + 4 Vice Patrons) and
   "OGA Committee" (President through 5 Committee Members), labelled
   "2025 / 2026". Real roster, verbatim. Maps to `aboutPage.team`.
5. **A Tribute to Mrs. Liyanagae, Founder of the IIOGA** — dark card with
   her photo, two paragraphs and a pull-quote. Real copy.

## Not in the Figma mockup: the About video

`plans/plan.md`'s content model has `aboutPage: video (file) + poster
image`, and a real ~63MB video exists
(`New Website Images/2 - About Us page/about us page video.mp4`), but this
frame's actual layout has **no video section** — Main's children go
straight from the Vision/Mission cards to the President's message to Our
Team to the Liyanagae tribute, then the repeated Header/Footer. Rather than
skip it (the asset is real and the schema explicitly calls for it, unlike
Projects' drone-video section, which had no real asset), an "Our Story"
section was added between "Our Team" and the Liyanagae tribute — a
reasonable place editorially, with no Figma layout to contradict it.

- Compressed with ffmpeg per the plan's spec (`scale=-2:720`, `libx264
  -crf 31`, AAC 96k, `+faststart`): 62.8MB / 1080p → 11.8MB / 720p.
  Output: `public/videos/about.mp4`.
- Poster frame extracted from the compressed video at 3s — it happens to
  land on the video's own title card ("Scintillating Silver — IIOGA's 25th
  Anniversary, Spectrum of Service since 1998"), which works well as a
  poster without needing a separate designed poster asset.
- `<video controls playsInline preload="none" poster=...>` per the plan's
  "Images and performance" section.

## Real images used (not Figma's transient exports)

- Vision/Mission icons: `New Website Images/2 - About Us page/vision
  1.png` and `mission.png` (simple line icons, used as-is).
- Founder tribute photo: `mrs liyanage.jpg` — same photo as Figma's own
  asset export (`imgMrsLiyanagaeFounderOfIioga`), used from the local
  original instead of Figma's transient copy.

## Adaptation notes

- `aboutPage.president` has no `photo` field even though the plan's schema
  lists one: neither Figma's design nor any real asset has a photo of the
  current president (the message card is text-only in the actual mockup).
  Not fabricated — same treatment as other documented content gaps.
- Figma's headings/signature use `font-['Liberation_Serif:Bold']`, which
  is very likely Figma's export-time fallback for a font it couldn't
  resolve, not a deliberate second typeface — the rest of the site (and
  this page's own body text) uses Poppins Bold for every heading, so
  headings here use `font-poppins` rather than introducing an arbitrary
  serif font with no token in `globals.css`.
