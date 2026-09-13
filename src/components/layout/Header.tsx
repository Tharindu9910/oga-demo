import Image from 'next/image'
import Link from 'next/link'

import MobileNav from '@/components/layout/MobileNav'
import NavLink from '@/components/layout/NavLink'
import ArrowRightIcon from '@/components/ui/ArrowRightIcon'
import Button from '@/components/ui/Button'
import { memberNav, moreNav, primaryNav, siteConfig } from '@/config/site'

function NavDropdown({
  label,
  items,
}: {
  label: string
  items: { label: string; href: string }[]
}) {
  return (
    <div className="group relative">
      <button
        type="button"
        className="font-plus-jakarta-sans flex items-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-medium text-white/90 hover:bg-white/10"
      >
        {label}
        <svg
          viewBox="0 0 12 12"
          className="size-3"
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
      <div className="invisible absolute top-full left-0 z-50 min-w-55 rounded-2xl border border-stone-100 bg-white p-2 opacity-0 shadow-lg transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        {items.map((item) =>
          item.href ? (
            <Link
              key={item.label}
              href={item.href}
              className="font-plus-jakarta-sans block rounded-xl px-3 py-2 text-sm text-stone-700 hover:bg-stone-50"
            >
              {item.label}
            </Link>
          ) : (
            <span
              key={item.label}
              aria-disabled="true"
              className="font-plus-jakarta-sans block rounded-xl px-3 py-2 text-sm text-stone-400"
            >
              {item.label}
            </span>
          ),
        )}
      </div>
    </div>
  )
}

export default function Header() {
  return (
    <div className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-16">
      <header className="bg-brand-700 mx-auto flex h-16.5 max-w-6xl items-center justify-between rounded-full border border-white/10 px-4 shadow-sm backdrop-blur-sm sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/brand/crest-mark.png"
            alt={`${siteConfig.name} crest`}
            width={44}
            height={44}
            className="size-11 shrink-0 rounded-full border border-white/15 bg-white/90 object-contain p-1.5"
            priority
          />
          <span className="font-poppins hidden text-xs font-bold tracking-[0.6px] text-white uppercase sm:inline">
            {siteConfig.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {primaryNav.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
          <NavDropdown label="Member" items={memberNav} />
          <NavDropdown label="More" items={moreNav} />
        </nav>

        <div className="flex items-center gap-2">
          <Button
            href={siteConfig.ctaUrls.becomeAMember}
            variant="cream"
            className="px-3.5 py-2 text-xs sm:px-5 sm:text-sm"
          >
            Become a Member <ArrowRightIcon />
          </Button>
          <MobileNav />
        </div>
      </header>
    </div>
  )
}
