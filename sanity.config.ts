import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schemaTypes, singletonTypes } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'

export default defineConfig({
  name: 'default',
  title: "ILMA International Old Girls' Association",

  projectId,
  dataset,

  // Phase 4 adds the Presentation tool for draft preview, once the
  // draft-mode API routes and a draft-aware fetch client exist.
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],

  schema: {
    types: schemaTypes,
  },

  document: {
    // Singletons: one document each, no duplicate/delete from the Studio.
    actions: (prev, context) =>
      singletonTypes.has(context.schemaType)
        ? prev.filter(({ action }) => action && !['delete', 'duplicate'].includes(action))
        : prev,
    newDocumentOptions: (prev, context) =>
      context.creationContext.type === 'global'
        ? prev.filter((item) => !singletonTypes.has(item.templateId))
        : prev,
  },
})
