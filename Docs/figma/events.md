# Events page (`1:2381`) — `get_design_context` call #8, 2026-09-13

Output truncated after the repeated Header/Footer content at the end of the
frame (already covered by calls #4/#5) — every Events-specific section was
captured before the cutoff.

## Sections, in order

1. **Hero heading** — "Upcoming Events", centered, no subtitle.
2. **Upcoming Events list**: simple rows (not cards with photos) — a date
   plaque (month abbreviation + year, no day) and the title only. Matches
   `editable_content.md`'s "Upcoming Events: Text" (no image). Figma shows
   exactly 2: Health Camp (Oct 2026), Ilma Pre-Ramadan Fair (Jan 2027) —
   same as the events already in `src/content/data/events.json`, so no
   changes needed there.
3. **Past Events grid** (2 columns desktop): 6 cards, each with a colored
   graphic/photo top, a month+day date column (vertical border divider),
   the title, and a "Check out Event Highlights →" link. Figma's exact 6,
   with the date read off each card's own plaque (more reliable than the
   flyer images, which don't all show a year):
   - Career Guidance Fair 2026 — Jul 22 (already in events.json)
   - Petals & Pearls - Annual Reunion 2026 — Jul 4 (already in events.json)
   - "Ilma Pre-Ramadan Fair 2025" (Figma's own title — inconsistent with
     its year; the real flyer image is explicitly the "26th Annual" fair
     dated 31 Jan **2026**, so the year used in `events.json` follows the
     photo, not Figma's placeholder title text) — Jan 31
   - Health Camp — Oct 29. Real flyer shows year **2025** ("Happening
     Tomorrow", Lanka Hospital, Breast Cancer Awareness Month tie-in) —
     this is a different, earlier Health Camp than the upcoming Oct 2026
     one already in the mock data, not a duplicate.
   - Sports Carnival 2025 — Oct 18 (the card's date plaque; the flyer
     itself only gives the registration deadline, 18 Sept 2025, so the
     carnival ran a month after registration closed).
   - "Silken Sips of Marrakesh - Annual Reunion ..." (truncated in the
     extracted code, real flyer: "Annual Reunion 2025") — Jul 19.
4. **"I want to volunteer" CTA** (dark section, full width): heading, a
   white glass-card with "Fill the form below to join as a volunteer",
   a "Join Now" button, and an italic "Check out our Volunteer Page - for
   more details" line. Not in `editable_content.md` for the Events page,
   so hardcoded. "Join Now" is an external volunteer-signup form per the
   plan's "Membership / Volunteer / Donation buttons: external, left empty
   for now" decision → uses `siteConfig.ctaUrls.activeVolunteer` (renders
   Button's "coming soon" state). "Check out our Volunteer Page" links to
   the real internal route, `/membership/active-volunteer`.

## Real images used (not Figma's transient exports)

All 6 past-event flyers exist as real client assets in
`New Website Images/5-Events/` and were copied into
`public/images/events/`:

- `1.png` → Career Guidance Fair 2026 (already `past-event-1.png` in
  `public/images/home/`, reused rather than duplicated)
- `2.jpg` → Petals & Pearls (already `past-event-2.jpg`)
- `3.png` → 26th Annual Ilma Pre Ramadan Fair (new)
- `4.png` → Health Camp 2025 (new)
- `5.png` → Sports Carnival 2025 "Clash of the Champions" (new)
- `6.png` → Silken Sips of Marrakesh (new)
