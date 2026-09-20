import {client} from "@/sanity/lib/client";
import DestinacioneClient from "@/app/destinacione/DestinacioneClient";
export const dynamic="force-dynamic";
export default async function Page(){const data=await client.fetch(`*[_type=="destinacion"]|order(_createdAt asc){_id,titulli,"titulliEn":coalesce(titulliEn,titulli),kategoria,pershkrimi,"pershkrimiEn":coalesce(pershkrimiEn,pershkrimi),"fotoUrl":foto.asset->url,"galeriaUrls":galeria[].asset->url,burimi,harta}`);return <DestinacioneClient destinacionet={data} locale="en"/>;}
