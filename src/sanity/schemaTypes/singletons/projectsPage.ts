import { defineArrayMember, defineField, defineType } from 'sanity'

export const projectsPage = defineType({
  name: 'projectsPage',
  title: 'Projects page',
  type: 'document',
  fields: [
    defineField({
      name: 'dehiwala',
      title: 'Recent Project',
      type: 'object',
      fields: [
        defineField({
          name: 'show',
          title: 'Show this section',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'body',
          title: 'Body',
          type: 'array',
          of: [defineArrayMember({ type: 'block' })],
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'imageWithAlt',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'highlightsLabel',
          title: 'Highlights link label',
          type: 'string',
        }),
        defineField({
          name: 'highlightsUrl',
          title: 'Highlights link URL',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({ scheme: ['http', 'https'], allowRelative: true }),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Projects page' }),
  },
})
