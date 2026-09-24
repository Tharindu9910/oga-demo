export const siteConfig = {
  name: 'ILMA OGA',
  fullName: "ILMA International Old Girls' Association",
  tagline: 'EST. 1998 • COLOMBO',
  description:
    "The Ilma International Old Girls' Association (IIOGA) brings together alumni of Ilma International Girls' School to uplift, enhance and develop their alma mater.",
  contact: {
    phone: '+94 76 055 5164',
    email: 'secretaryiioga@gmail.com',
  },
  // "Become a Member", "Join Now"/"Join Us Now" (volunteer), "Donate Now",
  // and the general WhatsApp contact URL are editable in the Studio
  // (`siteSettings` singleton) instead of hardcoded here — see
  // `getSiteSettings()`. The Sports page's per-sport "Join Us" buttons
  // scroll to that same WhatsApp CTA rather than linking to a separate
  // per-sport group.
  social: {
    facebook: 'https://web.facebook.com/Ilmaoga/?_rdc=1&_rdr#',
    instagram: 'https://www.instagram.com/ilmaoga/?hl=en',
    linkedin: 'https://www.linkedin.com/company/ilma-international-old-girls-association/',
  },
} as const

export type NavItem = {
  label: string
  href: string
}

export const primaryNav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Events', href: '/events' },
]

export const memberNav: NavItem[] = [
  { label: 'Lifetime Membership', href: '/membership' },
  { label: 'Active Volunteer', href: '/membership/active-volunteer' },
  { label: 'Overseas Chapters', href: '/membership/overseas-chapters' },
]

export const moreNav: NavItem[] = [
  { label: 'Loyalty Program', href: '/loyalty-program' },
  { label: 'Sports', href: '/sports' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Frequently Asked Questions', href: '/faq' },
  { label: "Ilma International Girls' School", href: 'https://ilma.edu.lk/' },
]

export const footerNavigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Member', href: '/membership' },
  { label: 'Events', href: '/events' },
]
