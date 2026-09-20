import KulinariClient from "./KulinariClient";
import {client} from "@/sanity/lib/client";

export const dynamic = "force-dynamic";

export default async function KulinariPage() {
  const kulinari = await client.fetch(`
    *[_type == "kulinari"] | order(featured desc, _createdAt asc) {
      _id, titulli, kategoria, pershkrimi,
      "fotoUrl": foto.asset->url,
      "galeriaUrls": galeria[].asset->url,
      adresa, orari, telefoni, harta, menuja, website, social,
      rezervimi, burimi, featured
    }
  `);
  return <KulinariClient kulinari={kulinari} />;
}
