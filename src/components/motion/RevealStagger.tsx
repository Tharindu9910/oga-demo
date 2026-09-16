'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Children, type ReactNode } from 'react'

import { revealItemVariants, VIEWPORT, type IntrinsicTag } from './variants'

// Scroll-triggered stagger for a grid/list's direct children — the Framer
// twin of the old `.reveal-stagger` CSS utility. Each child is wrapped in
// its own `motion.div`; grid/flex items stretch by default, so the wrapper
// takes the same box the child used to and layout is undisturbed.
export default function RevealStagger({
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
  const items = Children.toArray(children)

  if (reduceMotion) {
    const Tag = as
    return <Tag className={className}>{items}</Tag>
  }

  const MotionTag = motion[as]
  const itemVariants = revealItemVariants(delay)

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {items.map((child, i) => (
        <motion.div key={i} custom={i} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </MotionTag>
  )
}
