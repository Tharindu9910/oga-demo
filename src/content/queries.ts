// MOCK DATA LAYER — reads local JSON instead of Sanity (no Sanity project
// exists yet, see plans/plan.md). Every function here is written as if it
// were already talking to Sanity (async, same shapes as the schema), so
// swapping the body for a real `sanityFetch` + GROQ query later doesn't
// require touching any page component that imports from here.

import { cacheLife } from 'next/cache'

import type { Event, HomePage, Project } from './types'

import eventsData from './data/events.json'
import homePageData from './data/homePage.json'
import projectsData from './data/projects.json'

export async function getHomePage(): Promise<HomePage> {
  return homePageData as HomePage
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
