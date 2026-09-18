'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/cn'

export default function NavDropdown({
  label,
  items,
}: {
  label: string
  items: { label: string; href: string }[]
}) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    function onPointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
        className="font-plus-jakarta-sans flex items-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-medium text-white/90 hover:bg-white/10"
      >
        {label}
        <svg
          viewBox="0 0 12 12"
          className={cn(
            'size-3 transition-transform duration-200 ease-out',
            open && 'rotate-180',
          )}
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2.5 4.5L6 8l3.5-3.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Always rendered so it can animate out: `display` is transitioned
          discretely, so it only flips to `none` after the fade/drop ends. */}
      <div
        role="menu"
        data-open={open || undefined}
        className="absolute top-full left-0 z-50 min-w-55 rounded-2xl border border-stone-100 bg-white p-2 shadow-lg transition-[opacity,translate,display] transition-discrete duration-200 ease-out not-data-open:hidden not-data-open:translate-y-1.5 not-data-open:opacity-0 motion-reduce:not-data-open:translate-y-0 starting:translate-y-1.5 starting:opacity-0 motion-reduce:starting:translate-y-0"
      >
        {items.map((item) => {
          if (!item.href) {
            return (
              <span
                key={item.label}
                aria-disabled="true"
                role="menuitem"
                className="font-plus-jakarta-sans block rounded-xl px-3 py-2 text-sm text-stone-400"
              >
                {item.label}
              </span>
            )
          }

          const isExternal = /^https?:\/\//.test(item.href)

          if (isExternal) {
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="font-plus-jakarta-sans block rounded-xl px-3 py-2 text-sm text-stone-700 hover:bg-stone-50"
              >
                {item.label}
              </a>
            )
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="font-plus-jakarta-sans block rounded-xl px-3 py-2 text-sm text-stone-700 hover:bg-stone-50"
            >
              {item.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
