import { defineArrayMember, defineField, defineType } from 'sanity'

export const chapter = defineType({
  name: 'chapter',
  title: 'Overseas chapter',
  type: 'document',
  fields: [
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [defineArrayMember({ type: 'imageWithAlt' })],
    }),
  ],
  preview: {
    select: { title: 'country', media: 'images.0' },
  },
})
