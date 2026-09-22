"use client";
import LocaleHeader from "@/app/components/LocaleHeader";

import SiteFooter from "@/app/components/SiteFooter";
import { useEffect, useState } from "react";

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

type GalleryId = string;
function getTag(category?: string) {
  return ({histori: "HISTORIC HERITAGE", arkeologji: "ARCHAEOLOGY", natyre: "NATURE"} as Record<string,string>)[category || ""] || "DESTINATION";
}

export default function GaleriEnClient({
  destinacionet,
}: {
  destinacionet: Destinacion[];
}) {
  const galleries = destinacionet.reduce(
    (result, destinacion) => {
      const id = destinacion._id;

      if (!id) return result;

      const urls =
        destinacion.galeriaUrls && destinacion.galeriaUrls.length > 0
          ? destinacion.galeriaUrls
          : destinacion.fotoUrl
            ? [destinacion.fotoUrl]
            : [];

      result[id] = {
        title: destinacion.titulli,
        tag: getTag(destinacion.kategoria),
        text: destinacion.pershkrimi || "",
        source: destinacion.burimi || "",
        harta: destinacion.harta,
        photos: urls.map((src, index) => ({
          src,
          alt: `${destinacion.titulli} - photo ${index + 1}`,
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


 useEffect(() => {
   if (!selected) return;
   const previous = document.activeElement as HTMLElement | null;
   const overflow = document.body.style.overflow;
   document.body.style.overflow = "hidden";
   const dialog = document.querySelector<HTMLElement>('[role="dialog"]');
   dialog?.querySelector<HTMLElement>('button')?.focus();
   const keydown = (event: KeyboardEvent) => {
     if (event.key === "Escape") setSelected(null);
     if (event.key === "Tab" && dialog) {
       const items = Array.from(dialog.querySelectorAll<HTMLElement>('button, a[href], [tabindex="0"]'));
       const first = items[0], last = items[items.length - 1];
       if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
       else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
     }
   };
   document.addEventListener("keydown", keydown);
   return () => { document.body.style.overflow = overflow; document.removeEventListener("keydown", keydown); previous?.focus(); };
 }, [selected]);
  return (
    <>
      {/* HEADER */}
      <LocaleHeader locale="en" current="galeri" />

      {/* MAIN */}
      <main id="home">
        <section id="galeri" className="section gallery-section">
          <div className="section-top">
            <div>
              <span className="overline">PHOTOGRAPHS OF LEZHË</span>

              <h1>Take a closer look.</h1>
            </div>

            <p>
              Explore photographs of Lezhë’s destinations. Select a photograph to view it in full size.
            </p>
          </div>

          {/* FILTERAT */}
          <div
            id="gallery-filters"
            className="filters"
            role="group"
            aria-label="Photos by place"
          >
            <button
              type="button"
              className={`filter ${
                activeGallery === "all" ? "active" : ""
              }`}
              aria-pressed={activeGallery === "all"}
              onClick={() => setActiveGallery("all")}
            >
              All
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
                  aria-label={`Open photo ${
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
        aria-label="Back to top"
        title="Back to top"
      >
        ↑
      </a>

      {/* FOOTER */}
      <SiteFooter locale="en" />

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
              aria-label="Close"
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
                aria-label="Photos of this place"
              >
                {selectedGallery.photos.map((photo, index) => (
                  <button
                    key={`${photo.src}-${index}`}
                    type="button"
                    className={`gallery-thumb ${
                      selected.index === index ? "selected" : ""
                    }`}
                    aria-label={`Show photo ${index + 1}: ${
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
                  View location{" "}
                  <span className="arrow-icon" aria-hidden="true">
                    ↗
                  </span>
                </a>

                {selectedGallery.source && <a
                  href={selectedGallery.source}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  More information{" "}
                  <span className="arrow-icon" aria-hidden="true">
                    ↗
                  </span>
                </a>}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}