import { cacheLife } from 'next/cache'
import type { QueryParams } from 'next-sanity'

import type {
  AboutPageQueryResult,
  ChaptersQueryResult,
  EventLink,
  HomePageQueryResult,
  ImageWithAlt,
  LoyaltyPageQueryResult,
  MembershipPageQueryResult,
  PostBySlugQueryResult,
  PostsQueryResult,
  ProjectsByStatusQueryResult,
  ProjectsPageQueryResult,
} from '../../../sanity.types'
import {
  aboutPageQuery,
  chaptersQuery,
  homePageQuery,
  loyaltyPageQuery,
  membershipPageQuery,
  pastEventsQuery,
  postBySlugQuery,
  postsQuery,
  projectsByStatusQuery,
  projectsPageQuery,
  upcomingEventsQuery,
} from '../queries'
import { sanityFetch } from './live'

export type HomePage = NonNullable<HomePageQueryResult>
export type AboutPage = NonNullable<AboutPageQueryResult>
export type ProjectsPage = NonNullable<ProjectsPageQueryResult>
export type MembershipPage = NonNullable<MembershipPageQueryResult>
export type LoyaltyPage = NonNullable<LoyaltyPageQueryResult>
export type Chapter = ChaptersQueryResult[number]
export type Project = ProjectsByStatusQueryResult[number]
export type Post = PostsQueryResult[number]
export type PostDetail = NonNullable<PostBySlugQueryResult>

// The typegen static analyzer can't narrow the element type through the
// `dateTime(date) >= now()` / `< now()` filters (a known GROQ typegen
// limitation), so upcoming/pastEventsQuery come back as `Array<never>`.
// The projection is hand-typed here instead of pulled from sanity.types.ts.
export type Event = {
  _id: string
  title: string
  date: string
  description: string | null
  images: Array<{ _key: string } & ImageWithAlt> | null
  links: Array<{ _key: string } & EventLink> | null
}

// The app's one shared `'use cache'` boundary. `sanityFetch` calls
// `cacheTag`/`cacheLife` internally but doesn't create the boundary itself —
// every fetcher below goes through this single wrapper instead of adding its
// own `'use cache'`, per next-sanity's own defineLive docs: layering
// `'use cache'` around multiple call sites that can dedupe the same
// in-flight request trips Cache Components' "shared state from the outer
// render scope" check.
async function cachedFetch<const Q extends string>(
  query: Q,
  params?: QueryParams,
  profile?: 'days',
) {
  'use cache'
  if (profile) cacheLife(profile)
  return sanityFetch({ query, params, stega: false })
}

function requireSingleton<T>(data: T | null, type: string): T {
  if (data === null) {
    throw new Error(
      `Sanity: the "${type}" singleton document doesn't exist yet — create and publish it in the Studio (/studio).`,
    )
  }
  return data
}

export async function getHomePage(): Promise<HomePage> {
  const { data } = await cachedFetch(homePageQuery)
  return requireSingleton(data, 'homePage')
}

export async function getAboutPage(): Promise<AboutPage> {
  const { data } = await cachedFetch(aboutPageQuery)
  return requireSingleton(data, 'aboutPage')
}

export async function getProjectsPage(): Promise<ProjectsPage> {
  const { data } = await cachedFetch(projectsPageQuery)
  return requireSingleton(data, 'projectsPage')
}

export async function getMembershipPage(): Promise<MembershipPage> {
  const { data } = await cachedFetch(membershipPageQuery)
  return requireSingleton(data, 'membershipPage')
}

export async function getLoyaltyPage(): Promise<LoyaltyPage> {
  const { data } = await cachedFetch(loyaltyPageQuery)
  return requireSingleton(data, 'loyaltyPage')
}

export async function getChapters(): Promise<Chapter[]> {
  const { data } = await cachedFetch(chaptersQuery)
  return data
}

export async function getOngoingProjects(limit?: number): Promise<Project[]> {
  const { data } = await cachedFetch(projectsByStatusQuery, {
    status: 'ongoing',
  })
  return limit ? data.slice(0, limit) : data
}

export async function getCompletedProjects(limit?: number): Promise<Project[]> {
  const { data } = await cachedFetch(projectsByStatusQuery, {
    status: 'completed',
  })
  return limit ? data.slice(0, limit) : data
}

export async function getUpcomingEvents(limit?: number): Promise<Event[]> {
  const { data } = await cachedFetch(upcomingEventsQuery, undefined, 'days')
  const events = data as unknown as Event[]
  return limit ? events.slice(0, limit) : events
}

export async function getPastEvents(limit?: number): Promise<Event[]> {
  const { data } = await cachedFetch(pastEventsQuery, undefined, 'days')
  const events = data as unknown as Event[]
  return limit ? events.slice(0, limit) : events
}

export async function getPosts(): Promise<Post[]> {
  const { data } = await cachedFetch(postsQuery)
  return data
}

export async function getPostBySlug(
  slug: string,
): Promise<PostDetail | undefined> {
  const { data } = await cachedFetch(postBySlugQuery, { slug })
  return data ?? undefined
}
