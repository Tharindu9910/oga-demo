import Image from 'next/image'

import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import { siteConfig } from '@/config/site'
import { getFaqs } from '@/content/queries'

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

export default async function FaqPage() {
  const faqs = await getFaqs()

  return (
    <section className="bg-white px-6 pt-32 pb-24 sm:pt-42 lg:px-16">
      <Container className="max-w-3xl">
        <h1 className="font-poppins text-brand-900 text-center text-4xl font-bold tracking-tight sm:text-5xl">
          Frequently Asked Questions
        </h1>

        {faqs.length === 0 ? (
          <p className="font-plus-jakarta-sans mt-12 text-center text-sm text-stone-500">
            No questions listed yet — check back soon.
          </p>
        ) : (
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
        )}

        <div className="border-brand-800/10 bg-linear-to-br mt-12 flex flex-col items-center gap-6 rounded-3xl border from-emerald-50/60 via-white to-stone-50 px-8 py-10 text-center shadow-sm sm:flex-row sm:justify-between sm:text-left">
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
