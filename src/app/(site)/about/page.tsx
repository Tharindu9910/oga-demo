import Image from 'next/image'

import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import { getAboutPage } from '@/content/queries'

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

  const patronGroups = groupByRole(about.team.patrons)
  const committeeGroups = groupByRole(about.team.committee)
  const committeeLeaders = committeeGroups.filter(
    (group) => group.members.length === 1,
  )
  const committeeGroupedRoles = committeeGroups.filter(
    (group) => group.members.length > 1,
  )

  return (
    <>
      {/* Hero */}
      <section className="bg-white px-6 pt-32 pb-16 sm:pt-42 lg:px-16">
        <Container className="max-w-4xl">
          <div className="flex flex-col items-center gap-5 text-center">
            <h1 className="font-poppins text-5xl font-extrabold tracking-tight text-stone-950 sm:text-6xl">
              About Us
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {about.hero.badges.map((badge, i) => (
                <span
                  key={badge}
                  className={`font-plus-jakarta-sans rounded-full border border-[#d9e6df] bg-white px-4 py-1.5 text-xs font-semibold ${
                    i === about.hero.badges.length - 1
                      ? 'text-brand-800'
                      : 'text-stone-700'
                  }`}
                >
                  {badge}
                </span>
              ))}
            </div>
            <div className="font-plus-jakarta-sans mt-4 flex flex-col gap-5 text-lg text-stone-600">
              {about.hero.paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Container>
      </section>

       {/* Our Story video */}
      <section className="bg-white px-6 pb-16 lg:px-16">
        <Container className="max-w-4xl">
          <div className="mt-10 overflow-hidden rounded-3xl border border-stone-100 shadow-xl">
            <video
              controls
              playsInline
              preload="none"
              poster={about.video.poster.src}
              className="w-full"
            >
              <source src={about.video.src} type="video/mp4" />
            </video>
          </div>
        </Container>
      </section>

      {/* Vision & Mission */}
      <section className="bg-[#fafbf9] px-6 pb-16 lg:px-16">
        <Container className="max-w-5xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[about.vision, about.mission].map((card, i) => (
              <div
                key={i}
                className="border-brand-950 flex flex-col items-center gap-5 rounded-[32px] border bg-gradient-to-br from-[#1a3f30] via-[#0f2d21] to-[#091f16] p-10 text-center shadow-xl"
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
          </div>
        </Container>
      </section>

      {/* Message from the President */}
      <section className="bg-white px-6 py-16 lg:px-16">
        <Container className="max-w-3xl">
          <SectionHeading align="center">
            Message from the President
          </SectionHeading>
          <div className="border-brand-700 relative mt-10 overflow-hidden rounded-[32px] border border-[#d9e6df] bg-white p-10 shadow-lg">
            {/* <div className="bg-brand-700 absolute inset-y-0 left-0 w-2" /> */}
            <div className="flex flex-col gap-4 pl-2">
              {about.president.message.map((paragraph, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "font-poppins text-2xl font-bold text-stone-950"
                      : 'font-plus-jakarta-sans text-stone-600'
                  }
                >
                  {paragraph}
                </p>
              ))}
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
          </div>
        </Container>
      </section>

      {/* Our Team */}
      <section className="bg-white px-6 pb-16 lg:px-16">
        <Container className="max-w-5xl">
          <div className="rounded-[36px] border border-[#d9e6df] bg-[#eef5f1] p-8 sm:p-12">
            <div className="flex flex-col items-center gap-3">
              <SectionHeading align="center">Our Team</SectionHeading>
              <span className="bg-brand-700 rounded-full px-3.5 py-1 font-mono text-xs font-bold tracking-[0.6px] text-white">
                {about.team.year}
              </span>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
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
            </div>
          </div>
        </Container>
      </section>

      {/* Tribute to the founder */}
      <section className="bg-white px-6 py-16 lg:px-16">
        <Container className="max-w-5xl">
          <div className="bg-brand-700 flex flex-col items-center gap-8 rounded-[36px] border border-[#022c22] p-8 shadow-2xl sm:flex-row sm:items-start sm:p-14">
            <Image
              src={about.founderTribute.photo.src}
              alt={about.founderTribute.photo.alt}
              width={246}
              height={290}
              className="w-48 shrink-0 rounded-2xl border border-amber-200/40 object-cover shadow-xl grayscale sm:w-62"
            />
            <div className="flex flex-col gap-4 text-center sm:text-left">
              <h2 className="font-poppins text-3xl leading-tight font-bold text-white">
                A Tribute to {about.founderTribute.name}
              </h2>
              <div className="font-plus-jakarta-sans flex flex-col gap-3 text-emerald-50/90">
                {about.founderTribute.paragraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
              <blockquote className="mt-2 rounded-2xl bg-white/5 p-5 text-sm font-medium text-white italic backdrop-blur-[2px]">
                {about.founderTribute.quote}
              </blockquote>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
