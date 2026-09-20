import { getPageContent } from "@/sanity/lib/content";
export const dynamic = "force-dynamic";
import defaults from "@/sanity/content/histori.json";
import BackToTop from "@/app/components/BackToTop";
import MenuButton from "@/app/components/MenuButton";
import SiteFooter from "@/app/components/SiteFooter";
import HistoryBook from "./HistoryBook";
import Link from "next/link";

export default async function HistoriPage() {
  const content = await getPageContent("histori", defaults);
  return (<>
    <header className="header">
      <Link href="/" className="logo" aria-label="Lezha Turistike, faqja kryesore"><span className="logo-mark">L<span>✦</span></span><span>LEZHA<br/><b>TURISTIKE</b></span></Link>
      <nav className="nav" id="nav" aria-label="Navigimi kryesor">
        <Link href="/">Home</Link>>
        <Link href="/destinacione">Destinacione</Link><Link href="/galeri">Galeri</Link><Link href="/histori" aria-current="page">Histori</Link><Link href="/arkeologji">Arkeologji</Link><Link href="/webgis">Web GIS</Link><Link href="/shkenca">Punime shkencore</Link><Link href="/kulinari">Kulinari</Link><Link href="/partneret">Partnerët</Link><Link href="/kontakt">Kontakt</Link>
      <span className="language-switch"><Link href="/histori">SQ</Link><span> / </span><Link href="/en/histori">EN</Link></span></nav>
      <MenuButton/><Link className="nav-cta" href="/webgis">Hap hartën <span><span className="arrow-icon" aria-hidden="true">↗</span></span></Link>
    </header>
    <main id="home"><HistoryBook content={content}/></main>
    <BackToTop/><SiteFooter/>
  </>);
}
