'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

import { growVariants, riseVariants, VIEWPORT, type IntrinsicTag } from './variants'

const VARIANTS = { rise: riseVariants, scale: growVariants }

// Scroll-triggered entrance for a single element — the Framer twin of the
// old `.reveal` / `.reveal-scale` CSS utilities. Plays once, the first time
// the element scrolls to 18% up from the bottom of the viewport. Server
// content passes through as `children`, so the page it's used on stays a
// Server Component.
export default function Reveal({
  as = 'div',
  variant = 'rise',
  delay = 0,
  className,
  children,
}: {
  as?: IntrinsicTag
  variant?: 'rise' | 'scale'
  delay?: number
  className?: string
  children: ReactNode
}) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  const MotionTag = motion[as]

  return (
    <MotionTag
      className={className}
      variants={VARIANTS[variant]}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {children}
    </MotionTag>
  )
}
