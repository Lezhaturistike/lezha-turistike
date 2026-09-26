import {pageMetadata} from "@/app/seo";
export const metadata = pageMetadata("kulinari", "en");
import {localizeContent} from "@/sanity/lib/localize";
import KulinariEnClient from "./KulinariEnClient";
import {client} from "@/sanity/lib/client";

export const dynamic = "force-dynamic";

export default async function KulinariPage() {
  const kulinari = await client.fetch(`
    *[_type == "kulinari"] | order(featured desc, _createdAt asc) {
      _id, titulli, titulliEn, kategoria, pershkrimi, pershkrimiEn,
      "fotoUrl": foto.asset->url,
      "galeriaUrls": galeria[].asset->url,
      adresa, adresaEn, orari, orariEn, telefoni, harta, menuja, website, social,
      rezervimi, burimi, cmimiNga, monedha, cmimiPer, featured,
      "rating": math::avg(*[_type == "kulinariReview" && place._ref == ^._id].rating),
      "reviewCount": count(*[_type == "kulinariReview" && place._ref == ^._id])
    }
  `);
  const localized=localizeContent(kulinari, "en");
  const jsonLd={"@context":"https://schema.org","@type":"ItemList",name:"Cuisine in Lezhë",itemListElement:localized.map((item:any,index:number)=>({"@type":"ListItem",position:index+1,item:{"@type":"Restaurant",name:item.titulli,description:item.pershkrimi,image:item.fotoUrl,address:item.adresa,telephone:item.telefoni,url:item.website}}))};
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd).replace(/</g,"\\u003c")}}/><KulinariEnClient kulinari={localized} /></>;
}
