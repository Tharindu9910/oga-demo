import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import SanityImage from '@/components/ui/SanityImage'
import SectionHeading from '@/components/ui/SectionHeading'
import { siteConfig } from '@/config/site'
import { getMembershipPage } from '@/sanity/lib/content'

const checkIcon = (
  <svg viewBox="0 0 12 12" fill="none" className="size-3">
    <path
      d="M2.5 6.25L4.75 8.5L9.5 3.5"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default async function MembershipPage() {
  const membership = await getMembershipPage()

  return (
    <section className="bg-white px-6 pt-32 pb-24 sm:pt-42 lg:px-16">
      <Container className="max-w-5xl">
        <SectionHeading align="center">Become a Member</SectionHeading>

        <div className="mt-12 grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border border-stone-100 shadow-xl">
            <SanityImage
              image={membership.poster}
              width={588}
              height={735}
              className="w-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-6 rounded-[36px] border border-[#d6e5db] bg-[#edf5f0] p-4 sm:p-9">
            <div className="rounded-2xl border border-[#e0ece3] bg-white p-5 shadow-sm sm:p-7">
              <h3 className="font-poppins text-brand-950 text-xl font-bold">
                Documents Required
              </h3>
              <ul className="mt-5 flex flex-col gap-4">
                {(membership.documentsRequired ?? []).map((doc) => (
                  <li
                    key={doc}
                    className="flex items-start gap-3 rounded-xl border border-[#e8efe9] bg-[#f9fbf9] p-4"
                  >
                    <span className="bg-brand-800 mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full">
                      {checkIcon}
                    </span>
                    <span className="font-poppins text-brand-950 text-sm font-bold">
                      {doc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-[#e0ece3] bg-white p-5 shadow-sm sm:p-7">
              <h3 className="font-poppins text-brand-950 text-xl font-bold">
                Payment Structure
              </h3>
              <div className="mt-5 flex flex-col gap-3.5">
                <div className="flex flex-col gap-2 rounded-xl border border-[#dce9df] bg-gradient-to-r from-[#f7fbf8] to-[#f0f7f2] p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-poppins text-brand-950 text-base font-bold">
                      {membership.payment?.lifeMembership?.label}
                    </span>
                    <span className="bg-brand-900 rounded px-2 py-0.5 text-[10px] font-bold tracking-[0.5px] text-white uppercase">
                      {membership.payment?.lifeMembership?.badge}
                    </span>
                  </div>
                  <span className="font-poppins text-brand-950 text-xl font-extrabold tracking-tight">
                    {membership.payment?.lifeMembership?.price}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-[#e5ede7] bg-[#fbfdfb] p-4">
                  <span className="font-poppins text-sm font-semibold text-stone-700">
                    {membership.payment?.replacementCard?.label}
                  </span>
                  <span className="font-poppins text-sm font-bold text-stone-900">
                    {membership.payment?.replacementCard?.price}
                  </span>
                </div>
              </div>

              <div className="mt-6 border-t border-stone-100 pt-6">
                <Button
                  href={siteConfig.ctaUrls.becomeAMember}
                  variant="dark"
                  className="w-full px-4 sm:px-7"
                >
                  {membership.ctaLabel} <span aria-hidden="true">→</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
