import Link from "next/link";

function Icon({name}:{name:"mail"|"pin"|"instagram"|"facebook"|"arrow"}){
  return <span className={`footer-icon footer-icon-${name}`} aria-hidden="true"/>;
}
export default function SiteFooter(){
 return <footer className="site-footer" aria-label="Fundi i faqes">
  <div className="footer-main"><Link href="/" className="logo" aria-label="Lezha Turistike"><span className="logo-mark">L<span>✦</span></span><span>LEZHA<br/><b>TURISTIKE</b></span></Link><p>Një qytet për t’u zbuluar.<br/>Histori, natyrë dhe trashëgimi kulturore, të lidhura përmes hartave dhe rrëfimeve.</p><span className="footer-location">LEZHË · SHQIPËRI</span></div>
  <nav className="footer-navigation" aria-label="Navigimi në fund të faqes"><h2>Eksploro</h2><div className="footer-links"><Link href="/destinacione">Destinacione</Link><Link href="/histori">Histori</Link><Link href="/arkeologji">Arkeologji</Link><Link href="/webgis">Web GIS</Link><Link href="/shkenca">Punime shkencore</Link><Link href="/kulinari">Kulinari</Link><Link href="/partneret">Partnerët</Link><Link href="/galeri">Galeri</Link></div></nav>
  <div className="footer-contact"><h2>Kontakt</h2><a className="footer-info-row" href="mailto:lezhalezha2024@gmail.com"><Icon name="mail"/><span><small>Email</small>lezhalezha2024@gmail.com</span></a><div className="footer-info-row"><Icon name="pin"/><span><small>Lokacioni</small>Rruga e Kalasë, Lezhë, Shqipëri</span></div><Link className="footer-contact-link" href="/kontakt">Na kontakto <Icon name="arrow"/></Link></div>
  <div className="footer-social"><h2>Na ndiq</h2><p>Qëndro i lidhur me Lezhën dhe zbulo histori, vende dhe përvoja të reja.</p><div className="footer-social-links"><a href="#" aria-label="Instagram"><Icon name="instagram"/></a><a href="#" aria-label="Facebook"><Icon name="facebook"/></a></div></div>
  <div className="footer-bottom"><span>© 2026 Lezha Turistike.</span><span>Njih historinë. Eksploro natyrën. Zbulo Lezhën.</span></div>
 </footer>
}
