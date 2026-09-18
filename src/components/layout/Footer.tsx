import { cacheLife } from 'next/cache'
import Image from 'next/image'
import Link from 'next/link'

import FooterNavLink from '@/components/layout/FooterNavLink'
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
    <div className="w-full text-left">
      <h4 className="font-poppins border-b border-white/10 pb-2 text-xs font-bold tracking-[1.2px] text-white uppercase">
        {heading}
      </h4>
      <ul className="mt-3 flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item.label}>
            <FooterNavLink href={item.href}>{item.label}</FooterNavLink>
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
    <footer className="bg-brand-700 border-t  border-white/10">
      <Container className="max-w-6xl py-10">
        <div className="flex flex-col gap-10 border-b border-white/10 pb-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          {/* Brand + contact */}
          <div className="flex flex-col items-center text-center lg:max-w-xs lg:items-start lg:text-left">
            <Link href="/" className="flex items-center gap-3.5">
              <Image
                src="/images/brand/crest.png"
                alt={`${siteConfig.name} crest`}
                width={48}
                height={48}
                className="size-12 shrink-0 rounded-full border border-white/15 bg-white/90 object-contain p-1.5"
              />
              <span className="font-poppins text-sm font-bold tracking-[1.4px] text-white uppercase">
                {siteConfig.name}
              </span>
            </Link>
            <p className="font-poppins mt-4 max-w-sm text-3xl leading-tight font-bold tracking-tight text-white">
              Give back to your
              <br />
              <span className="font-normal text-emerald-200 italic">
                Alma Mater
              </span>
            </p>
            <div className="mt-4 flex w-full max-w-sm flex-col gap-2">
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/4 p-2 text-left"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-950/60">
                  <Image
                    src="/icons/phone.svg"
                    alt=""
                    width={13}
                    height={13}
                    className="size-3.25"
                  />
                </span>
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
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/4 p-2 text-left"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-950/60">
                  <Image
                    src="/icons/email.svg"
                    alt=""
                    width={13}
                    height={13}
                    className="size-3.25"
                  />
                </span>
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

          {/* Navigation, Member — 2-col on mobile; Navigation, Member, More — one row on lg+ */}
          <div className="grid w-full grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-8 lg:w-auto lg:max-w-2xl lg:flex-1 lg:grid-cols-3">
            <FooterColumn heading="Navigation" items={footerNavigation} />
            <FooterColumn heading="Member" items={memberNav} />
            <div className="col-span-2 flex flex-col lg:col-span-1">
              <FooterColumn heading="More" items={moreNav} />
              <div className="mt-6 flex flex-col items-start gap-2.5">
                <p className="font-poppins text-[11px] font-semibold tracking-[0.55px] text-stone-400 uppercase">
                  Official Social Channels
                </p>
                <div className="flex items-center gap-2">
                  {socialLinks.map((social) => {
                    const icon = (
                      <Image
                        src={social.icon}
                        alt=""
                        width={16}
                        height={16}
                        className="size-4"
                      />
                    )
                    return social.href ? (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="flex size-8 items-center justify-center rounded-xl border border-white/10 bg-white/6"
                      >
                        {icon}
                      </a>
                    ) : (
                      <span
                        key={social.label}
                        aria-disabled="true"
                        title={`${social.label} — coming soon`}
                        className="flex size-8 items-center justify-center rounded-xl border border-white/10 bg-white/6 opacity-60"
                      >
                        {icon}
                      </span>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-6 sm:flex-row">
          <p className="font-plus-jakarta-sans text-xs text-stone-400">
            Copyright @ {year} {siteConfig.name}, All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className="font-plus-jakarta-sans text-xs text-stone-500 hover:text-emerald-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="font-plus-jakarta-sans text-xs text-stone-500 hover:text-emerald-300"
            >
              Terms and Conditions
            </Link>
            {/* <span className="font-plus-jakarta-sans text-xs text-stone-500">
              Cookie Settings
            </span> */}
            <a
              href="#top"
              className="font-poppins flex items-center gap-1 text-xs text-emerald-400"
            >
              Back to Top <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
