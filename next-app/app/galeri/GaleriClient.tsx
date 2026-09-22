"use client";
import LocaleHeader from "@/app/components/LocaleHeader";

import Link from "next/link";
import { useState } from "react";

type Destinacion = {
  _id: string;
  titulli: string;
  kategoria?: string;
  pershkrimi?: string;
  fotoUrl?: string;
  galeriaUrls?: string[];
  burimi?: string;
  harta?: string;
};

type GalleryPhoto = {
  src: string;
  alt: string;
};

type Gallery = {
  title: string;
  tag: string;
  text: string;
  source: string;
  harta?: string;
  photos: GalleryPhoto[];
};

type GalleryId = "kalaja" | "akrolisi" | "skenderbeu" | "kunevain";

function getGalleryId(titulli: string): GalleryId | null {
  if (titulli === "Kalaja e Lezhës") return "kalaja";
  if (titulli === "Akrolisi") return "akrolisi";
  if (titulli === "Vendvarrimi i Skënderbeut") return "skenderbeu";
  if (titulli === "Kune–Vain–Tale" || titulli === "Kune-Vain-Tale") {
    return "kunevain";
  }

  return null;
}

function getTag(id: GalleryId) {
  if (id === "kalaja") return "TRASHËGIMI HISTORIKE";
  if (id === "akrolisi") return "ARKEOLOGJI";
  if (id === "skenderbeu") return "MEMORIAL";
  return "NATYRË";
}

function fallbackSource(id: GalleryId) {
  if (id === "skenderbeu") {
    return "https://lezha.gov.al/resurset-turistike/";
  }

  return "https://lezhaturistike.wordpress.com/vizito/";
}

export default function GaleriClient({
  destinacionet,
}: {
  destinacionet: Destinacion[];
}) {
  const galleries = destinacionet.reduce(
    (result, destinacion) => {
      const id = getGalleryId(destinacion.titulli);

      if (!id) return result;

      const urls =
        destinacion.galeriaUrls && destinacion.galeriaUrls.length > 0
          ? destinacion.galeriaUrls
          : destinacion.fotoUrl
            ? [destinacion.fotoUrl]
            : [];

      result[id] = {
        title: destinacion.titulli,
        tag: getTag(id),
        text: destinacion.pershkrimi || "",
        source: destinacion.burimi || fallbackSource(id),
        harta: destinacion.harta,
        photos: urls.map((src, index) => ({
          src,
          alt: `${destinacion.titulli} - fotografia ${index + 1}`,
        })),
      };

      return result;
    },
    {} as Partial<Record<GalleryId, Gallery>>,
  );

  const [activeGallery, setActiveGallery] = useState<"all" | GalleryId>(
    "all",
  );

  const [selected, setSelected] = useState<{
    id: GalleryId;
    index: number;
  } | null>(null);

  const galleryEntries = Object.entries(galleries).filter(
    ([, gallery]) => gallery && gallery.photos.length > 0,
  ) as [GalleryId, Gallery][];

  const visibleGalleries =
    activeGallery === "all"
      ? galleryEntries
      : galleryEntries.filter(([id]) => id === activeGallery);

  const selectedGallery = selected ? galleries[selected.id] : null;

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
      <LocaleHeader locale="sq" current="galeri" />

      {/* MAIN */}
      <main id="home">
        <section id="galeri" className="section gallery-section">
          <div className="section-top">
            <div>
              <span className="overline">FOTOGRAFI NGA LEZHA</span>

              <h1>Shiko vendet nga afër.</h1>
            </div>

            <p>
              Pamje nga Kalaja, Akrolisi, Vendvarrimi i Skënderbeut dhe
              Kune–Vaini. Përzgjidh një fotografi për ta parë më të madhe.
            </p>
          </div>

          {/* FILTERAT */}
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

          {/* GALERIA */}
          <div id="gallery-grid" className="gallery-grid">
            {visibleGalleries.flatMap(([id, gallery]) =>
              gallery.photos.map((photo, index) => (
                <button
                  key={`${id}-${photo.src}-${index}`}
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

                  <span>{gallery.title}</span>
                </button>
              )),
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
            Histori, natyrë dhe trashëgimi kulturore, të lidhura përmes
            hartave dhe rrëfimeve.
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

          <a
            className="footer-email"
            href="mailto:lezhalezha2024@gmail.com"
          >
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

      {/* MODALI */}
      {selected && selectedGallery && selectedPhoto && (
        <div className="dialog-backdrop" onClick={closeDialog}>
          <div
            className="place-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="dialog-close"
              type="button"
              aria-label="Mbyll"
              onClick={closeDialog}
            >
              ×
            </button>

            <img src={selectedPhoto.src} alt={selectedPhoto.alt} />

            <div className="dialog-content">
              <span className="overline">{selectedGallery.tag}</span>

              <h2 id="dialog-title">{selectedGallery.title}</h2>

              <p>{selectedGallery.text}</p>

              <div
                className="dialog-gallery"
                aria-label="Fotografi të vendit"
              >
                {selectedGallery.photos.map((photo, index) => (
                  <button
                    key={`${photo.src}-${index}`}
                    type="button"
                    className={`gallery-thumb ${
                      selected.index === index ? "selected" : ""
                    }`}
                    aria-label={`Shfaq fotografinë ${index + 1}: ${
                      photo.alt
                    }`}
                    onClick={() =>
                      setSelected({
                        id: selected.id,
                        index,
                      })
                    }
                  >
                    <img src={photo.src} alt="" />
                  </button>
                ))}
              </div>

              <div className="dialog-actions">
                <a
                  className="button dark"
                  href={
                    selectedGallery.harta ||
                    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${selectedGallery.title}, Lezhë, Albania`,
                    )}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Shiko vendndodhjen{" "}
                  <span className="arrow-icon" aria-hidden="true">
                    ↗
                  </span>
                </a>

                <a
                  href={selectedGallery.source}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Më shumë informacion{" "}
                  <span className="arrow-icon" aria-hidden="true">
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