import {pageMetadata} from "@/app/seo";
import AccommodationClient from "@/app/akomodim/AccommodationClient";
import {client} from "@/sanity/lib/client";
import {localizeContent} from "@/sanity/lib/localize";
export const metadata=pageMetadata("akomodim","en");
export const dynamic="force-dynamic";
export default async function Page(){const items=await client.fetch(`*[_type=="akomodim"]|order(_createdAt asc){_id,titulli,titulliEn,lloji,pershkrimi,pershkrimiEn,"fotoUrl":foto.asset->url,"galeriaUrls":galeria[].asset->url,adresa,adresaEn,zona,telefoni,website,rezervimi,harta,cmimiNga,monedha,"lat":lokacioni.lat,"lng":lokacioni.lng}`);return <AccommodationClient items={localizeContent(items,"en")} en/>}