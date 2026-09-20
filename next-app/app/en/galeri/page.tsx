import {localizeContent} from "@/sanity/lib/localize";
import {client} from '@/sanity/lib/client'
import GaleriEnClient from './GaleriEnClient'

export const dynamic = 'force-dynamic'

export default async function GaleriPage() {
  const destinacionet = await client.fetch(`
    *[_type == "destinacion"] | order(_createdAt asc) {
      _id,
      titulli, titulliEn,
      kategoria,
      pershkrimi, pershkrimiEn,
      "fotoUrl": foto.asset->url,
      "galeriaUrls": galeria[].asset->url,
      burimi,
      harta
    }
  `)

  return <GaleriEnClient destinacionet={localizeContent(destinacionet, "en")} />
}