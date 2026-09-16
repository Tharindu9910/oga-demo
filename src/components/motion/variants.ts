import type { Variants } from 'motion/react'

// Twin of `--ease-reveal` in globals.css.
export const EASE_REVEAL = [0.25, 1, 0.5, 1] as const

// Tags the wrapper components below are allowed to render as.
export type IntrinsicTag =
  | 'div'
  | 'span'
  | 'h1'
  | 'h2'
  | 'article'
  | 'section'
  | 'li'
  | 'p'

// Same trigger line the old scroll-reveal system used: fires once the
// element's top is 18% up from the bottom of the viewport.
export const VIEWPORT = { once: true, margin: '0px 0px -18% 0px' } as const

// Long lists cap their stagger here so they never trail off late — the twin
// of the old `:nth-child(n+8)` cap.
const MAX_STAGGER_STEPS = 7

// --- Scroll-triggered single element (twin of `.reveal` / `.reveal-scale`) -

export const riseVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE_REVEAL, delay },
  }),
}

export const growVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: EASE_REVEAL, delay },
  }),
}

// --- Scroll-triggered stagger group (twin of `.reveal-stagger`) -----------

export function revealItemVariants(baseDelay = 0): Variants {
  return {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: EASE_REVEAL,
        delay: baseDelay + Math.min(i, MAX_STAGGER_STEPS) * 0.08,
      },
    }),
  }
}

// --- Page-load entrance (twin of `.enter` / `.enter-delay-N`) -------------

export const enterVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_REVEAL, delay },
  }),
}

// --- Page-load stagger group (twin of `.enter-stagger`) -------------------

export function enterItemVariants(baseDelay = 0): Variants {
  return {
    hidden: { opacity: 0, y: 14 },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: EASE_REVEAL,
        delay: baseDelay + Math.min(i, MAX_STAGGER_STEPS) * 0.07,
      },
    }),
  }
}
