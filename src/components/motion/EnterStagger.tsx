'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Children, type ReactNode } from 'react'

import { enterItemVariants, type IntrinsicTag } from './variants'

// Page-load stagger for a list's direct children — the Framer twin of the
// old `.enter-stagger` CSS utility. Plays immediately on mount, no scroll
// trigger; each child starts 70ms after the previous.
export default function EnterStagger({
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
  const itemVariants = enterItemVariants(delay)

  return (
    <MotionTag className={className} initial="hidden" animate="visible">
      {items.map((child, i) => (
        <motion.div key={i} custom={i} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </MotionTag>
  )
}
