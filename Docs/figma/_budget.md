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

**Remaining this month: 13**

Planned remaining spend (FAQ excluded per your decision): 9 more content pages (About, Projects, Member, Volunteer, Overseas Chapters, Events, Loyalty, Blogs, Sports) = 9 more `get_design_context` calls → 4 left in reserve after that.
