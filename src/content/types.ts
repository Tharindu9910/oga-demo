// Shapes mirror the Sanity schema in plans/plan.md (Content model section) so
// swapping the mock JSON reads in queries.ts for real GROQ queries later
// doesn't require touching any page component.

export type ContentImage = {
  src: string
  alt: string
}

export type HomePage = {
  hero: {
    eyebrow: string
    headline: string
    image: ContentImage
    ctaLabel: string
    ctaUrl: string
    secondaryCtaLabel: string
    secondaryCtaUrl: string
  }
  aboutSummary: {
    heading: string
    paragraphs: string[]
    image: ContentImage
    ctaLabel: string
    ctaUrl: string
  }
  milestones: { value: string; label: string }[]
}

export type ProjectsPage = {
  dehiwala: {
    show: boolean
    title: string
    body: string[]
    image: ContentImage
    highlightsLabel: string
    highlightsUrl: string
  }
}

export type TeamMember = { name: string; role: string }

export type AboutPage = {
  hero: {
    badges: string[]
    paragraphs: string[]
  }
  vision: { icon: ContentImage; body: string }
  mission: { icon: ContentImage; body: string }
  president: {
    name: string
    role: string
    message: string[]
  }
  team: {
    year: string
    patrons: TeamMember[]
    committee: TeamMember[]
  }
  video: {
    src: string
    poster: ContentImage
  }
  founderTribute: {
    name: string
    photo: ContentImage
    paragraphs: string[]
    quote: string
  }
}

export type Project = {
  _id: string
  title: string
  status: 'ongoing' | 'completed'
  image: ContentImage
  description: string
  progress?: number
  date: string
}

export type Post = {
  _id: string
  title: string
  slug: string
  publishedAt: string
  excerpt: string
  coverImage: ContentImage
  body: string[]
  seoDescription?: string
}

export type EventLink = { label: string; url: string }

export type Event = {
  _id: string
  title: string
  date: string
  description: string
  images: ContentImage[]
  links: EventLink[]
}
