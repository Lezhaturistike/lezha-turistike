import defaults from "@/sanity/content/histori.json";
import {getPageContent} from "@/sanity/lib/content";
import {localizeContent} from "@/sanity/lib/localize";
import LocaleHeader from "@/app/components/LocaleHeader";
import SiteFooter from "@/app/components/SiteFooter";
import BackToTop from "@/app/components/BackToTop";
import HistoryBook from "@/app/histori/HistoryBook";
export const dynamic="force-dynamic";
export default async function EnglishHistory(){
 const raw=await getPageContent("histori",defaults); const content=localizeContent(raw,"en");
 return <><LocaleHeader locale="en" current="histori"/><main id="home"><HistoryBook content={content}/></main><BackToTop/><SiteFooter locale="en"/></>;
}
