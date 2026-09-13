# Figma MCP call budget log

Starter plan: 20 calls/month. 1 already spent before this project (unrelated test, call #0). 19 were available at the start of Phase 2.

| #   | Date       | Tool                | Node(s)               | Saved to                  | Notes                                                                                                                                                                                       |
| --- | ---------- | ------------------- | --------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0   | (unknown)  | —                   | —                     | —                         | Test call, unrelated to this project, not logged in detail                                                                                                                                  |
| 1   | 2026-09-13 | `get_metadata`      | `0:1` (Page 1 canvas) | `Docs/figma/_metadata.md` | Top-level frame list for the whole file                                                                                                                                                     |
| 2   | 2026-09-13 | `get_variable_defs` | `0:1`                 | —                         | Errored ("nothing selected") — no data returned, but logged as spent since there's no usage dashboard to confirm it wasn't billed                                                           |
| 3   | 2026-09-13 | `get_variable_defs` | `1:4040` (Homepage)   | `Docs/figma/_tokens.md`   | Only one bound variable came back (`Backgrounds/Primary: #ffffff`) — this file doesn't use Figma Variables heavily; real tokens will come from `get_design_context` output per page instead |

| 4 | 2026-09-13 | `get_design_context` | `5:60` (Header) | `Docs/figma/_tokens.md` | |
| 5 | 2026-09-13 | `get_design_context` | `101:833` (Master Footer) | `Docs/figma/_tokens.md` | |
| 6 | 2026-09-13 | `get_design_context` | `1:4040` (Homepage) | `Docs/figma/_tokens.md`, `Docs/figma/home.md` | Output truncated after the last section (a duplicate scrolled-header variant, already covered by the Header call) |

| 7   | 2026-09-13 | `get_design_context` | `1:2` (Projects)          | `Docs/figma/projects.md`  | Full frame (Ongoing + Completed + Dehiwala + Donations) in one call, no reserve needed |
| 8   | 2026-09-13 | `get_design_context` | `1:2381` (Events)         | `Docs/figma/events.md`    | Output truncated after the repeated Header/Footer (already covered) — Upcoming/Past Events + volunteer CTA sections fully captured before the cutoff |
| 9   | 2026-09-13 | `get_design_context` | `1:2839` (Blogs)          | `Docs/figma/blogs.md`     | Output truncated after the repeated Header/Footer (already covered) — blog card grid + memorial editorial fully captured before the cutoff |
| 10  | 2026-09-13 | `get_design_context` | `1:672` (About Us)        | `Docs/figma/about.md`     | Output truncated after the repeated Header/Footer (already covered) — hero, Vision/Mission, President's message, Our Team and the Liyanagae tribute fully captured before the cutoff |
| 11  | 2026-09-13 | `get_design_context` | `1:1057` (Member)         | `Docs/figma/member.md`   | Full frame in one call — poster showcase + Documents Required / Payment Structure cards, no truncation |
| 12  | 2026-09-13 | `get_design_context` | `1:1649` (Volunteer)      | `Docs/figma/volunteer.md` | Full frame in one call — hero, 6 role cards, Events carousel (design shows 6 circular cards; expanded to all 8 real photos per your instruction), no truncation |
| 13  | 2026-09-13 | `get_design_context` | `1:1375` (Overseas Chapters) | `Docs/figma/overseas-chapters.md` | Full frame in one call, including header/footer — 5 country sections (Dubai, Australia, UK, Canada, Saudi Arabia); UK/Saudi Arabia are heading-only in the design with no photos or real assets, so only Dubai/Australia/Canada were seeded as real `chapter` documents |
| 14  | 2026-09-13 | `get_design_context` | `1:3563` (Loyalty Program) | `Docs/figma/loyalty-program.md` | Output truncated after the repeated Header/Footer (already covered) — hero, "Why Partner with us?" (5 benefit cards) and "Our Current Merchants" (10 logos) fully captured before the cutoff. Figma's card visual is an AI-generated mockup; swapped for the real "Loyalty Program — Welcome Aboard!" graphic found in `New Website Images/6-Loyalty Program/` |

**Remaining this month: 5**

Planned remaining spend: 1 more content page (Sports) = 1 more `get_design_context` call → 4 left in reserve after that.
