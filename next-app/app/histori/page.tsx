import LocaleHeader from "@/app/components/LocaleHeader";
import { getPageContent } from "@/sanity/lib/content";
export const dynamic = "force-dynamic";
import defaults from "@/sanity/content/histori.json";
import BackToTop from "@/app/components/BackToTop";

import SiteFooter from "@/app/components/SiteFooter";
import HistoryBook from "./HistoryBook";

export default async function HistoriPage() {
  const content = await getPageContent("histori", defaults);
  return (<>
    <LocaleHeader locale="sq" current="histori" />
    <main id="home"><HistoryBook content={content}/></main>
    <BackToTop/><SiteFooter/>
  </>);
}
