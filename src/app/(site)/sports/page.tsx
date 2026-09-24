import Image from 'next/image'

import Enter from '@/components/motion/Enter'
import Reveal from '@/components/motion/Reveal'
import Arrow from '@/components/ui/Arrow'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'
import { getSiteSettings } from '@/sanity/lib/content'

// Hardcoded per plans/plan.md ("Sports (hardcoded content, still needs
// the design)") — this page has no CMS-driven content.

// "Join Us" buttons scroll to the WhatsApp CTA in the "OGA sporting spirit"
// section below instead of linking out directly — there's one shared
// WhatsApp community, not a per-sport group.
const sportsSections = [
  {
    title: 'Netball',
    paragraphs: [
      'Alumnae with a love for netball can join our Netball WhatsApp group for updates on practice sessions, upcoming matches, and OGA team selections.',
      'Our teams have proudly represented the OGA at local and inter-school events, and even participated in an international tournament in Dubai in the past.',
    ],
    image: '/images/sports/netball.jpg',
    alt: 'IIOGA netball team with trophies and gear bags',
  },
  {
    title: 'Badminton',
    paragraphs: [
      "Badminton at the OGA is generally conducted as doubles tournaments. We've hosted two successful tournaments so far, with great enthusiasm from players. All upcoming tournament details will be announced through our WhatsApp community and social media platforms.",
    ],
    image: '/images/sports/badminton.jpg',
    alt: 'IIOGA badminton squad lined up at the indoor stadium court',
  },
  {
    title: 'Sports Carnival',
    paragraphs: [
      "A day dedicated to fun and team spirit, the Sports Carnival features teams of 10 competing in a series of light-hearted yet competitive games. Points are awarded for each game, and the team with the highest score wins the tournament. It's a great opportunity to revive the spirit of sportsmanship while enjoying time with old friends.",
    ],
    image: '/images/sports/sports-carnival.jpg',
    alt: 'Inaugural IIOGA Sports Carnival — trophies and the opening parade',
  },
] as const

export default async function SportsPage() {
  const { whatsappUrl } = await getSiteSettings()

  return (
    <>
      <section className="bg-cream pt-32 pb-12 text-center sm:pt-42">
        <Container className="max-w-3xl">
          <Enter
            as="h1"
            className="font-poppins text-brand-900 text-4xl font-extrabold tracking-tight sm:text-5xl"
          >
            Sports
          </Enter>
          <Enter
            delay={0.07}
            className="p-2 sm:p-0 font-plus-jakarta-sans mt-5 flex flex-col gap-4 text-sm text-stone-600 sm:text-base"
          >
            <p>
              Whether you&apos;re aiming for a competitive win or just looking
              to have fun with friends, the OGA sports calendar has something
              for everyone.
            </p>
            <p>
              The Old Girls&apos; Association hosts three exciting sports events
              on a rotational basis — Netball, Badminton, and the Sports
              Carnival — giving members the chance to stay active, enjoy
              friendly competition, and reconnect with friends.
            </p>
            <p>
              All events are played in two categories, Under 30 and Over 30, so
              everyone has an opportunity to participate. Event updates,
              registration details, and try-out notices are shared via the OGA
              WhatsApp community and our social media page.
            </p>
          </Enter>
        </Container>
      </section>

      <section className="bg-cream pb-16">
        <Container className="max-w-6xl">
          <div className="flex flex-col gap-8">
            {sportsSections.map((sport, i) => (
              <div
                key={sport.title}
                className={`flex flex-col gap-6 lg:items-stretch lg:gap-6 ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
              >
                <Reveal className="overflow-hidden rounded-[28px] border-4 border-slate-900/80 shadow-2xl lg:w-2/5">
                  <Image
                    src={sport.image}
                    alt={sport.alt}
                    width={460}
                    height={480}
                    className="h-full w-full object-cover"
                  />
                </Reveal>

                <Reveal
                  delay={0.15}
                  className="bg-brand-600 flex flex-1 flex-col justify-center gap-5 rounded-[24px] px-6 py-8 sm:px-12 sm:py-12"
                >
                  <h2 className="font-poppins text-3xl font-extrabold tracking-tight text-white uppercase sm:text-[40px]">
                    {sport.title}
                  </h2>
                  <div className="flex flex-col gap-4">
                    {sport.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="font-poppins font-light text-emerald-50/90"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <div className="border-t border-white/15 pt-6">
                    <Button
                      href="#oga-sporting-spirit"
                      variant="light"
                      className="px-5 py-2.5 text-xs"
                    >
                      Join Us <Arrow />
                    </Button>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="oga-sporting-spirit" className="scroll-mt-28 bg-cream pb-24">
        <Container className="max-w-4xl">
          <Reveal
            variant="scale"
            className="flex flex-col items-center gap-2 rounded-[32px] border border-emerald-900/10 bg-[#eef4f0] px-6 py-10 text-center shadow-sm sm:px-12 sm:py-12"
          >
            <p className="font-poppins text-xl tracking-tight text-slate-600 sm:text-2xl">
              So, whether you&apos;re picking up a racket, lacing up your
              trainers, or simply cheering from the sidelines — come be part of
              the action and keep the
            </p>
            <p className="font-poppins text-brand-900 text-3xl font-extrabold tracking-tight sm:text-4xl">
              OGA sporting spirit
            </p>
            <div className="pt-6">
              <Button
                href={whatsappUrl}
                className="gap-3.5 rounded-2xl bg-[#25d366] px-7 py-4 text-white shadow-lg hover:bg-[#20bd5a]"
              >
                <WhatsAppIcon />
                <span className="flex flex-col items-start leading-tight">
                  <span className="text-[10px] font-semibold tracking-[0.5px] uppercase opacity-90">
                    Click to chat
                  </span>
                  <span className="text-base font-bold tracking-tight">
                    WhatsApp
                  </span>
                </span>
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
