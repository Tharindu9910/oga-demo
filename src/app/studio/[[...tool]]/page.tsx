import StudioClient from './StudioClient'

export { metadata, viewport } from 'next-sanity/studio'

// The Studio is a per-editor authenticated tool that reads Sanity env vars
// at module scope and must never be served from a static shell — opt it out
// of Cache Components' instant-navigation prerendering instead of contorting
// it into a Suspense boundary that would only flash a loading fallback.
export const instant = false

export default function StudioPage() {
  return <StudioClient />
}
