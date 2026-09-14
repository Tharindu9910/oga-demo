import Image from 'next/image'

import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import { siteConfig } from '@/config/site'

// Hardcoded per plans/plan.md (FAQ has no Sanity schema — not in
// Docs/editable_content.md, so it doesn't change monthly like the CMS-driven
// sections do).
const faqs = [
  {
    _id: 'who-can-join',
    question: 'Who can join the IIOGA?',
    answer:
      "Any alumna of Ilma International Girls' School with a minimum of 2 years' attendance is eligible to join.",
  },
  {
    _id: 'life-membership-cost',
    question: 'How much is the Life Membership?',
    answer:
      'Life Membership is a one-time payment of LKR 5,000/=. The cost of a Replacement card is LKR 1,000.',
  },
  {
    _id: 'membership-fee',
    question: 'Is there a membership fee?',
    answer:
      'A lifetime membership fee is required to be paid to be a registered member.',
  },
  {
    _id: 'join-volunteer-group',
    question: 'How do I join the volunteer group?',
    answer:
      'Complete the interest form on our website or contact us during an event.',
  },
  {
    _id: 'join-exco',
    question: 'How do I join the Executive Committee (ExCo)?',
    answer:
      'Kindly contact the OGA WhatsApp +94 76 055 5164 for further inquiries.',
  },
  {
    _id: 'suggest-ideas',
    question: 'Can I suggest ideas or initiatives for the IIOGA?',
    answer:
      'Definitely! We encourage suggestions via email or through our website.',
  },
  {
    _id: 'events-organized',
    question: 'What kind of events does the IIOGA organize?',
    answer:
      'We organize reunions, mixers, wellness sessions, charity drives, and more.',
  },
  {
    _id: 'loyalty-programme',
    question: 'What is the Loyalty Programme?',
    answer:
      'A members-only programme offering exclusive discounts and deals with partner brands.',
  },
  {
    _id: 'small-business-promotion',
    question: 'I run a small business. Can I promote it through IIOGA?',
    answer:
      'Yes, via sponsorships, event stalls, or participation in the loyalty programme.',
  },
  {
    _id: 'only-social-events',
    question: 'Is the IIOGA only for social events?',
    answer:
      'No, we focus on networking, mentoring, community building, and philanthropy.',
  },
  {
    _id: 'support-from-abroad',
    question: "How can I support if I'm living abroad?",
    answer:
      'You can contribute through virtual volunteering, donations, or event sponsorship.',
  },
]

const chevron = (
  <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0">
    <path
      d="M4 6L8 10L12 6"
      stroke="#57534e"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function FaqPage() {
  return (
    <section className="bg-white px-6 pt-32 pb-24 sm:pt-42 lg:px-16">
      <Container className="max-w-3xl">
        <h1 className="font-poppins text-brand-900 text-center text-4xl font-bold tracking-tight sm:text-5xl">
          Frequently Asked Questions
        </h1>

        <div className="mt-12 flex flex-col gap-4">
          {faqs.map((faq) => (
            <details
              key={faq._id}
              className="group rounded-2xl border border-stone-200 bg-white p-1"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4">
                <span className="font-poppins text-lg font-semibold text-stone-900">
                  {faq.question}
                </span>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-stone-100 transition-transform group-open:rotate-180">
                  {chevron}
                </span>
              </summary>
              <p className="font-poppins border-t border-stone-100 px-4 pt-2 pb-4 text-base text-stone-600">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>

        <div className="border-brand-800/10 mt-12 flex flex-col items-center gap-6 rounded-3xl border bg-linear-to-br from-emerald-50/60 via-white to-stone-50 px-8 py-10 text-center shadow-sm sm:flex-row sm:justify-between sm:text-left">
          <h2 className="font-poppins text-brand-950 text-2xl font-bold">
            Still have
            <br />
            questions?
          </h2>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Button
              href={siteConfig.ctaUrls.faqWhatsapp}
              className="gap-3 bg-[#25d366] px-7 py-3.5 text-white shadow-[0_4px_7px_0_rgba(37,211,102,0.35)] hover:bg-[#20bd5a]"
            >
              <WhatsAppIcon />
              WhatsApp Click to Chat
            </Button>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="font-poppins inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-5 py-3.5 text-sm font-medium text-stone-800 transition-colors hover:bg-stone-50"
            >
              <Image
                src="/icons/email.svg"
                alt=""
                width={16}
                height={16}
                className="size-4"
              />
              Email Support
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}
