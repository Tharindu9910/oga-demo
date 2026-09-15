import Link from 'next/link'

import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import SanityImage from '@/components/ui/SanityImage'
import SectionHeading from '@/components/ui/SectionHeading'
import { siteConfig } from '@/config/site'
import { getPastEvents, getUpcomingEvents } from '@/sanity/lib/content'
import { LucideArrowRight } from 'lucide-react'

function formatEventDate(date: string) {
  const d = new Date(date)
  return {
    month: d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    day: d.getDate(),
    year: d.getFullYear(),
  }
}

export default async function EventsPage() {
  const [upcomingEvents, pastEvents] = await Promise.all([
    getUpcomingEvents(),
    getPastEvents(),
  ])

  return (
    <>
      {/* Hero */}
      <section className="bg-white px-6 pt-32 pb-8 sm:pt-42 lg:px-16">
        <Container className="max-w-3xl">
          <SectionHeading align="center">Upcoming Events</SectionHeading>
        </Container>
      </section>

      {/* Upcoming Events */}
      <section className="bg-white px-6 pb-16 lg:px-16">
        <Container className="max-w-3xl">
          {upcomingEvents.length === 0 ? (
            <p className="font-plus-jakarta-sans text-center text-sm text-stone-500">
              No upcoming events right now — check back soon.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {upcomingEvents.map((event) => {
                const { month, year } = formatEventDate(event.date)
                return (
                  <div
                    key={event._id}
                    className="flex items-center gap-6 rounded-2xl border border-emerald-950/10 bg-white p-7 shadow-[0_10px_30px_-10px_rgba(20,56,38,0.07)]"
                  >
                    <div className="flex size-20 shrink-0 flex-col items-center justify-center rounded-xl border border-emerald-950/10 bg-[#f0f6f2]">
                      <span className="font-poppins text-brand-800 text-[11px] font-bold tracking-[1.1px] uppercase">
                        {month}
                      </span>
                      <span className="font-poppins text-2xl font-bold text-stone-950">
                        {year}
                      </span>
                    </div>
                    <h3 className="font-poppins text-xl font-bold tracking-tight text-stone-900">
                      {event.title}
                    </h3>
                  </div>
                )
              })}
            </div>
          )}
        </Container>
      </section>

      {/* Past Events */}
      <section className="bg-white px-6 py-14 lg:px-16">
        <Container className="max-w-5xl">
          <SectionHeading align="center">Past Events</SectionHeading>

          {pastEvents.length === 0 ? (
            <p className="font-plus-jakarta-sans mt-10 text-center text-sm text-stone-500">
              No past events to show yet.
            </p>
          ) : (
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {pastEvents.map((event) => {
                const { month, day } = formatEventDate(event.date)
                const image = event.images?.[0]
                const link = event.links?.[0]
                return (
                  <article
                    key={event._id}
                    className="overflow-hidden rounded-3xl border border-emerald-950/10 bg-white shadow-[0_10px_30px_-10px_rgba(20,56,38,0.07)]"
                  >
                    {image && (
                      <SanityImage
                        image={image}
                        width={800}
                        height={576}
                        className="aspect-[4/3] w-full object-cover"
                      />
                    )}
                    <div className="flex gap-5 p-6">
                      <div className="flex flex-col items-center border-r border-stone-100 pr-5">
                        <span className="font-poppins text-brand-600 text-xs font-bold tracking-[0.6px] uppercase">
                          {month}
                        </span>
                        <span className="font-poppins text-2xl font-bold text-stone-900">
                          {day}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="font-poppins text-lg font-bold tracking-tight text-stone-900">
                          {event.title}
                        </h3>
                        {/* {event.description && (
                          <p className="font-plus-jakarta-sans text-sm text-stone-500">
                            {event.description}
                          </p>
                        )} */}
                        <p className="flex items-center gap-1 font-plus-jakarta-sans text-sm font-bold text-brand-600">
                          Check out Event Highlights <LucideArrowRight size={14} />
                        </p>
                        {link && (
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-poppins text-brand-600 mt-1 inline-flex items-center gap-1 text-xs font-semibold"
                          >
                            {link.label} <span aria-hidden="true">→</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </Container>
      </section>

      {/* I want to volunteer */}
      <section className="bg-brand-950 px-6 py-20 lg:px-16">
        <Container className="max-w-2xl">
          <SectionHeading align="center" tone="light">
            I want to volunteer
          </SectionHeading>
          <div className="mt-8 flex flex-col items-center gap-5 rounded-3xl border border-white/10 bg-white p-10 shadow-2xl">
            <p className="font-poppins text-center text-lg font-medium text-slate-600">
              Fill the form below to join as a volunteer
            </p>
            <Button
              href={siteConfig.ctaUrls.activeVolunteer}
              variant="dark"
              className="min-w-70"
            >
              Join Now
            </Button>
            <Link
              href="/membership/active-volunteer"
              className="font-poppins text-center text-xs text-slate-400 italic"
            >
              Check out our Volunteer Page - for more details.
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
