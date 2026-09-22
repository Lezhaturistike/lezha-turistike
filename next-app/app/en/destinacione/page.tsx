import {pageMetadata} from "@/app/seo";
export const metadata = pageMetadata("destinacione", "en");
import {client} from "@/sanity/lib/client";
import DestinacioneEnClient from "./DestinacioneEnClient";
import {localizeContent} from "@/sanity/lib/localize";
export const dynamic="force-dynamic";
export default async function DestinationsPage(){
 const destinacionet=await client.fetch(`*[_type=="destinacion"]|order(_createdAt asc){_id,titulli,titulliEn,kategoria,pershkrimi,pershkrimiEn,"fotoUrl":foto.asset->url,"galeriaUrls":galeria[].asset->url,burimi,harta}`);
 return <DestinacioneEnClient destinacionet={localizeContent(destinacionet,"en")}/>;
}
