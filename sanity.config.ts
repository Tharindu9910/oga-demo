import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schemaTypes } from './src/sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: "ILMA International Old Girls' Association",

  projectId,
  dataset,

  // Phase 3 adds structure.ts (pinned singletons, Ongoing/Completed and
  // Upcoming/Past views) and the Presentation tool for draft preview.
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],

  schema: {
    types: schemaTypes,
  },
})
