import Link from "next/link";
import MenuButton from "@/app/components/MenuButton";
type Locale="sq"|"en";
const nav=[["destinacione","Destinacione","Destinations"],["galeri","Galeri","Gallery"],["histori","Histori","History"],["arkeologji","Arkeologji","Archaeology"],["webgis","Web GIS","Web GIS"],["shkenca","Punime shkencore","Scientific research"],["kulinari","Kulinari","Cuisine"],["partneret","Partnerët","Partners"],["kontakt","Kontakt","Contact"]];
export default function LocaleHeader({locale="sq",current}:{locale?:Locale;current?:string}){
 const prefix=locale==="en"?"/en":"";
 return <header className="header"><Link href={prefix||"/"} className="logo" aria-label="Lezha Turistike"><span className="logo-mark">L<span>✦</span></span><span>LEZHA<br/><b>TURISTIKE</b></span></Link><nav className="nav" id="nav" aria-label={locale==="en"?"Main navigation":"Navigimi kryesor"}>{nav.map(([slug,sq,en])=><Link key={slug} href={prefix+"/"+slug} aria-current={current===slug?"page":undefined}>{locale==="en"?en:sq}</Link>)}<span className="language-switch"><Link href={current?"/"+current:"/"}>SQ</Link><span>/</span><Link href={current?"/en/"+current:"/en"}>EN</Link></span></nav><MenuButton/><Link className="nav-cta" href={prefix+"/webgis"}>{locale==="en"?"Open map":"Hap hartën"} <span className="arrow-icon" aria-hidden="true">↗</span></Link></header>;
}
