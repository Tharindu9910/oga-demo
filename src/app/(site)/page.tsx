import {
  CalendarDays,
  ClipboardList,
  Users,
  type LucideIcon,
} from 'lucide-react'
import Image from 'next/image'

import HeroMedia from '@/components/home/HeroMedia'
import PastEventsSection from '@/components/home/PastEventsSection'
import Enter from '@/components/motion/Enter'
import RevealStagger from '@/components/motion/RevealStagger'
import Arrow from '@/components/ui/Arrow'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import CountUp from '@/components/ui/CountUp'
import HeroHeading from '@/components/ui/HeroHeading'
import SanityImage from '@/components/ui/SanityImage'
import SectionHeading from '@/components/ui/SectionHeading'
import {
  getHomePage,
  getOngoingProjects,
  getPastEvents,
  getUpcomingEvents,
} from '@/sanity/lib/content'

// Hardcoded per Docs/editable_content.md (Home Page lists only Hero Banner,
// Ongoing Projects, Milestones, Upcoming Events and Past Event Highlights as
// editable) — this "about" summary block has no Sanity field.
const aboutSummary = {
  heading: "Ilma International Old Girls' Association",
  paragraphs: [
    "The Ilma International Old Girls' Association (IIOGA) was established in 1998, upon the School marking its 10th anniversary. The IIOGA is a not-for-profit organization, founded with the intention of bringing together the alumni of Ilma International Girls' School for a collective cause that of uplifting, enhancing and developing their alma mater.",
    'Since its inception, the IIOGA has been instrumental in engaging in activities that have promoted solidarity and fellowship amongst its members, whilst serving the best interests of the School.',
    "The IIOGA represents the essence of Ilma International Girls' School and considers itself to be an integral part of upholding the unique values and philosophies that make the School what it is.",
  ],
  image: {
    src: '/images/home/about.jpeg',
    alt: "Ilma International Girls' School",
  },
  ctaLabel: 'About Us',
  ctaUrl: '/about',
}

const milestoneIcons: Record<string, LucideIcon> = {
  Members: Users,
  Events: CalendarDays,
  Projects: ClipboardList,
}

function formatEventDate(date: string) {
  const d = new Date(date)
  return {
    month: d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    day: d.getDate(),
    year: d.getFullYear(),
  }
}

export default async function HomePage() {
  const [home, ongoingProjects, upcomingEvents, pastEvents] = await Promise.all(
    [
      getHomePage(),
      getOngoingProjects(3),
      getUpcomingEvents(3),
      getPastEvents(2),
    ],
  )

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-950 relative flex min-h-[600px] items-center overflow-hidden pt-32 pb-24 sm:min-h-180 sm:pt-42 sm:pb-38">
        <HeroMedia image={home.hero.image} />
        <div className="from-brand-950 via-brand-950/60 absolute inset-0 bg-linear-to-tr to-transparent" />
        <div className="from-brand-950/70 absolute inset-0 bg-linear-to-t to-transparent" />
        <Container className="relative max-w-6xl">
          <div className="flex max-w-2xl flex-col items-start gap-6">
            <Enter
              as="span"
              className="font-plus-jakarta-sans rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-[0.6px] text-white uppercase backdrop-blur-[5px]"
            >
              {home.hero.eyebrow}
            </Enter>
            <HeroHeading
              text={home.hero.headline}
              delay={0.07}
              className="font-poppins text-5xl leading-tight font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
            />
            <Enter delay={0.14} className="flex flex-wrap items-center gap-4 pt-3">
              <Button href={home.hero.ctaUrl} variant="light">
                {home.hero.ctaLabel}
              </Button>
              {home.hero.secondaryCtaUrl && (
                <Button href={home.hero.secondaryCtaUrl} variant="glass">
                  {home.hero.secondaryCtaLabel}
                </Button>
              )}
            </Enter>
          </div>
        </Container>
      </section>

      {/* About summary */}
      <section className="bg-white py-10">
        <Container className="grid max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-12">
          <Enter className="mx-2 sm:mx-0 lg:col-span-7">
            <h2 className="font-poppins text-brand-800 text-3xl font-bold tracking-tight uppercase sm:text-4xl">
              {aboutSummary.heading}
            </h2>
            <div className="font-inter mt-6 flex flex-col gap-4 text-base text-stone-500">
              {aboutSummary.paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            <Button href={aboutSummary.ctaUrl} variant="brand" className="mt-8">
              {aboutSummary.ctaLabel} <Arrow />
            </Button>
          </Enter>
          <Enter delay={0.15} className="lg:col-span-5">
            <Image
              src={aboutSummary.image.src}
              alt={aboutSummary.image.alt}
              width={800}
              height={800}
              className="aspect-square w-full rounded-[20px] object-cover"
            />
          </Enter>
        </Container>
      </section>

      {/* Ongoing Projects */}
      <section className="bg-white px-6 py-14 lg:px-24">
        <div className="mx-auto max-w-6xl rounded-[32px] border border-[#e2ece5] bg-brand-700 p-5 sm:p-8 lg:p-12">
          <div className="flex items-center justify-center gap-4 sm:items-end sm:justify-between">
            <SectionHeading tone="light">Ongoing Projects</SectionHeading>
            <Button
              href="/projects"
              variant="light"
              className="hidden px-5 py-2.5 text-xs sm:inline-flex"
            >
              See more <Arrow />
            </Button>
          </div>

          {ongoingProjects.length === 0 ? (
            <p className="font-plus-jakarta-sans mt-10 text-sm text-stone-500">
              No ongoing projects right now — check back soon.
            </p>
          ) : (
            <RevealStagger className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {ongoingProjects.map((project) => (
                <article
                  key={project._id}
                  className="flex flex-col justify-between rounded-2xl border border-stone-100 bg-white p-5"
                >
                  <div className="flex flex-col gap-4">
                    <div className="overflow-hidden rounded-xl bg-stone-100">
                      <SanityImage
                        image={project.image}
                        width={400}
                        height={260}
                        className="aspect-[4/3] w-full object-cover"
                      />
                    </div>
                    <h3 className="font-poppins truncate text-lg font-bold text-stone-900">
                      {project.title}
                    </h3>
                  </div>
                  {typeof project.progress === 'number' && (
                    <div className="mt-4 border-t border-stone-100 pt-3.5">
                      <span className="font-poppins text-brand-600 inline-block rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold">
                        {project.progress}% Completed
                      </span>
                    </div>
                  )}
                </article>
              ))}
            </RevealStagger>
          )}

          <div className="mt-8 flex justify-center sm:hidden">
            <Button
              href="/projects"
              variant="brand"
              className="px-5 py-2.5 text-xs"
            >
              See more <Arrow />
            </Button>
          </div>
        </div>
      </section>

      {/* Tracking Progress and Milestones */}
      <section className="bg-white px-6 py-14 lg:px-24">
        <div className="bg-brand-700 mx-auto max-w-6xl rounded-3xl p-8 shadow-xl sm:p-12">
          <SectionHeading align="center" tone="light">
            Tracking Progress and Milestones
          </SectionHeading>
          <RevealStagger className="mt-8 grid grid-cols-3 gap-3 sm:gap-6">
            {(home.milestones ?? []).map((milestone, i) => {
              const Icon = milestoneIcons[milestone.label] ?? Users
              return (
                <div
                  key={milestone.label}
                  className="flex flex-col items-center gap-3 rounded-2xl border border-white/12 bg-white/8 p-4 text-center backdrop-blur-[2px] sm:gap-5 sm:p-8"
                >
                  <div className="flex size-14 items-center justify-center rounded-full bg-white/10 sm:size-18">
                    <Icon
                      className="size-6 text-emerald-200 sm:size-8"
                      strokeWidth={1.75}
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-poppins text-2xl font-bold tracking-tight text-white sm:text-4xl">
                      {/* Starts with its card's 80ms reveal stagger. */}
                      <CountUp value={milestone.value} delay={i * 80} />
                    </span>
                    <span className="font-plus-jakarta-sans text-xs font-medium text-emerald-100/80 sm:text-sm">
                      {milestone.label}
                    </span>
                  </div>
                </div>
              )
            })}
          </RevealStagger>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="bg-white px-6 py-14 lg:px-48">
        <div className="mx-auto flex max-w-3xl flex-col items-center">
          <SectionHeading align="center">Upcoming Events</SectionHeading>
          <RevealStagger className="mt-8 flex w-full flex-col gap-4">
            {upcomingEvents.length === 0 ? (
              <p className="font-plus-jakarta-sans text-center text-sm text-stone-500">
                No upcoming events right now — check back soon.
              </p>
            ) : (
              upcomingEvents.map((event) => {
                const { month, day, year } = formatEventDate(event.date)
                return (
                  <div
                    key={event._id}
                    className="flex items-center gap-4 rounded-2xl border border-stone-200/80 bg-brand-700 p-6"
                  >
                    <div className="flex size-20 p-2 shrink-0 flex-col items-center justify-center rounded-xl border border-[#dbeee3] bg-[#f2f8f5]">
                      <span className="font-poppins text-brand-400 text-xs font-bold tracking-[0.6px] uppercase">
                        {month} {day}
                      </span>
                      <span className="font-poppins text-brand-900 text-2xl font-bold">
                        {year}
                      </span>
                    </div>
                    <h3 className="font-poppins text-xl font-bold text-white">
                      {event.title}
                    </h3> 
                    {/* <h3 className="font-poppins text-xl font-bold text-stone-900">
                      {event.title}
                    </h3> */}
                  </div>
                )
              })
            )}
          </RevealStagger>
        </div>
      </section>

      {/* Past Event Highlights */}
      <PastEventsSection events={pastEvents} />
    </>
  )
}
