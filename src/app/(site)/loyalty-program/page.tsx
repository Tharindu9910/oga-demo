import Image from 'next/image'

import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import { siteConfig } from '@/config/site'
import { getLoyaltyPage } from '@/content/queries'

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
  const loyalty = await getLoyaltyPage()

  return (
    <>
      <section className="bg-white px-6 pt-32 pb-16 sm:pt-42 lg:px-16">
        <Container className="max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h1 className="font-poppins text-brand-900 text-4xl font-extrabold tracking-tight sm:text-5xl">
                {loyalty.hero.headline}
              </h1>

              <p className="font-poppins text-brand-800 mt-6 text-xl font-semibold tracking-tight sm:text-[22px]">
                {loyalty.hero.announcement}
              </p>

              <ul className="mt-5 flex flex-col gap-3">
                {loyalty.hero.benefits.map((benefit) => (
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
                  {loyalty.hero.signupHeadline}
                </p>
                <p className="font-plus-jakarta-sans text-sm text-stone-500 italic">
                  {loyalty.hero.signupNote}
                </p>
              </div>

              <div className="mt-8">
                <Button
                  href={siteConfig.ctaUrls.loyaltyWhatsapp}
                  className="gap-3 bg-[#25d366] px-7 py-3.5 text-white shadow-[0_4px_7px_0_rgba(37,211,102,0.35)] hover:bg-[#20bd5a]"
                >
                  <WhatsAppIcon />
                  {loyalty.hero.ctaLabel}
                </Button>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-full max-w-md overflow-hidden rounded-[22px] border border-emerald-900/20 shadow-[0_30px_60px_-20px_rgba(17,58,44,0.18)]">
                <Image
                  src={loyalty.hero.card.src}
                  alt={loyalty.hero.card.alt}
                  width={448}
                  height={448}
                  className="w-full object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white px-6 pb-20 lg:px-16">
        <Container className="max-w-6xl">
          <div className="rounded-[40px] border border-emerald-900/10 bg-[#edf4f0] px-6 py-12 sm:px-10 sm:py-14">
            <SectionHeading>{loyalty.whyPartner.heading}</SectionHeading>
            <p className="font-plus-jakarta-sans mt-2 max-w-xl text-lg text-stone-500">
              {loyalty.whyPartner.subheading}
            </p>

            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
              {loyalty.whyPartner.benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="flex flex-col items-center text-center"
                >
                  <div className="border-brand-800/10 flex size-[100px] items-center justify-center rounded-full border bg-gradient-to-br from-white to-emerald-100 shadow-[0_10px_25px_-5px_rgba(20,56,38,0.12)] sm:size-[120px]">
                    <div className="bg-brand-900 flex size-[64px] items-center justify-center rounded-full p-4 sm:size-20">
                      <Image
                        src={benefit.icon.src}
                        alt={benefit.icon.alt}
                        width={56}
                        height={56}
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
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-brand-700 border-t border-emerald-950/40 px-6 py-20 lg:px-16">
        <Container className="max-w-5xl">
          <SectionHeading align="center" tone="light">
            {loyalty.merchantsHeading}
          </SectionHeading>

          {loyalty.merchants.length === 0 ? (
            <p className="font-plus-jakarta-sans mt-8 text-center text-sm text-emerald-100/70">
              No merchant partners listed yet — check back soon.
            </p>
          ) : (
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {loyalty.merchants.map((merchant) => (
                <div
                  key={merchant.name}
                  className="flex h-[110px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/95 p-4 sm:h-[130px]"
                >
                  <Image
                    src={merchant.logo.src}
                    alt={merchant.logo.alt}
                    width={200}
                    height={130}
                    className="max-h-full w-full object-contain"
                  />
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
