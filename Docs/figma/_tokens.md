# Design tokens extracted from Figma (Header, Footer, Homepage frames)

Figma Variables (`get_variable_defs`) only returned one bound variable (`Backgrounds/Primary: #ffffff`) — this file doesn't use Figma Variables as a design system, so tokens below are reverse-engineered from the actual CSS in three `get_design_context` calls (Header `5:60`, Footer `101:833`, Homepage `1:4040`).

## Fonts

- **Poppins** (Bold/SemiBold/Medium/ExtraBold/Italic) — headings, nav, buttons, stat numbers, labels
- **Plus Jakarta Sans** (Regular/Medium/SemiBold) — body/nav/meta text
- **Inter** (Regular) — long-form paragraph copy (About narrative text specifically used `#808080` @ 16px, `font-Inter`)
- Contact details (phone/email) use a monospace face (`Liberation Mono` in the export, a system metric-compatible font) — use the standard Tailwind `font-mono` stack instead of loading a webfont for it.
- The `→` / `↑` glyphs render in "Nimbus Sans"/"Nimbus Sans:Bold" in the export — that's Figma's fallback for the arrow character, not an intentional font choice. Render these as inline SVG arrows (already downloaded: `public/icons/arrow-right.svg`) or the Unicode glyph in the current font, not a separate font load.

## Colors (all confirmed by real hex/rgba in the design context output)

Maps closely onto Tailwind's built-in `stone`/`emerald`/`slate`/`amber`/`rose` scales — only the specific brand greens need custom tokens.

**Custom brand greens** (not in default Tailwind):

| Token               | Hex       | Used for                                |
| ------------------- | --------- | --------------------------------------- |
| `--color-brand-950` | `#081711` | darkest hero/footer background          |
| `--color-brand-900` | `#0c2017` | ink text on light bg, dark CTA bg       |
| `--color-brand-800` | `#113a2c` | headings on white sections              |
| `--color-brand-700` | `#14261c` | dark card/footer panel bg               |
| `--color-brand-600` | `#1b4d3e` | pill button bg ("About Us", "See more") |
| `--color-brand-500` | `#2f6a40` | active nav pill (scrolled header)       |
| `--color-brand-400` | `#3c8e71` | month labels on date badges             |

**Everything else — use Tailwind defaults directly, don't invent tokens:**

- `stone-400` (`#a8a29e`, text on dark bg), `stone-500` (`#78716c`, muted labels), `stone-700` (`#44403c`, nav text), `stone-900` (`#1c1917`, card headings), `stone-100` (`#f5f5f4`, image placeholder bg)
- `slate-100` (`#f1f5f9`, card borders)
- `emerald-400` (`#34d399`, links on dark bg), `emerald-200` (`#a7f3d0`, italic accent text), `emerald-50`/`100` (`rgba(236,253,245,.7)` / `rgba(209,250,229,.8)`, soft badge backgrounds)
- `amber-50` (`#fffbeb`) and `rose-50` (`#fff1f2`) — alternating tints on Past Event Highlight cards
- Mint-tinted section backgrounds: `#f4f8f5` / `#f2f8f5` with `#e2ece5` / `#dbeee3` borders — close enough to `emerald-50`/`emerald-100` to reuse rather than add tokens

## Shape & motion

- Pill/fully-rounded corners everywhere (`rounded-full`) for nav, buttons, badges.
- Cards: `rounded-2xl` (16px) for content cards, `rounded-3xl`/`4xl` (24–32px) for large section containers.
- Shadows are soft, low-opacity (`shadow-sm`/`shadow-lg`-equivalent), never harsh.

## Header (`5:60`)

- Pill-shaped, glassy header (`backdrop-blur`, translucent white, thin border), floats with padding on light pages; a separate darker/opaque variant appears once scrolled (seen duplicated at the bottom of the Homepage export as "Sticky Floating Navigation Bar" — same content, `bg-[#14261c]` instead of translucent white).
- Left: circular logo mark + "ILMA OGA" / "EST. 1998 • COLOMBO" two-line wordmark.
- Center nav: Home, About Us, Projects, Events, Member (dropdown), More (dropdown). Active page gets a soft mint pill background.
- Right: dark pill CTA "Become a Member →".
- "Member" dropdown → Lifetime Membership / Active Volunteer / Overseas Chapters (confirmed by footer's "MEMBER" column). "More" dropdown → Loyalty Program / Sports / Blogs / (FAQ skipped) / Ilma International Girls' School link (confirmed by footer's "MORE" column).

## Footer (`101:833`, reused verbatim inside the Homepage frame)

- Dark (`#14261c` on `#081711`) with a soft radial glow decoration.
- 4 columns: (1) crest + "Give back to your _Alma Mater_" + call/email badges (`+94 76 055 5164`, `secretaryiioga@gmail.com`), (2) Navigation (Home/About/Projects/Member/Events), (3) Member (Lifetime Membership/Active Volunteer/Overseas Chapters), (4) More (Loyalty Program/Sports/Blogs/FAQ-skipped/school link) + social icons (Facebook/Instagram/LinkedIn — downloaded to `public/icons/`).
- Bottom bar: copyright, Privacy Policy / Terms of Service / Cookie Settings links (no dedicated Figma pages for these — out of scope for now), "Back to Top" link.

## Homepage (`1:4040`) — section by section, with real copy

1. **Hero** (dark, full-bleed photo, gradient overlay): eyebrow pill "IN PROGRESS", `H1` "Ilma Dehiwala Project", CTAs "Donate Now" (white pill) / "Learn More" (glass pill).
2. **About summary** (white bg, 2-col): heading "ILMA INTERNATIONAL OLD GIRLS' ASSOCIATION", 3-paragraph history (verbatim, see below), "About Us →" pill CTA, photo on the right.
3. **Ongoing Projects** (mint rounded container): heading + "See more" pill link to `/projects`; 3 cards — Homescience Room (50%), Computer Labs Senior & Junior (50%), Staff Room Renovation (50%) — image, title, "X% Completed" pill.
4. **Tracking Progress and Milestones** (dark rounded card): 3 stat tiles — 5000+ Members, 26+ Events, 20+ Projects.
5. **Upcoming Events** (centered, text-only per the content doc): date badge (month/year) + title. Real: "Health Camp" (Oct 2026), "Ilma Pre-Ramadan Fair" (Jan 2027).
6. **Past Event Highlights** (mint rounded container): heading + "See more" link to `/events`; cards have photo, month/day badge, title, "Check out Event Highlights →" link. Real: "Career Guidance Fair 2026" (22nd July), "Petals & Pearls - Annual Reunion 2026" (4th July).
7. Footer (shared component, see above).

### About summary paragraph (verbatim, real copy — reuse for `homePage.aboutSummary`)

> The Ilma International Old Girls' Association (IIOGA) was established in 1998, upon the School marking its 10th anniversary. The IIOGA is a not-for-profit organization, founded with the intention of bringing together the alumni of Ilma International Girls' School for a collective cause that of uplifting, enhancing and developing their alma mater.
>
> Since its inception, the IIOGA has been instrumental in engaging in activities that have promoted solidarity and fellowship amongst its members, whilst serving the best interests of the School.
>
> The IIOGA represents the essence of Ilma International Girls' School and considers itself to be an integral part of upholding the unique values and philosophies that make the School what it is.

### Image mapping (using real local files, not Figma's transient stock photos)

Figma's export photos are generic stock images, not the client's real photos. Real assets live in `New Website Images/1- Home/`: `1 Hero section.jpg` (hero), `2 school.jpeg` (about photo), `Ongoing 3.jpg` (an ongoing project card), `Past event 1.png` / `Past event 2.jpg` (past highlight cards). `New Website Images/3-Projects/Ongoing/WhatsApp Image....jpeg` covers a second ongoing-project card. Only 2 distinct ongoing-project photos exist for 3 cards — the third reuses one, same as the Figma mockup itself does (it reused one image across 2 of its 3 cards too).
