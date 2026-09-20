import {client} from '@/sanity/lib/client'
import DestinacioneClient from './DestinacioneClient'

export default async function DestinacionePage() {
  const destinacionet = await client.fetch(`
    *[_type == "destinacion"]{
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

  return <DestinacioneClient destinacionet={destinacionet} />
}