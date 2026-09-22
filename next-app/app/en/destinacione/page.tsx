import {pageMetadata} from "@/app/seo";
export const metadata = pageMetadata("destinacione", "en");
import {client} from "@/sanity/lib/client";
import DestinacioneEnClient from "./DestinacioneEnClient";
import {localizeContent} from "@/sanity/lib/localize";
export const dynamic="force-dynamic";
export default async function DestinationsPage(){
 const destinacionet=await client.fetch(`*[_type=="destinacion"]|order(_createdAt asc){_id,titulli,titulliEn,kategoria,pershkrimi,pershkrimiEn,"fotoUrl":foto.asset->url,"galeriaUrls":galeria[].asset->url,burimi,harta}`);
 const localized=localizeContent(destinacionet,"en");
 const jsonLd={"@context":"https://schema.org","@type":"ItemList",name:"Places to visit in Lezhë",itemListElement:localized.map((item:any,index:number)=>({"@type":"ListItem",position:index+1,item:{"@type":"TouristAttraction",name:item.titulli,description:item.pershkrimi,image:item.fotoUrl}}))};
 return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd).replace(/</g,"\\u003c")}}/><DestinacioneEnClient destinacionet={localized}/></>;
}
