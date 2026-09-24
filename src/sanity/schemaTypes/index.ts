import type { SchemaTypeDefinition } from 'sanity'

import { chapter } from './documents/chapter'
import { event } from './documents/event'
import { post } from './documents/post'
import { project } from './documents/project'
import { eventLink } from './objects/eventLink'
import { imageWithAlt } from './objects/imageWithAlt'
import { merchant } from './objects/merchant'
import { milestone } from './objects/milestone'
import { teamMember } from './objects/teamMember'
import { aboutPage } from './singletons/aboutPage'
import { homePage } from './singletons/homePage'
import { loyaltyPage } from './singletons/loyaltyPage'
import { membershipPage } from './singletons/membershipPage'
import { projectsPage } from './singletons/projectsPage'
import { siteSettings } from './singletons/siteSettings'

export const singletonTypes = new Set([
  'homePage',
  'aboutPage',
  'projectsPage',
  'membershipPage',
  'loyaltyPage',
  'siteSettings',
])

export const schemaTypes: SchemaTypeDefinition[] = [
  // singletons
  homePage,
  aboutPage,
  projectsPage,
  membershipPage,
  loyaltyPage,
  siteSettings,
  // documents
  project,
  event,
  chapter,
  post,
  // objects
  imageWithAlt,
  eventLink,
  teamMember,
  merchant,
  milestone,
]
