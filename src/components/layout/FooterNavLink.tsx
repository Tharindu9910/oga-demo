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

  const active = pathname === href

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
