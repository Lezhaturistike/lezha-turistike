import { getPageContent } from "@/sanity/lib/content";
export const dynamic = "force-dynamic";
import defaults from "@/sanity/content/partneret.json";
import BackToTop from "@/app/components/BackToTop";
import LocaleHeader from "@/app/components/LocaleHeader";
import SiteFooter from "@/app/components/SiteFooter";
import {localizeContent} from "@/sanity/lib/localize";

export default async function EnglishPartneretPage() {
  const raw = await getPageContent("partneret", defaults);
  const content = localizeContent(raw, "en");
  return (
    <>
      <LocaleHeader locale="en" current="partneret"/>
      <main id="home">
        <section id="partneret" className="section partners">
          <div className="section-top">
            <div>
              <span className="overline">{content.text1}</span>

              <h2>{content.text2}</h2>
            </div>

            <p>{content.text3}</p>
          </div>

          <div className="partner-grid">
            {content.partners.map((item) => (
              <a
                key={item._key}
                className={`partner-card${item.role === "FINANCUES" ? " funder" : ""}${!item.image ? " partner-text" : ""}`}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{item.role}</span>
                {item.image && <img src={item.image} alt={item.alt} />}
                <strong>{item.title}</strong>
                {item.subtitle && <small>{item.subtitle}</small>}
              </a>
            ))}
          </div>

          <p className="source-line">
            {content.text4}{" "}
            <a href={content.href5} target="_blank" rel="noopener noreferrer">
              {content.text6}
            </a>
            .
          </p>
        </section>
      </main>

      <BackToTop />

      <SiteFooter locale="en"/>
    </>
  );
}
