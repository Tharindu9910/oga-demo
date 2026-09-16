'use client'

import { useEffect, useRef } from 'react'
import { animate, useReducedMotion } from 'motion/react'

import { EASE_REVEAL } from '@/components/motion/variants'

// "1,200+" → prefix "", target 1200, suffix "+", commas kept. Returns null for
// values with no number in them, which then render as written.
function parse(value: string) {
  const match = /^(\D*)(\d[\d,]*(?:\.\d+)?)(.*)$/.exec(value.trim())
  if (!match) return null
  const [, prefix, digits, suffix] = match
  const decimals = digits.split('.')[1]?.length ?? 0
  const grouped = digits.includes(',')
  return {
    target: Number(digits.replace(/,/g, '')),
    format: (n: number) =>
      prefix +
      (grouped
        ? n.toLocaleString('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
        : n.toFixed(decimals)) +
      suffix,
  }
}

// Counts a CMS milestone value up from zero when it scrolls into view. The
// server renders the real value, so no-JS, crawlers and screen readers always
// get the final number.
export default function CountUp({
  value,
  delay = 0,
}: {
  value: string
  /** Milliseconds, to match the reveal stagger it typically rides in on. */
  delay?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return
    // Write to React's own text node rather than `textContent`, so React
    // never ends up holding a detached node.
    const text = ref.current?.firstChild
    const parsed = parse(value)
    if (!ref.current || !(text instanceof Text) || !parsed) return

    // Already on screen at mount: the real value has been painted, so
    // resetting it to zero would read as a glitch. Leave it.
    const rect = ref.current.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) return

    const { target, format } = parsed
    text.nodeValue = format(0)
    let stop = () => {}

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const controls = animate(0, target, {
          duration: 1.6,
          delay: delay / 1000,
          ease: EASE_REVEAL,
          onUpdate: (latest) => {
            text.nodeValue = format(latest)
          },
        })
        stop = () => controls.stop()
      },
      // Same trigger line as the scroll reveals, so the count starts as its
      // card rises in.
      { rootMargin: '0px 0px -18% 0px' },
    )
    observer.observe(ref.current)

    return () => {
      observer.disconnect()
      stop()
      text.nodeValue = value
    }
  }, [value, delay, reduceMotion])

  return (
    // The invisible copy holds the final width, so the card never resizes
    // while the digits count up.
    <span className="inline-grid tabular-nums">
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {value}
      </span>
      <span ref={ref} aria-hidden="true" className="col-start-1 row-start-1">
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  )
}
