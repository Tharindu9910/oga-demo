import Image from 'next/image'
import Link from 'next/link'

import MobileNav from '@/components/layout/MobileNav'
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
        className="font-poppins flex items-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-100"
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
            stroke="#A8A29E"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className="invisible absolute top-full left-0 z-50 min-w-55 rounded-2xl border border-stone-100 bg-white p-2 opacity-0 shadow-lg transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="font-plus-jakarta-sans block rounded-xl px-3 py-2 text-sm text-stone-700 hover:bg-stone-50"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function Header() {
  return (
    <div className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-16">
      <header className="mx-auto flex h-16.5 max-w-6xl items-center justify-between rounded-full border border-slate-200/80 bg-white/88 px-4 shadow-sm backdrop-blur-sm sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/brand/crest.png"
            alt={`${siteConfig.name} crest`}
            width={44}
            height={44}
            className="size-11 shrink-0 rounded-full border border-emerald-900/20 bg-emerald-50/70 object-contain p-1"
            priority
          />
          <span className="hidden flex-col sm:flex">
            <span className="font-poppins text-brand-900 text-xs font-bold tracking-[0.6px] uppercase">
              {siteConfig.name}
            </span>
            <span className="font-plus-jakarta-sans text-[10px] font-medium tracking-[1px] text-stone-500 uppercase">
              {siteConfig.tagline}
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-poppins rounded-full px-3.5 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-100"
            >
              {item.label}
            </Link>
          ))}
          <NavDropdown label="Member" items={memberNav} />
          <NavDropdown label="More" items={moreNav} />
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Button href={siteConfig.ctaUrls.becomeAMember}>
              Become a Member
            </Button>
          </div>
          <MobileNav />
        </div>
      </header>
    </div>
  )
}
