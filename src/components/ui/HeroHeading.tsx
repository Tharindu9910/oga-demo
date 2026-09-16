'use client'

import { Fragment } from 'react'
import { motion, useReducedMotion, type Variants } from 'motion/react'

import { EASE_REVEAL } from '@/components/motion/variants'

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const word: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: EASE_REVEAL },
  },
}

// Splits the hero h1 into words that rise and un-blur one after another,
// rather than the whole line entering at once. Renders as a plain h1 for
// no-JS/reduced-motion, so search engines and screen readers always get the
// text as one string.
export default function HeroHeading({
  text,
  className,
  delay = 0,
}: {
  text: string
  className?: string
  delay?: number
}) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <h1 className={className}>{text}</h1>
  }

  const words = text.split(' ')

  return (
    <motion.h1
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
      transition={{ delayChildren: delay }}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          <motion.span variants={word} className="inline-block">
            {w}
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </motion.h1>
  )
}
