import { defineArrayMember, defineField, defineType } from 'sanity'

export const loyaltyPage = defineType({
  name: 'loyaltyPage',
  title: 'Loyalty program page',
  type: 'document',
  fields: [
    defineField({
      name: 'merchants',
      title: 'Our merchants',
      type: 'array',
      of: [defineArrayMember({ type: 'merchant' })],
      description: 'Drag to reorder.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Loyalty program page' }),
  },
})
