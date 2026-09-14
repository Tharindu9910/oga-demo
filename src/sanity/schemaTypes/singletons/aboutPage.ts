import { defineArrayMember, defineField, defineType } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About page',
  type: 'document',
  fields: [
    defineField({
      name: 'president',
      title: 'Message from the President',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'role',
          title: 'Role',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'photo',
          title: 'Photo',
          type: 'imageWithAlt',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'message',
          title: 'Message',
          type: 'array',
          of: [defineArrayMember({ type: 'block' })],
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'team',
      title: 'Team',
      type: 'object',
      fields: [
        defineField({ name: 'year', title: 'Year', type: 'string' }),
        defineField({
          name: 'patrons',
          title: 'Patrons',
          type: 'array',
          of: [defineArrayMember({ type: 'teamMember' })],
        }),
        defineField({
          name: 'committee',
          title: 'Committee',
          type: 'array',
          of: [defineArrayMember({ type: 'teamMember' })],
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'About page' }),
  },
})
