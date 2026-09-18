/**
 * One-time migration: sets an initial `orderRank` on the existing chapter
 * documents so they display Dubai, Australia, Canada — and so the Studio's
 * orderable Chapters list (added alongside this script) has a valid LexoRank
 * to start dragging from.
 *
 * Run once with: pnpm order-chapters
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

const ORDER = ['Dubai', 'Australia', 'Canada']

async function main() {
  const chapters =
    await client.fetch<{ _id: string; country: string }[]>(
      `*[_type == "chapter"]{ _id, country }`,
    )

  const ordered = [...chapters].sort((a, b) => {
    const ai = ORDER.indexOf(a.country)
    const bi = ORDER.indexOf(b.country)
    if (ai === -1 && bi === -1) return a.country.localeCompare(b.country)
    if (ai === -1) return 1
    if (bi === -1) return -1
    return ai - bi
  })

  let rank = LexoRank.middle()
  const tx = client.transaction()
  for (const { _id, country } of ordered) {
    tx.patch(_id, { set: { orderRank: rank.toString() } })
    console.log(`${_id} (${country}) -> ${rank.toString()}`)
    rank = rank.genNext()
  }

  await tx.commit()
  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
