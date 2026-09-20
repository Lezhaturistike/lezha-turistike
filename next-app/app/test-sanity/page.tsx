import {client} from '@/sanity/lib/client'

export default async function TestSanityPage() {
  const destinacionet = await client.fetch(`
    *[_type == "destinacion"]{
      _id,
      titulli,
      kategoria,
      pershkrimi,
      "fotoUrl": foto.asset->url,
      "galeriaUrls": galeria[].asset->url
    }
  `)

  return (
    <main style={{padding: '40px'}}>
      <h1>Test Sanity</h1>

      <pre>
        {JSON.stringify(destinacionet, null, 2)}
      </pre>
    </main>
  )
}