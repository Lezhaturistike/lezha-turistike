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
      permbledhje,
      cfareSheh,
      keshilleVizite,
      kohezgjatja,
      oraRekomanduar,
      burimiTitull,
      "fotoUrl": foto.asset->url,
      "galeriaUrls": galeria[].asset->url,
      burimi,
      harta
    }
  `)

  const resources=destinacionet
  const jsonLd={"@context":"https://schema.org","@type":"ItemList",name:"Destinacione për t'u vizituar në Lezhë",itemListElement:resources.map((item:any,index:number)=>({"@type":"ListItem",position:index+1,item:{"@type":"TouristAttraction",name:item.titulli,description:item.pershkrimi,image:item.fotoUrl}}))};
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd).replace(/</g,"\\u003c")}}/><DestinacioneClient destinacionet={resources}/></>)
}