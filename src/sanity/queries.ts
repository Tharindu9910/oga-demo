import { defineQuery } from 'next-sanity'

export const homePageQuery = defineQuery(`*[_type == "homePage"][0]{
  hero,
  milestones
}`)

export const aboutPageQuery = defineQuery(`*[_type == "aboutPage"][0]{
  president,
  team
}`)

export const projectsPageQuery = defineQuery(`*[_type == "projectsPage"][0]{
  dehiwala,
  "droneVideo": droneVideo.asset->{url, mimeType}
}`)

export const membershipPageQuery = defineQuery(`*[_type == "membershipPage"][0]{
  poster,
  documentsRequired,
  payment,
  ctaLabel,
  ctaUrl
}`)

export const loyaltyPageQuery = defineQuery(`*[_type == "loyaltyPage"][0]{
  merchants
}`)

export const siteSettingsQuery = defineQuery(`*[_type == "siteSettings"][0]{
  activeVolunteerUrl,
  donateUrl,
  whatsappUrl
}`)

export const chaptersQuery = defineQuery(`*[_type == "chapter"] | order(orderRank asc){
  _id,
  country,
  description,
  images
}`)

export const projectsByStatusQuery =
  defineQuery(`*[_type == "project" && status == $status] | order(orderRank asc){
  _id,
  title,
  status,
  image,
  description,
  progress,
  date
}`)

export const upcomingEventsQuery =
  defineQuery(`*[_type == "event" && status == "upcoming"] | order(orderRank asc){
  _id,
  title,
  date,
  description,
  images,
  links
}`)

export const pastEventsQuery =
  defineQuery(`*[_type == "event" && status == "past"] | order(orderRank asc){
  _id,
  title,
  date,
  description,
  images,
  links
}`)

export const postsQuery =
  defineQuery(`*[_type == "post"] | order(orderRank asc){
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  coverImage
}`)

export const postBySlugQuery =
  defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  coverImage,
  body,
  seoDescription
}`)
