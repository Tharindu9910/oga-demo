import Link from 'next/link'

import RevealStagger from '@/components/motion/RevealStagger'
import Arrow from '@/components/ui/Arrow'
import Button from '@/components/ui/Button'
import SanityImage from '@/components/ui/SanityImage'
import SectionHeading from '@/components/ui/SectionHeading'
import type { Event } from '@/sanity/lib/content'

function formatEventDate(date: string) {
  const d = new Date(date)
  return {
    month: d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    day: d.getDate(),
  }
}

export default function PastEventsSection({ events }: { events: Event[] }) {
  return (
    <section className="bg-cream px-6 py-14 lg:px-16">
      <div className="mx-auto max-w-6xl rounded-[32px] border border-[#e2ece5] bg-[#f4f8f5] p-5 sm:p-8 lg:p-12">
        <div className="flex items-center justify-center gap-4 sm:items-end sm:justify-between">
          <SectionHeading>Past Event Highlights</SectionHeading>
          <Button
            href="/events"
            variant="brand"
            className="hidden px-5 py-2.5 text-xs sm:inline-flex"
          >
            See more <Arrow />
          </Button>
        </div>

        {events.length === 0 ? (
          <p className="font-plus-jakarta-sans mt-10 text-sm text-stone-500">
            No past events to show yet.
          </p>
        ) : (
          <RevealStagger className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {events.map((event) => {
              const { month, day } = formatEventDate(event.date)
              const image = event.images?.[0]
              return (
                <article
                  key={event._id}
                  className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white"
                >
                  {image && (
                    <SanityImage
                      image={image}
                      width={800}
                      height={556}
                      className="aspect-[16/10] w-full object-cover"
                    />
                  )}
                  <div className="flex gap-5 p-6">
                    <div className="flex flex-col items-center border-r border-stone-200 pr-5">
                      <span className="font-poppins text-brand-400 text-xs font-bold tracking-[0.6px] uppercase">
                        {month}
                      </span>
                      <span className="font-poppins text-2xl font-extrabold text-stone-900">
                        {day}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-poppins truncate text-lg font-bold text-stone-900">
                        {event.title}
                      </h3>
                      <Link
                        href="/events"
                        className="group font-poppins text-brand-600 mt-1 inline-flex items-center gap-1 text-xs font-semibold"
                      >
                        Check out Event Highlights <Arrow />
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </RevealStagger>
        )}

        <div className="mt-8 flex justify-center sm:hidden">
          <Button href="/events" variant="brand" className="px-5 py-2.5 text-xs">
            See more <Arrow />
          </Button>
        </div>
      </div>
    </section>
  )
}
