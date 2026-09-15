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
  // Left empty until the client supplies these (see plans/plan.md, "Still
  // needed from you"). Components must render sensibly with an empty href.
  ctaUrls: {
    becomeAMember: '/membership',
    activeVolunteer: '',
    donate: '',
    loyaltyWhatsapp: '',
    sportsWhatsapp: '',
    sportsNetballWhatsapp: '',
    sportsBadmintonWhatsapp: '',
    sportsCarnivalWhatsapp: '',
    faqWhatsapp: '',
  },
  social: {
    facebook: '',
    instagram: '',
    linkedin: '',
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
  // No page/URL yet — rendered as non-clickable (see FooterNavLink).
  { label: "Ilma International Girls' School", href: '' },
]

export const footerNavigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Member', href: '/membership' },
  { label: 'Events', href: '/events' },
]
