import KulinariClient from "./KulinariClient";
import {client} from "@/sanity/lib/client";

export const dynamic = "force-dynamic";

export default async function KulinariPage() {
  const kulinari = await client.fetch(`
    *[_type == "kulinari"] | order(featured desc, _createdAt asc) {
      _id, titulli, kategoria, pershkrimi,
      pershkrimiEn,
      "fotoUrl": foto.asset->url,
      "galeriaUrls": galeria[].asset->url,
      adresa, adresaEn, orari, orariEn, telefoni, harta, menuja, website, social,
      rezervimi, burimi, cmimiNga, monedha, cmimiPer, featured,
      "rating": math::avg(*[_type == "kulinariReview" && place._ref == ^._id].rating),
      "reviewCount": count(*[_type == "kulinariReview" && place._ref == ^._id])
    }
  `);
  return <KulinariClient kulinari={kulinari} />;
}
