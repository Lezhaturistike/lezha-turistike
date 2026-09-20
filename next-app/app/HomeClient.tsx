"use client";

import defaults from "@/sanity/content/home.json";
import BackToTop from "@/app/components/BackToTop";
import Link from "next/link";
import { useState } from "react";

export default function HomePage({ content }: { content: typeof defaults }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <Link
          href="/#home"
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

        <nav
          className={`nav ${menuOpen ? "open" : ""}`}
          id="nav"
          aria-label="Navigimi kryesor"
        >
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

        <Link className="nav-cta" href="/webgis">
          Hap hartën{" "}
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
          <img src={content.src1} alt={content.alt2} fetchPriority="high" />

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
              <Link className="button primary" href={content.href7}>
                {content.text8}{" "}
                <span>
                  <span className="arrow-icon" aria-hidden="true">
                    ↗
                  </span>
                </span>
              </Link>

              <Link className="button ghost" href={content.href9}>
                {content.text10}
              </Link>
            </div>
          </div>

          <div className="hero-count">
            <span>{content.text11}</span>

            <span>{content.text12}</span>
          </div>
        </section>

        {/* QUICK LINKS */}
        <section className="quick" aria-label="Eksploro sipas interesit">
          <span className="quick-intro">{content.text13}</span>

          <Link href={content.href14}>
            <span>◈</span>
            {content.text15}
            <b aria-hidden="true">↗</b>
          </Link>

          <Link href={content.href16}>
            <span>≈</span>
            {content.text17}
            <b aria-hidden="true">↗</b>
          </Link>

          <Link href={content.href18}>
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
              <Link key={item._key} className="directory-card" href={item.url}>
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
            href="/#home"
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
