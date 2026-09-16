'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

import { enterVariants, type IntrinsicTag } from './variants'

// Page-load entrance for a single element — the Framer twin of the old
// `.enter` / `.enter-delay-N` CSS utilities. Plays immediately on mount, no
// scroll trigger. Server content passes through as `children`, so the page
// it's used on stays a Server Component.
export default function Enter({
  as = 'div',
  delay = 0,
  className,
  children,
}: {
  as?: IntrinsicTag
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
      variants={enterVariants}
      custom={delay}
      initial="hidden"
      animate="visible"
    >
      {children}
    </MotionTag>
  )
}
