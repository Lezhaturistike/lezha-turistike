'use client'

import { useState } from 'react'
import LocaleHeader from '@/app/components/LocaleHeader'
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
  histori: {tag: 'TRASHËGIMI HISTORIKE'},
  arkeologji: {tag: 'ARKEOLOGJI'},
  natyre: {tag: 'NATYRË'},
}

export default function DestinacioneClient({
  destinacionet,
  locale='sq',
}: {
  destinacionet: Destinacion[]
  locale?: 'sq'|'en'
}) {
  const en=locale==='en'
  const [filter, setFilter] = useState('all')
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [selectedPhoto, setSelectedPhoto] = useState(0)

  const places: Place[] = destinacionet.map((item, index) => {
    const meta = categoryMeta[item.kategoria] ?? {tag: 'DESTINACION'}
    return {
      ...item,
      titulli: en && item.titulliEn ? item.titulliEn : item.titulli,
      pershkrimi: en && item.pershkrimiEn ? item.pershkrimiEn : item.pershkrimi,
      tag: meta.tag,
      cardText: (en && item.pershkrimiEn ? item.pershkrimiEn : item.pershkrimi) || (en ? 'Discover this destination in Lezhë.' : 'Zbulo këtë destinacion në Lezhë.'),
      alt: en && item.titulliEn ? item.titulliEn : item.titulli,
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
      <LocaleHeader locale={locale} current="destinacione"/>
      <main id="home">
        <section
          id="destinacione"
          className="section destinations"
        >
          <div className="section-top">
            <div>
              <span className="overline">
                {en?'EXPLORE LEZHË':'EKSPLORO LEZHËN'}
              </span>

              <h2>{en?'Places to discover':'Vende për t’u zbuluar'}</h2>
            </div>

            <p>
              {en?'Discover the history of the city through its most important landmarks and the landscapes that surround it.':'Njih historinë e qytetit përmes pikave të tij më të rëndësishme dhe peizazheve që e rrethojnë.'}
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
              {en?'All':'Të gjitha'}
            </button>

            <button
              className={`filter${
                filter === 'histori' ? ' active' : ''
              }`}
              type="button"
              onClick={() => setFilter('histori')}
            >
              {en?'History & archaeology':<>Histori &amp; arkeologji</>}
            </button>

            <button
              className={`filter${
                filter === 'natyre' ? ' active' : ''
              }`}
              type="button"
              onClick={() => setFilter('natyre')}
            >
              {en?'Nature':'Natyrë'}
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
  {en?'Discover place':'Zbulo vendin'}{' '}
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

      <SiteFooter locale={locale}/>

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