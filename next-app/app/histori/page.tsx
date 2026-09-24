import {pageMetadata} from "@/app/seo";
export const metadata = pageMetadata("histori", "sq");
import LocaleHeader from "@/app/components/LocaleHeader";
import { getPageContent } from "@/sanity/lib/content";
export const dynamic = "force-dynamic";
import historyDefaults from "@/sanity/content/histori.json";
import archaeologyDefaults from "@/sanity/content/arkeologji.json";
import BackToTop from "@/app/components/BackToTop";
import SiteFooter from "@/app/components/SiteFooter";
import HistoryBook from "./HistoryBook";

export default async function HistoriPage() {
  const [history, archaeology] = await Promise.all([
    getPageContent("histori", historyDefaults),
    getPageContent("arkeologji", archaeologyDefaults),
  ]);

  return (<>
    <LocaleHeader locale="sq" current="histori" />
    <main id="home">
      <HistoryBook content={history}/>
      <section id="arkeologji" className="section archaeology">
        <div className="section-top">
          <div>
            <span className="overline">{archaeology.text1}</span>
            <h2>{archaeology.text2}</h2>
          </div>
          <p>{archaeology.text3}</p>
        </div>

        <div className="archaeology-intro">
          <img loading="lazy" src={archaeology.src4} alt={archaeology.alt5} />
        </div>

        <div className="archaeology-grid">
          {archaeology.archaeology.map((item) => (
            <article key={item._key}>
              <span>{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>

        <p className="source-line">
          {archaeology.text6}{" "}
          <a href={archaeology.href7} target="_blank" rel="noopener noreferrer">{archaeology.text8}</a>
          {" · "}
          <a href={archaeology.href9} target="_blank" rel="noopener noreferrer">{archaeology.text10}</a>
          {archaeology.text11}
        </p>
      </section>
    </main>
    <BackToTop/><SiteFooter locale="sq"/>
  </>);
}
