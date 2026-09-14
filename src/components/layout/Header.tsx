import Image from 'next/image'
import Link from 'next/link'

import MobileNav from '@/components/layout/MobileNav'
import NavDropdown from '@/components/layout/NavDropdown'
import NavLink from '@/components/layout/NavLink'
import ArrowRightIcon from '@/components/ui/ArrowRightIcon'
import Button from '@/components/ui/Button'
import { memberNav, moreNav, primaryNav, siteConfig } from '@/config/site'

export default function Header() {
  return (
    <div className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-16">
      <header className="bg-brand-700 mx-auto flex h-16.5 max-w-6xl items-center justify-between rounded-full border border-white/10 px-4 shadow-sm backdrop-blur-sm sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/brand/crest.png"
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
