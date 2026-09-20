"use client";

import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
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
          <img
            src="/images/lezha.jpeg"
            alt="Pamje ajrore e Kalasë së Lezhës dhe qytetit"
            fetchPriority="high"
          />

          <div className="hero-shade"></div>

          <div className="hero-content">
            <span className="overline light">
              LEZHË, SHQIPËRI · HISTORI QË JETON
            </span>

            <h1>
              Një qytet.
              <br />
              <em>Shumë histori.</em>
            </h1>

            <p>
              Nga muret e lashta të Kalasë te peizazhi i Kune-Vainit,
              zbulo Lezhën nëpërmjet vendeve, rrëfimeve dhe hartave
              ndërvepruese.
            </p>

            <div className="hero-actions">
              <Link className="button primary" href="/destinacione">
                Zbulo destinacionet{" "}
                <span>
                  <span className="arrow-icon" aria-hidden="true">
                    ↗
                  </span>
                </span>
              </Link>

              <Link className="button ghost" href="/webgis">
                Eksploro hartën 2D
              </Link>
            </div>
          </div>

          <div className="hero-count">
            <span>01 / 04</span>

            <span>
              Kalaja e Lezhës · Fotografi nga portali Lezha turistike
            </span>
          </div>
        </section>

        {/* QUICK LINKS */}
        <section
          className="quick"
          aria-label="Eksploro sipas interesit"
        >
          <span className="quick-intro">
            ÇFARË DO TË ZBULOSH?
          </span>

          <Link href="/destinacione">
            <span>◈</span>
            Vende historike
            <b aria-hidden="true">↗</b>
          </Link>

          <Link href="/destinacione#natyre">
            <span>≈</span>
            Natyrë &amp; peizazh
            <b aria-hidden="true">↗</b>
          </Link>

          <Link href="/webgis">
            <span>◎</span>
            Harta interaktive
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
              <span className="overline">
                ZBULO SIPAS RUBRIKËS
              </span>

              <h2 id="directory-title">
                Zgjidh çfarë të eksplorosh.
              </h2>
            </div>

            <p>
              Çdo rubrikë hapet në faqen e saj, me fotografi,
              informacion dhe lidhje për të vazhduar kërkimin.
            </p>
          </div>

          <div className="directory-grid">

            <Link className="directory-card" href="/destinacione">
              <span>01 / LEZHA</span>
              <h2>Destinacione</h2>
              <p>
                Kalaja, memoriali dhe peizazhet natyrore.
              </p>
              <span className="directory-arrow" aria-hidden="true">
                →
              </span>
            </Link>

            <Link className="directory-card" href="/galeri">
              <span>02 / LEZHA</span>
              <h2>Galeri</h2>
              <p>
                Fotografi nga vendet që rrëfejnë Lezhën.
              </p>
              <span className="directory-arrow" aria-hidden="true">
                →
              </span>
            </Link>

            <Link className="directory-card" href="/histori">
              <span>03 / LEZHA</span>
              <h2>Histori</h2>
              <p>
                Ngjarjet dhe monumentet në kujtesën e qytetit.
              </p>
              <span className="directory-arrow" aria-hidden="true">
                →
              </span>
            </Link>

            <Link className="directory-card" href="/arkeologji">
              <span>04 / LEZHA</span>
              <h2>Arkeologji</h2>
              <p>
                Gjurmët e Lissusit dhe të Akrolisit.
              </p>
              <span className="directory-arrow" aria-hidden="true">
                →
              </span>
            </Link>

            <Link className="directory-card" href="/webgis">
              <span>05 / LEZHA</span>
              <h2>Web GIS</h2>
              <p>
                Harta 2D, skena 3D dhe rrëfime interaktive.
              </p>
              <span className="directory-arrow" aria-hidden="true">
                →
              </span>
            </Link>

            <Link className="directory-card" href="/shkenca">
              <span>06 / LEZHA</span>
              <h2>Studime shkencore</h2>
              <p>
                Dokumentimi, gjeofizika dhe videot 3D.
              </p>
              <span className="directory-arrow" aria-hidden="true">
                →
              </span>
            </Link>

            <Link className="directory-card" href="/kulinari">
              <span>07 / LEZHA</span>
              <h2>Kulinari</h2>
              <p>
                Shijet dhe prodhimet e trevës.
              </p>
              <span className="directory-arrow" aria-hidden="true">
                →
              </span>
            </Link>

            <Link className="directory-card" href="/partneret">
              <span>08 / LEZHA</span>
              <h2>Partnerët</h2>
              <p>
                Institucionet që mbështesin projektin.
              </p>
              <span className="directory-arrow" aria-hidden="true">
                →
              </span>
            </Link>

            <Link className="directory-card" href="/kontakt">
              <span>09 / LEZHA</span>
              <h2>Kontakt</h2>
              <p>
                Lidhu me ne dhe planifiko vizitën.
              </p>
              <span className="directory-arrow" aria-hidden="true">
                →
              </span>
            </Link>

          </div>
        </section>
      </main>

      {/* BACK TO TOP */}
      <a
        className="back-to-top"
        href="#home"
        aria-label="Ngjitu në krye të faqes"
        title="Ngjitu lart"
      >
        ↑
      </a>

      {/* FOOTER */}
      <footer
        className="site-footer"
        aria-label="Fundi i faqes"
      >
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
            Histori, natyrë dhe trashëgimi kulturore, të lidhura
            përmes hartave dhe rrëfimeve.
          </p>

          <span className="footer-location">
            LEZHË · SHQIPËRI
          </span>
        </div>

        <nav
          className="footer-navigation"
          aria-label="Navigimi në fund të faqes"
        >
          <h2>Eksploro</h2>

          <div className="footer-links">
            <Link href="/destinacione">
              Destinacione
            </Link>

            <Link href="/histori">
              Histori
            </Link>

            <Link href="/arkeologji">
              Arkeologji
            </Link>

            <Link href="/webgis">
              Web GIS
            </Link>

            <Link href="/shkenca">
              Punime shkencore
            </Link>

            <Link href="/kulinari">
              Kulinari
            </Link>

            <Link href="/partneret">
              Partnerët
            </Link>

            <Link href="/galeri">
              Galeri
            </Link>
          </div>
        </nav>

        <div className="footer-contact">
          <h2>Le të lidhemi</h2>

          <p>
            Për informacion dhe bashkëpunime.
          </p>

          <a
            className="footer-email"
            href="mailto:lezhalezha2024@gmail.com"
          >
            lezhalezha2024@gmail.com{" "}
            <span aria-hidden="true">
              <span
                className="arrow-icon"
                aria-hidden="true"
              >
                ↗
              </span>
            </span>
          </a>

          <p>
            Rruga e Kalasë
            <br />
            Lezhë, Shqipëri
          </p>

          <Link
            className="footer-contact-link"
            href="/kontakt"
          >
            Na kontakto{" "}
            <span aria-hidden="true">
              <span
                className="arrow-icon"
                aria-hidden="true"
              >
                ↗
              </span>
            </span>
          </Link>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Lezha Turistike.</span>

          <span>
            Njih historinë. Eksploro natyrën. Zbulo Lezhën.
          </span>
        </div>
      </footer>
    </>
  );
}