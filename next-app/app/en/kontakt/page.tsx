import {pageMetadata} from "@/app/seo";
export const metadata = pageMetadata("kontakt", "en");
import SiteFooter from "@/app/components/SiteFooter";
import LocaleHeader from "@/app/components/LocaleHeader";
import BackToTop from "@/app/components/BackToTop";
import ContactForm from "@/app/kontakt/ContactForm";
import Link from "next/link";

export default function EnglishKontaktPage() {
  return (
    <>
      <LocaleHeader locale="en" current="kontakt" />
      <main id="home">
        <section className="contact-hero section">
          <div className="contact-intro">
            <span className="overline">CONTACT</span>
            <h1>Plan your visit<br/>to Lezhë.</h1>
            <p>Have questions about destinations, cultural heritage, Web GIS or the project? Write to us and connect with Lezha Turistike.</p>
            <div className="contact-details">
              <div><span>EMAIL</span><a href="mailto:lezhaturistike@gmail.com">lezhaturistike@gmail.com <span className="arrow-icon" aria-hidden="true">↗</span></a></div>
              <div><span>LOCATION</span><p>Lezhë, Albania</p></div>
            </div>
            <div className="contact-quick-actions">
              <a className="button dark" href="mailto:lezhaturistike@gmail.com">Write to us <span className="arrow-icon" aria-hidden="true">↗</span></a>
              <a className="contact-map-link" href="https://www.google.com/maps/search/?api=1&query=Lezhe%2C%20Albania" target="_blank" rel="noopener noreferrer">View on map <span className="arrow-icon" aria-hidden="true">↗</span></a>
            </div>
          </div>
          <ContactForm locale="en" />
        </section>

        <section className="contact-explore section">
          <div><span className="overline">KEEP EXPLORING</span><h2>Discover more of Lezhë.</h2></div>
          <nav aria-label="Explore Lezhë">
            <Link href="/en/destinacione"><span>01</span> Destinations <span className="arrow-icon" aria-hidden="true">↗</span></Link>
            <Link href="/en/webgis"><span>02</span> Web GIS <span className="arrow-icon" aria-hidden="true">↗</span></Link>
            <Link href="/en/galeri"><span>03</span> Gallery <span className="arrow-icon" aria-hidden="true">↗</span></Link>
          </nav>
        </section>
      </main>
      <BackToTop locale="en" />
      <SiteFooter locale="en" />
      <style>{`
        .contact-hero{display:grid;grid-template-columns:minmax(0,.88fr) minmax(420px,1.12fr);gap:clamp(42px,7vw,100px);align-items:start;padding-top:clamp(70px,10vw,130px);padding-bottom:clamp(70px,10vw,120px)}
        .contact-intro{position:sticky;top:110px}.contact-intro h1{font-size:clamp(3rem,6vw,6.5rem);line-height:.92;letter-spacing:-.055em;margin:18px 0 28px;max-width:780px}.contact-intro>p{max-width:610px;font-size:1.05rem;line-height:1.75;opacity:.76}.contact-details{display:grid;grid-template-columns:1.25fr .75fr;gap:26px;margin:44px 0 30px;padding-top:26px;border-top:1px solid rgba(23,61,57,.18)}.contact-details>div{display:grid;gap:8px}.contact-details>div>span{font-size:.68rem;font-weight:800;letter-spacing:.14em;opacity:.62}.contact-details a{color:inherit;text-decoration:none;font-weight:700}.contact-details p{margin:0}.contact-quick-actions{display:flex;align-items:center;gap:24px;flex-wrap:wrap}.contact-map-link{font-weight:800;color:inherit;text-decoration:none;border-bottom:1px solid currentColor;padding-bottom:5px}.contact-explore{padding-top:30px;padding-bottom:100px;display:grid;grid-template-columns:.8fr 1.2fr;gap:60px}.contact-explore h2{font-size:clamp(2rem,4vw,4rem);line-height:1;margin:14px 0}.contact-explore nav{border-top:1px solid rgba(23,61,57,.18)}.contact-explore nav a{display:grid;grid-template-columns:42px 1fr auto;align-items:center;gap:16px;padding:22px 4px;border-bottom:1px solid rgba(23,61,57,.18);color:inherit;text-decoration:none;font-size:1.15rem;font-weight:800}.contact-explore nav a>span:first-child{font-size:.68rem;opacity:.55}
        html[data-theme="dark"] .contact-details,html[data-theme="dark"] .contact-explore nav,html[data-theme="dark"] .contact-explore nav a{border-color:rgba(247,243,236,.16)}
        @media(max-width:900px){.contact-hero{grid-template-columns:1fr}.contact-intro{position:static}.contact-explore{grid-template-columns:1fr;gap:28px}}
        @media(max-width:620px){.contact-hero{padding-top:52px;gap:38px}.contact-intro h1{font-size:clamp(2.8rem,14vw,4.4rem)}.contact-details{grid-template-columns:1fr}.contact-quick-actions{align-items:flex-start;flex-direction:column}.contact-explore{padding-bottom:70px}.contact-explore nav a{padding:19px 2px}}
      `}</style>
    </>
  );
}
