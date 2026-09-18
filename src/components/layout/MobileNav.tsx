'use client'

import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'motion/react'
import { useEffect, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'

function subscribeNever() {
  return () => {}
}

import Button from '@/components/ui/Button'
import { memberNav, moreNav, primaryNav, siteConfig } from '@/config/site'

// Twin of `--ease-drawer` in globals.css.
const EASE_DRAWER = [0.32, 0.72, 0, 1] as const
// Twin of `--ease-in-out` in globals.css.
const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const

function panelVariants(reduceMotion: boolean): Variants {
  return {
    hidden: { opacity: 0, y: reduceMotion ? 0 : -12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0.15 : 0.28, ease: EASE_DRAWER },
    },
    exit: {
      opacity: 0,
      y: reduceMotion ? 0 : -12,
      transition: { duration: reduceMotion ? 0.1 : 0.2, ease: EASE_DRAWER },
    },
  }
}

// Only the opening direction staggers — closing fades everything out
// together, uniformly and quickly, which reads faster and cleaner than
// reversing the cascade.
function navVariants(reduceMotion: boolean): Variants {
  return {
    hidden: {},
    visible: {
      transition: reduceMotion
        ? {}
        : { staggerChildren: 0.04, delayChildren: 0.05 },
    },
    exit: {},
  }
}

function sectionVariants(reduceMotion: boolean): Variants {
  return {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0.15 : 0.26, ease: EASE_DRAWER },
    },
    exit: { opacity: 0, transition: { duration: 0.12 } },
  }
}

export default function MobileNav() {
  const [open, setOpen] = useState(false)
  // Portal target (`document.body`) only exists on the client — this reads
  // false during SSR and the initial client render, then true once
  // hydrated, without setState-in-effect.
  const mounted = useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  )
  const reduceMotion = Boolean(useReducedMotion())

  useEffect(() => {
    if (!open) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((o) => !o)}
        className="text-brand-900 flex size-10 shrink-0 items-center justify-center rounded-full bg-white transition-transform duration-160 ease-out active:scale-97 motion-reduce:active:scale-99"
      >
        <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        <span className="relative flex size-5 shrink-0 items-center justify-center">
          <motion.span
            aria-hidden="true"
            className="absolute h-0.5 w-5 rounded-full bg-current"
            animate={open ? { y: 0, rotate: 45 } : { y: -5, rotate: 0 }}
            transition={{ duration: 0.22, ease: EASE_IN_OUT }}
          />
          <motion.span
            aria-hidden="true"
            className="absolute h-0.5 w-5 rounded-full bg-current"
            animate={open ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.14, ease: 'easeOut' }}
          />
          <motion.span
            aria-hidden="true"
            className="absolute h-0.5 w-5 rounded-full bg-current"
            animate={open ? { y: 0, rotate: -45 } : { y: 5, rotate: 0 }}
            transition={{ duration: 0.22, ease: EASE_IN_OUT }}
          />
        </span>
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                id="mobile-nav-panel"
                variants={panelVariants(reduceMotion)}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed inset-0 z-40 overflow-y-auto bg-white px-6 pt-[calc(env(safe-area-inset-top)+96px)] pb-[calc(env(safe-area-inset-bottom)+112px)]"
              >
                <motion.nav
                  aria-label="Mobile"
                  variants={navVariants(reduceMotion)}
                  className="flex flex-col gap-5"
                >
                  <motion.ul
                    variants={sectionVariants(reduceMotion)}
                    className="flex flex-col gap-3"
                  >
                    {primaryNav.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="font-poppins text-lg font-medium text-stone-800"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>

                  <motion.div variants={sectionVariants(reduceMotion)}>
                    <p className="font-poppins mb-2 text-xs font-bold tracking-[1.2px] text-stone-400 uppercase">
                      Member
                    </p>
                    <ul className="flex flex-col gap-2">
                      {memberNav.map((item) => (
                        <li key={item.label}>
                          <Link
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="font-plus-jakarta-sans text-base text-stone-600"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div variants={sectionVariants(reduceMotion)}>
                    <p className="font-poppins mb-2 text-xs font-bold tracking-[1.2px] text-stone-400 uppercase">
                      More
                    </p>
                    <ul className="flex flex-col gap-2">
                      {moreNav.map((item) => {
                        if (!item.href) {
                          return (
                            <li key={item.label}>
                              <span
                                aria-disabled="true"
                                className="font-plus-jakarta-sans text-base text-stone-400"
                              >
                                {item.label}
                              </span>
                            </li>
                          )
                        }

                        const isExternal = /^https?:\/\//.test(item.href)

                        return (
                          <li key={item.label}>
                            <Link
                              href={item.href}
                              onClick={() => setOpen(false)}
                              {...(isExternal
                                ? { target: '_blank', rel: 'noopener noreferrer' }
                                : {})}
                              className="font-plus-jakarta-sans text-base text-stone-600"
                            >
                              {item.label}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </motion.div>

                  <motion.div variants={sectionVariants(reduceMotion)}>
                    <Button
                      href={siteConfig.ctaUrls.becomeAMember}
                      className="w-full"
                    >
                      Become a Member
                    </Button>
                  </motion.div>
                </motion.nav>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  )
}
