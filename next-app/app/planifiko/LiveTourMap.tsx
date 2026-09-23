'use client'

import { useEffect, useMemo, useRef } from 'react'

export type MapPlace = { name:string; lat:number; lng:number; note:string; description?:string; image?:string }
type Props = { places:MapPlace[]; active:number; onActive:(index:number)=>void; transport:string }
declare global { interface Window { L?: any } }

export default function LiveTourMap({places,active,onActive,transport}:Props){
 const mapNode=useRef<HTMLDivElement|null>(null)
 const mapRef=useRef<any>(null)
 const markersRef=useRef<any[]>([])
 const lineRef=useRef<any>(null)
 const activeRef=useRef(active)
 const placesRef=useRef(places)
 useEffect(()=>{activeRef.current=active},[active])
 useEffect(()=>{placesRef.current=places},[places])

 useEffect(()=>{
  let cancelled=false
  const createMap=()=>{
   if(cancelled||!mapNode.current||mapRef.current||!window.L)return
   const L=window.L
   const map=L.map(mapNode.current,{zoomControl:true,scrollWheelZoom:true})
   const street=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap contributors',maxZoom:19})
   const satellite=L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{attribution:'Tiles © Esri',maxZoom:19})
   street.addTo(map)
   L.control.layers({'Hartë':street,'Satelit':satellite},undefined,{position:'topright',collapsed:false}).addTo(map)
   mapRef.current=map
   drawPlaces(map,L,placesRef.current,activeRef.current,onActive,markersRef,lineRef)
  }
  if(window.L)createMap(); else {
   if(!document.querySelector('link[data-planner-leaflet]')){const link=document.createElement('link');link.rel='stylesheet';link.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';link.setAttribute('data-planner-leaflet','true');document.head.appendChild(link)}
   const existing=document.querySelector('script[data-planner-leaflet]') as HTMLScriptElement|null
   if(existing)existing.addEventListener('load',createMap,{once:true}); else {const script=document.createElement('script');script.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';script.setAttribute('data-planner-leaflet','true');script.addEventListener('load',createMap,{once:true});document.body.appendChild(script)}
  }
  return()=>{cancelled=true}
 },[onActive])

 useEffect(()=>{const map=mapRef.current,L=window.L;if(!map||!L)return;drawPlaces(map,L,places,active,onActive,markersRef,lineRef)},[places,onActive])
 useEffect(()=>{
  const map=mapRef.current,L=window.L;if(!map||!L||!places.length)return
  markersRef.current.forEach((marker,index)=>marker.setIcon(makeIcon(L,index,index===active)))
  const selected=places[Math.min(active,places.length-1)]
  const marker=markersRef.current[Math.min(active,markersRef.current.length-1)]
  if(selected){map.flyTo([selected.lat,selected.lng],16,{animate:true,duration:.85});window.setTimeout(()=>marker?.openPopup(),500)}
 },[active,places])

 const current=places[Math.min(active,Math.max(places.length-1,0))]
 const travelMode=transport==='Në këmbë'?'walking':transport==='Biçikletë'?'bicycling':'driving'
 const directions=useMemo(()=>{if(places.length<2)return'';const o=places[0],d=places[places.length-1],w=places.slice(1,-1).map(p=>`${p.lat},${p.lng}`).join('|');return `https://www.google.com/maps/dir/?api=1&origin=${o.lat},${o.lng}&destination=${d.lat},${d.lng}${w?`&waypoints=${encodeURIComponent(w)}`:''}&travelmode=${travelMode}`},[places,travelMode])
 if(!current)return null
 return <div className="mapWrap"><div className="map"><div ref={mapNode} className="leafletHost"/><div className="mapTop"><span>{places.length} NDALËSA</span><span>TRACE AKTIV</span></div></div><div className="strip">{places.map((p,i)=><button key={`${p.name}-${i}`} className={i===active?'on':''} onClick={()=>onActive(i)}><span>{i+1}</span><b>{p.name}</b></button>)}</div>{directions&&<a className="routeLink" href={directions} target="_blank" rel="noreferrer"><span>Hap itinerarin e plotë · {transport}</span><span>↗</span></a>}
 <style jsx global>{`.planner-marker-shell{background:transparent!important;border:0!important}.planner-marker{width:36px;height:36px;border-radius:50%;display:grid;place-items:center;background:#f7f3ec;color:#173d39;border:2px solid #173d39;font:800 12px/1 system-ui;box-shadow:0 5px 15px rgba(0,0,0,.2);transition:.2s}.planner-marker.is-active{background:#173d39;color:#fff;transform:scale(1.22)}.planner-popup .leaflet-popup-content-wrapper{border-radius:18px;padding:0;overflow:hidden}.planner-popup .leaflet-popup-content{margin:0;width:250px!important}.popupCard img{width:100%;height:125px;object-fit:cover;display:block}.popupText{padding:14px}.popupText small,.popupText b,.popupText span{display:block}.popupText small{font-size:10px;letter-spacing:.09em;opacity:.55;text-transform:uppercase}.popupText b{font-size:16px;margin:4px 0 6px;color:#173d39}.popupText span{font-size:12px;line-height:1.45;color:#45605d}.leaflet-control-layers{border:0!important;border-radius:14px!important;box-shadow:0 8px 25px rgba(0,0,0,.14)!important;font:700 12px system-ui;color:#173d39}.leaflet-control-layers-expanded{padding:9px 12px!important}`}</style>
 <style jsx>{`.mapWrap{position:sticky;top:92px}.map{height:min(68vh,650px);min-height:560px;position:relative;border-radius:24px;overflow:hidden;border:1px solid rgba(23,61,57,.16);background:#e9ece7}.leafletHost{position:absolute;inset:0;z-index:1}.mapTop{position:absolute;z-index:500;top:14px;left:52px;display:flex;gap:6px;pointer-events:none}.mapTop span{background:rgba(247,243,236,.94);color:#173d39;border-radius:999px;padding:7px 10px;font-size:.59rem;font-weight:850;letter-spacing:.08em}.strip{display:flex;gap:6px;overflow-x:auto;padding:10px 1px 2px;scrollbar-width:none}.strip::-webkit-scrollbar{display:none}.strip button{flex:0 0 auto;border:1px solid rgba(23,61,57,.16);background:transparent;color:inherit;border-radius:999px;padding:8px 11px;display:flex;align-items:center;gap:7px;cursor:pointer}.strip button>span{width:22px;height:22px;border-radius:50%;display:grid;place-items:center;border:1px solid rgba(23,61,57,.18);font-size:.65rem}.strip button b{font-size:.72rem}.strip button.on{background:#173d39;color:#f7f3ec}.routeLink{margin-top:10px;display:flex;justify-content:space-between;align-items:center;padding:15px 19px;border-radius:999px;background:#173d39;color:#f7f3ec;text-decoration:none;font-size:.82rem;font-weight:850}@media(max-width:900px){.mapWrap{position:relative;top:auto}.map{min-height:520px}}@media(max-width:620px){.map{min-height:430px;height:58vh}.mapTop{left:12px;top:12px}.strip button b{max-width:110px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}}`}</style></div>
}

function makeIcon(L:any,index:number,isActive:boolean){return L.divIcon({className:'planner-marker-shell',html:`<div class="planner-marker${isActive?' is-active':''}">${index+1}</div>`,iconSize:[38,38],iconAnchor:[19,19]})}
function esc(v:string){return v.replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]||c))}
function popupHtml(place:MapPlace,index:number){const image=place.image?`<img src="${esc(place.image)}" alt="">`:'';return `<div class="popupCard">${image}<div class="popupText"><small>NDALËSA ${index+1} · ${esc(place.note)}</small><b>${esc(place.name)}</b><span>${esc(place.description||'Kliko ndalesën për ta eksploruar në itinerarin tënd.')}</span></div></div>`}
function drawPlaces(map:any,L:any,places:MapPlace[],active:number,onActive:(i:number)=>void,markersRef:any,lineRef:any){markersRef.current.forEach((m:any)=>m.remove());markersRef.current=[];if(lineRef.current){lineRef.current.remove();lineRef.current=null}if(!places.length)return;const pts=places.map(p=>[p.lat,p.lng] as [number,number]);lineRef.current=L.polyline(pts,{color:'#173d39',weight:4,opacity:.82,dashArray:'10 8',lineCap:'round'}).addTo(map);markersRef.current=places.map((p,i)=>{const m=L.marker([p.lat,p.lng],{icon:makeIcon(L,i,i===active)}).addTo(map);m.bindPopup(popupHtml(p,i),{className:'planner-popup',maxWidth:270});m.on('click',()=>onActive(i));return m});if(pts.length===1)map.setView(pts[0],15);else map.fitBounds(L.latLngBounds(pts),{padding:[45,45],maxZoom:14});window.setTimeout(()=>map.invalidateSize(),80)}