import type { SanityImageSource } from '@sanity/image-url'
import Image from 'next/image'
import type { ComponentProps } from 'react'

import { urlFor } from '@/sanity/lib/image'

type NextImageProps = ComponentProps<typeof Image>

type SanityImageProps = Omit<NextImageProps, 'src' | 'alt'> & {
  image: SanityImageSource & { alt?: string }
  alt?: string
  // 'crop' fills the width/height box (pair with object-cover). 'max' scales
  // down to fit inside it without cropping (pair with object-contain).
  fit?: 'crop' | 'max'
}

const PLACEHOLDER_SRC = '/images/placeholder.svg'

function hasAsset(image: SanityImageSource | null | undefined): boolean {
  if (!image) return false
  if (typeof image !== 'object') return true
  // A bare asset reference or asset document resolves on its own; an image
  // object (what the Studio stores) only resolves with its `asset` set.
  if ('_ref' in image || '_id' in image || 'url' in image) return true
  return 'asset' in image && Boolean(image.asset)
}

// Sanity's CDN does the resizing/format conversion itself (per-request `w`,
// `auto=format`), so the image is served pre-optimized and `unoptimized` skips
// Next's own image optimizer — avoids burning Vercel Hobby's optimization quota.
export default function SanityImage({
  image,
  alt,
  fit = 'crop',
  ...rest
}: SanityImageProps) {
  // Clearing an image in the Studio keeps its alt text, leaving an object with
  // no asset that the URL builder can't resolve — show the placeholder instead.
  if (!hasAsset(image)) {
    return (
      <Image
        src={PLACEHOLDER_SRC}
        alt={alt ?? (typeof image === 'object' ? image?.alt : undefined) ?? ''}
        unoptimized
        {...rest}
      />
    )
  }

  const width = 'width' in rest ? rest.width : undefined
  const height = 'height' in rest ? rest.height : undefined

  const builder = urlFor(image).auto('format')
  const src = (
    typeof width === 'number' && typeof height === 'number'
      ? // @sanity/image-url auto-crops to the requested aspect ratio using the
        // asset's stored hotspot/crop *regardless* of `fit` mode unless told
        // not to — for 'max' we want the whole image scaled down, not
        // pre-cropped to the box's aspect ratio.
        (() => {
          const sized = builder.width(width).height(height).fit(fit)
          return fit === 'max' ? sized.ignoreImageParams() : sized
        })()
      : builder.width(1920)
  ).url()

  return <Image src={src} alt={alt ?? image.alt ?? ''} unoptimized {...rest} />
}
