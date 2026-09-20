"use client";

import Link from "next/link";
import { useState } from "react";

const gisApps = [
  {
    name: "Atlasi 2D",
    title: "Atlasi Interaktiv 2D",
    embed:
      "https://www.arcgis.com/apps/instant/atlas/index.html?appid=1528af467dae4f5094a5971b66df0aed",
    original:
      "https://www.arcgis.com/apps/instant/atlas/index.html?appid=1528af467dae4f5094a5971b66df0aed",
  },
  {
    name: "Map Tour",
    title: "Map Tour Lezha",
    embed:
      "https://www.arcgis.com/apps/instant/exhibit/index.html?appid=9710eadf5bab46db8512c8bceee18dc8&slide=1",
    original: "https://arcg.is/Dnjbe",
  },
  {
    name: "Lezha 3D",
    title: "Lezha 3D",
    embed:
      "https://www.arcgis.com/apps/instant/3dviewer/index.html?appid=e08ad84d0eab4a75aa98e3a65e4d7ba6",
    original:
      "https://www.arcgis.com/apps/instant/3dviewer/index.html?appid=e08ad84d0eab4a75aa98e3a65e4d7ba6",
  },
  {
    name: "StoryMap",
    title: "StoryMap Lezha Turistike",
    embed:
      "https://storymaps.arcgis.com/stories/136af9b1b3be4e889d61f2b25a7f64a4",
    original: "https://arcg.is/14Tzuv",
  },
];

export default function WebGISPage() {
  const [activeApp, setActiveApp] = useState(gisApps[0]);

  return (
    <>
      <header className="header">
        <Link
          href="/"
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

        <nav className="nav" id="nav" aria-label="Navigimi kryesor">
          <Link href="/destinacione">Destinacione</Link>
          <Link href="/galeri">Galeri</Link>
          <Link href="/histori">Histori</Link>
          <Link href="/arkeologji">Arkeologji</Link>
          <Link href="/webgis" aria-current="page">
            Web GIS
          </Link>
          <Link href="/shkenca">Punime shkencore</Link>
          <Link href="/kulinari">Kulinari</Link>
          <Link href="/partneret">Partnerët</Link>
          <Link href="/kontakt">Kontakt</Link>
        </nav>

        <button
          className="menu-btn"
          type="button"
          aria-expanded="false"
          aria-controls="nav"
        >
          Menu <span>☰</span>
        </button>

        <Link className="nav-cta" href="/webgis">
          Hap hartën <span>↗</span>
        </Link>
      </header>

      <main id="home">
        <section id="webgis" className="section gis-section">
          <div className="section-top">
            <div>
              <span className="overline">LEZHA WEB GIS</span>
              <h2>Shihe Lezhën nga një kënd tjetër.</h2>
            </div>

            <p>
              Harta 2D, skena 3D dhe rrëfimi interaktiv të çojnë nga
              një vend te tjetri dhe të ndihmojnë të kuptosh si lidhen
              me qytetin.
            </p>
          </div>

          <div className="gis-feature">

            {/* FOTO ORIGJINALE */}
            <div
              className="gis-visual"
              style={{
                backgroundImage: "url('/images/akrolisi.jpeg')",
                backgroundPosition: "center 45%",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="gis-visual-overlay">
                <span>WEB GIS · LEZHË</span>

                <strong>Eksploro vendet në hartë</strong>

                <a
                  href="https://www.arcgis.com/apps/instant/atlas/index.html?appid=1528af467dae4f5094a5971b66df0aed"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hap Atlasin Interaktiv <span>↗</span>
                </a>
              </div>
            </div>

            <div className="gis-list">
              <a
                href="https://arcg.is/Dnjbe"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>01</span>

                <div>
                  <strong>Map Tour Lezha</strong>
                  <small>
                    Njihu me pikat e interesit hap pas hapi.
                  </small>
                </div>

                <b aria-hidden="true">↗</b>
              </a>

              <a
                href="https://www.arcgis.com/apps/instant/atlas/index.html?appid=1528af467dae4f5094a5971b66df0aed"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>02</span>

                <div>
                  <strong>Atlasi Interaktiv 2D</strong>
                  <small>
                    Shiko shtresat tematike dhe eksploro lirshëm.
                  </small>
                </div>

                <b aria-hidden="true">↗</b>
              </a>

              <a
                href="https://www.arcgis.com/apps/instant/3dviewer/index.html?appid=e08ad84d0eab4a75aa98e3a65e4d7ba6"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>03</span>

                <div>
                  <strong>Lezha 3D</strong>
                  <small>
                    Shiko monumentet në raport me relievin.
                  </small>
                </div>

                <b aria-hidden="true">↗</b>
              </a>

              <a
                href="https://arcg.is/14Tzuv"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>04</span>

                <div>
                  <strong>StoryMap Lezha Turistike</strong>
                  <small>
                    Ndiq rrëfimin digjital me harta dhe pamje.
                  </small>
                </div>

                <b aria-hidden="true">↗</b>
              </a>
            </div>
          </div>

          {/* APLIKACIONET WEB GIS */}
          <div
            className="gis-embed"
            aria-label="Aplikacionet Web GIS brenda faqes"
          >
            <div className="gis-embed-heading">
              <div>
                <span className="overline">EKSPLORO NË FAQE</span>

                <h3>Aplikacionet Web GIS</h3>

                <p>
                  Zgjidh një aplikacion për ta përdorur këtu. Mund ta
                  hapësh edhe në faqen origjinale.
                </p>
              </div>
            </div>

            <div
              className="gis-embed-tabs"
              role="group"
              aria-label="Zgjidh aplikacionin Web GIS"
            >
              {gisApps.map((app) => (
                <button
                  key={app.name}
                  type="button"
                  className={`gis-tab ${
                    activeApp.name === app.name ? "active" : ""
                  }`}
                  aria-pressed={activeApp.name === app.name}
                  onClick={() => setActiveApp(app)}
                >
                  {app.name}
                </button>
              ))}
            </div>

            <div className="gis-frame">
              <iframe
                key={activeApp.embed}
                title={activeApp.title}
                src={activeApp.embed}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="fullscreen; geolocation"
                allowFullScreen
              />
            </div>

            <div className="gis-embed-bottom">
              <span>{activeApp.title}</span>

              <a
                href={activeApp.original}
                target="_blank"
                rel="noopener noreferrer"
              >
                Hap aplikacionin origjinal <span>↗</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <a
        className="back-to-top"
        href="#home"
        aria-label="Ngjitu në krye të faqes"
        title="Ngjitu lart"
      >
        ↑
      </a>

      <footer className="site-footer" aria-label="Fundi i faqes">
        <div className="footer-main">
          <Link
            href="/"
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

          <a
            className="footer-email"
            href="mailto:lezhalezha2024@gmail.com"
          >
            lezhalezha2024@gmail.com ↗
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
            Na kontakto ↗
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