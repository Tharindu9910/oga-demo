'use client'

import type { SanityImageSource } from '@sanity/image-url'
import { motion, useReducedMotion } from 'motion/react'

import { EASE_REVEAL } from '@/components/motion/variants'
import SanityImage from '@/components/ui/SanityImage'

// Home hero backdrop: the photo settles from a close crop out to full frame
// while a dark veil lifts off it. `scale`/`opacity` only, so it stays on the
// compositor even at full-viewport size.
export default function HeroMedia({
  image,
}: {
  image: SanityImageSource & { alt?: string }
}) {
  const reduceMotion = useReducedMotion()

  return (
    <>
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: EASE_REVEAL }}
      >
        <SanityImage
          image={image}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="bg-brand-950 pointer-events-none absolute inset-0"
        initial={reduceMotion ? false : { opacity: 0.85 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.4, ease: EASE_REVEAL }}
      />
    </>
  )
}
