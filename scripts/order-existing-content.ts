/**
 * One-time migration, run alongside the switch to draggable Studio ordering
 * (orderRank on project/event/post, plus a manual `status` field on event
 * replacing the old date-derived upcoming/past split).
 *
 * Seeds `orderRank` on every existing project, event, and post document so
 * the site's display order is unchanged right after the switch — each group
 * is ranked in the same order the old date-based queries used to produce.
 * For events, also backfills `status` from the event's current date (the
 * last time date drives status automatically; after this it's manual).
 *
 * Run once with: pnpm order-existing-content
 */
import { LexoRank } from 'lexorank'
import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../src/sanity/env'

const token = process.env.SANITY_API_WRITE_TOKEN
if (!token) {
  throw new Error(
    'SANITY_API_WRITE_TOKEN is required to run this script (see .env.example).',
  )
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
})

function ranksFor(count: number): string[] {
  const ranks: string[] = []
  let rank = LexoRank.middle()
  for (let i = 0; i < count; i++) {
    ranks.push(rank.toString())
    rank = rank.genNext()
  }
  return ranks
}

async function rankGroup(
  tx: ReturnType<typeof client.transaction>,
  docs: { _id: string }[],
) {
  const ranks = ranksFor(docs.length)
  docs.forEach((doc, i) => {
    tx.patch(doc._id, { set: { orderRank: ranks[i] } })
  })
}

async function main() {
  const tx = client.transaction()

  // Projects: same grouping/order the old `order(date desc)` query gave.
  const projects = await client.fetch<
    { _id: string; status: string; date: string }[]
  >(`*[_type == "project"]{ _id, status, date }`)
  for (const status of ['ongoing', 'completed']) {
    const group = projects
      .filter((p) => p.status === status)
      .sort((a, b) => b.date.localeCompare(a.date))
    await rankGroup(tx, group)
    console.log(
      `project/${status}: ${group.map((p) => p._id).join(', ') || '(none)'}`,
    )
  }

  // Events: backfill status from date (last automatic run), then rank
  // upcoming ascending / past descending, matching the old queries.
  const events = await client.fetch<{ _id: string; date: string }[]>(
    `*[_type == "event"]{ _id, date }`,
  )
  const now = new Date().toISOString()
  const upcoming = events
    .filter((e) => e.date >= now)
    .sort((a, b) => a.date.localeCompare(b.date))
  const past = events
    .filter((e) => e.date < now)
    .sort((a, b) => b.date.localeCompare(a.date))

  for (const event of events) {
    const status = event.date >= now ? 'upcoming' : 'past'
    tx.patch(event._id, { set: { status } })
  }
  await rankGroup(tx, upcoming)
  await rankGroup(tx, past)
  console.log(`event/upcoming: ${upcoming.map((e) => e._id).join(', ') || '(none)'}`)
  console.log(`event/past: ${past.map((e) => e._id).join(', ') || '(none)'}`)

  // Posts: same order the old `order(publishedAt desc)` query gave.
  const posts = await client.fetch<{ _id: string; publishedAt: string }[]>(
    `*[_type == "post"]{ _id, publishedAt }`,
  )
  posts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  await rankGroup(tx, posts)
  console.log(`post: ${posts.map((p) => p._id).join(', ') || '(none)'}`)

  await tx.commit()
  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
