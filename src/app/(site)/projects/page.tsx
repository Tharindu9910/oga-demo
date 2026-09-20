import Image from 'next/image'
import Link from 'next/link'

import Enter from '@/components/motion/Enter'
import Reveal from '@/components/motion/Reveal'
import RevealStagger from '@/components/motion/RevealStagger'
import Arrow from '@/components/ui/Arrow'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import PortableTextBody from '@/components/ui/PortableTextBody'
import SanityImage from '@/components/ui/SanityImage'
import SectionHeading from '@/components/ui/SectionHeading'
import { siteConfig } from '@/config/site'
import {
  getCompletedProjects,
  getOngoingProjects,
  getProjectsPage,
} from '@/sanity/lib/content'

const donationStories = [
  {
    title: 'Cancer Hospital',
    image: {
      src: '/images/projects/donation-cancer-hospital.jpg',
      alt: 'Dr. Jaliya Jayasekara receiving a vial donation from the IIOGA team at Apeksha Hospital',
    },
    paragraphs: [
      'The IIOGA are humbled to share that Rs 500,000, a portion of the proceeds from our Annual Pre-Ramadan Fair held on the 15th of February 2025, has been donated to the Paediatric Oncology Ward 14C at Apeksha Hospital, Maharagama, led by Dr. Jaliya Jayasekara.',
      'This donation of essential vials will support the treatment of children diagnosed with sarcoma, a serious but treatable group of cancers that accounts for a significant number of solid tumors in paediatric oncology. We were also honored by the presence of Dr. Aruna Jayasekara, Director of Apeksha Hospital, during the handover.',
      'Our heartfelt thanks to everyone who supported the fair and helped make this meaningful contribution possible. Together, we can do so much!',
    ],
  },
  {
    title: 'Palestine Fund Raise',
    image: {
      src: '/images/projects/donation-palestine-fair.jpg',
      alt: 'IIOGA Youth Wing fundraising stall at the Palestine fair',
    },
    paragraphs: [
      'The IIOGA Youth Wing proudly raised a total of LKR 370,780 in support of the Palestinian cause.',
      'These funds were donated towards establishing a water pipeline in Khan Younis, Gaza, a project that will help provide clean water access to over 150,000 people.',
    ],
  },
]

const donationTiers = [
  { label: 'LKR 1,000', variant: 'dark' as const },
  { label: 'LKR 5,000', variant: 'brand' as const, highlighted: true },
  { label: 'Custom Amount', variant: 'dark' as const },
]

export default async function ProjectsPage() {
  const [projectsPage, ongoingProjects, completedProjects] = await Promise.all([
    getProjectsPage(),
    getOngoingProjects(),
    getCompletedProjects(),
  ])
  const { dehiwala, droneVideo } = projectsPage

  return (
    <>
      {dehiwala.show && (
        <section className="from-brand-50/80 bg-linear-to-b bg-cream pt-32 pb-16 sm:pt-42">
          <Container className="max-w-6xl">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              <Enter className="flex flex-col items-start gap-6 mx-2 sm:mx-0 lg:col-span-6">
                <h1 className="font-poppins text-5xl leading-tight font-bold tracking-tight text-stone-900 sm:text-6xl">
                  {dehiwala.title.split(' ').slice(0, -1).join(' ')}{' '}
                  <span className="text-brand-800">
                    {dehiwala.title.split(' ').slice(-1)}
                  </span>
                </h1>
                <PortableTextBody
                  value={dehiwala.body}
                  className="font-plus-jakarta-sans text-lg text-stone-600"
                />
                <p className="group border-brand-800/30 text-brand-800 font-poppins inline-flex items-center gap-2 border-b-2 pb-1.5 text-sm font-bold">
                  Ground Breaking Ceremony Highlights
                </p>
                {/* {dehiwala.highlightsUrl && (
                  <Link
                    href={dehiwala.highlightsUrl}
                    className="group border-brand-800/30 text-brand-800 font-poppins inline-flex items-center gap-2 border-b-2 pb-1.5 text-sm font-bold"
                  >
                    {dehiwala.highlightsLabel} <Arrow />
                  </Link>
                )} */}
              </Enter>
              <Enter delay={0.14} className="lg:col-span-6">
                <SanityImage
                  image={dehiwala.image}
                  width={900}
                  height={870}
                  priority
                  className="w-full rounded-3xl border border-stone-100 object-cover shadow-xl"
                />
              </Enter>
            </div>
          </Container>
        </section>
      )}

      {/* Drone Video */}
      <section className="bg-cream px-6 py-14 lg:px-24">
        <Reveal className="bg-brand-700 mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 rounded-4xl p-5 shadow-2xl sm:p-8 lg:grid-cols-12 lg:gap-12 lg:p-20">
          <div className="lg:col-span-7">
            {droneVideo?.url ? (
              <video
                controls
                playsInline
                preload="metadata"
                aria-label="Ilma International Girls' School drone video"
                className="aspect-video w-full rounded-2xl border border-white/10 bg-black object-cover shadow-xl"
              >
                <source src={droneVideo.url} type={droneVideo.mimeType} />
              </video>
            ) : (
              <div className="bg-brand-400/70 flex aspect-video w-full flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 shadow-xl">
                <span
                  aria-hidden="true"
                  className="flex size-20 items-center justify-center rounded-full border border-white/20 bg-white/15 shadow-lg sm:size-24"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="ml-1 size-6 fill-white sm:size-7"
                  >
                    <path d="M8 5.5v13a.5.5 0 0 0 .76.43l10.5-6.5a.5.5 0 0 0 0-.86L8.76 5.07A.5.5 0 0 0 8 5.5Z" />
                  </svg>
                </span>
              </div>
            )}
          </div>
          <h2 className="font-poppins text-3xl leading-tight font-bold tracking-tight text-white sm:text-4xl lg:col-span-5">
            Ilma International Girls&rsquo; School{' '}
            <span className="font-normal text-emerald-200 italic">
              Drone Video
            </span>
          </h2>
        </Reveal>
      </section>

      {/* Ongoing Projects */}
      <section className="bg-cream px-6 py-14 lg:px-24">
        <div className="mx-auto max-w-6xl rounded-4xl border border-[#e2ece5] bg-brand-700 p-5 sm:p-8 lg:p-12">
          <SectionHeading tone='light' className="text-center sm:text-left">
            Ongoing Projects
          </SectionHeading>

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
                        className="aspect-4/3 w-full object-cover"
                      />
                    </div>
                    <h3 className="font-poppins truncate text-lg font-bold text-stone-900">
                      {project.title}
                    </h3>
                  </div>
                  {typeof project.progress === 'number' && (
                    <div className="mt-4 border-t border-stone-100 pt-3.5">
                      <div className="bg-brand-50 h-2 overflow-hidden rounded-full">
                        <div
                          className="bg-brand-600 h-full rounded-full"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="font-poppins text-brand-600 mt-3 inline-block rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold">
                        {project.progress}% Completed
                      </span>
                    </div>
                  )}
                </article>
              ))}
            </RevealStagger>
          )}
        </div>
      </section>

      {/* Completed Projects */}
      <section className="bg-cream px-6 py-14 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading>Completed Projects</SectionHeading>

          {completedProjects.length === 0 ? (
            <p className="font-plus-jakarta-sans mt-10 text-sm text-stone-500">
              No completed projects to show yet.
            </p>
          ) : (
            <RevealStagger className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5">
              {completedProjects.map((project) => (
                <article
                  key={project._id}
                  className="flex min-w-0 flex-col rounded-2xl border border-stone-200/80 bg-white p-3 sm:p-4"
                >
                  <div className="overflow-hidden rounded-xl bg-stone-100">
                    <SanityImage
                      image={project.image}
                      width={260}
                      height={200}
                      className="aspect-4/3 w-full object-cover"
                    />
                  </div>
                  <div className="mt-3 flex flex-1 flex-col items-start justify-between gap-2 border-t border-stone-100 pt-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2 sm:gap-y-1.5">
                    <h3 className="font-poppins min-w-0 flex-1 truncate text-sm font-bold text-stone-900">
                      {project.title}
                    </h3>
                    <span className="font-poppins text-brand-800 shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold whitespace-nowrap">
                      ✓ Completed
                    </span>
                  </div>
                </article>
              ))}
            </RevealStagger>
          )}
        </div>
      </section>

      {/* Donations & Relief Drives */}
      <section className="border-t border-stone-100 bg-cream py-16">
        <Container className="max-w-4xl">
          <SectionHeading align="center">Donations</SectionHeading>
          <div className="mt-12 flex flex-col gap-8">
            {donationStories.map((story, i) => (
              <Reveal
                key={story.title}
                as="article"
                className="bg-brand-700 overflow-hidden rounded-3xl border border-white/10 shadow-xl"
              >
                <div
                  className={`grid grid-cols-1 items-center gap-8 p-8 sm:p-10 lg:grid-cols-2 ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}
                >
                  <Image
                    src={story.image.src}
                    alt={story.image.alt}
                    width={700}
                    height={500}
                    className="aspect-4/3 w-full rounded-2xl object-cover"
                  />
                  <div className="flex flex-col gap-3">
                    <h3 className="font-poppins text-3xl font-bold text-white">
                      {story.title}
                    </h3>
                    <div className="font-plus-jakarta-sans flex flex-col gap-3 text-sm text-emerald-50/90">
                      {story.paragraphs.map((paragraph, j) => (
                        <p key={j}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Make a Difference donation widget */}
      <section className="bg-brand-700 py-20">
        <Container className="max-w-4xl">
          <SectionHeading align="center" tone="light">
            Make a Difference
          </SectionHeading>
          <p className="font-plus-jakarta-sans mx-auto mt-4 max-w-md text-center text-sm text-emerald-100/80">
            100% of the donations made below will be used directly for the
            development of the school.
          </p>
          <RevealStagger className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {donationTiers.map((tier) => (
              <div
                key={tier.label}
                className={`flex h-full flex-col items-center justify-between gap-6 rounded-3xl bg-white p-6 sm:p-8 ${
                  tier.highlighted
                    ? 'border-brand-500 border-2 shadow-2xl sm:-translate-y-2'
                    : 'border border-stone-100 shadow-lg'
                }`}
              >
                <span className="font-poppins text-3xl font-extrabold text-stone-900">
                  {tier.label}
                </span>
                <Button
                  href={siteConfig.ctaUrls.donate}
                  variant={tier.variant}
                  className="w-full"
                >
                  Donate Now
                </Button>
              </div>
            ))}
          </RevealStagger>
        </Container>
      </section>
    </>
  )
}
