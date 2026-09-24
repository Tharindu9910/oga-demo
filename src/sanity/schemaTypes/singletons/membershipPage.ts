import { defineArrayMember, defineField, defineType } from 'sanity'

export const membershipPage = defineType({
  name: 'membershipPage',
  title: 'Become a Member page',
  type: 'document',
  fields: [
    defineField({
      name: 'poster',
      title: 'Poster',
      type: 'imageWithAlt',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'documentsRequired',
      title: 'Documents required',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'payment',
      title: 'Payment',
      type: 'object',
      fields: [
        defineField({
          name: 'lifeMembership',
          title: 'Life membership',
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'badge', title: 'Badge', type: 'string' }),
            defineField({ name: 'price', title: 'Price', type: 'string' }),
          ],
        }),
        defineField({
          name: 'replacementCard',
          title: 'Replacement card',
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'price', title: 'Price', type: 'string' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA label',
      type: 'string',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'CTA URL',
      description: '',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({ scheme: ['http', 'https'], allowRelative: true }),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Become a Member page' }),
  },
})
