"use client";

import Link from "next/link";
import {useState} from "react";
import MenuButton from "@/app/components/MenuButton";
import BackToTop from "@/app/components/BackToTop";
import SiteFooter from "@/app/components/SiteFooter";

type Item={_id:string;titulli:string;kategoria?:string;pershkrimi?:string;fotoUrl?:string;galeriaUrls?:string[];adresa?:string;orari?:string;telefoni?:string;harta?:string;menuja?:string;website?:string;social?:string;rezervimi?:string;burimi?:string;featured?:boolean};
const labels:Record<string,string>={restorant:"RESTORANT",agroturizem:"AGROTURIZËM",kantine:"KANTINË","bar-kafe":"BAR / KAFE","produkte-lokale":"PRODUKTE LOKALE",tjeter:"KULINARI"};

export default function KulinariClient({kulinari}:{kulinari:Item[]}){
 const [selected,setSelected]=useState<Item|null>(null); const [photo,setPhoto]=useState(0);
 const gallery=selected?.galeriaUrls?.length?selected.galeriaUrls:selected?.fotoUrl?[selected.fotoUrl]:[];
 const open=(x:Item)=>{setSelected(x);setPhoto(0);document.body.style.overflow="hidden"};
 const close=()=>{setSelected(null);document.body.style.overflow=""};
 return <><header className="header"><Link href="/" className="logo"><span className="logo-mark">L<span>✦</span></span><span>LEZHA<br/><b>TURISTIKE</b></span></Link><nav className="nav" id="nav"><Link href="/destinacione">Destinacione</Link><Link href="/galeri">Galeri</Link><Link href="/histori">Histori</Link><Link href="/arkeologji">Arkeologji</Link><Link href="/webgis">Web GIS</Link><Link href="/shkenca">Punime shkencore</Link><Link href="/kulinari" aria-current="page">Kulinari</Link><Link href="/partneret">Partnerët</Link><Link href="/kontakt">Kontakt</Link></nav><MenuButton/><Link className="nav-cta" href="/webgis">Hap hartën <span>↗</span></Link></header>
 <main id="home"><section id="kulinari" className="section destinations"><div className="section-top"><div><span className="overline">KULINARI</span><h2>Lezha shijohet edhe në tryezë.</h2></div><p>Zbulo restorante, agroturizme, kantina dhe produkte vendase.</p></div><div className="places">{kulinari.map((x,i)=><article key={x._id} className={`place${x.featured||i===0?" big":""}`}><div className="place-image">{x.fotoUrl&&<img src={x.fotoUrl} alt={x.titulli} loading="lazy"/>}</div><div className="place-body"><span className="tag">{labels[x.kategoria||""]||"KULINARI"}</span><h3>{x.titulli}</h3><p>{x.pershkrimi}</p>{(x.adresa||x.orari||x.telefoni)&&<div className="culinary-card-meta">{x.adresa&&<span className="culinary-meta-row"><i className="culinary-meta-icon pin" aria-hidden="true"/><em>{x.adresa}</em></span>}{x.orari&&<span className="culinary-meta-row"><i className="culinary-meta-icon clock" aria-hidden="true"/><em>{x.orari}</em></span>}{x.telefoni&&<a className="culinary-meta-row" href={`tel:${x.telefoni}`}><i className="culinary-meta-icon phone" aria-hidden="true"/><em>{x.telefoni}</em></a>}</div>}<button className="place-link-button" type="button" onClick={()=>open(x)}>Shiko vendin <span className="arrow-icon" aria-hidden="true">↗</span></button></div></article>)}</div></section></main>
 <BackToTop/>
 <SiteFooter/>
 {selected&&<div className="dialog-backdrop" onClick={close}><div className="place-dialog" role="dialog" aria-modal="true" onClick={e=>e.stopPropagation()}><button className="dialog-close" onClick={close} aria-label="Mbyll">×</button>{gallery[photo]&&<img src={gallery[photo]} alt={selected.titulli}/>}<div className="dialog-content"><span className="overline">{labels[selected.kategoria||""]||"KULINARI"}</span><h2>{selected.titulli}</h2><p>{selected.pershkrimi}</p><div className="culinary-details">{selected.adresa&&<div><b>Adresa</b><span>{selected.adresa}</span></div>}{selected.orari&&<div><b>Orari</b><span>{selected.orari}</span></div>}{selected.telefoni&&<div><b>Telefon</b><a href={`tel:${selected.telefoni}`}>{selected.telefoni}</a></div>}</div>{gallery.length>1&&<div className="dialog-gallery">{gallery.map((p,i)=><button key={p+i} className={`gallery-thumb${photo===i?" selected":""}`} onClick={()=>setPhoto(i)}><img src={p} alt=""/></button>)}</div>}<div className="culinary-actions">{selected.harta&&<a className="button dark" href={selected.harta} target="_blank" rel="noopener noreferrer">Google Maps ↗</a>}{selected.menuja&&<a className="button outline" href={selected.menuja} target="_blank" rel="noopener noreferrer">Shiko menunë ↗</a>}{selected.rezervimi&&<a className="button primary" href={selected.rezervimi} target="_blank" rel="noopener noreferrer">Rezervo ↗</a>}{selected.website&&<a href={selected.website} target="_blank" rel="noopener noreferrer">Website ↗</a>}{selected.social&&<a href={selected.social} target="_blank" rel="noopener noreferrer">Rrjetet sociale ↗</a>}{selected.burimi&&<a href={selected.burimi} target="_blank" rel="noopener noreferrer">Më shumë informacion ↗</a>}</div></div></div></div>}</>
}<footer className="site-footer" aria-label="Fundi i faqes">
        <div className="footer-main">
          <Link href="/" className="logo" aria-label="Lezha Turistike, faqja kryesore">
            <span className="logo-mark">L<span>✦</span></span>
            <span>LEZHA<br/><b>TURISTIKE</b></span>
          </Link>
          <p>Një qytet për t’u zbuluar.<br/>Histori, natyrë dhe trashëgimi kulturore, të lidhura përmes hartave dhe rrëfimeve.</p>
          <span className="footer-location">LEZHË · SHQIPËRI</span>
        </div>
        <nav className="footer-navigation" aria-label="Navigimi në fund të faqes">
          <h2>Eksploro</h2>
          <div className="footer-links">
            <Link href="/destinacione">Destinacione</Link><Link href="/histori">Histori</Link><Link href="/arkeologji">Arkeologji</Link><Link href="/webgis">Web GIS</Link><Link href="/shkenca">Punime shkencore</Link><Link href="/kulinari">Kulinari</Link><Link href="/partneret">Partnerët</Link><Link href="/galeri">Galeri</Link>
          </div>
        </nav>
        <div className="footer-contact">
          <h2>Le të lidhemi</h2>
          <p>Për informacion dhe bashkëpunime.</p>
          <a className="footer-email" href="mailto:lezhalezha2024@gmail.com">lezhalezha2024@gmail.com <span aria-hidden="true"><span className="arrow-icon" aria-hidden="true">↗</span></span></a>
          <p>Rruga e Kalasë<br/>Lezhë, Shqipëri</p>
          <Link className="footer-contact-link" href="/kontakt">Na kontakto <span aria-hidden="true"><span className="arrow-icon" aria-hidden="true">↗</span></span></Link>
        </div>
        <div className="footer-bottom"><span>© 2026 Lezha Turistike.</span><span>Njih historinë. Eksploro natyrën. Zbulo Lezhën.</span></div>
      </footer>ent";

import Link from "next/link";
import {useState} from "react";
import MenuButton from "@/app/components/MenuButton";
import BackToTop from "@/app/components/BackToTop";
import SiteFooter from "@/app/components/SiteFooter";

type Item={_id:string;titulli:string;kategoria?:string;pershkrimi?:string;fotoUrl?:string;galeriaUrls?:string[];adresa?:string;orari?:string;telefoni?:string;harta?:string;menuja?:string;website?:string;social?:string;rezervimi?:string;burimi?:string;featured?:boolean};
const labels:Record<string,string>={restorant:"RESTORANT",agroturizem:"AGROTURIZËM",kantine:"KANTINË","bar-kafe":"BAR / KAFE","produkte-lokale":"PRODUKTE LOKALE",tjeter:"KULINARI"};

export default function KulinariClient({kulinari}:{kulinari:Item[]}){
 const [selected,setSelected]=useState<Item|null>(null); const [photo,setPhoto]=useState(0);
 const gallery=selected?.galeriaUrls?.length?selected.galeriaUrls:selected?.fotoUrl?[selected.fotoUrl]:[];
 const open=(x:Item)=>{setSelected(x);setPhoto(0);document.body.style.overflow="hidden"};
 const close=()=>{setSelected(null);document.body.style.overflow=""};
 return <><header className="header"><Link href="/" className="logo"><span className="logo-mark">L<span>✦</span></span><span>LEZHA<br/><b>TURISTIKE</b></span></Link><nav className="nav" id="nav"><Link href="/destinacione">Destinacione</Link><Link href="/galeri">Galeri</Link><Link href="/histori">Histori</Link><Link href="/arkeologji">Arkeologji</Link><Link href="/webgis">Web GIS</Link><Link href="/shkenca">Punime shkencore</Link><Link href="/kulinari" aria-current="page">Kulinari</Link><Link href="/partneret">Partnerët</Link><Link href="/kontakt">Kontakt</Link></nav><MenuButton/><Link className="nav-cta" href="/webgis">Hap hartën <span>↗</span></Link></header>
 <main id="home"><section id="kulinari" className="section destinations"><div className="section-top"><div><span className="overline">KULINARI</span><h2>Lezha shijohet edhe në tryezë.</h2></div><p>Zbulo restorante, agroturizme, kantina dhe produkte vendase.</p></div><div className="places">{kulinari.map((x,i)=><article key={x._id} className={`place${x.featured||i===0?" big":""}`}><div className="place-image">{x.fotoUrl&&<img src={x.fotoUrl} alt={x.titulli} loading="lazy"/>}</div><div className="place-body"><span className="tag">{labels[x.kategoria||""]||"KULINARI"}</span><h3>{x.titulli}</h3><p>{x.pershkrimi}</p>{(x.adresa||x.orari||x.telefoni)&&<div className="culinary-card-meta">{x.adresa&&<span className="culinary-meta-row"><i className="culinary-meta-icon pin" aria-hidden="true"/><em>{x.adresa}</em></span>}{x.orari&&<span className="culinary-meta-row"><i className="culinary-meta-icon clock" aria-hidden="true"/><em>{x.orari}</em></span>}{x.telefoni&&<a className="culinary-meta-row" href={`tel:${x.telefoni}`}><i className="culinary-meta-icon phone" aria-hidden="true"/><em>{x.telefoni}</em></a>}</div>}<button className="place-link-button" type="button" onClick={()=>open(x)}>Shiko vendin <span className="arrow-icon" aria-hidden="true">↗</span></button></div></article>)}</div></section></main>
 <BackToTop/>
 <SiteFooter/>
 {selected&&<div className="dialog-backdrop" onClick={close}><div className="place-dialog" role="dialog" aria-modal="true" onClick={e=>e.stopPropagation()}><button className="dialog-close" onClick={close} aria-label="Mbyll">×</button>{gallery[photo]&&<img src={gallery[photo]} alt={selected.titulli}/>}<div className="dialog-content"><span className="overline">{labels[selected.kategoria||""]||"KULINARI"}</span><h2>{selected.titulli}</h2><p>{selected.pershkrimi}</p><div className="culinary-details">{selected.adresa&&<div><b>Adresa</b><span>{selected.adresa}</span></div>}{selected.orari&&<div><b>Orari</b><span>{selected.orari}</span></div>}{selected.telefoni&&<div><b>Telefon</b><a href={`tel:${selected.telefoni}`}>{selected.telefoni}</a></div>}</div>{gallery.length>1&&<div className="dialog-gallery">{gallery.map((p,i)=><button key={p+i} className={`gallery-thumb${photo===i?" selected":""}`} onClick={()=>setPhoto(i)}><img src={p} alt=""/></button>)}</div>}<div className="culinary-actions">{selected.harta&&<a className="button dark" href={selected.harta} target="_blank" rel="noopener noreferrer">Google Maps ↗</a>}{selected.menuja&&<a className="button outline" href={selected.menuja} target="_blank" rel="noopener noreferrer">Shiko menunë ↗</a>}{selected.rezervimi&&<a className="button primary" href={selected.rezervimi} target="_blank" rel="noopener noreferrer">Rezervo ↗</a>}{selected.website&&<a href={selected.website} target="_blank" rel="noopener noreferrer">Website ↗</a>}{selected.social&&<a href={selected.social} target="_blank" rel="noopener noreferrer">Rrjetet sociale ↗</a>}{selected.burimi&&<a href={selected.burimi} target="_blank" rel="noopener noreferrer">Më shumë informacion ↗</a>}</div></div></div></div>}</>
}
