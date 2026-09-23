'use client'

import { useEffect, useMemo, useRef } from 'react'

export type MapPlace = {
  name: string
  lat: number
  lng: number
  note: string
}

type Props = {
  places: MapPlace[]
  active: number
  onActive: (index: number) => void
  transport: string
}

declare global {
  interface Window {
    L?: any
  }
}

export default function LiveTourMap({ places, active, onActive, transport }: Props) {
  const mapNode = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const lineRef = useRef<any>(null)

  useEffect(() => {
    let cancelled = false

    const createMap = () => {
      if (cancelled || !mapNode.current || mapRef.current || !window.L) return
      const L = window.L
      const map = L.map(mapNode.current, { zoomControl: true, scrollWheelZoom: false })
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map)
      mapRef.current = map
    }

    if (window.L) {
      createMap()
    } else {
      if (!document.querySelector('link[data-planner-leaflet]')) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
        link.setAttribute('data-planner-leaflet', 'true')
        document.head.appendChild(link)
      }

      const existing = document.querySelector('script[data-planner-leaflet]') as HTMLScriptElement | null
      if (existing) {
        existing.addEventListener('load', createMap, { once: true })
      } else {
        const script = document.createElement('script')
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
        script.setAttribute('data-planner-leaflet', 'true')
        script.addEventListener('load', createMap, { once: true })
        document.body.appendChild(script)
      }
    }

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    const L = window.L
    if (!map || !L) return

    markersRef.current.forEach((marker) => marker.remove())
    markersRef.current = []
    if (lineRef.current) {
      lineRef.current.remove()
      lineRef.current = null
    }
    if (!places.length) return

    const points = places.map((place) => [place.lat, place.lng] as [number, number])
    lineRef.current = L.polyline(points, {
      color: '#173d39',
      weight: 4,
      opacity: 0.82,
      dashArray: '10 8',
      lineCap: 'round',
    }).addTo(map)

    markersRef.current = places.map((place, index) => {
      const icon = L.divIcon({
        className: 'planner-marker-shell',
        html: `<div class="planner-marker${index === active ? ' is-active' : ''}">${index + 1}</div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      })
      const marker = L.marker([place.lat, place.lng], { icon }).addTo(map)
      marker.bindTooltip(`${place.name} · ${place.note}`, { direction: 'top', offset: [0, -14] })
      marker.on('click', () => onActive(index))
      return marker
    })

    if (points.length === 1) map.setView(points[0], 14)
    else map.fitBounds(L.latLngBounds(points), { padding: [45, 45], maxZoom: 14 })
    window.setTimeout(() => map.invalidateSize(), 80)
  }, [places, onActive])

  useEffect(() => {
    const map = mapRef.current
    const L = window.L
    if (!map || !L || !places.length) return

    markersRef.current.forEach((marker, index) => {
      marker.setIcon(
        L.divIcon({
          className: 'planner-marker-shell',
          html: `<div class="planner-marker${index === active ? ' is-active' : ''}">${index + 1}</div>`,
          iconSize: [36, 36],
          iconAnchor: [18, 18],
        }),
      )
    })

    const selected = places[Math.min(active, places.length - 1)]
    if (selected) map.panTo([selected.lat, selected.lng], { animate: true, duration: 0.45 })
  }, [active, places])

  const current = places[Math.min(active, Math.max(places.length - 1, 0))]
  const travelMode = transport === 'Në këmbë' ? 'walking' : transport === 'Biçikletë' ? 'bicycling' : 'driving'

  const directions = useMemo(() => {
    if (places.length < 2) return ''
    const origin = places[0]
    const destination = places[places.length - 1]
    const waypoints = places.slice(1, -1).map((p) => `${p.lat},${p.lng}`).join('|')
    const base = `https://www.google.com/maps/dir/?api=1&origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}`
    return `${base}${waypoints ? `&waypoints=${encodeURIComponent(waypoints)}` : ''}&travelmode=${travelMode}`
  }, [places, travelMode])

  if (!current) return null

  return (
    <div className="mapWrap">
      <div className="map">
        <div ref={mapNode} className="leafletHost" />
        <div className="mapTop">
          <span>{places.length} NDALËSA</span>
          <span>TRACE AKTIV</span>
        </div>
        <div className="badge">
          <small>NDALËSA {active + 1}/{places.length}</small>
          <b>{current.name}</b>
          <span>{current.note}</span>
        </div>
      </div>

      <div className="strip">
        {places.map((place, index) => (
          <button key={`${place.name}-${index}`} className={index === active ? 'on' : ''} onClick={() => onActive(index)}>
            <span>{index + 1}</span>
            <b>{place.name}</b>
          </button>
        ))}
      </div>

      {directions && (
        <a className="routeLink" href={directions} target="_blank" rel="noreferrer">
          <span>Hap itinerarin e plotë · {transport}</span>
          <span>↗</span>
        </a>
      )}

      <style jsx global>{`
        .planner-marker-shell { background: transparent !important; border: 0 !important; }
        .planner-marker { width: 34px; height: 34px; border-radius: 50%; display: grid; place-items: center; background: #f7f3ec; color: #173d39; border: 2px solid #173d39; font: 800 12px/1 system-ui; box-shadow: 0 5px 15px rgba(0,0,0,.18); transition: .2s; }
        .planner-marker.is-active { background: #173d39; color: white; transform: scale(1.2); box-shadow: 0 7px 20px rgba(23,61,57,.35); }
      `}</style>
      <style jsx>{`
        .mapWrap { position: sticky; top: 92px; }
        .map { height: min(68vh,650px); min-height: 560px; position: relative; border-radius: 24px; overflow: hidden; border: 1px solid rgba(23,61,57,.16); background: #e9ece7; }
        .leafletHost { position: absolute; inset: 0; z-index: 1; }
        .mapTop { position: absolute; z-index: 500; top: 14px; left: 14px; display: flex; gap: 6px; pointer-events: none; }
        .mapTop span { background: rgba(247,243,236,.94); color: #173d39; border-radius: 999px; padding: 7px 10px; font-size: .59rem; font-weight: 850; letter-spacing: .08em; box-shadow: 0 6px 20px rgba(0,0,0,.08); }
        .badge { position: absolute; z-index: 500; left: 18px; bottom: 18px; max-width: 330px; background: rgba(247,243,236,.94); color: #173d39; padding: 15px 17px; border-radius: 16px; box-shadow: 0 12px 35px rgba(0,0,0,.12); backdrop-filter: blur(10px); pointer-events: none; }
        .badge small, .badge b, .badge span { display: block; }
        .badge small { font-size: .61rem; letter-spacing: .1em; opacity: .55; }
        .badge b { font-size: 1.12rem; margin: 4px 0; }
        .badge span { font-size: .78rem; opacity: .65; }
        .strip { display: flex; gap: 6px; overflow-x: auto; padding: 10px 1px 2px; scrollbar-width: none; }
        .strip::-webkit-scrollbar { display: none; }
        .strip button { flex: 0 0 auto; border: 1px solid rgba(23,61,57,.16); background: transparent; color: inherit; border-radius: 999px; padding: 8px 11px; display: flex; align-items: center; gap: 7px; cursor: pointer; }
        .strip button > span { width: 22px; height: 22px; border-radius: 50%; display: grid; place-items: center; border: 1px solid rgba(23,61,57,.18); font-size: .65rem; }
        .strip button b { font-size: .72rem; }
        .strip button.on { background: #173d39; color: #f7f3ec; }
        .routeLink { margin-top: 10px; display: flex; justify-content: space-between; align-items: center; padding: 15px 19px; border-radius: 999px; background: #173d39; color: #f7f3ec; text-decoration: none; font-size: .82rem; font-weight: 850; }
        @media (max-width: 900px) { .mapWrap { position: relative; top: auto; } .map { min-height: 520px; } }
        @media (max-width: 620px) { .map { min-height: 430px; height: 58vh; } .badge { left: 11px; right: 11px; bottom: 11px; max-width: none; } .strip button b { max-width: 110px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } }
      `}</style>
    </div>
  )
}
