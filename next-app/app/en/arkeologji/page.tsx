import {pageMetadata} from "@/app/seo";
export const metadata = pageMetadata("arkeologji", "en");
import { getPageContent } from "@/sanity/lib/content";
export const dynamic = "force-dynamic";
import defaults from "@/sanity/content/arkeologji.json";
import BackToTop from "@/app/components/BackToTop";
import LocaleHeader from "@/app/components/LocaleHeader";
import SiteFooter from "@/app/components/SiteFooter";
import {localizeContent} from "@/sanity/lib/localize";

export default async function EnglishArkeologjiPage() {
  const raw = await getPageContent("arkeologji", defaults);
  const content = localizeContent(raw, "en");
  return (
    <>
      <LocaleHeader locale="en" current="arkeologji"/>
      <main id="home">
        <section id="arkeologji" className="section archaeology">
          <div className="section-top">
            <div>
              <span className="overline">{content.text1}</span>
              <h1>{content.text2}</h1>
            </div>

            <p>{content.text3}</p>
          </div>

          <div className="archaeology-intro">
            <img loading="lazy" src={content.src4} alt={content.alt5} />
          </div>

          <div className="archaeology-grid">
            {content.archaeology.map((item) => (
              <article key={item._key}>
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>

          <p className="source-line">
            {content.text6}{" "}
            <a href={content.href7} target="_blank" rel="noopener noreferrer">
              {content.text8}
            </a>
            {" · "}
            <a href={content.href9} target="_blank" rel="noopener noreferrer">
              {content.text10}
            </a>
            {content.text11}
          </p>
        </section>
      </main>

      <BackToTop locale="en" />

      <SiteFooter locale="en"/>
    </>
  );
}
