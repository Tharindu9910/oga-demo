import { defineField, defineType } from 'sanity'

import { MAX_IMAGE_SIZE_BYTES, maxAssetSize } from '../lib/maxAssetSize'

export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  title: 'Image',
  type: 'image',
  options: { hotspot: true },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      description: 'Describe the image for screen readers and SEO.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  validation: (Rule) =>
    Rule.custom(maxAssetSize(MAX_IMAGE_SIZE_BYTES, 'Image')),
})
