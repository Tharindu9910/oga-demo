'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function FooterNavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  const pathname = usePathname()

  if (!href) {
    return (
      <span
        aria-disabled="true"
        className="font-plus-jakarta-sans text-xs text-stone-600"
      >
        {children}
      </span>
    )
  }

  const isExternal = /^https?:\/\//.test(href)
  const active = !isExternal && pathname === href

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-plus-jakarta-sans text-xs text-stone-400 hover:text-emerald-300"
      >
        {children}
      </a>
    )
  }

  return (
    <Link
      href={href}
      className={
        active
          ? 'font-plus-jakarta-sans text-xs font-semibold text-emerald-400'
          : 'font-plus-jakarta-sans text-xs text-stone-400 hover:text-emerald-300'
      }
    >
      {children}
    </Link>
  )
}
