import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'activeVolunteerUrl',
      title: 'Volunteer sign-up URL',
      description:
        'Used by the Events page "Join Now" button and the Active Volunteer page "Join Us Now" button.',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({ scheme: ['http', 'https'], allowRelative: true }),
    }),
    defineField({
      name: 'donateUrl',
      title: 'Donate button URL',
      description:
        'Used by the Projects page "Donate Now" buttons.',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({ scheme: ['http', 'https'], allowRelative: true }),
    }),
    defineField({
      name: 'whatsappUrl',
      title: 'WhatsApp contact link',
      description:
        'Used by the "WhatsApp Click to Chat" buttons on the FAQ, Loyalty Program, and Sports pages, and by the footer\'s WhatsApp button.',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({ scheme: ['http', 'https'], allowRelative: true }),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
})
