import Image from 'next/image'

import Enter from '@/components/motion/Enter'
import Reveal from '@/components/motion/Reveal'
import RevealStagger from '@/components/motion/RevealStagger'
import Container from '@/components/ui/Container'
import PortableTextBody from '@/components/ui/PortableTextBody'
import SectionHeading from '@/components/ui/SectionHeading'
import { getAboutPage } from '@/sanity/lib/content'

// Hardcoded per Docs/editable_content.md (About Us Page lists only "Message
// from the President" and "Team" as editable) — these sections have no
// Sanity field.
const hero = {
  badges: ['Established 1998', 'Colombo, Sri Lanka', '28+ Years'],
  paragraphs: [
    'The Ilma International Old Girls' +
      " Association (IIOGA), established in 1998, is a not-for-profit organization dedicated to bringing together the alumni of Ilma International Girls' School for a collective cause – uplifting, enhancing, and developing their alma mater.",
    "At IIOGA, we are committed to fostering lifelong connections among our esteemed alumnae, celebrating their achievements, and supporting their endeavors. The association provides a vibrant platform for networking, engages in fundraising activities that support the school's development goals, and offers mentorship and collaboration opportunities that empower our members to thrive both personally and professionally.",
    "Beyond strengthening the bond between past pupils, IIOGA nurtures a spirit of unity, service, and loyalty among its members. Through community service, collaborative events, and alumni-driven initiatives, we strive to enrich both the school and the wider community. Serving as a hub for professional growth and lifelong friendships, IIOGA ensures that the proud legacy of Ilma International Girls' School continues to flourish for generations to come.",
  ],
}

const video = {
  src: '/videos/about.mp4',
  poster: {
    src: '/images/about/about-video-poster.jpg',
    alt: "Scintillating Silver — IIOGA's 25th Anniversary, Spectrum of Service since 1998",
  },
}

const vision = {
  icon: { src: '/images/about/vision-icon.png', alt: 'Vision icon' },
  body: 'To guide, support, empower and foster a sense of friendship, good will and culture among old girls and to create unbreakable bonds with one another and our Alma Mater.',
}

const mission = {
  icon: { src: '/images/about/mission-icon.png', alt: 'Mission icon' },
  body: 'Organize events and activities for the benefit of the school whilst making recommendations to the betterment of the school.',
}

const founderTribute = {
  name: 'Mrs. Liyanagae, Founder of the IIOGA',
  photo: {
    src: '/images/about/mrs-liyanage-founder.jpg',
    alt: 'Mrs. Liyanagae, founder of the IIOGA',
  },
  paragraphs: [
    'With heartfelt reverence, we remember Mrs. Liyanagae, the visionary founder of the IIOGA. Her dedication, compassion, and unwavering commitment laid the foundation for a community that continues to unite and empower women beyond the walls of Ilma International Girls' +
      ' School.',
    'Though she has passed on, her legacy endures in every event we hold and in the bonds we nurture. Her inspiring leadership and genuine care have left an indelible mark on all of us.',
  ],
  quote:
    'We honor her memory by striving to uphold the values she cherished and by carrying forward her vision with the same passion and grace.',
}

type TeamMember = { name: string; role: string }

function groupByRole(members: TeamMember[]) {
  const order: string[] = []
  const byRole = new Map<string, TeamMember[]>()
  for (const member of members) {
    if (!byRole.has(member.role)) {
      order.push(member.role)
      byRole.set(member.role, [])
    }
    byRole.get(member.role)!.push(member)
  }
  return order.map((role) => ({ role, members: byRole.get(role)! }))
}

export default async function AboutPage() {
  const about = await getAboutPage()

  const patronGroups = groupByRole(about.team?.patrons ?? [])
  const committeeGroups = groupByRole(about.team?.committee ?? [])
  const committeeLeaders = committeeGroups.filter(
    (group) => group.members.length === 1,
  )
  const committeeGroupedRoles = committeeGroups.filter(
    (group) => group.members.length > 1,
  )

  return (
    <>
      {/* Hero */}
      <section className="bg-cream pt-32 pb-16 sm:pt-42">
        <Container className="max-w-4xl">
          <div className="flex flex-col items-center gap-5 text-center">
            <Enter
              as="h1"
              className="font-poppins text-5xl font-extrabold tracking-tight text-stone-950 sm:text-6xl"
            >
              About Us
            </Enter>
            <Enter
              delay={0.07}
              className="flex flex-wrap items-center justify-center gap-2"
            >
              {hero.badges.map((badge, i) => (
                <span
                  key={badge}
                  className={`font-plus-jakarta-sans rounded-full border border-[#d9e6df] bg-white px-4 py-1.5 text-xs font-semibold ${
                    i === hero.badges.length - 1
                      ? 'text-brand-800'
                      : 'text-stone-700'
                  }`}
                >
                  {badge}
                </span>
              ))}
            </Enter>
            <Enter
              delay={0.14}
              className="mx-2 sm:mx-0 font-plus-jakarta-sans mt-4 flex flex-col gap-5 text-lg text-stone-600"
            >
              {hero.paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </Enter>
          </div>
        </Container>
      </section>

      {/* Our Story video */}
      <section className="bg-cream pb-16">
        <Container className="max-w-4xl">
          <Reveal className="mt-10 overflow-hidden rounded-3xl border border-stone-100 shadow-xl">
            <video
              controls
              playsInline
              preload="none"
              poster={video.poster.src}
              className="w-full"
            >
              <source src={video.src} type="video/mp4" />
            </video>
          </Reveal>
        </Container>
      </section>

      {/* Vision & Mission */}
      <section className="bg-cream pb-16">
        <Container className="max-w-5xl">
          <RevealStagger className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[vision, mission].map((card, i) => (
              <div
                key={i}
                className="border-brand-950 flex h-full flex-col items-center gap-5 rounded-[32px] border bg-gradient-to-br from-[#1a3f30] via-[#0f2d21] to-[#091f16] p-10 text-center shadow-xl"
              >
                <div className="flex size-25 items-center justify-center rounded-full bg-white/10 p-5">
                  <Image
                    src={card.icon.src}
                    alt={card.icon.alt}
                    width={60}
                    height={60}
                    className="size-full object-contain"
                  />
                </div>
                <h2 className="font-poppins text-3xl font-bold tracking-wide text-white">
                  {i === 0 ? 'Vision' : 'Mission'}
                </h2>
                <p className="font-plus-jakarta-sans max-w-sm text-emerald-100/90">
                  {card.body}
                </p>
              </div>
            ))}
          </RevealStagger>
        </Container>
      </section>

      {/* Message from the President */}
      <section className="bg-cream py-16">
        <Container className="max-w-3xl">
          <SectionHeading align="center">
            Message from the President
          </SectionHeading>
          <Reveal className="border-brand-700 relative mt-10 overflow-hidden rounded-[32px] border border-[#d9e6df] bg-white p-10 shadow-lg">
            {/* <div className="bg-brand-700 absolute inset-y-0 left-0 w-2" /> */}
            <div className="flex flex-col gap-4 pl-2">
              <PortableTextBody value={about.president.message} />
              <div className="mt-2 border-t border-stone-100 pt-6">
                <p className="font-plus-jakarta-sans text-xs font-bold tracking-[1.2px] text-stone-400 uppercase">
                  Warm regards,
                </p>
                <p className="font-poppins mt-1 text-2xl font-bold text-stone-950">
                  {about.president.name}
                </p>
                <p className="font-poppins text-sm text-stone-500">
                  {about.president.role}
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Our Team */}
      <section className="bg-cream pb-16">
        <Container className="max-w-5xl">
          <div className="rounded-[36px] border border-[#d9e6df] bg-[#eef5f1] p-5 sm:p-8 lg:p-12">
            <div className="flex flex-col items-center gap-3">
              <SectionHeading align="center">Our Team</SectionHeading>
              <span className="bg-brand-700 rounded-full px-3.5 py-1 font-mono text-xs font-bold tracking-[0.6px] text-white">
                {about.team?.year}
              </span>
            </div>
            <RevealStagger className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-7 shadow-sm">
                <h3 className="font-poppins border-b border-stone-100 pb-4 text-2xl text-stone-950">
                  Patrons
                </h3>
                <div className="mt-6 flex flex-col gap-6">
                  {patronGroups.map(({ role, members }) => (
                    <div key={role}>
                      <h4 className="font-poppins text-xs font-bold tracking-[0.5px] text-stone-500 uppercase">
                        {members.length > 1 ? `${role}s` : role}
                      </h4>
                      <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-stone-400">
                        {members.map((member) => (
                          <li
                            key={member.name}
                            className="font-plus-jakarta-sans text-stone-600"
                          >
                            {member.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-7 shadow-sm">
                <h3 className="font-poppins border-b border-stone-100 pb-4 text-2xl text-stone-950">
                  OGA Committee
                </h3>
                <div className="mt-6 flex flex-col gap-3">
                  {committeeLeaders.map(({ role, members }) => (
                    <p
                      key={role}
                      className="font-plus-jakarta-sans text-stone-600"
                    >
                      <span className="font-poppins text-xs font-bold tracking-[0.5px] text-stone-500 uppercase">
                        {role}
                      </span>{' '}
                      - {members[0].name}
                    </p>
                  ))}
                </div>
                {committeeGroupedRoles.map(({ role, members }) => (
                  <div key={role} className="mt-6">
                    <h4 className="font-poppins text-xs font-bold tracking-[0.5px] text-stone-500 uppercase">
                      {role}s
                    </h4>
                    <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-stone-400">
                      {members.map((member) => (
                        <li
                          key={member.name}
                          className="font-plus-jakarta-sans text-stone-600"
                        >
                          {member.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </RevealStagger>
          </div>
        </Container>
      </section>

      {/* Tribute to the founder */}
      <section className="bg-cream py-16">
        <Container className="max-w-5xl">
          <Reveal className="bg-brand-700 flex flex-col items-center gap-8 rounded-[36px] border border-[#022c22] p-8 shadow-2xl sm:flex-row sm:items-start sm:p-14">
            <Image
              src={founderTribute.photo.src}
              alt={founderTribute.photo.alt}
              width={246}
              height={290}
              className="w-48 shrink-0 rounded-2xl border border-amber-200/40 object-cover shadow-xl grayscale sm:w-62"
            />
            <div className="flex flex-col gap-4 text-center sm:text-left">
              <h2 className="font-poppins text-3xl leading-tight font-bold text-white">
                A Tribute to {founderTribute.name}
              </h2>
              <div className="font-plus-jakarta-sans flex flex-col gap-3 text-emerald-50/90">
                {founderTribute.paragraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
              <blockquote className="mt-2 rounded-2xl bg-white/5 p-5 text-sm font-medium text-white italic backdrop-blur-[2px]">
                {founderTribute.quote}
              </blockquote>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
