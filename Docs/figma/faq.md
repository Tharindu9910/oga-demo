# FAQ page (`1:3269`) — `get_design_context` calls #16–17, 2026-09-13

Full frame captured in one call (#16), including header/footer (already
covered by calls #4/#5), no truncation. Confirmed with a second,
isolated call on FAQ 2 (#17) that this is a genuine content gap in the
Figma file — not a collapsed-accordion export limitation — before
spending any more budget or fabricating answers.

## What's in the Figma frame

- Hero: "Frequently Asked Questions" heading.
- 11 accordion items (`Article - FAQ 1`–`11`), white cards with a
  question + chevron. Only **FAQ 1 is expanded in the design and has
  real answer text authored**:
  - Q1. "Who can join the IIOGA?" → "Any alumna of Ilma International
    Girls' School with a minimum of 2 years' attendance is eligible to
    join."
- **FAQs 2–11 have no answer layer in the Figma file at all** —
  confirmed by isolating FAQ 2's node (`1:3308`): the returned code is
  just the question row and chevron, nothing collapsed underneath.
  Questions only, verbatim:
  2. How much is the Life Membership?
  3. Is there a membership fee?
  4. How do I join the volunteer group?
  5. How do I join the Executive Committee (ExCo)?
  6. Can I suggest ideas or initiatives for the IIOGA?
  7. What kind of events does the IIOGA organize?
  8. What is the Loyalty Programme?
  9. I run a small business. Can I promote it through IIOGA?
  10. Is the IIOGA only for social events?
  11. How can I support if I'm living abroad?
- Closing "Still have questions?" card: WhatsApp CTA + "Email Support"
  button (`mailto:`).

## Why the page isn't built yet

`faq` isn't in the plan's content model or `Docs/editable_content.md` —
it was already flagged as out of scope (plan line 22, "you said
2026-09-13 to skip it for now"). Now that you've asked to build it, the
blocker isn't Figma — it's that this is real organizational content
(membership fees, how to join ExCo, whether IIOGA does more than social
events) I have no source for except Q2 ("How much is the Life
Membership?"), which the Become a Member page already answers for real
(LKR 5,000, `membershipPage.json`). Writing plausible-sounding answers
for the other 9 would be fabricating organizational policy, which this
project avoids everywhere else (every empty CTA URL is left visibly
blank rather than guessed). Flagged to the user rather than proceeding.
