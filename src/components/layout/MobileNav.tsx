'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import Button from '@/components/ui/Button'
import { memberNav, moreNav, primaryNav, siteConfig } from '@/config/site'

export default function MobileNav() {
  const [open, setOpen] = useState(false)

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
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((v) => !v)}
        className="text-brand-900 flex size-10 shrink-0 items-center justify-center rounded-full bg-white"
      >
        <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        {open ? (
          <svg
            viewBox="0 0 24 24"
            className="size-5"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            className="size-5"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>

      {open &&
        createPortal(
          <div
            id="mobile-nav-panel"
            className="fixed inset-x-0 top-[calc(env(safe-area-inset-top)+72px)] bottom-0 z-40 overflow-y-auto bg-white px-6 py-8"
          >
            <nav aria-label="Mobile" className="flex flex-col gap-6">
              <ul className="flex flex-col gap-4">
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
              </ul>

              <div>
                <p className="font-poppins mb-3 text-xs font-bold tracking-[1.2px] text-stone-400 uppercase">
                  Member
                </p>
                <ul className="flex flex-col gap-3">
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
              </div>

              <div>
                <p className="font-poppins mb-3 text-xs font-bold tracking-[1.2px] text-stone-400 uppercase">
                  More
                </p>
                <ul className="flex flex-col gap-3">
                  {moreNav.map((item) =>
                    item.href ? (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="font-plus-jakarta-sans text-base text-stone-600"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ) : (
                      <li key={item.label}>
                        <span
                          aria-disabled="true"
                          className="font-plus-jakarta-sans text-base text-stone-400"
                        >
                          {item.label}
                        </span>
                      </li>
                    ),
                  )}
                </ul>
              </div>

              <Button
                href={siteConfig.ctaUrls.becomeAMember}
                className="mt-2 w-full"
              >
                Become a Member
              </Button>
            </nav>
          </div>,
          document.body,
        )}
    </div>
  )
}
