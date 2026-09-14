import { CalendarDays, ClipboardList, Users, type LucideIcon } from 'lucide-react'
import Image from 'next/image'

import PastEventsSection from '@/components/home/PastEventsSection'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import {
  getHomePage,
  getOngoingProjects,
  getPastEvents,
  getUpcomingEvents,
} from '@/content/queries'

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
        <Image
          src={home.hero.image.src}
          alt={home.hero.image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="from-brand-950 via-brand-950/60 absolute inset-0 bg-linear-to-tr to-transparent" />
        <div className="from-brand-950/70 absolute inset-0 bg-linear-to-t to-transparent" />
        <Container className="relative max-w-6xl">
          <div className="flex max-w-2xl flex-col items-start gap-6">
            <span className="font-plus-jakarta-sans rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-[0.6px] text-white uppercase backdrop-blur-[5px]">
              {home.hero.eyebrow}
            </span>
            <h1 className="font-poppins text-5xl leading-tight font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              {home.hero.headline}
            </h1>
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Button href={home.hero.ctaUrl} variant="light">
                {home.hero.ctaLabel}
              </Button>
              <Button href={home.hero.secondaryCtaUrl} variant="glass">
                {home.hero.secondaryCtaLabel}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* About summary */}
      <section className="bg-white py-20">
        <Container className="grid max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-poppins text-brand-800 text-3xl font-bold tracking-tight uppercase sm:text-4xl">
              {home.aboutSummary.heading}
            </h2>
            <div className="font-inter mt-6 flex flex-col gap-4 text-base text-stone-500">
              {home.aboutSummary.paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            <Button
              href={home.aboutSummary.ctaUrl}
              variant="brand"
              className="mt-8"
            >
              {home.aboutSummary.ctaLabel} <span aria-hidden="true">→</span>
            </Button>
          </div>
          <div className="lg:col-span-5">
            <Image
              src={home.aboutSummary.image.src}
              alt={home.aboutSummary.image.alt}
              width={800}
              height={800}
              className="aspect-square w-full rounded-[20px] object-cover"
            />
          </div>
        </Container>
      </section>

      {/* Ongoing Projects */}
      <section className="bg-white px-6 py-14 lg:px-24">
        <div className="mx-auto max-w-6xl rounded-[32px] border border-[#e2ece5] bg-[#f4f8f5] p-8 sm:p-12">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading>Ongoing Projects</SectionHeading>
            <Button
              href="/projects"
              variant="brand"
              className="px-5 py-2.5 text-xs"
            >
              See more <span aria-hidden="true">→</span>
            </Button>
          </div>

          {ongoingProjects.length === 0 ? (
            <p className="font-plus-jakarta-sans mt-10 text-sm text-stone-500">
              No ongoing projects right now — check back soon.
            </p>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {ongoingProjects.map((project) => (
                <article
                  key={project._id}
                  className="flex flex-col justify-between rounded-2xl border border-stone-100 bg-white p-5"
                >
                  <div className="flex flex-col gap-4">
                    <div className="overflow-hidden rounded-xl bg-stone-100">
                      <Image
                        src={project.image.src}
                        alt={project.image.alt}
                        width={400}
                        height={260}
                        className="aspect-[4/3] w-full object-cover"
                      />
                    </div>
                    <h3 className="font-poppins text-lg font-bold text-stone-900">
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
            </div>
          )}
        </div>
      </section>

      {/* Tracking Progress and Milestones */}
      <section className="bg-white px-6 py-14 lg:px-24">
        <div className="bg-brand-700 mx-auto max-w-6xl rounded-3xl p-8 shadow-xl sm:p-12">
          <SectionHeading align="center" tone="light">
            Tracking Progress and Milestones
          </SectionHeading>
          <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-6">
            {home.milestones.map((milestone) => {
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
                      {milestone.value}
                    </span>
                    <span className="font-plus-jakarta-sans text-xs font-medium text-emerald-100/80 sm:text-sm">
                      {milestone.label}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="bg-white px-6 py-14 lg:px-48">
        <div className="mx-auto flex max-w-3xl flex-col items-center">
          <SectionHeading align="center">Upcoming Events</SectionHeading>
          <div className="mt-8 flex w-full flex-col gap-4">
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
                    className="flex items-center gap-4 rounded-2xl border border-stone-200/80 bg-white p-6"
                  >
                    <div className="flex size-20 shrink-0 flex-col items-center justify-center rounded-xl border border-[#dbeee3] bg-[#f2f8f5]">
                      <span className="font-poppins text-brand-400 text-xs font-bold tracking-[0.6px] uppercase">
                        {month} {day}
                      </span>
                      <span className="font-poppins text-brand-900 text-2xl font-bold">
                        {year}
                      </span>
                    </div>
                    <h3 className="font-poppins text-xl font-bold text-stone-900">
                      {event.title}
                    </h3>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </section>

      {/* Past Event Highlights */}
      <PastEventsSection events={pastEvents} />
    </>
  )
}
