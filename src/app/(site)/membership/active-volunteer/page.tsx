import Image from 'next/image'

import Enter from '@/components/motion/Enter'
import EnterStagger from '@/components/motion/EnterStagger'
import Reveal from '@/components/motion/Reveal'
import Arrow from '@/components/ui/Arrow'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import { getSiteSettings } from '@/sanity/lib/content'

// Hardcoded per plans/plan.md ("Not in the editable doc: 4.2 Active
// Volunteer") — this page has no CMS-driven content, except the "Join Us
// Now" CTA URL, which comes from the `siteSettings` singleton (shared with
// the Events page's "Join Now" button) so it's editable in the Studio.

const volunteerRoles = [
  {
    label: 'Event Planning',
    icon: '/images/volunteer/roles/event-planning.png',
  },
  {
    label: 'Social Media & Communications',
    icon: '/images/volunteer/roles/social-media.png',
  },
  {
    label: 'Fundraising',
    icon: '/images/volunteer/roles/fundraising.png',
  },
  {
    label: 'Outreach & Alumni Engagement',
    icon: '/images/volunteer/roles/outreach-alumni.png',
  },
  {
    label: 'Securing Sponsors',
    icon: '/images/volunteer/roles/securing-sponsors.png',
  },
  {
    label: 'Blogging/Vlogging',
    icon: '/images/volunteer/roles/blogging-vlogging.png',
  },
]

const volunteerEvents = [
  {
    label: 'Fairs',
    image: '/images/volunteer/events/fairs.jpg',
    alt: 'Welcome arch at the Ilma Pre-Ramadan Fair',
  },
  {
    label: 'Annual Reunions',
    image: '/images/volunteer/events/annual-reunions.jpg',
    alt: 'Festive table setting at an IIOGA annual reunion',
  },
  {
    label: 'Career Guidance',
    image: '/images/volunteer/events/career-guidance.jpg',
    alt: 'Career Guidance Fair 2022 attendee badge',
  },
  {
    label: 'Netball Tournament',
    image: '/images/volunteer/events/netball-tournament.jpg',
    alt: 'Netball hoop against a blue sky',
  },
  {
    label: 'Badminton Tournament',
    image: '/images/volunteer/events/badminton-tournament.jpg',
    alt: 'Badminton racket and shuttlecock',
  },
  {
    label: 'Sports Carnival',
    image: '/images/volunteer/events/sports-carnival.jpg',
    alt: 'Sports Carnival event poster',
  },
  {
    label: 'Health Camps',
    image: '/images/volunteer/events/health-camps.jpg',
    alt: 'Medical kit used at an IIOGA health camp',
  },
  {
    label: 'Community Service',
    image: '/images/volunteer/events/community-service.jpg',
    alt: 'Donation collection box for community service drives',
  },
]

export default async function ActiveVolunteerPage() {
  const { activeVolunteerUrl } = await getSiteSettings()

  return (
    <>
      {/* Hero */}
      <section className="bg-cream pt-32 pb-16 sm:pt-42">
        <Container className="max-w-3xl">
          <div className="flex flex-col items-center gap-6 text-center">
            <Enter
              as="h1"
              className="font-poppins text-brand-950 text-5xl font-extrabold tracking-tight sm:text-6xl"
            >
              Be an Active Volunteer
            </Enter>
            <Enter delay={0.07}>
              <Button href={activeVolunteerUrl} variant="dark">
                Join Us Now <Arrow />
              </Button>
            </Enter>
          </div>

          <EnterStagger
            delay={0.14}
            className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {volunteerRoles.map((role) => (
              <div
                key={role.label}
                className="flex min-h-28 items-center gap-3.5 rounded-2xl border border-[rgba(6,78,59,0.1)] bg-[#c5d7cc]/60 px-5 py-4"
              >
                <Image
                  src={role.icon}
                  alt=""
                  width={44}
                  height={44}
                  className="size-11 shrink-0"
                />
                <span className="font-poppins text-brand-950 text-sm font-semibold">
                  {role.label}
                </span>
              </div>
            ))}
          </EnterStagger>
        </Container>
      </section>

      {/* Volunteer-driven events */}
      <section className="bg-cream pb-24">
        <Container className="max-w-6xl">
          <div className="rounded-[40px] border border-[rgba(6,78,59,0.1)] bg-[#edf4f0]/80 px-6 py-10 shadow-sm sm:px-12 sm:py-12">
            <div className="flex items-end justify-between gap-4">
              <Reveal
                as="h2"
                className="font-poppins text-brand-950 text-3xl font-extrabold tracking-tight sm:text-[42px]"
              >
                Events
              </Reveal>
            </div>

            {/* Revealed as one strip: per-item reveals would fade circles
                in mid-swipe. */}
            <Reveal
              as="div"
              className="mt-8 grid grid-cols-2 gap-7 sm:grid-cols-4"
            >
              {volunteerEvents.map((event) => (
                <div
                  key={event.label}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="border-brand-800/10 size-35 rounded-full border bg-linear-to-br from-white to-emerald-100 p-1.5 shadow-[0_10px_25px_-5px_rgba(20,56,38,0.12)]">
                    <Image
                      src={event.image}
                      alt={event.alt}
                      width={140}
                      height={140}
                      className="size-full rounded-full object-cover"
                    />
                  </div>
                  <span className="font-poppins text-brand-950 max-w-35 text-center text-sm font-bold">
                    {event.label}
                  </span>
                </div>
              ))}
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  )
}
