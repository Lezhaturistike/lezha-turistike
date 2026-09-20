"use client";

import defaults from "@/sanity/content/home.json";
import BackToTop from "@/app/components/BackToTop";
import Link from "next/link";
import { useEffect, useState } from "react";

type HomeContent = typeof defaults & { heroSlides?: Array<{_key?: string; image?: string; alt?: string; caption?: string}> };

export type HomeLocale = "sq" | "en";

const ui = {
  sq: { home: "Home", destinations: "{t.destinations}", gallery: "{t.gallery}", history: "{t.history}", archaeology: "{t.archaeology}", science: "{t.science}", culinary: "{t.culinary}", partners: "{t.partners}", contact: "{t.contact}", map: "Hap hartën", explore: "Eksploro", connect: "Le të lidhemi", info: "Për informacion dhe bashkëpunime.", contactUs: "Na kontakto", footerText: "Një qytet për t’u zbuluar.\nHistori, natyrë dhe trashëgimi kulturore, të lidhura përmes hartave dhe rrëfimeve.", location: "LEZHË · SHQIPËRI", address: "Rruga e Kalasë\nLezhë, Shqipëri", motto: "Njih historinë. Eksploro natyrën. Zbulo Lezhën." },
  en: { home: "Home", destinations: "Destinations", gallery: "Gallery", history: "History", archaeology: "Archaeology", science: "Scientific research", culinary: "Cuisine", partners: "Partners", contact: "Contact", map: "Open map", explore: "Explore", connect: "Get in touch", info: "For information and collaborations.", contactUs: "Contact us", footerText: "A city waiting to be discovered.\nHistory, nature and cultural heritage, connected through maps and stories.", location: "LEZHË · ALBANIA", address: "Castle Road\nLezhë, Albania", motto: "Know the history. Explore nature. Discover Lezhë." }
} as const;

const localizedPath = (path: string, locale: HomeLocale) => locale === "en" && path.startsWith("/") ? `/en${path === "/" ? "" : path}` : path;

export default function HomePage({ content, locale = "sq" }: { content: HomeContent; locale?: HomeLocale }) {


  const [menuOpen, setMenuOpen] = useState(false);
  const t = ui[locale];
  const slides = content.heroSlides?.length ? content.heroSlides : [{_key:"default", image:content.src1, alt:content.alt2, caption:""}];
  const [slide, setSlide] = useState(0);
  useEffect(() => { if (slides.length < 2) return; const timer = window.setInterval(() => setSlide((v) => (v + 1) % slides.length), 5000); return () => window.clearInterval(timer); }, [slides.length]);
  const activeSlide = slides[slide] || slides[0];

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <Link
          href={locale === "en" ? "/en#home" : "/#home"}
          className="logo"
          aria-label={locale === "en" ? "Lezha Turistike, homepage" : "Lezha Turistike, faqja kryesore"}
        >
          <span className="logo-mark">
            L<span>✦</span>
          </span>

          <span>
            LEZHA
            <br />
            <b>TURISTIKE</b>
          </span>
        </Link>

        <nav
          className={`nav ${menuOpen ? "open" : ""}`}
          id="nav"
          aria-label="Navigimi kryesor"
        >
          <Link href={locale === "en" ? "/en" : "/"} onClick={() => setMenuOpen(false)}>{t.home}</Link>

          <Link href="/destinacione" onClick={() => setMenuOpen(false)}>
            Destinacione
          </Link>

          <Link href="/galeri" onClick={() => setMenuOpen(false)}>
            Galeri
          </Link>

          <Link href="/histori" onClick={() => setMenuOpen(false)}>
            Histori
          </Link>

          <Link href="/arkeologji" onClick={() => setMenuOpen(false)}>
            Arkeologji
          </Link>

          <Link href="/webgis" onClick={() => setMenuOpen(false)}>
            Web GIS
          </Link>

          <Link href="/shkenca" onClick={() => setMenuOpen(false)}>
            Punime shkencore
          </Link>

          <Link href="/kulinari" onClick={() => setMenuOpen(false)}>
            Kulinari
          </Link>

          <Link href="/partneret" onClick={() => setMenuOpen(false)}>
            Partnerët
          </Link>

          <Link href="/kontakt" onClick={() => setMenuOpen(false)}>
            Kontakt
          </Link>
          <span className="language-switch" aria-label="Language"><Link href="/">SQ</Link><span> / </span><Link href="/en">EN</Link></span>
        </nav>

        <button
          className="menu-btn"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="nav"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          Menu <span>☰</span>
        </button>

        <Link className="nav-cta" href={localizedPath("/webgis", locale)}>
          {t.map}{" "}
          <span>
            <span className="arrow-icon" aria-hidden="true">
              ↗
            </span>
          </span>
        </Link>
      </header>

      {/* MAIN */}
      <main id="home">
        {/* HERO */}
        <section className="hero">
          <img key={activeSlide._key || slide} className="hero-slide-image" src={activeSlide.image || content.src1} alt={activeSlide.alt || content.alt2} fetchPriority="high" />

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
            <span>{content.text11}</span>

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
      <BackToTop />

      {/* FOOTER */}
      <footer className="site-footer" aria-label="Fundi i faqes">
        <div className="footer-main">
          <Link
            href={locale === "en" ? "/en#home" : "/#home"}
            className="logo"
            aria-label="Lezha Turistike, faqja kryesore"
          >
            <span className="logo-mark">
              L<span>✦</span>
            </span>

            <span>
              LEZHA
              <br />
              <b>TURISTIKE</b>
            </span>
          </Link>

          <p>
            Një qytet për t’u zbuluar.
            <br />
            Histori, natyrë dhe trashëgimi kulturore, të lidhura përmes hartave
            dhe rrëfimeve.
          </p>

          <span className="footer-location">LEZHË · SHQIPËRI</span>
        </div>

        <nav
          className="footer-navigation"
          aria-label="Navigimi në fund të faqes"
        >
          <h2>Eksploro</h2>

          <div className="footer-links">
            <Link href="/destinacione">Destinacione</Link>

            <Link href="/histori">Histori</Link>

            <Link href="/arkeologji">Arkeologji</Link>

            <Link href="/webgis">Web GIS</Link>

            <Link href="/shkenca">Punime shkencore</Link>

            <Link href="/kulinari">Kulinari</Link>

            <Link href="/partneret">Partnerët</Link>

            <Link href="/galeri">Galeri</Link>
          </div>
        </nav>

        <div className="footer-contact">
          <h2>Le të lidhemi</h2>

          <p>Për informacion dhe bashkëpunime.</p>

          <a className="footer-email" href="mailto:lezhalezha2024@gmail.com">
            lezhalezha2024@gmail.com{" "}
            <span aria-hidden="true">
              <span className="arrow-icon" aria-hidden="true">
                ↗
              </span>
            </span>
          </a>

          <p>
            Rruga e Kalasë
            <br />
            Lezhë, Shqipëri
          </p>

          <Link className="footer-contact-link" href="/kontakt">
            Na kontakto{" "}
            <span aria-hidden="true">
              <span className="arrow-icon" aria-hidden="true">
                ↗
              </span>
            </span>
          </Link>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Lezha Turistike.</span>

          <span>Njih historinë. Eksploro natyrën. Zbulo Lezhën.</span>
        </div>
      </footer>
    </>
  );
}
