import Link from "next/link";

export default function SiteFooter(){
 return <footer className="site-footer" aria-label="Fundi i faqes">
  <div className="footer-main">
   <Link href="/" className="logo" aria-label="Lezha Turistike"><span className="logo-mark">L<span>✦</span></span><span>LEZHA<br/><b>TURISTIKE</b></span></Link>
   <p>Një qytet për t’u zbuluar.<br/>Histori, natyrë dhe trashëgimi kulturore, të lidhura përmes hartave dhe rrëfimeve.</p>
   <span className="footer-location">LEZHË · SHQIPËRI</span>
  </div>
  <nav className="footer-navigation" aria-label="Navigimi në fund të faqes"><h2>Eksploro</h2><div className="footer-links"><Link href="/destinacione">Destinacione</Link><Link href="/histori">Histori</Link><Link href="/arkeologji">Arkeologji</Link><Link href="/webgis">Web GIS</Link><Link href="/shkenca">Punime shkencore</Link><Link href="/kulinari">Kulinari</Link><Link href="/partneret">Partnerët</Link><Link href="/galeri">Galeri</Link></div></nav>
  <div className="footer-contact"><h2>Le të lidhemi</h2><p>Për informacion dhe bashkëpunime.</p><a className="footer-email" href="mailto:lezhalezha2024@gmail.com">lezhalezha2024@gmail.com <span className="arrow-icon" aria-hidden="true">↗</span></a><p>Rruga e Kalasë<br/>Lezhë, Shqipëri</p><Link className="footer-contact-link" href="/kontakt">Na kontakto <span className="arrow-icon" aria-hidden="true">↗</span></Link></div>
  <div className="footer-bottom"><span>© 2026 Lezha Turistike.</span><span>Njih historinë. Eksploro natyrën. Zbulo Lezhën.</span></div>
 </footer>
}
