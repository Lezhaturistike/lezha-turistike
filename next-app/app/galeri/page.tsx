"use client";

import Link from "next/link";
import { useState } from "react";

const galleries = {
  kalaja: {
    title: "Kalaja e Lezhës",
    tag: "TRASHËGIMI HISTORIKE",
    text: "Kalaja ndodhet mbi qytet dhe përfshin struktura e mure nga periudha të ndryshme. Pozicioni i saj e bën të dukshme lidhjen ndërmjet monumentit, Lezhës dhe peizazhit përreth.",
    source: "https://lezhaturistike.wordpress.com/vizito/",
    photos: [
      {
        src: "/images/lezha.jpeg",
        alt: "Kalaja e Lezhës nga ajri",
      },
      {
        src: "/images/kala.jpeg",
        alt: "Muret e Kalasë së Lezhës",
      },
      {
        src: "/images/kala-1.jpeg",
        alt: "Pamje e Kalasë së Lezhës",
      },
      {
        src: "/images/kala-3.jpeg",
        alt: "Strukturat e Kalasë së Lezhës",
      },
    ],
  },

  akrolisi: {
    title: "Akrolisi",
    tag: "ARKEOLOGJI",
    text: "Akrolisi është një vendbanim i fortifikuar i hershëm në zonën e Malit të Shëlbuemit. Gjurmët e tij dhe pozicioni në reliev ndihmojnë në leximin e peizazhit arkeologjik të Lezhës.",
    source: "https://lezhaturistike.wordpress.com/vizito/",
    photos: [
      {
        src: "/images/akrolisi.jpeg",
        alt: "Akrolisi dhe peizazhi i Lezhës",
      },
    ],
  },

  skenderbeu: {
    title: "Vendvarrimi i Skënderbeut",
    tag: "MEMORIAL",
    text: "Vendvarrimi i Gjergj Kastriotit është një vend përkujtimor në Lezhë. Memoriali i sotëm u ndërtua në vitin 1981 mbi zonën e kishës së Shën Kollit.",
    source: "https://lezha.gov.al/resurset-turistike/",
    photos: [
      {
        src: "/images/memorial-1.jpeg",
        alt: "Memoriali i Skënderbeut, pamje nga portali",
      },
      {
        src: "/images/memorial-2.png",
        alt: "Memoriali i Skënderbeut, pamje nga Bashkia Lezhë",
      },
    ],
  },

  kunevain: {
    title: "Kune–Vain–Tale",
    tag: "NATYRË",
    text: "Kompleksi ligatinor i Kune-Vainit është një destinacion për natyrën dhe vëzhgimin e shpendëve pranë Lezhës.",
    source: "https://lezhaturistike.wordpress.com/vizito/",
    photos: [
      {
        src: "/images/kune-vain.jpeg",
        alt: "Pamje ajrore e Kune-Vainit",
      },
    ],
  },
};

type GalleryId = keyof typeof galleries;

export default function GaleriPage() {
  const [activeGallery, setActiveGallery] = useState<
    "all" | GalleryId
  >("all");

  const [selected, setSelected] = useState<{
    id: GalleryId;
    index: number;
  } | null>(null);

  const galleryEntries = Object.entries(galleries) as [
    GalleryId,
    (typeof galleries)[GalleryId]
  ][];

  const visibleGalleries =
    activeGallery === "all"
      ? galleryEntries
      : galleryEntries.filter(([id]) => id === activeGallery);

  const selectedGallery = selected
    ? galleries[selected.id]
    : null;

  const selectedPhoto =
    selected && selectedGallery
      ? selectedGallery.photos[selected.index]
      : null;

  function closeDialog() {
    setSelected(null);
  }

  return (
    <>
      {/* HEADER */}
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

        <nav
          className="nav"
          id="nav"
          aria-label="Navigimi kryesor"
        >
          <Link href="/destinacione">
            Destinacione
          </Link>

          <Link href="/galeri" aria-current="page">
            Galeri
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

          <Link href="/kontakt">
            Kontakt
          </Link>
        </nav>

        <button
          className="menu-btn"
          type="button"
          aria-expanded="false"
          aria-controls="nav"
        >
          Menu <span>☰</span>
        </button>

        <Link
          className="nav-cta"
          href="/webgis"
        >
          Hap hartën{" "}
          <span>
            <span
              className="arrow-icon"
              aria-hidden="true"
            >
              ↗
            </span>
          </span>
        </Link>
      </header>

      {/* MAIN */}
      <main id="home">
        <section
          id="galeri"
          className="section gallery-section"
        >
          <div className="section-top">
            <div>
              <span className="overline">
                FOTOGRAFI NGA LEZHA
              </span>

              <h2>
                Shiko vendet nga afër.
              </h2>
            </div>

            <p>
              Pamje nga Kalaja, Akrolisi, Vendvarrimi i
              Skënderbeut dhe Kune–Vaini. Përzgjidh një
              fotografi për ta parë më të madhe.
            </p>
          </div>

          {/* FILTERAT ORIGJINALË */}
          <div
            id="gallery-filters"
            className="filters"
            role="group"
            aria-label="Fotografi sipas vendit"
          >
            <button
              type="button"
              className={`filter ${
                activeGallery === "all" ? "active" : ""
              }`}
              aria-pressed={activeGallery === "all"}
              onClick={() => setActiveGallery("all")}
            >
              Të gjitha
            </button>

            {galleryEntries.map(([id, gallery]) => (
              <button
                key={id}
                type="button"
                className={`filter ${
                  activeGallery === id ? "active" : ""
                }`}
                aria-pressed={activeGallery === id}
                onClick={() => setActiveGallery(id)}
              >
                {gallery.title}
              </button>
            ))}
          </div>

          {/* GALERIA ORIGJINALE */}
          <div
            id="gallery-grid"
            className="gallery-grid"
          >
            {visibleGalleries.flatMap(
              ([id, gallery]) =>
                gallery.photos.map((photo, index) => (
                  <button
                    key={`${id}-${photo.src}`}
                    type="button"
                    className="gallery-photo"
                    aria-label={`Hap fotografinë ${
                      photo.alt || gallery.title
                    }`}
                    onClick={() =>
                      setSelected({
                        id,
                        index,
                      })
                    }
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt || gallery.title}
                      loading="lazy"
                    />

                    <span>
                      {gallery.title}
                    </span>
                  </button>
                ))
            )}
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
            Histori, natyrë dhe trashëgimi kulturore,
            të lidhura përmes hartave dhe rrëfimeve.
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
          <span>
            © 2026 Lezha Turistike.
          </span>

          <span>
            Njih historinë. Eksploro natyrën. Zbulo
            Lezhën.
          </span>
        </div>
      </footer>

      {/* MODALI ORIGJINAL */}
      {selected &&
        selectedGallery &&
        selectedPhoto && (
          <div
            className="dialog-backdrop"
            onClick={closeDialog}
          >
            <div
              className="place-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="dialog-title"
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              <button
                className="dialog-close"
                type="button"
                aria-label="Mbyll"
                onClick={closeDialog}
              >
                ×
              </button>

              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
              />

              <div className="dialog-content">
                <span
                  className="overline"
                >
                  {selectedGallery.tag}
                </span>

                <h2 id="dialog-title">
                  {selectedGallery.title}
                </h2>

                <p>
                  {selectedGallery.text}
                </p>

                <div
                  className="dialog-gallery"
                  aria-label="Fotografi të vendit"
                >
                  {selectedGallery.photos.map(
                    (photo, index) => (
                      <button
                        key={photo.src}
                        type="button"
                        className={`gallery-thumb ${
                          selected.index === index
                            ? "selected"
                            : ""
                        }`}
                        aria-label={`Shfaq fotografinë ${
                          index + 1
                        }: ${photo.alt}`}
                        onClick={() =>
                          setSelected({
                            id: selected.id,
                            index,
                          })
                        }
                      >
                        <img
                          src={photo.src}
                          alt=""
                        />
                      </button>
                    )
                  )}
                </div>

                <div className="dialog-actions">
                  <a
                    className="button dark"
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${selectedGallery.title}, Lezhë, Albania`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Shiko vendndodhjen{" "}
                    <span
                      className="arrow-icon"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </a>

                  <a
                    href={selectedGallery.source}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Më shumë informacion{" "}
                    <span
                      className="arrow-icon"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
}