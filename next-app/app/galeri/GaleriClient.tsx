"use client";
import LocaleHeader from "@/app/components/LocaleHeader";
import SiteFooter from "@/app/components/SiteFooter";
import { useEffect, useState } from "react";

type Destinacion = {_id:string;titulli:string;kategoria?:string;pershkrimi?:string;fotoUrl?:string;galeriaUrls?:string[];burimi?:string;harta?:string};
type GalleryPhoto={src:string;alt:string};
type Gallery={title:string;tag:string;text:string;source:string;harta?:string;photos:GalleryPhoto[]};
type GalleryId=string;

function getTag(category?:string){return ({histori:"TRASHËGIMI HISTORIKE",arkeologji:"ARKEOLOGJI",natyre:"NATYRË"} as Record<string,string>)[category||""]||"DESTINACION"}
function Arrow(){return <svg className="gallery-action-arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 11L11 5M6.5 5H11V9.5"/></svg>}

export default function GaleriClient({destinacionet}:{destinacionet:Destinacion[]}){
 const galleries=destinacionet.reduce((result,destinacion)=>{const id=destinacion._id;if(!id)return result;const urls=destinacion.galeriaUrls&&destinacion.galeriaUrls.length>0?destinacion.galeriaUrls:destinacion.fotoUrl?[destinacion.fotoUrl]:[];result[id]={title:destinacion.titulli,tag:getTag(destinacion.kategoria),text:destinacion.pershkrimi||"",source:destinacion.burimi||"",harta:destinacion.harta,photos:urls.map((src,index)=>({src,alt:`${destinacion.titulli} - fotografia ${index+1}`}))};return result},{} as Partial<Record<GalleryId,Gallery>>);
 const [activeGallery,setActiveGallery]=useState<"all"|GalleryId>("all");
 const [selected,setSelected]=useState<{id:GalleryId;index:number}|null>(null);
 const galleryEntries=Object.entries(galleries).filter(([,gallery])=>gallery&&gallery.photos.length>0) as [GalleryId,Gallery][];
 const visibleGalleries=activeGallery==="all"?galleryEntries:galleryEntries.filter(([id])=>id===activeGallery);
 const selectedGallery=selected?galleries[selected.id]:null;
 const selectedPhoto=selected&&selectedGallery?selectedGallery.photos[selected.index]:null;
 function closeDialog(){setSelected(null)}
 useEffect(()=>{if(!selected)return;const previous=document.activeElement as HTMLElement|null;const overflow=document.body.style.overflow;document.body.style.overflow="hidden";const dialog=document.querySelector<HTMLElement>('[role="dialog"]');dialog?.querySelector<HTMLElement>("button")?.focus();const keydown=(event:KeyboardEvent)=>{if(event.key==="Escape")setSelected(null);if(event.key==="Tab"&&dialog){const items=Array.from(dialog.querySelectorAll<HTMLElement>('button, a[href], [tabindex="0"]'));const first=items[0],last=items[items.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus()}}};document.addEventListener("keydown",keydown);return()=>{document.body.style.overflow=overflow;document.removeEventListener("keydown",keydown);previous?.focus()}},[selected]);
 return <>
  <LocaleHeader locale="sq" current="galeri"/>
  <main id="home"><section id="galeri" className="section gallery-section"><div className="section-top"><div><span className="overline">FOTOGRAFI NGA LEZHA</span><h1>Shiko vendet nga afër.</h1></div><p>Eksploro fotografitë e destinacioneve të Lezhës. Përzgjidh një fotografi për ta parë në madhësi të plotë.</p></div><div id="gallery-filters" className="filters" role="group" aria-label="Fotografi sipas vendit"><button type="button" className={`filter ${activeGallery==="all"?"active":""}`} aria-pressed={activeGallery==="all"} onClick={()=>setActiveGallery("all")}>Të gjitha</button>{galleryEntries.map(([id,gallery])=><button key={id} type="button" className={`filter ${activeGallery===id?"active":""}`} aria-pressed={activeGallery===id} onClick={()=>setActiveGallery(id)}>{gallery.title}</button>)}</div><div id="gallery-grid" className="gallery-grid">{visibleGalleries.flatMap(([id,gallery])=>gallery.photos.map((photo,index)=><button key={`${id}-${photo.src}-${index}`} type="button" className="gallery-photo" aria-label={`Hap fotografinë ${photo.alt||gallery.title}`} onClick={()=>setSelected({id,index})}><img src={photo.src} alt={photo.alt||gallery.title} loading="lazy"/><span>{gallery.title}</span></button>))}</div></section></main>
  <a className="back-to-top" href="#home" aria-label="Ngjitu në krye të faqes" title="Ngjitu lart">↑</a><SiteFooter locale="sq"/>
  {selected&&selectedGallery&&selectedPhoto&&<div className="dialog-backdrop" onClick={closeDialog}><div className="place-dialog gallery-sq-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title" onClick={event=>event.stopPropagation()}><button className="dialog-close" type="button" aria-label="Mbyll" onClick={closeDialog}>×</button><img src={selectedPhoto.src} alt={selectedPhoto.alt}/><div className="dialog-content"><span className="overline">{selectedGallery.tag}</span><h2 id="dialog-title">{selectedGallery.title}</h2><p>{selectedGallery.text}</p><div className="dialog-gallery" aria-label="Fotografi të këtij vendi">{selectedGallery.photos.map((photo,index)=><button key={`${photo.src}-${index}`} type="button" className={`gallery-thumb ${selected.index===index?"selected":""}`} aria-label={`Shfaq fotografinë ${index+1}: ${photo.alt}`} onClick={()=>setSelected({id:selected.id,index})}><img src={photo.src} alt=""/></button>)}</div><div className="dialog-actions gallery-sq-actions"><a className="button dark" href={selectedGallery.harta||`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${selectedGallery.title}, Lezhë, Albania`)}`} target="_blank" rel="noopener noreferrer"><span>Shiko vendndodhjen</span><Arrow/></a>{selectedGallery.source&&<a className="gallery-more-link" href={selectedGallery.source} target="_blank" rel="noopener noreferrer"><span>Më shumë informacion</span><Arrow/></a>}</div></div></div></div>}
  <style jsx>{`
   .gallery-sq-actions a{display:inline-flex;align-items:center;justify-content:space-between;gap:10px;text-decoration:none;white-space:nowrap}
   .gallery-more-link{color:#173d39;font-size:.88rem;font-weight:700;border-bottom:1px solid #9bb5a6;padding:12px 2px 7px}
   .gallery-action-arrow{width:15px;height:15px;flex:0 0 15px;overflow:visible}
   .gallery-action-arrow path{fill:none;stroke:currentColor;stroke-width:1.35;stroke-linecap:round;stroke-linejoin:round}
   @media(max-width:620px){
    .gallery-sq-actions{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(0,1fr)!important;gap:8px!important;width:100%;align-items:stretch!important;margin-top:20px!important}
    .gallery-sq-actions a{width:100%;min-width:0;min-height:48px;padding:11px 10px!important;font-size:.72rem!important;line-height:1.2;white-space:normal;gap:6px}
    .gallery-sq-actions .button.dark{justify-content:space-between}
    .gallery-more-link{justify-content:space-between;border:1px solid #cbd7d0!important;color:#173d39;padding:11px 10px!important}
    .gallery-action-arrow{width:13px;height:13px;flex-basis:13px}
   }
  `}</style>
 </>
}
