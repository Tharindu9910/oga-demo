import Image from 'next/image'

import Enter from '@/components/motion/Enter'
import RevealStagger from '@/components/motion/RevealStagger'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import SanityImage from '@/components/ui/SanityImage'
import SectionHeading from '@/components/ui/SectionHeading'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import { getLoyaltyPage, getSiteSettings } from '@/sanity/lib/content'

// Hardcoded per Docs/editable_content.md (Loyalty Program page lists only
// "Our Merchants" as editable) — hero and "Why Partner" have no Sanity field.
const hero = {
  headline: 'Loyalty Program',
  announcement: 'The IIOGA Membership Loyalty Program is READY!',
  benefits: [
    "Enjoy exclusive benefits with every purchase by producing your membership card at checkout at our loyalty partners' stores and e-stores.",
    "Whether you're an alumna who loves staying connected or someone who never misses an event, this program is for YOU!",
    "Don't miss out on this opportunity to level up your OGA experience and enjoy all the benefits of staying connected.",
  ],
  signupHeadline:
    "Sign up now if you haven't yet and start collecting rewards!",
  signupNote:
    "Let's make your OGA membership card more rewarding than ever. Stay tuned for more exciting updates!",
  ctaLabel: 'WhatsApp Click to Chat',
  card: {
    src: '/images/loyalty/welcome-card.jpg',
    alt: 'IIOGA Loyalty Program — Welcome Aboard!',
  },
}

const whyPartner = {
  heading: 'Why Partner with us?',
  subheading:
    'Here are some key benefits of partnering with our loyalty programme:',
  benefits: [
    {
      icon: {
        src: '/images/loyalty/benefits/boosted-sales.png',
        alt: 'Boosted Sales icon',
      },
      title: 'Boosted Sales',
      description:
        'Loyalty rewards encourage repeat purchases and higher spending',
    },
    {
      icon: {
        src: '/images/loyalty/benefits/brand-promotion.png',
        alt: 'Brand Promotion icon',
      },
      title: 'Brand Promotion',
      description:
        'Get featured across our marketing platforms for added visibility',
    },
    {
      icon: {
        src: '/images/loyalty/benefits/customer-loyalty.png',
        alt: 'Customer Loyalty icon',
      },
      title: 'Customer Loyalty',
      description:
        'Build stronger relationships with a targeted, engaged customer base',
    },
    {
      icon: {
        src: '/images/loyalty/benefits/event-exposure.png',
        alt: 'Event Exposure icon',
      },
      title: 'Event Exposure',
      description:
        'Be part of exclusive events and campaigns that highlight your brand',
    },
    {
      icon: {
        src: '/images/loyalty/benefits/community-recognition.png',
        alt: 'Community Recognition icon',
      },
      title: 'Community Recognition',
      description:
        'Show your commitment to support women-led/student/community-driven initiatives',
    },
  ],
}

const merchantsHeading = 'Our Current Merchants'

const checkIcon = (
  <svg viewBox="0 0 12 12" fill="none" className="size-3.5">
    <path
      d="M2.5 6.25L4.75 8.5L9.5 3.5"
      stroke="#059669"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default async function LoyaltyProgramPage() {
  const [loyalty, { whatsappUrl }] = await Promise.all([
    getLoyaltyPage(),
    getSiteSettings(),
  ])

  return (
    <>
      <section className="bg-cream pt-32 pb-16 px-5 sm:pt-42">
        <Container className="max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Enter>
              <h1 className="font-poppins text-brand-900 text-4xl font-extrabold tracking-tight sm:text-5xl">
                {hero.headline}
              </h1>

              <p className="font-poppins text-brand-800 mt-6 text-xl font-semibold tracking-tight sm:text-[22px]">
                {hero.announcement}
              </p>

              <ul className="mt-5 flex flex-col gap-3">
                {hero.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                      {checkIcon}
                    </span>
                    <span className="font-plus-jakarta-sans text-[15px] text-stone-700">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-2 border-t border-stone-100 pt-5">
                <p className="font-poppins text-brand-900 text-base font-bold">
                  {hero.signupHeadline}
                </p>
                <p className="font-plus-jakarta-sans text-sm text-stone-500 italic">
                  {hero.signupNote}
                </p>
              </div>

              <div className="mt-8 flex justify-center sm:justify-start">
                <Button
                  href={whatsappUrl}
                  className="gap-3 bg-[#25d366] px-7 py-3.5 text-white shadow-[0_4px_7px_0_rgba(37,211,102,0.35)] hover:bg-[#20bd5a]"
                >
                  <WhatsAppIcon />
                  {hero.ctaLabel}
                </Button>
              </div>
            </Enter>

            <Enter delay={0.14} className="flex justify-center">
              <div className="w-full max-w-md overflow-hidden rounded-[22px] border border-emerald-900/20 shadow-[0_30px_60px_-20px_rgba(17,58,44,0.18)]">
                <Image
                  src={hero.card.src}
                  alt={hero.card.alt}
                  width={448}
                  height={448}
                  className="w-full object-cover"
                />
              </div>
            </Enter>
          </div>
        </Container>
      </section>

      <section className="bg-cream pb-20">
        <Container className="max-w-6xl">
          <div className="rounded-[40px] border border-emerald-900/10 bg-[#edf4f0] px-6 py-12 sm:px-10 sm:py-14">
            <SectionHeading className="text-center sm:text-left">
              {whyPartner.heading}
            </SectionHeading>
            <p className="font-plus-jakarta-sans mx-auto mt-2 max-w-xl text-center text-lg text-stone-500 sm:mx-0 sm:text-left">
              {whyPartner.subheading}
            </p>

            <RevealStagger className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
              {whyPartner.benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="flex flex-col items-center text-center"
                >
                  <div className="border-brand-800/10 flex size-25 items-center justify-center rounded-full border bg-gradient-to-br from-white to-emerald-100 shadow-[0_10px_25px_-5px_rgba(20,56,38,0.12)] sm:size-[120px]">
                    <div className="bg-brand-900 flex size-24 items-center justify-center rounded-full p-4 sm:size-26">
                      <Image
                        src={benefit.icon.src}
                        alt={benefit.icon.alt}
                        width={100}
                        height={100}
                        className="size-full object-contain"
                      />
                    </div>
                  </div>
                  <h4 className="font-poppins text-brand-950 mt-4 text-sm font-bold">
                    {benefit.title}
                  </h4>
                  <p className="font-plus-jakarta-sans mt-1 text-xs text-stone-500">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </RevealStagger>
          </div>
        </Container>
      </section>

      <section className="bg-brand-700 border-t border-emerald-950/40 py-20">
        <Container className="max-w-5xl">
          <SectionHeading align="center" tone="light">
            {merchantsHeading}
          </SectionHeading>

          {!loyalty.merchants || loyalty.merchants.length === 0 ? (
            <p className="font-plus-jakarta-sans mt-8 text-center text-sm text-emerald-100/70">
              No merchant partners listed yet — check back soon.
            </p>
          ) : (
            <RevealStagger className="px-5 mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {loyalty.merchants.map((merchant) => (
                <div
                  key={merchant._key}
                  className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl bg-white/95"
                >
                  <SanityImage
                    image={merchant.logo}
                    width={200}
                    height={200}
                    fit="max"
                    className="size-full object-contain"
                  />
                </div>
              ))}
            </RevealStagger>
          )}
        </Container>
      </section>
    </>
  )
}
