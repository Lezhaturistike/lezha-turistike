import {pageMetadata} from "@/app/seo";
export const metadata = pageMetadata("destinacione", "sq");
import {client} from '@/sanity/lib/client'
import DestinacioneClient from './DestinacioneClient'

export const dynamic = 'force-dynamic'

export default async function DestinacionePage() {
  const destinacionet = await client.fetch(`
    *[_type == "destinacion"] | order(_createdAt asc) {
      _id,
      titulli,
      kategoria,
      pershkrimi,
      "fotoUrl": foto.asset->url,
      "galeriaUrls": galeria[].asset->url,
      burimi,
      harta
    }
  `)

  return (
    <DestinacioneClient
      destinacionet={destinacionet}
    />
  )
}