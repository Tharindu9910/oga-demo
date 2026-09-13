// MOCK DATA LAYER — reads local JSON instead of Sanity (no Sanity project
// exists yet, see plans/plan.md). Every function here is written as if it
// were already talking to Sanity (async, same shapes as the schema), so
// swapping the body for a real `sanityFetch` + GROQ query later doesn't
// require touching any page component that imports from here.

import { cacheLife } from 'next/cache'

import type {
  AboutPage,
  Chapter,
  Event,
  HomePage,
  LoyaltyPage,
  MembershipPage,
  Post,
  Project,
  ProjectsPage,
} from './types'

import aboutPageData from './data/aboutPage.json'
import chaptersData from './data/chapters.json'
import eventsData from './data/events.json'
import homePageData from './data/homePage.json'
import loyaltyPageData from './data/loyaltyPage.json'
import membershipPageData from './data/membershipPage.json'
import postsData from './data/posts.json'
import projectsData from './data/projects.json'
import projectsPageData from './data/projectsPage.json'

export async function getHomePage(): Promise<HomePage> {
  return homePageData as HomePage
}

export async function getAboutPage(): Promise<AboutPage> {
  return aboutPageData as AboutPage
}

export async function getProjectsPage(): Promise<ProjectsPage> {
  return projectsPageData as ProjectsPage
}

export async function getMembershipPage(): Promise<MembershipPage> {
  return membershipPageData as MembershipPage
}

export async function getChapters(): Promise<Chapter[]> {
  return chaptersData as Chapter[]
}

export async function getLoyaltyPage(): Promise<LoyaltyPage> {
  return loyaltyPageData as LoyaltyPage
}

export async function getOngoingProjects(limit?: number): Promise<Project[]> {
  const ongoing = (projectsData as Project[])
    .filter((project) => project.status === 'ongoing')
    .sort((a, b) => b.date.localeCompare(a.date))
  return limit ? ongoing.slice(0, limit) : ongoing
}

export async function getCompletedProjects(limit?: number): Promise<Project[]> {
  const completed = (projectsData as Project[])
    .filter((project) => project.status === 'completed')
    .sort((a, b) => b.date.localeCompare(a.date))
  return limit ? completed.slice(0, limit) : completed
}

export async function getUpcomingEvents(limit?: number): Promise<Event[]> {
  'use cache'
  cacheLife('days')

  const now = Date.now()
  const upcoming = (eventsData as Event[])
    .filter((event) => new Date(event.date).getTime() >= now)
    .sort((a, b) => a.date.localeCompare(b.date))
  return limit ? upcoming.slice(0, limit) : upcoming
}

export async function getPastEvents(limit?: number): Promise<Event[]> {
  'use cache'
  cacheLife('days')

  const now = Date.now()
  const past = (eventsData as Event[])
    .filter((event) => new Date(event.date).getTime() < now)
    .sort((a, b) => b.date.localeCompare(a.date))
  return limit ? past.slice(0, limit) : past
}

export async function getPosts(): Promise<Post[]> {
  return (postsData as Post[])
    .slice()
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  return (postsData as Post[]).find((post) => post.slug === slug)
}
