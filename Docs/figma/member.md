# Become a Member page (`1:1057`) — `get_design_context` call #11, 2026-09-13

Full frame captured in one call, no truncation — the frame is compact
(1280×1415), just the membership drive poster + an info island, then the
repeated Header/Footer (already covered by calls #4/#5).

## Sections

1. **Membership Drive Showcase** — the real IIOGA membership drive poster
   image, left column.
2. **Essential Information Island** — right column, two stacked cards:
   - **Documents Required**: School Leaving Certificate, National Identity
     Card (NIC) — each with a green checkmark bullet.
   - **Payment Structure**: Life Membership Card (LIFETIME badge) LKR 5,000;
     Replacement Card LKR 1,000; "Become a Member Now →" CTA button.

No separate hero/title section exists above this — the frame goes straight
from the header into the two-column layout, same pattern as the Blogs list
frame. Matches plan.md's `membershipPage` schema (`image, body (portable
text), ctaUrl`): treated `documentsRequired` + `payment` as the shaped
"body" content (same precedent as `about.vision`/`about.mission` being
typed objects rather than generic portable text), with the CTA URL coming
from `siteConfig.ctaUrls.becomeAMember` (currently empty, same
"coming-soon" `Button` treatment as every other CTA on the site).

## Real image used

- Poster: `New Website Images/4 - Member/4.1-Lifetime Membership.jpeg`
  (1024×1280, the actual client-supplied flyer) used instead of Figma's
  transient re-hosted export. The flyer's own "Documents needed for OGA
  membership" text independently confirms the two documents listed in the
  Figma design context, so this is doubly-sourced real content, not
  fabricated.
- Copied to `public/images/membership/lifetime-membership-poster.jpg`
  (re-encoded at quality 82 via `sips`, 148KB → 208KB — the source was
  already reasonably small; re-encode was for consistency with the
  pipeline, not size reduction).

## Adaptation notes

- Mobile: the Figma frame has no mobile variant for this page (unlike
  Home's `172:13` reference). At 390px, the "Life Membership Card" row and
  the full-width CTA button overflowed with the design's literal nested
  padding (outer island `p-9` + card `p-7`), so mobile padding was tightened
  (`p-4`/`p-5` at the base breakpoint, expanding to the Figma-matching
  `p-9`/`p-7` at `sm:`) and the price/badge row switches from `flex-row` to
  `flex-col` below `sm:`. Desktop (1440px) matches the Figma layout as-is.
