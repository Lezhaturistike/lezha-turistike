import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {destinacion} from './sanity/schemaTypes/destinacion'

export default defineConfig({
  name: 'default',
  title: 'Lezha Turistike',
  basePath: '/studio',

  projectId: 'ko1ud3ml',
  dataset: 'production',

  plugins: [structureTool()],

  schema: {
    types: [destinacion],
  },
})