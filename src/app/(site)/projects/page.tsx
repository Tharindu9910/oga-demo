import Image from 'next/image'
import Link from 'next/link'

import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import { siteConfig } from '@/config/site'
import {
  getCompletedProjects,
  getOngoingProjects,
  getProjectsPage,
} from '@/content/queries'

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
  const [projectsPage, ongoingProjects, completedProjects] =
    await Promise.all([
      getProjectsPage(),
      getOngoingProjects(),
      getCompletedProjects(),
    ])
  const { dehiwala } = projectsPage

  return (
    <>
      {dehiwala.show && (
        <section className="from-brand-50/80 bg-linear-to-b via-white to-white px-6 pt-32 pb-16 sm:pt-42 lg:px-16">
          <Container className="max-w-6xl">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              <div className="flex flex-col items-start gap-6 lg:col-span-6">
                <h1 className="font-poppins text-5xl leading-tight font-bold tracking-tight text-stone-900 sm:text-6xl">
                  {dehiwala.title.split(' ').slice(0, -1).join(' ')}{' '}
                  <span className="text-brand-800">
                    {dehiwala.title.split(' ').slice(-1)}
                  </span>
                </h1>
                <div className="font-plus-jakarta-sans flex flex-col gap-4 text-lg text-stone-600">
                  {dehiwala.body.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
                <Link
                  href={dehiwala.highlightsUrl}
                  className="border-brand-800/30 text-brand-800 font-poppins inline-flex items-center gap-2 border-b-2 pb-1.5 text-sm font-bold"
                >
                  {dehiwala.highlightsLabel} <span aria-hidden="true">→</span>
                </Link>
              </div>
              <div className="lg:col-span-6">
                <Image
                  src={dehiwala.image.src}
                  alt={dehiwala.image.alt}
                  width={900}
                  height={870}
                  priority
                  className="w-full rounded-3xl border border-stone-100 object-cover shadow-xl"
                />
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Ongoing Projects */}
      <section className="bg-white px-6 py-14 lg:px-24">
        <div className="mx-auto max-w-6xl rounded-4xl border border-[#e2ece5] bg-[#f4f8f5] p-8 sm:p-12">
          <SectionHeading>Ongoing Projects</SectionHeading>

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
                        className="aspect-4/3 w-full object-cover"
                      />
                    </div>
                    <h3 className="font-poppins text-lg font-bold text-stone-900">
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
            </div>
          )}
        </div>
      </section>

      {/* Completed Projects */}
      <section className="bg-white px-6 py-14 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading>Completed Projects</SectionHeading>

          {completedProjects.length === 0 ? (
            <p className="font-plus-jakarta-sans mt-10 text-sm text-stone-500">
              No completed projects to show yet.
            </p>
          ) : (
            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
              {completedProjects.map((project) => (
                <article
                  key={project._id}
                  className="flex flex-col justify-between rounded-2xl border border-stone-200/80 bg-white p-4"
                >
                  <div className="overflow-hidden rounded-xl bg-stone-100">
                    <Image
                      src={project.image.src}
                      alt={project.image.alt}
                      width={260}
                      height={200}
                      className="aspect-4/3 w-full object-cover"
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-2 border-t border-stone-100 pt-2.5">
                    <h3 className="font-poppins text-sm font-bold text-stone-900">
                      {project.title}
                    </h3>
                    <span className="font-poppins text-brand-800 shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold whitespace-nowrap">
                      ✓ Completed
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Donations & Relief Drives */}
      <section className="border-t border-stone-100 bg-white px-6 py-16 lg:px-16">
        <Container className="max-w-4xl">
          <SectionHeading align="center">Donations</SectionHeading>
          <div className="mt-12 flex flex-col gap-8">
            {donationStories.map((story, i) => (
              <article
                key={story.title}
                className="bg-brand-950 overflow-hidden rounded-3xl border border-white/10 shadow-xl"
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
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Make a Difference donation widget */}
      <section className="bg-brand-950 px-6 py-20 lg:px-16">
        <Container className="max-w-4xl">
          <SectionHeading align="center" tone="light">
            Make a Difference
          </SectionHeading>
          <p className="font-plus-jakarta-sans mx-auto mt-4 max-w-md text-center text-sm text-emerald-100/80">
            100% of the donations made below will be used directly for the
            development of the school.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {donationTiers.map((tier) => (
              <div
                key={tier.label}
                className={`flex flex-col items-center justify-between gap-6 rounded-3xl bg-white p-8 ${
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
          </div>
        </Container>
      </section>
    </>
  )
}
