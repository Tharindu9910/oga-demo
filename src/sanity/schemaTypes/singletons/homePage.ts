import { defineArrayMember, defineField, defineType } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero banner',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'string',
          validation: (Rule) => Rule.required().max(80),
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'imageWithAlt',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'ctaLabel',
          title: 'CTA label',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'ctaUrl',
          title: 'CTA URL',
          type: 'url',
          description:
            'Leave blank to show a disabled "Link coming soon" button.',
          validation: (Rule) =>
            Rule.uri({ scheme: ['http', 'https'], allowRelative: true }),
        }),
        defineField({
          name: 'secondaryCtaLabel',
          title: 'Secondary CTA label',
          type: 'string',
        }),
        defineField({
          name: 'secondaryCtaUrl',
          title: 'Secondary CTA URL',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({ scheme: ['http', 'https'], allowRelative: true }),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'milestones',
      title: 'Tracking progress & milestones',
      type: 'array',
      of: [defineArrayMember({ type: 'milestone' })],
    }),
  ],
  preview: {
    select: { title: 'hero.headline' },
    prepare: ({ title }) => ({ title: title || 'Home page' }),
  },
})
