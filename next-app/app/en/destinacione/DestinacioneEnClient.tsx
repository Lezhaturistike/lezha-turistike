'use client'

import Link from 'next/link'
import { useState } from 'react'
import SiteFooter from '@/app/components/SiteFooter'

type Destinacion = {
  _id: string
  titulli: string
  titulliEn?: string
  kategoria: string
  pershkrimi?: string
  pershkrimiEn?: string
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

const categoryMeta: Record<string, {tag: string}> = {
  histori: {tag: 'HISTORICAL HERITAGE'},
  arkeologji: {tag: 'ARCHAEOLOGY'},
  natyre: {tag: 'NATURE'},
}

export default function DestinacioneEnClient({
  destinacionet,
}: {
  destinacionet: Destinacion[]
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState('all')
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [selectedPhoto, setSelectedPhoto] = useState(0)

  const places: Place[] = destinacionet.map((item, index) => {
    const meta = categoryMeta[item.kategoria] ?? {tag: 'DESTINACION'}
    return {
      ...item,
      titulli: item.titulliEn || item.titulli,
      pershkrimi: item.pershkrimiEn || item.pershkrimi,
      tag: meta.tag,
      cardText: item.pershkrimiEn || item.pershkrimi || 'Discover this destination in Lezhë.',
      alt: item.titulliEn || item.titulli,
      big: index === 0,
      natureId: item.kategoria === 'natyre',
    }
  })

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
          href="/en"
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

        <nav className={`nav${menuOpen ? ' open' : ''}`} id="nav">
          <Link href="/en" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/en/destinacione" aria-current="page" onClick={() => setMenuOpen(false)}>Destinations</Link>
          <Link href="/en/galeri" onClick={() => setMenuOpen(false)}>Gallery</Link>
          <Link href="/en/histori" onClick={() => setMenuOpen(false)}>History</Link>
          <Link href="/en/arkeologji" onClick={() => setMenuOpen(false)}>Archaeology</Link>
          <Link href="/en/webgis" onClick={() => setMenuOpen(false)}>Web GIS</Link>
          <Link href="/en/shkenca" onClick={() => setMenuOpen(false)}>Scientific research</Link>
          <Link href="/en/kulinari" onClick={() => setMenuOpen(false)}>Cuisine</Link>
          <Link href="/en/partneret" onClick={() => setMenuOpen(false)}>Partners</Link>
          <Link href="/en/kontakt" onClick={() => setMenuOpen(false)}>Contact</Link>
          <span className="language-switch"><Link href="/destinacione">SQ</Link><span> / </span><Link href="/en/destinacione">EN</Link></span>
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
          Open map <span>↗</span>
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
                EXPLORE LEZHË
              </span>

              <h2>Places to discover</h2>
            </div>

            <p>
              Discover the city through its most important landmarks and the landscapes that surround it.
            </p>
          </div>

          <div
            className="filters"
            role="group"
            aria-label="Filter destinations"
          >
            <button
              className={`filter${
                filter === 'all' ? ' active' : ''
              }`}
              type="button"
              onClick={() => setFilter('all')}
            >
              All
            </button>

            <button
              className={`filter${
                filter === 'histori' ? ' active' : ''
              }`}
              type="button"
              onClick={() => setFilter('histori')}
            >
              History &amp; archaeology
            </button>

            <button
              className={`filter${
                filter === 'natyre' ? ' active' : ''
              }`}
              type="button"
              onClick={() => setFilter('natyre')}
            >
              Nature
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
  Discover place{' '}
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
        aria-label="Back to top"
      >
        ↑
      </a>

      <SiteFooter locale="en"/>

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
              aria-label="Close"
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
                  aria-label="Gallery"
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
                    View location ↗
                  </a>
                )}

                {selectedPlace.burimi && (
                  <a
                    href={selectedPlace.burimi}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    More information ↗
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