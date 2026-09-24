"use client";
import SiteFooter from "@/app/components/SiteFooter";
import LocaleHeader from "@/app/components/LocaleHeader";

import defaults from "@/sanity/content/home.json";
import BackToTop from "@/app/components/BackToTop";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

type HomeContent = typeof defaults & { heroSlides?: Array<{_key?: string; image?: string; alt?: string; caption?: string}> };

export type HomeLocale = "sq" | "en";

const ui = {
  sq: { home: "Home", destinations: "Destinacione", gallery: "Galeri", history: "Histori", archaeology: "Arkeologji", science: "Punime shkencore", culinary: "Kulinari", partners: "Partnerët", contact: "Kontakt", map: "Hap hartën", explore: "Eksploro", connect: "Le të lidhemi", info: "Për informacion dhe bashkëpunime.", contactUs: "Na kontakto", footerText: "Një qytet për t’u zbuluar.\nHistori, natyrë dhe trashëgimi kulturore, të lidhura përmes hartave dhe rrëfimeve.", location: "LEZHË · SHQIPËRI", address: "Rruga e Kalasë\nLezhë, Shqipëri", motto: "Njih historinë. Eksploro natyrën. Zbulo Lezhën." },
  en: { home: "Home", destinations: "Destinations", gallery: "Gallery", history: "History", archaeology: "Archaeology", science: "Scientific research", culinary: "Cuisine", partners: "Partners", contact: "Contact", map: "Open map", explore: "Explore", connect: "Get in touch", info: "For information and collaborations.", contactUs: "Contact us", footerText: "A city waiting to be discovered.\nHistory, nature and cultural heritage, connected through maps and stories.", location: "LEZHË · ALBANIA", address: "Castle Road\nLezhë, Albania", motto: "Know the history. Explore nature. Discover Lezhë." }
} as const;

const localizedPath = (path: string, locale: HomeLocale) => locale === "en" && path.startsWith("/") ? `/en${path === "/" ? "" : path}` : path;

export default function HomePage({ content, locale = "sq" }: { content: HomeContent; locale?: HomeLocale }) {


  const t = ui[locale];
  const slides = content.heroSlides?.length ? content.heroSlides : [{_key:"default", image:content.src1, alt:content.alt2, caption:""}];
  const [slide, setSlide] = useState(0);
  useEffect(() => { if (slides.length < 2) return; const timer = window.setInterval(() => setSlide((v) => (v + 1) % slides.length), 5000); return () => window.clearInterval(timer); }, [slides.length]);
  const activeSlide = slides[slide] || slides[0];

  return (
    <>
      {/* HEADER */}
      <LocaleHeader locale={locale} current="" />

      {/* MAIN */}
      <main id="home">
        {/* HERO */}
        <section className="hero reference-home-hero">
          <Image key={activeSlide._key || slide} className="hero-slide-image" src={activeSlide.image || content.src1} alt={activeSlide.alt || content.alt2} fill priority sizes="100vw" style={{objectFit:"cover"}} />

          <div className="hero-shade"></div>

          <div className="hero-content">
            <span className="overline light">{locale === "en" ? "WELCOME TO" : "MIRË SE VINI NË"}</span>

            <h1>Lezhë</h1>
            <h2 className="hero-subtitle">{locale === "en" ? "History, Nature, Culture" : "Histori, Natyrë, Kulturë"}</h2>

            <p>{locale === "en" ? "Discover a territory rich in heritage, nature and authentic experiences, brought together in one unforgettable journey." : "Zbuloni një territor unik ku trashëgimia, natyra dhe përvoja autentike ndërthuren në një udhëtim të paharrueshëm."}</p>

            <div className="hero-actions">
              <Link className="button primary" href={localizedPath(content.href7, locale)}>
                {locale === "en" ? "Discover destinations" : "Zbulo destinacionet"}
              </Link>

              <Link className="button ghost hero-digital-guide" href={localizedPath("/planifiko", locale)}>
                {locale === "en" ? "Explore the Digital Guide" : "Eksploro guidën digjitale"}
               </Link>
            </div>

            <div className="hero-plan-strip" aria-label={locale === "en" ? "Plan your visit" : "Planifiko vizitën"}>
              <div className="hero-plan-thumbs" aria-hidden="true">
                <span><Image src="/images/lezha.jpeg" alt="" fill sizes="44px" /></span>
                <span><Image src="/images/kala-3.jpeg" alt="" fill sizes="44px" /></span>
                <span><Image src="/images/akrolisi.jpeg" alt="" fill sizes="44px" /></span>
              </div>
              <span className="hero-plan-divider" aria-hidden="true"></span>
              <span className="hero-plan-copy">{locale === "en" ? <>Plan your visit<br/>to Lezhë</> : <>Planifiko vizitën<br/>tënde në Lezhë</>}</span>
              <Link className="hero-plan-map" href={localizedPath("/planifiko", locale)} aria-label={locale === "en" ? "Open the digital guide" : "Hap guidën digjitale"}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 6.5 8.5 4l7 2.5 5-2.5v13.5l-5 2.5-7-2.5-5 2.5V6.5Z"/><path d="M8.5 4v13.5M15.5 6.5V20"/></svg>
              </Link>
            </div>

          </div>

          <div className="hero-count">
            

            <span className="hero-slide-caption">{activeSlide.caption || ""}</span>
          </div>
        </section>

        {/* QUICK LINKS */}
        <section className="quick" aria-label="Eksploro sipas interesit">
          <span className="quick-intro">{content.text13}</span>

          <Link href={localizedPath(content.href14, locale)}>
            <span>◈</span>
            {content.text15}
            <b aria-hidden="true">↗</b>
          </Link>

          <Link href={localizedPath(content.href16, locale)}>
            <span>≈</span>
            {content.text17}
            <b aria-hidden="true">↗</b>
          </Link>

          <Link href={localizedPath(content.href18, locale)}>
            <span>◎</span>
            {content.text19}
            <b aria-hidden="true">↗</b>
          </Link>
        </section>

        {/* DIRECTORY */}
        <section
          className="home-directory section"
          aria-labelledby="directory-title"
        >
          <div className="section-top">
            <div>
              <span className="overline">{content.text20}</span>

              <h2 id="directory-title">{content.text21}</h2>
            </div>

            <p>{content.text22}</p>
          </div>

          <div className="directory-grid">
            {content.directory.map((item) => (
              <Link key={item._key} className="directory-card" href={localizedPath(item.url, locale)}>
                <span>{item.label}</span>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <span className="directory-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* BACK TO TOP */}
      <BackToTop locale={locale} />

      {/* FOOTER */}
      <SiteFooter locale={locale} />
    </>
  );
}
