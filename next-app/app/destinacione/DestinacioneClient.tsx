'use client'

import Link from 'next/link'
import { useState } from 'react'

type Destinacion = {
  _id: string
  titulli: string
  kategoria: string
  pershkrimi?: string
  fotoUrl?: string
  galeriaUrls?: string[]
  burimi?: string
  harta?: string
}

type Place = Destinacion & {
  tag: string
  cardText: string
  alt: string
  big?: boolean
  natureId?: boolean
}

const cardData: Record<
  string,
  {
    tag: string
    cardText: string
    alt: string
    big?: boolean
    natureId?: boolean
  }
> = {
  'Kalaja e Lezhës': {
    tag: 'TRASHËGIMI HISTORIKE',
    cardText:
      'Një pikë vështrimi mbi qytetin dhe peizazhin përreth. Muret dhe strukturat e saj dëshmojnë periudha të ndryshme të historisë së Lezhës.',
    alt: 'Kalaja e Lezhës',
    big: true,
  },

  Akrolisi: {
    tag: 'ARKEOLOGJI',
    cardText:
      'Fortifikimi i hershëm në lartësinë e Malit të Shëlbuemit, i lidhur me peizazhin arkeologjik të Lezhës.',
    alt: 'Akrolisi',
  },

  'Vendvarrimi i Skënderbeut': {
    tag: 'MEMORIAL',
    cardText:
      'Një vend kujtese në zemër të qytetit, i lidhur me historinë e Gjergj Kastriotit dhe Lezhës.',
    alt: 'Vendvarrimi i Skënderbeut',
  },

  'Kune–Vain–Tale': {
    tag: 'NATYRË',
    cardText:
      'Një peizazh ligatinor pranë detit, i njohur për habitatet dhe vëzhgimin e shpendëve.',
    alt: 'Kune-Vain-Tale',
    natureId: true,
  },
}

const order = [
  'Kalaja e Lezhës',
  'Akrolisi',
  'Vendvarrimi i Skënderbeut',
  'Kune–Vain–Tale',
]

export default function DestinacioneClient({
  destinacionet,
}: {
  destinacionet: Destinacion[]
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState('all')
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [selectedPhoto, setSelectedPhoto] = useState(0)

  const places: Place[] = destinacionet
    .map((item) => {
      const card = cardData[item.titulli]

      if (!card) return null

      return {
        ...item,
        ...card,
      }
    })
    .filter((item): item is Place => item !== null)
    .sort(
      (a, b) =>
        order.indexOf(a.titulli) -
        order.indexOf(b.titulli)
    )

  const visiblePlaces = places.filter((place) => {
    if (filter === 'all') return true

    if (filter === 'natyre') {
      return place.kategoria === 'natyre'
    }

    if (filter === 'histori') {
      return (
        place.kategoria === 'histori' ||
        place.kategoria === 'arkeologji'
      )
    }

    return true
  })

  function openPlace(place: Place) {
    console.log('KLIKOVA:', place.titulli)
    setSelectedPlace(place)
    setSelectedPhoto(0)
    document.body.style.overflow = 'hidden'
  }

  function closePlace() {
    setSelectedPlace(null)
    setSelectedPhoto(0)
    document.body.style.overflow = ''
  }

  const gallery =
    selectedPlace?.galeriaUrls &&
    selectedPlace.galeriaUrls.length > 0
      ? selectedPlace.galeriaUrls
      : selectedPlace?.fotoUrl
        ? [selectedPlace.fotoUrl]
        : []

  const currentPhoto =
    gallery[selectedPhoto] ||
    selectedPlace?.fotoUrl ||
    ''

  return (
    <>
      <header className="header">
        <Link
          href="/"
          className="logo"
          aria-label="Lezha Turistike"
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
          className={`nav${menuOpen ? ' open' : ''}`}
          id="nav"
        >
          <Link
            href="/destinacione"
            aria-current="page"
            onClick={() => setMenuOpen(false)}
          >
            Destinacione
          </Link>

          <Link
            href="/galeri"
            onClick={() => setMenuOpen(false)}
          >
            Galeri
          </Link>

          <Link
            href="/histori"
            onClick={() => setMenuOpen(false)}
          >
            Histori
          </Link>

          <Link
            href="/arkeologji"
            onClick={() => setMenuOpen(false)}
          >
            Arkeologji
          </Link>

          <Link
            href="/webgis"
            onClick={() => setMenuOpen(false)}
          >
            Web GIS
          </Link>

          <Link
            href="/shkenca"
            onClick={() => setMenuOpen(false)}
          >
            Punime shkencore
          </Link>

          <Link
            href="/kulinari"
            onClick={() => setMenuOpen(false)}
          >
            Kulinari
          </Link>

          <Link
            href="/partneret"
            onClick={() => setMenuOpen(false)}
          >
            Partnerët
          </Link>

          <Link
            href="/kontakt"
            onClick={() => setMenuOpen(false)}
          >
            Kontakt
          </Link>
        </nav>

        <button
          className="menu-btn"
          type="button"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          Menu <span>☰</span>
        </button>

        <Link className="nav-cta" href="/webgis">
          Hap hartën <span>↗</span>
        </Link>
      </header>

      <main id="home">
        <section
          id="destinacione"
          className="section destinations"
        >
          <div className="section-top">
            <div>
              <span className="overline">
                EKSPLORO LEZHËN
              </span>

              <h2>Vende për t’u zbuluar</h2>
            </div>

            <p>
              Njih historinë e qytetit përmes pikave të tij
              më të rëndësishme dhe peizazheve që e
              rrethojnë.
            </p>
          </div>

          <div
            className="filters"
            role="group"
            aria-label="Filtro destinacionet"
          >
            <button
              className={`filter${
                filter === 'all' ? ' active' : ''
              }`}
              type="button"
              onClick={() => setFilter('all')}
            >
              Të gjitha
            </button>

            <button
              className={`filter${
                filter === 'histori' ? ' active' : ''
              }`}
              type="button"
              onClick={() => setFilter('histori')}
            >
              Histori &amp; arkeologji
            </button>

            <button
              className={`filter${
                filter === 'natyre' ? ' active' : ''
              }`}
              type="button"
              onClick={() => setFilter('natyre')}
            >
              Natyrë
            </button>
          </div>

          <div className="places">
            {visiblePlaces.map((place) => (
              <article
                key={place._id}
                className={`place${
                  place.big ? ' big' : ''
                }`}
                data-category={place.kategoria}
                id={
                  place.natureId
                    ? 'natyre'
                    : undefined
                }
              >
                <div className="place-image">
                  {place.fotoUrl && (
                    <img
                      src={place.fotoUrl}
                      alt={place.alt}
                      loading="lazy"
                    />
                  )}
                </div>

                <div className="place-body">
                  <span className="tag">
                    {place.tag}
                  </span>

                  <h3>{place.titulli}</h3>

                  <p>{place.cardText}</p>

                  <a
  href="#"
  className="place-link"
  onClick={(event) => {
    event.preventDefault()
    openPlace(place)
  }}
>
  Zbulo vendin{' '}
  <span
    className="arrow-icon"
    aria-hidden="true"
  >
    ↗
  </span>
</a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <a
        className="back-to-top"
        href="#home"
        aria-label="Ngjitu në krye"
      >
        ↑
      </a>

      <footer className="site-footer">
        <div className="footer-main">
          <Link
            href="/"
            className="logo"
            aria-label="Lezha Turistike"
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

        <nav className="footer-navigation">
          <h2>Eksploro</h2>

          <div className="footer-links">
            <Link href="/destinacione">
              Destinacione
            </Link>
            <Link href="/histori">Histori</Link>
            <Link href="/arkeologji">
              Arkeologji
            </Link>
            <Link href="/webgis">Web GIS</Link>
            <Link href="/shkenca">
              Punime shkencore
            </Link>
            <Link href="/kulinari">Kulinari</Link>
            <Link href="/partneret">Partnerët</Link>
            <Link href="/galeri">Galeri</Link>
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
          <span>
            © 2026 Lezha Turistike.
          </span>

          <span>
            Njih historinë. Eksploro natyrën. Zbulo Lezhën.
          </span>
        </div>
      </footer>

      {selectedPlace && (
        <div
          className="dialog-backdrop"
          role="presentation"
          onClick={closePlace}
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
              type="button"
              className="dialog-close"
              aria-label="Mbyll"
              onClick={closePlace}
            >
              ×
            </button>

            {currentPhoto && (
              <img
                src={currentPhoto}
                alt={selectedPlace.alt}
              />
            )}

            <div className="dialog-content">
              <span className="overline">
                {selectedPlace.tag}
              </span>

              <h2 id="dialog-title">
                {selectedPlace.titulli}
              </h2>

              <p>
                {selectedPlace.pershkrimi}
              </p>

              {gallery.length > 0 && (
                <div
                  className="dialog-gallery"
                  aria-label="Galeria"
                >
                  {gallery.map(
                    (photo, index) => (
                      <button
                        key={`${photo}-${index}`}
                        type="button"
                        className={`gallery-thumb${
                          selectedPhoto === index
                            ? ' selected'
                            : ''
                        }`}
                        onClick={() =>
                          setSelectedPhoto(index)
                        }
                        aria-label={`Foto ${
                          index + 1
                        }`}
                      >
                        <img
                          src={photo}
                          alt=""
                        />
                      </button>
                    )
                  )}
                </div>
              )}

              <div className="dialog-actions">
                {selectedPlace.harta && (
                  <a
                    className="button dark"
                    href={selectedPlace.harta}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Shiko vendndodhjen ↗
                  </a>
                )}

                {selectedPlace.burimi && (
                  <a
                    href={selectedPlace.burimi}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Më shumë informacion ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}