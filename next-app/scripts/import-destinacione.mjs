import {createClient} from '@sanity/client'
import {createReadStream} from 'node:fs'
import path from 'node:path'

if (!process.env.SANITY_API_TOKEN) {
  console.error('❌ SANITY_API_TOKEN mungon.')
  process.exit(1)
}

const client = createClient({
  projectId: 'ko1ud3ml',
  dataset: 'production',
  apiVersion: '2026-09-20',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const destinacionet = [
  {
    titulli: 'Kalaja e Lezhës',
    kategoria: 'histori',
    pershkrimi:
      'Kalaja ndodhet mbi qytet dhe përfshin struktura e mure nga periudha të ndryshme. Pozicioni i saj e bën të dukshme lidhjen ndërmjet monumentit, Lezhës dhe peizazhit përreth.',
    foto: 'lezha.jpeg',
    galeria: [
      'lezha.jpeg',
      'kala.jpeg',
      'kala-1.jpeg',
      'kala-3.jpeg',
    ],
    burimi: 'https://lezhaturistike.wordpress.com/vizito/',
  },
  {
    titulli: 'Akrolisi',
    kategoria: 'arkeologji',
    pershkrimi:
      'Akrolisi është një vendbanim i fortifikuar i hershëm në zonën e Malit të Shëlbuemit. Gjurmët e tij dhe pozicioni në reliev ndihmojnë në leximin e peizazhit arkeologjik të Lezhës.',
    foto: 'akrolisi.jpeg',
    galeria: ['akrolisi.jpeg'],
    burimi: 'https://lezhaturistike.wordpress.com/vizito/',
  },
  {
    titulli: 'Vendvarrimi i Skënderbeut',
    kategoria: 'histori',
    pershkrimi:
      'Vendvarrimi i Gjergj Kastriotit është një vend përkujtimor në Lezhë. Memoriali i sotëm u ndërtua në vitin 1981 mbi zonën e kishës së Shën Kollit.',
    foto: 'memorial-1.jpeg',
    galeria: [
      'memorial-1.jpeg',
      'memorial-2.png',
    ],
    burimi: 'https://lezha.gov.al/resurset-turistike/',
  },
  {
    titulli: 'Kune–Vain–Tale',
    kategoria: 'natyre',
    pershkrimi:
      'Kompleksi ligatinor i Kune-Vainit është një destinacion për natyrën dhe vëzhgimin e shpendëve pranë Lezhës.',
    foto: 'kune-vain.jpeg',
    galeria: ['kune-vain.jpeg'],
    burimi: 'https://lezhaturistike.wordpress.com/vizito/',
  },
]

async function uploadImage(filename) {
  const filePath = path.join(process.cwd(), 'public', 'images', filename)

  console.log(`📷 Upload: ${filename}`)

  return client.assets.upload(
    'image',
    createReadStream(filePath),
    {filename}
  )
}

async function importDestinacion(destinacion) {
  console.log(`\n📍 ${destinacion.titulli}`)

  const existing = await client.fetch(
    `*[_type == "destinacion" && titulli == $titulli][0]{_id}`,
    {titulli: destinacion.titulli}
  )

  const fotoAsset = await uploadImage(destinacion.foto)

  const galleryAssets = []

  for (const filename of destinacion.galeria) {
    const asset = await uploadImage(filename)

    galleryAssets.push({
      _type: 'image',
      _key: asset._id.replace('image-', '').slice(0, 20),
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    })
  }

  const data = {
    _type: 'destinacion',
    titulli: destinacion.titulli,
    kategoria: destinacion.kategoria,
    pershkrimi: destinacion.pershkrimi,

    foto: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: fotoAsset._id,
      },
    },

    galeria: galleryAssets,

    burimi: destinacion.burimi,

    harta:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent(destinacion.titulli + ', Lezhë, Albania'),
  }

  if (existing?._id) {
    await client.patch(existing._id).set(data).commit()
    console.log(`✅ Përditësuar: ${destinacion.titulli}`)
  } else {
    await client.create(data)
    console.log(`✅ Krijuar: ${destinacion.titulli}`)
  }
}

async function main() {
  console.log('🚀 Filloi importi në Sanity...')

  for (const destinacion of destinacionet) {
    await importDestinacion(destinacion)
  }

  console.log('\n🎉 IMPORTI PËRFUNDOI ME SUKSES')
}

main().catch((error) => {
  console.error('\n❌ Importi dështoi:')
  console.error(error)
  process.exit(1)
})