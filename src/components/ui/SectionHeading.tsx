import Enter from '@/components/motion/Enter'
import Reveal from '@/components/motion/Reveal'

type SectionHeadingProps = {
  eyebrow?: string
  children: React.ReactNode
  align?: 'left' | 'center'
  tone?: 'dark' | 'light'
  className?: string
  // Top-of-page headings play the load entrance; the rest reveal on scroll.
  enter?: boolean
}

export default function SectionHeading({
  eyebrow,
  children,
  align = 'left',
  tone = 'dark',
  className = '',
  enter = false,
}: SectionHeadingProps) {
  const Wrapper = enter ? Enter : Reveal

  return (
    <Wrapper className={`${align === 'center' ? 'text-center' : ''} ${className}`}>
      {eyebrow && (
        <p
          className={`font-poppins mb-2 text-xs font-semibold tracking-[0.6px] uppercase ${tone === 'dark' ? 'text-brand-600' : 'text-emerald-200'}`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-poppins text-3xl font-bold tracking-[-0.9px] sm:text-[36px] ${tone === 'dark' ? 'text-brand-800' : 'text-white'}`}
      >
        {children}
      </h2>
    </Wrapper>
  )
}
