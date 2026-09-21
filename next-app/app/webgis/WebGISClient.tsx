"use client";
import LocaleHeader from "@/app/components/LocaleHeader";

import defaults from "@/sanity/content/webgis.json";
import BackToTop from "@/app/components/BackToTop";

import Link from "next/link";
import { useState } from "react";

export default function WebGISPage({ content }: { content: typeof defaults }) {
  const gisApps = content.gisApps;
  const [activeKey, setActiveKey] = useState(gisApps[0]._key);
  const activeApp = gisApps.find((app) => app._key === activeKey) || gisApps[0];

  return (
    <>
      <LocaleHeader locale="sq" current="webgis" />

      <main id="home">
        <section id="webgis" className="section gis-section">
          <div className="section-top">
            <div>
              <span className="overline">{content.text1}</span>
              <h2>{content.text2}</h2>
            </div>

            <p>{content.text3}</p>
          </div>

          <div className="gis-feature">
            {/* FOTO ORIGJINALE */}
            <div
              className="gis-visual"
              style={{
                backgroundImage: `url('${content.backgroundImage}')`,
                backgroundPosition: "center 45%",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="gis-visual-overlay">
                <span>{content.text4}</span>

                <strong>{content.text5}</strong>

                <a
                  href={content.href6}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content.text7}
                  <span className="arrow-icon" aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            <div className="gis-list">
              {content.gisLinks.map((item) => (
                <a
                  key={item._key}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{item.label}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <small>{item.description}</small>
                  </div>
                  <b className="arrow-icon" aria-hidden="true">↗</b>
                </a>
              ))}
            </div>
          </div>

          {/* APLIKACIONET WEB GIS */}
          <div
            className="gis-embed"
            aria-label="Aplikacionet Web GIS brenda faqes"
          >
            <div className="gis-embed-heading">
              <div>
                <span className="overline">{content.text8}</span>

                <h3>{content.text9}</h3>

                <p>{content.text10}</p>
              </div>
            </div>

            <div
              className="gis-embed-tabs"
              role="group"
              aria-label="Zgjidh aplikacionin Web GIS"
            >
              {gisApps.map((app) => (
                <button
                  key={app._key}
                  type="button"
                  className={`gis-tab ${
                    activeApp._key === app._key ? "active" : ""
                  }`}
                  aria-pressed={activeApp._key === app._key}
                  onClick={() => setActiveKey(app._key)}
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
                {content.text11}
                <span className="arrow-icon" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <BackToTop />

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
            lezhalezha2024@gmail.com ↗
          </a>

          <p>
            Rruga e Kalasë
            <br />
            Lezhë, Shqipëri
          </p>

          <Link className="footer-contact-link" href="/kontakt">
            Na kontakto ↗
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
