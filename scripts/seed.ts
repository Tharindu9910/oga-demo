/**
 * One-time migration: pushes the mock content layer (src/content/data/*.json)
 * into the real Sanity dataset, so the site has real content the moment
 * Phase 4's real data-fetching ships instead of going blank.
 *
 * Run once with: pnpm seed
 * Safe to re-run — every document is created with `createOrReplace` keyed by
 * a stable _id, and image uploads are cached by file path within a run.
 */
import fs from 'node:fs'
import path from 'node:path'

import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../src/sanity/env'

const token = process.env.SANITY_API_WRITE_TOKEN
if (!token) {
  throw new Error(
    'SANITY_API_WRITE_TOKEN is required to run the seed script (see .env.example).',
  )
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
})

const dataDir = path.join(process.cwd(), 'src/content/data')
function readJson<T>(file: string): T {
  return JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf-8')) as T
}

const assetIdCache = new Map<string, string>()

async function uploadImage(publicSrc: string): Promise<string> {
  const cached = assetIdCache.get(publicSrc)
  if (cached) return cached

  const filePath = path.join(process.cwd(), 'public', publicSrc)
  const asset = await client.assets.upload(
    'image',
    fs.createReadStream(filePath),
    { filename: path.basename(publicSrc) },
  )
  assetIdCache.set(publicSrc, asset._id)
  return asset._id
}

async function imageWithAlt(image: { src: string; alt: string }) {
  const assetId = await uploadImage(image.src)
  return {
    _type: 'imageWithAlt' as const,
    alt: image.alt,
    asset: { _type: 'reference' as const, _ref: assetId },
  }
}

function key(): string {
  return Math.random().toString(36).slice(2, 12)
}

function toBlocks(paragraphs: string[]) {
  return paragraphs.map((text) => ({
    _type: 'block' as const,
    _key: key(),
    style: 'normal' as const,
    markDefs: [],
    children: [{ _type: 'span' as const, _key: key(), text, marks: [] }],
  }))
}

async function seedHomePage() {
  const home = readJson<{
    hero: {
      eyebrow?: string
      headline: string
      image: { src: string; alt: string }
      ctaLabel: string
      ctaUrl: string
      secondaryCtaLabel?: string
      secondaryCtaUrl?: string
    }
    milestones: { value: string; label: string }[]
  }>('homePage.json')

  await client.createOrReplace({
    _id: 'homePage',
    _type: 'homePage',
    hero: {
      eyebrow: home.hero.eyebrow,
      headline: home.hero.headline,
      image: await imageWithAlt(home.hero.image),
      ctaLabel: home.hero.ctaLabel,
      ctaUrl: home.hero.ctaUrl || undefined,
      secondaryCtaLabel: home.hero.secondaryCtaLabel,
      secondaryCtaUrl: home.hero.secondaryCtaUrl,
    },
    milestones: home.milestones.map((m) => ({
      _type: 'milestone' as const,
      _key: key(),
      value: m.value,
      label: m.label,
    })),
  })
  console.log('Seeded homePage')
}

async function seedAboutPage() {
  const about = readJson<{
    president: { name: string; role: string; message: string[] }
    team: {
      year: string
      patrons: { name: string; role: string }[]
      committee: { name: string; role: string }[]
    }
  }>('aboutPage.json')

  await client.createOrReplace({
    _id: 'aboutPage',
    _type: 'aboutPage',
    president: {
      name: about.president.name,
      role: about.president.role,
      message: toBlocks(about.president.message),
    },
    team: {
      year: about.team.year,
      patrons: about.team.patrons.map((m) => ({
        _type: 'teamMember' as const,
        _key: key(),
        ...m,
      })),
      committee: about.team.committee.map((m) => ({
        _type: 'teamMember' as const,
        _key: key(),
        ...m,
      })),
    },
  })
  console.log('Seeded aboutPage')
}

async function seedProjectsPage() {
  const projectsPage = readJson<{
    dehiwala: {
      show: boolean
      title: string
      body: string[]
      image: { src: string; alt: string }
      highlightsLabel?: string
      highlightsUrl?: string
    }
  }>('projectsPage.json')
  const { dehiwala } = projectsPage

  await client.createOrReplace({
    _id: 'projectsPage',
    _type: 'projectsPage',
    dehiwala: {
      show: dehiwala.show,
      title: dehiwala.title,
      body: toBlocks(dehiwala.body),
      image: await imageWithAlt(dehiwala.image),
      highlightsLabel: dehiwala.highlightsLabel,
      highlightsUrl: dehiwala.highlightsUrl,
    },
  })
  console.log('Seeded projectsPage')
}

async function seedMembershipPage() {
  const membership = readJson<{
    poster: { src: string; alt: string }
    documentsRequired: string[]
    payment: {
      lifeMembership: { label: string; badge: string; price: string }
      replacementCard: { label: string; price: string }
    }
    ctaLabel: string
  }>('membershipPage.json')

  await client.createOrReplace({
    _id: 'membershipPage',
    _type: 'membershipPage',
    poster: await imageWithAlt(membership.poster),
    documentsRequired: membership.documentsRequired,
    payment: membership.payment,
    ctaLabel: membership.ctaLabel,
  })
  console.log('Seeded membershipPage')
}

async function seedLoyaltyPage() {
  const loyalty = readJson<{
    merchants: { name: string; logo: { src: string; alt: string } }[]
  }>('loyaltyPage.json')

  await client.createOrReplace({
    _id: 'loyaltyPage',
    _type: 'loyaltyPage',
    merchants: await Promise.all(
      loyalty.merchants.map(async (m) => ({
        _type: 'merchant' as const,
        _key: key(),
        name: m.name,
        logo: await imageWithAlt(m.logo),
      })),
    ),
  })
  console.log('Seeded loyaltyPage')
}

async function seedProjects() {
  const projects = readJson<
    {
      _id: string
      title: string
      status: 'ongoing' | 'completed'
      progress?: number
      image: { src: string; alt: string }
      description: string
      date: string
    }[]
  >('projects.json')

  for (const project of projects) {
    await client.createOrReplace({
      _id: `project-${project._id}`,
      _type: 'project',
      title: project.title,
      status: project.status,
      image: await imageWithAlt(project.image),
      description: project.description || undefined,
      progress: project.progress,
      date: project.date,
    })
  }
  console.log(`Seeded ${projects.length} projects`)
}

async function seedEvents() {
  const events = readJson<
    {
      _id: string
      title: string
      date: string
      description: string
      images: { src: string; alt: string }[]
      links: { label: string; url: string }[]
    }[]
  >('events.json')

  for (const event of events) {
    await client.createOrReplace({
      _id: `event-${event._id}`,
      _type: 'event',
      title: event.title,
      date: new Date(event.date).toISOString(),
      description: event.description || undefined,
      images: await Promise.all(
        event.images.map(async (image) => ({
          _key: key(),
          ...(await imageWithAlt(image)),
        })),
      ),
      links: event.links.map((link) => ({
        _type: 'eventLink' as const,
        _key: key(),
        ...link,
      })),
    })
  }
  console.log(`Seeded ${events.length} events`)
}

async function seedChapters() {
  const chapters = readJson<
    {
      _id: string
      country: string
      description: string
      images: { src: string; alt: string }[]
    }[]
  >('chapters.json')

  for (const chapter of chapters) {
    await client.createOrReplace({
      _id: `chapter-${chapter._id}`,
      _type: 'chapter',
      country: chapter.country,
      description: chapter.description || undefined,
      images: await Promise.all(
        chapter.images.map(async (image) => ({
          _key: key(),
          ...(await imageWithAlt(image)),
        })),
      ),
    })
  }
  console.log(`Seeded ${chapters.length} chapters`)
}

async function seedPosts() {
  const posts = readJson<
    {
      _id: string
      title: string
      slug: string
      publishedAt: string
      excerpt: string
      coverImage: { src: string; alt: string }
      body: string[]
    }[]
  >('posts.json')

  for (const post of posts) {
    await client.createOrReplace({
      _id: `post-${post._id}`,
      _type: 'post',
      title: post.title,
      slug: { _type: 'slug' as const, current: post.slug },
      publishedAt: new Date(post.publishedAt).toISOString(),
      excerpt: post.excerpt,
      coverImage: await imageWithAlt(post.coverImage),
      body: toBlocks(post.body),
    })
  }
  console.log(`Seeded ${posts.length} posts`)
}

async function main() {
  await seedHomePage()
  await seedAboutPage()
  await seedProjectsPage()
  await seedMembershipPage()
  await seedLoyaltyPage()
  await seedProjects()
  await seedEvents()
  await seedChapters()
  await seedPosts()
  console.log('Done.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
