import {pageMetadata} from "@/app/seo";
import AccommodationClient from "./AccommodationClient";
import {client} from "@/sanity/lib/client";
export const metadata=pageMetadata("akomodim","sq");
export const dynamic="force-dynamic";
export default async function Page(){const items=await client.fetch(`*[_type=="akomodim"]|order(_createdAt asc){_id,titulli,lloji,pershkrimi,"fotoUrl":foto.asset->url,"galeriaUrls":galeria[].asset->url,adresa,zona,telefoni,website,rezervimi,harta,cmimiNga,monedha}`);return <AccommodationClient items={items}/>}