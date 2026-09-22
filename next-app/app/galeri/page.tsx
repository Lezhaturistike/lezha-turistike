import {pageMetadata} from "@/app/seo";
export const metadata = pageMetadata("galeri", "sq");
import {client} from '@/sanity/lib/client'
import GaleriClient from './GaleriClient'

export const dynamic = 'force-dynamic'

export default async function GaleriPage() {
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

  return <GaleriClient destinacionet={destinacionet} />
}