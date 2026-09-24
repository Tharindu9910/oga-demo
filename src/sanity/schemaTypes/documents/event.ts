import { orderRankField } from '@sanity/orderable-document-list'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Event',
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
      description: 'Move the event between Upcoming and Past yourself.',
      options: {
        list: [
          { title: 'Upcoming', value: 'upcoming' },
          { title: 'Past', value: 'past' },
        ],
        layout: 'radio',
      },
      initialValue: 'upcoming',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    // defineField({
    //   name: 'description',
    //   title: 'Description',
    //   type: 'text',
    //   rows: 3,
    // }),
    defineField({
      name: 'images',
      title: 'Images',
      description: 'Only shown on the site for past events.',
      type: 'array',
      of: [defineArrayMember({ type: 'imageWithAlt' })],
      hidden: ({ parent }) => parent?.status !== 'past',
    }),
    defineField({
      name: 'links',
      title: 'Links',
      description:
        'Only shown on the site for past events. Limited to one link per event.',
      type: 'array',
      of: [defineArrayMember({ type: 'eventLink' })],
      hidden: ({ parent }) => parent?.status !== 'past',
      validation: (Rule) => Rule.max(1),
    }),
    orderRankField({ type: 'event' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'status', media: 'images.0' },
  },
})
