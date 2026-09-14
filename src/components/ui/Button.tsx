import Link from 'next/link'
import { type ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/cn'

const variantClasses = {
  dark: 'bg-brand-900 text-white hover:bg-brand-800',
  brand: 'bg-brand-600 text-white hover:bg-brand-700',
  light: 'bg-white text-brand-900 hover:bg-stone-100',
  cream: 'bg-[#cbd9ce] text-stone-900 hover:bg-[#bcccc0]',
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
    'inline-flex items-center justify-center gap-1.5 rounded-full px-7 py-3 font-poppins text-sm font-semibold tracking-[0.35px] whitespace-nowrap transition-colors',
    variantClasses[variant],
    className,
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
        className={classes}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  )
}
