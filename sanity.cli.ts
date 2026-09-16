import { defineCliConfig } from 'sanity/cli'

import { dataset, projectId } from './src/sanity/env'

export default defineCliConfig({
  api: { projectId, dataset },
  deployment: { appId: 'tp2zurygy7j5b8a3ivue2lza' },
})
