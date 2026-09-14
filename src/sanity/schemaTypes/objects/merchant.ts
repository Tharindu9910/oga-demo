import { defineField, defineType } from 'sanity'

export const merchant = defineType({
  name: 'merchant',
  title: 'Merchant',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'imageWithAlt',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'name', media: 'logo' },
  },
})
