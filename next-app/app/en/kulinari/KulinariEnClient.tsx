"use client";
import LocaleHeader from "@/app/components/LocaleHeader";


import {useEffect, useState} from "react";

import BackToTop from "@/app/components/BackToTop";
import SiteFooter from "@/app/components/SiteFooter";

type Item={_id:string;titulli:string;kategoria?:string;pershkrimi?:string;fotoUrl?:string;galeriaUrls?:string[];adresa?:string;orari?:string;telefoni?:string;harta?:string;menuja?:string;website?:string;social?:string;rezervimi?:string;burimi?:string;rating?:number;reviewCount?:number;cmimiNga?:number;monedha?:string;cmimiPer?:string;featured?:boolean};
const currency:Record<string,string>={EUR:"€",USD:"$",ALL:"Lek"};const per:Record<string,string>={person:"person",night:"night",room:"room",meal:"meal"};const labels:Record<string,string>={restorant:"RESTAURANT",agroturizem:"AGRITOURISM",kantine:"WINERY","bar-kafe":"BAR / CAFÉ","produkte-lokale":"LOCAL PRODUCTS",tjeter:"CUISINE"};

export default function KulinariEnClient({kulinari}:{kulinari:Item[]}){
 const [items,setItems]=useState(kulinari); const [selected,setSelected]=useState<Item|null>(null); const [photo,setPhoto]=useState(0);
 const vote=async(x:Item,n:number)=>{if(localStorage.getItem('rated-'+x._id))return alert('You have already rated this place.');const res=await fetch('/api/reviews',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({placeId:x._id,rating:n})});const d=await res.json();if(!res.ok)return alert(res.status===503?'Reviews are not available right now. Please try again later.':'Your rating could not be saved. Please try again.');localStorage.setItem('rated-'+x._id,String(n));setItems(v=>v.map(i=>i._id===x._id?{...i,rating:d.rating,reviewCount:d.reviewCount}:i));};
 const gallery=selected?.galeriaUrls?.length?selected.galeriaUrls:selected?.fotoUrl?[selected.fotoUrl]:[];
 const open=(x:Item)=>{setSelected(x);setPhoto(0);};
 const close=()=>{setSelected(null);};

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
 return <><LocaleHeader locale="en" current="kulinari" />
 <main id="home"><section id="kulinari" className="section destinations"><div className="section-top"><div><span className="overline">CUISINE</span><h2>Discover the flavours of Lezhë.</h2></div><p>Explore restaurants, farm stays, wineries and local produce.</p></div><div className="places">{items.map((x,i)=><article key={x._id} className={`place${x.featured||i===0?" big":""}`}><div className="place-image">{x.fotoUrl&&<img src={x.fotoUrl} alt={x.titulli} loading="lazy"/>}</div><div className="place-body"><span className="tag">{labels[x.kategoria||""]||"CUISINE"}</span><h3>{x.titulli}</h3><div className="culinary-rating-price"><div className="visitor-review"><div className="visitor-stars">{[1,2,3,4,5].map(n=><button key={n} type="button" onClick={()=>vote(x,n)} aria-label={`${n} stars`} className={n<=Math.round(x.rating||0)?"active":""}>★</button>)}</div><small>{x.reviewCount?`${(x.rating||0).toFixed(1)} · ${x.reviewCount} reviews`:"Leave a rating"}</small></div>{x.cmimiNga!=null&&<span className="culinary-price"><small>from</small><b>{currency[x.monedha||"EUR"]||x.monedha||"€"}{x.cmimiNga}</b>{x.cmimiPer&&<small>/ {per[x.cmimiPer]||x.cmimiPer}</small>}</span>}</div><p>{x.pershkrimi}</p>{(x.adresa||x.orari||x.telefoni)&&<div className="culinary-card-meta">{x.adresa&&<span className="culinary-meta-row"><i className="culinary-meta-icon pin" aria-hidden="true"/><em>{x.adresa}</em></span>}{x.orari&&<span className="culinary-meta-row"><i className="culinary-meta-icon clock" aria-hidden="true"/><em>{x.orari}</em></span>}{x.telefoni&&<a className="culinary-meta-row" href={`tel:${x.telefoni}`}><i className="culinary-meta-icon phone" aria-hidden="true"/><em>{x.telefoni}</em></a>}</div>}<button className="place-link-button" type="button" onClick={()=>open(x)}>View place <span className="arrow-icon" aria-hidden="true">↗</span></button></div></article>)}</div></section></main>
 <BackToTop locale="en"/>
 <SiteFooter locale="en"/>
 {selected&&<div className="dialog-backdrop" onClick={close}><div className="place-dialog" role="dialog" aria-modal="true" onClick={e=>e.stopPropagation()}><button className="dialog-close" onClick={close} aria-label="Close">×</button>{gallery[photo]&&<img src={gallery[photo]} alt={selected.titulli}/>}<div className="dialog-content"><span className="overline">{labels[selected.kategoria||""]||"CUISINE"}</span><h2>{selected.titulli}</h2><p>{selected.pershkrimi}</p><div className="culinary-details">{selected.adresa&&<div><b>Address</b><span>{selected.adresa}</span></div>}{selected.orari&&<div><b>Opening hours</b><span>{selected.orari}</span></div>}{selected.telefoni&&<div><b>Phone</b><a href={`tel:${selected.telefoni}`}>{selected.telefoni}</a></div>}</div>{gallery.length>1&&<div className="dialog-gallery">{gallery.map((p,i)=><button key={p+i} className={`gallery-thumb${photo===i?" selected":""}`} onClick={()=>setPhoto(i)}><img src={p} alt=""/></button>)}</div>}<div className="culinary-actions">{selected.harta&&<a className="button dark" href={selected.harta} target="_blank" rel="noopener noreferrer">Google Maps <span className="arrow-icon" aria-hidden="true">↗</span></a>}{selected.menuja&&<a className="button outline" href={selected.menuja} target="_blank" rel="noopener noreferrer">View menu <span className="arrow-icon" aria-hidden="true">↗</span></a>}{selected.rezervimi&&<a className="button primary" href={selected.rezervimi} target="_blank" rel="noopener noreferrer">Book <span className="arrow-icon" aria-hidden="true">↗</span></a>}{selected.website&&<a href={selected.website} target="_blank" rel="noopener noreferrer">Website <span className="arrow-icon" aria-hidden="true">↗</span></a>}{selected.social&&<a href={selected.social} target="_blank" rel="noopener noreferrer">Social media <span className="arrow-icon" aria-hidden="true">↗</span></a>}{selected.burimi&&<a href={selected.burimi} target="_blank" rel="noopener noreferrer">More information <span className="arrow-icon" aria-hidden="true">↗</span></a>}</div></div></div></div>}</>
}