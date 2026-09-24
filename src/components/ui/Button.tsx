import Link from 'next/link'
import { type ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/cn'

const variantClasses = {
  dark: 'bg-brand-900 text-white hover:bg-brand-800',
  brand: 'bg-brand-600 text-white hover:bg-brand-700',
  light: 'bg-white text-brand-900 hover:bg-stone-100',
  cream: 'bg-[#cbd9ce] text-black hover:bg-[#bcccc0]',
  glass:
    'border border-white/25 bg-white/10 text-white/95 backdrop-blur-[5px] hover:bg-white/20',
} as const

type ButtonProps = {
  href?: string
  variant?: keyof typeof variantClasses
  className?: string
  children: React.ReactNode
} & Omit<ComponentPropsWithoutRef<'a'>, 'href' | 'className'>

export default function Button({
  href,
  variant = 'dark',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-1.5 rounded-full px-7 py-3 font-poppins text-sm font-semibold tracking-[0.35px] whitespace-nowrap transition-[color,background-color,scale] duration-160 ease-out',
    variantClasses[variant],
    className,
  )
  // Only real links press in and nudge their <Arrow />; the disabled
  // placeholder below stays still.
  const linkClasses = cn(
    'group active:scale-98 motion-reduce:active:scale-99',
    classes,
  )

  if (!href) {
    return (
      <span
        aria-disabled="true"
        title="Link coming soon"
        className={cn(classes, 'cursor-not-allowed opacity-70')}
      >
        {children}
      </span>
    )
  }

  const isExternal = /^https?:\/\//.test(href)

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClasses}
        {...props}
      >
        {children}
      </a>
    )
  }

  // Same-page anchors use a plain <a>, not next/link: the client router
  // treats a click to a hash matching the current URL as a no-op and skips
  // the scroll, so a second click on the same in-page anchor does nothing.
  if (href.startsWith('#')) {
    return (
      <a href={href} className={linkClasses} {...props}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={linkClasses} {...props}>
      {children}
    </Link>
  )
}
