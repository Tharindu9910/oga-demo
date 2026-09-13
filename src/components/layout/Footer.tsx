import { cacheLife } from 'next/cache'
import Image from 'next/image'
import Link from 'next/link'

import Container from '@/components/ui/Container'
import { footerNavigation, memberNav, moreNav, siteConfig } from '@/config/site'

const socialLinks = [
  {
    label: 'Facebook',
    href: siteConfig.social.facebook,
    icon: '/icons/facebook.svg',
  },
  {
    label: 'Instagram',
    href: siteConfig.social.instagram,
    icon: '/icons/instagram.svg',
  },
  {
    label: 'LinkedIn',
    href: siteConfig.social.linkedin,
    icon: '/icons/linkedin.svg',
  },
]

function FooterColumn({
  heading,
  items,
}: {
  heading: string
  items: { label: string; href: string }[]
}) {
  return (
    <div>
      <h4 className="font-poppins border-b border-white/10 pb-2.5 text-xs font-bold tracking-[1.2px] text-white uppercase">
        {heading}
      </h4>
      <ul className="mt-4 flex flex-col gap-3">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="font-plus-jakarta-sans text-xs text-stone-400 hover:text-emerald-300"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default async function Footer() {
  'use cache'
  cacheLife('weeks')

  const year = new Date().getFullYear()

  return (
    <footer className="bg-brand-700 border-t border-emerald-950/40">
      <Container className="max-w-6xl py-16">
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-16 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3.5">
              <Image
                src="/images/brand/crest.png"
                alt={`${siteConfig.name} crest`}
                width={48}
                height={48}
                className="size-12 shrink-0 rounded-full border border-white/15 bg-white/10 object-contain p-1.5"
              />
              <span className="font-poppins text-sm font-bold tracking-[1.4px] text-white uppercase">
                {siteConfig.name}
              </span>
            </Link>
            <p className="font-poppins mt-6 max-w-sm text-3xl leading-tight font-bold tracking-tight text-white">
              Give back to your{' '}
              <span className="font-normal text-emerald-200 italic">
                Alma Mater
              </span>
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/4 p-2.75"
              >
                <Image
                  src="/icons/phone.svg"
                  alt=""
                  width={14}
                  height={14}
                  className="size-3.5 shrink-0 rounded-lg border border-emerald-500/20 bg-emerald-950/60 p-3.5"
                />
                <span className="flex flex-col">
                  <span className="font-poppins text-[10px] font-semibold tracking-[0.5px] text-stone-500 uppercase">
                    Call us
                  </span>
                  <span className="font-mono text-xs text-white">
                    {siteConfig.contact.phone}
                  </span>
                </span>
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/4 p-2.75"
              >
                <Image
                  src="/icons/email.svg"
                  alt=""
                  width={14}
                  height={14}
                  className="size-3.5 shrink-0 rounded-lg border border-emerald-500/20 bg-emerald-950/60 p-3.5"
                />
                <span className="flex flex-col">
                  <span className="font-poppins text-[10px] font-semibold tracking-[0.5px] text-stone-500 uppercase">
                    Email us
                  </span>
                  <span className="font-mono text-xs text-white">
                    {siteConfig.contact.email}
                  </span>
                </span>
              </a>
            </div>
          </div>

          <FooterColumn heading="Navigation" items={footerNavigation} />
          <FooterColumn heading="Member" items={memberNav} />
          <FooterColumn heading="More" items={moreNav} />
        </div>

        <div className="flex flex-col items-center justify-between gap-6 pt-8 sm:flex-row">
          <p className="font-plus-jakarta-sans text-xs text-stone-400">
            Copyright @ {year} {siteConfig.name}, All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) =>
              social.href ? (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/6"
                >
                  <Image
                    src={social.icon}
                    alt=""
                    width={16}
                    height={16}
                    className="size-4"
                  />
                </a>
              ) : null,
            )}
          </div>
        </div>
      </Container>
    </footer>
  )
}
