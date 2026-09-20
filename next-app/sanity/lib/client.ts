import {createClient} from 'next-sanity'

export const client = createClient({
  projectId: 'ko1ud3ml',
  dataset: 'production',
  apiVersion: '2026-09-20',
  useCdn: true,
})