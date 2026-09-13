# Loyalty Program page (`1:3563`) — `get_design_context` call #14, 2026-09-13

Output truncated after the repeated header/footer (already covered by
calls #4/#5) — hero, "Why Partner with us?" and "Our Current Merchants"
fully captured before the cutoff. `loyaltyPage` schema per plans/plan.md
line 114 is `merchants[] {name, logo}, orderable by drag and drop`; the
surrounding editorial copy (hero lines, benefit card text) is stored in
`loyaltyPage.json` the same way `aboutPage.json`/`membershipPage.json`
store full verbatim copy alongside their schema-defined fields — added
`Merchant`/`LoyaltyPage` types + `getLoyaltyPage()` to the mock content
layer.

## Sections in the Figma frame

1. **Hero** (white bg, two-column) — "Loyalty Program" headline, "The
   IIOGA Membership Loyalty Program is READY!" announcement, 3 checkmark
   benefit lines, sign-up encouragement + italic note, WhatsApp
   "Click to Chat" CTA button (`#25D366`), and a loyalty-card visual on
   the right.
2. **"Why Partner with us?"** — sage rounded panel, 5 circular icon
   cards: Boosted Sales, Brand Promotion, Customer Loyalty, Event
   Exposure, Community Recognition.
3. **"Our Current Merchants"** — dark (`#14261C`) full-bleed band, a
   5-column grid of 10 merchant logo tiles.

## Real content used — and what was deliberately left out

- The Figma card visual (`imgHighEndLuxuryLoyaltyMembershipCardMockup…`)
  is an AI-generated mockup, not a real asset. `New Website Images/6-Loyalty
  Program/WhatsApp Image 2025-08-14 at 9.22.44 PM (1).jpeg` is the real
  official "LOYALTY PROGRAM — welcome aboard!" graphic (carries the real
  IIOGA crest) — used instead, copied to
  `public/images/loyalty/welcome-card.jpg`.
- The 5 "Why Partner" icons are real assets from
  `New Website Images/6-Loyalty Program/1.png`–`5.png` (generic gold
  benefit icons: growth chart, megaphone+star, handshake, red carpet,
  loyalty/hand) — copied to `public/images/loyalty/benefits/`.
- All 10 merchant logos are real files from `New Website Images/6-Loyalty
  Program/Logos/1.png`–`10.png`, identified by reading each logo image:
  Pinnacle Alliance, Chana's, CrestGems, Pearl Bay, Crescent Fine Foods,
  Jezza, Arwa, Shawl Arena, Girls Cave, Max Fitness — copied to
  `public/images/loyalty/merchants/` and seeded as the `merchants[]`
  array (name + logo), matching the schema's collection shape.
- No WhatsApp number/link was supplied for the CTA (distinct from the
  general contact phone already in `siteConfig.contact.phone` — a wa.me
  deep link needs its own confirmed number), so `siteConfig.ctaUrls.
  loyaltyWhatsapp` is left empty, same convention as `becomeAMember` /
  `activeVolunteer` / `donate`. The button renders disabled via the
  existing `Button` empty-href fallback.

## Deviations from the literal Figma layout

- Circular "Why Partner" cards were simplified from the Figma's nested
  ellipse/photo-mask decoration to a plain icon-in-circle treatment —
  the decorative ellipses were part of the *reference* icon artwork
  style, not separate content.
- Merchant grid uses `object-contain` tiles on a white card background
  for every logo (not just the ones the Figma marked with a white
  underlay) so wordmark logos with transparent backgrounds (Jezza, Arwa,
  Shawl Arena, Girls Cave, Max Fitness are dark-background PNGs) all
  stay legible — reflowing grid instead of a fixed 2-row/5-column pixel
  grid, consistent with the Overseas Chapters precedent, since
  `merchants[]` is an editable, orderable collection.
