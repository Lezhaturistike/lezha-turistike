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
  const experience = locale === "en" ? {
    overline: "EXPLORE LEZHË",
    title: "Choose your way to experience the city.",
    description: "History, archaeology, landscape and digital maps come together in one journey.",
    cta: "Explore all destinations",
    cards: [
      { n: "01", title: "Walk through history", text: "From Lissus and Akrolis to the Castle and the memory of the city.", href: "/histori", image: "/images/kala-3.jpeg" },
      { n: "02", title: "Explore archaeology", text: "Discover documented sites, research and the ancient landscape of Lezhë.", href: "/arkeologji", image: "/images/akrolisi.jpeg" },
      { n: "03", title: "Open the digital map", text: "Move from stories to place through 2D maps, 3D scenes and Web GIS.", href: "/webgis", image: "/images/lezha.jpeg" },
    ]
  } : {
    overline: "EKSPLORO LEZHËN",
    title: "Zgjidh mënyrën tënde për ta përjetuar qytetin.",
    description: "Historia, arkeologjia, peizazhi dhe hartat digjitale bashkohen në një udhëtim të vetëm.",
    cta: "Eksploro të gjitha destinacionet",
    cards: [
      { n: "01", title: "Ec nëpër histori", text: "Nga Lissusi dhe Akrolisi te Kalaja dhe kujtesa e qytetit.", href: "/histori", image: "/images/kala-3.jpeg" },
      { n: "02", title: "Zbulo arkeologjinë", text: "Eksploro sitet e dokumentuara, kërkimin dhe peizazhin e lashtë të Lezhës.", href: "/arkeologji", image: "/images/akrolisi.jpeg" },
      { n: "03", title: "Hap hartën digjitale", text: "Kalo nga rrëfimi te territori përmes hartave 2D, skenave 3D dhe Web GIS.", href: "/webgis", image: "/images/lezha.jpeg" },
    ]
  };

  return (
    <>
      {/* HEADER */}
      <LocaleHeader locale={locale} current="" />

      {/* MAIN */}
      <main id="home">
        {/* HERO */}
        <section className="hero">
          <Image key={activeSlide._key || slide} className="hero-slide-image" src={activeSlide.image || content.src1} alt={activeSlide.alt || content.alt2} fill priority sizes="100vw" style={{objectFit:"cover"}} />

          <div className="hero-shade"></div>

          <div className="hero-content">
            <span className="overline light">{content.text3}</span>

            <h1>
              {content.text4}
              <br />
              <em>{content.text5}</em>
            </h1>

            <p>{content.text6}</p>

            <div className="hero-actions">
              <Link className="button primary" href={localizedPath(content.href7, locale)}>
                {content.text8}{" "}
                <span>
                  <span className="arrow-icon" aria-hidden="true">
                    ↗
                  </span>
                </span>
              </Link>

              <Link className="button ghost" href={localizedPath(content.href9, locale)}>
                {content.text10}
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

        {/* IMMERSIVE EXPLORE */}
        <section className="modern-explore" aria-labelledby="modern-explore-title">
          <div className="modern-explore-head">
            <div>
              <span className="overline">${experience.overline}</span>
              <h2 id="modern-explore-title">${experience.title}</h2>
            </div>
            <div className="modern-explore-intro">
              <p>${experience.description}</p>
              <Link href={localizedPath("/destinacione", locale)}>
                ${experience.cta} <span className="arrow-icon" aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
          <div className="modern-explore-grid">
            {experience.cards.map((card) => (
              <Link key={card.n} href={localizedPath(card.href, locale)} className="modern-explore-card">
                <Image src={card.image} alt="" fill sizes="(max-width: 720px) 100vw, 33vw" />
                <span className="modern-explore-shade" />
                <span className="modern-explore-number">{card.n}</span>
                <span className="modern-explore-copy">
                  <strong>{card.title}</strong>
                  <small>{card.text}</small>
                  <b aria-hidden="true"><span className="arrow-icon">↗</span></b>
                </span>
              </Link>
            ))}
          </div>
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
