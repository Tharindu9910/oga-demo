'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/cn'

export default function NavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const active = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        'font-plus-jakarta-sans rounded-full px-3.5 py-1.5 text-xs whitespace-nowrap',
        active
          ? 'bg-brand-500 font-semibold text-white'
          : 'font-medium text-white/90 hover:bg-white/10',
      )}
    >
      {children}
    </Link>
  )
}
