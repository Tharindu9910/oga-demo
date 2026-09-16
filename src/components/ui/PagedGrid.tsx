'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, type CSSProperties, type ReactNode } from 'react'

// Two rows per page: 2 columns below `lg` (4 cards), 4 columns from `lg` up
// (8 cards).
const MOBILE_PAGE_SIZE = 4
const DESKTOP_PAGE_SIZE = 8

type PagedGridItem = { id: string; content: ReactNode }

// Pages server-rendered cards in two-row sets. Both breakpoints are rendered
// with CSS visibility (no matchMedia), so there's no hydration flash. Paging
// state is the index of the first card in view; each breakpoint derives its
// own page from it, so resizing keeps roughly the same cards visible.
export default function PagedGrid({
  items,
  initialIndex = 0,
}: {
  items: PagedGridItem[]
  initialIndex?: number
}) {
  const [start, setStart] = useState(Math.max(0, initialIndex))

  const mobilePage = Math.floor(start / MOBILE_PAGE_SIZE)
  const desktopPage = Math.floor(start / DESKTOP_PAGE_SIZE)
  const mobilePageCount = Math.ceil(items.length / MOBILE_PAGE_SIZE)
  const desktopPageCount = Math.ceil(items.length / DESKTOP_PAGE_SIZE)

  return (
    <div className="mt-12">
      {/* Keyed on `start` so each page change replays the card entrance. */}
      <div
        key={start}
        className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4"
      >
        {items.map((item, i) => {
          const onMobilePage = Math.floor(i / MOBILE_PAGE_SIZE) === mobilePage
          const onDesktopPage =
            Math.floor(i / DESKTOP_PAGE_SIZE) === desktopPage

          return (
            <div
              key={item.id}
              style={
                {
                  '--step-sm': i % MOBILE_PAGE_SIZE,
                  '--step-lg': i % DESKTOP_PAGE_SIZE,
                } as CSSProperties
              }
              className={`enter [--enter-delay:calc(var(--step-sm)*70ms)] lg:[--enter-delay:calc(var(--step-lg)*70ms)] ${
                onMobilePage ? 'block' : 'hidden'
              } ${onDesktopPage ? 'lg:block' : 'lg:hidden'}`}
            >
              {item.content}
            </div>
          )
        })}
      </div>

      {mobilePageCount > 1 && (
        <PagerControls
          className="flex lg:hidden"
          page={mobilePage}
          pageCount={mobilePageCount}
          onPrev={() => setStart((mobilePage - 1) * MOBILE_PAGE_SIZE)}
          onNext={() => setStart((mobilePage + 1) * MOBILE_PAGE_SIZE)}
        />
      )}
      {desktopPageCount > 1 && (
        <PagerControls
          className="hidden lg:flex"
          page={desktopPage}
          pageCount={desktopPageCount}
          onPrev={() => setStart((desktopPage - 1) * DESKTOP_PAGE_SIZE)}
          onNext={() => setStart((desktopPage + 1) * DESKTOP_PAGE_SIZE)}
        />
      )}
    </div>
  )
}

function PagerControls({
  className,
  page,
  pageCount,
  onPrev,
  onNext,
}: {
  className: string
  page: number
  pageCount: number
  onPrev: () => void
  onNext: () => void
}) {
  const buttonClass =
    'text-brand-800 hover:border-brand-500 inline-flex size-10 items-center justify-center rounded-full border border-stone-200 bg-white transition-[border-color,scale,opacity] duration-150 ease-out active:scale-95 disabled:pointer-events-none disabled:opacity-40'

  return (
    <div className={`mt-8 items-center justify-center gap-4 ${className}`}>
      <button
        type="button"
        onClick={onPrev}
        disabled={page === 0}
        aria-label="Previous posts"
        className={buttonClass}
      >
        <ChevronLeft className="size-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={page >= pageCount - 1}
        aria-label="Next posts"
        className={buttonClass}
      >
        <ChevronRight className="size-5" aria-hidden="true" />
      </button>
    </div>
  )
}
