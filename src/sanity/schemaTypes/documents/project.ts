import { orderRankField } from '@sanity/orderable-document-list'
import { defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Ongoing', value: 'ongoing' },
          { title: 'Completed', value: 'completed' },
        ],
        layout: 'radio',
      },
      initialValue: 'ongoing',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'imageWithAlt',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'progress',
      title: 'Progress (%)',
      type: 'number',
      description: 'Only shown on the site while the project is ongoing.',
      hidden: ({ parent }) => parent?.status !== 'ongoing',
      validation: (Rule) =>
        Rule.min(0).max(100).custom((value, context) => {
          const parent = context.parent as { status?: string } | undefined
          if (parent?.status === 'ongoing' && (value === undefined || value === null)) {
            return 'Required while the project is ongoing'
          }
          return true
        }),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    orderRankField({ type: 'project' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'status', media: 'image' },
  },
})
