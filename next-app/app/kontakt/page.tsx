import SiteFooter from "@/app/components/SiteFooter";
import LocaleHeader from "@/app/components/LocaleHeader";
import { getPageContent } from "@/sanity/lib/content";
export const dynamic = "force-dynamic";
import defaults from "@/sanity/content/kontakt.json";
import BackToTop from "@/app/components/BackToTop";

import Link from "next/link";

export default async function KontaktPage() {
  const content = await getPageContent("kontakt", defaults);
  return (
    <>
      <LocaleHeader locale="sq" current="kontakt" />

      <main id="home">
        <section id="kontakt" className="contact section">
          <div>
            <span className="overline">{content.text1}</span>

            <h2>{content.text2}</h2>

            <p>{content.text3}</p>

            <div className="contact-actions">
              <Link className="button dark" href={content.href4}>
                {content.text5}{" "}
                <span className="arrow-icon" aria-hidden="true">
                  ↗
                </span>
              </Link>

              <a
                className="button outline"
                href={content.href6}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content.text7}{" "}
                <span className="arrow-icon" aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>
          </div>

          <div className="contact-info">
            <span>{content.text8}</span>

            <a href={content.href9}>
              {content.text10}{" "}
              <span className="arrow-icon" aria-hidden="true">
                ↗
              </span>
            </a>

            <p>{content.text11}</p>

            <a href={content.href12} target="_blank" rel="noopener noreferrer">
              {content.text13}{" "}
              <span className="arrow-icon" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
        </section>
      </main>

      <BackToTop />

      <SiteFooter locale="sq" />
    </>
  );
}
