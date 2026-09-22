import {pageMetadata} from "@/app/seo";
export const metadata = pageMetadata("kontakt", "en");
import SiteFooter from "@/app/components/SiteFooter";
import LocaleHeader from "@/app/components/LocaleHeader";
import BackToTop from "@/app/components/BackToTop";
import ContactForm from "@/app/kontakt/ContactForm";
import Link from "next/link";

export default function EnglishKontaktPage() {
  return <><LocaleHeader locale="en" current="kontakt"/><main id="home">
    <section className="contact-hero section">
      <div className="contact-intro">
        <span className="overline">CONTACT</span>
        <h1>Plan your visit<br/>to Lezhë.</h1>
        <p>Have questions about destinations, cultural heritage, Web GIS or the project? Complete the form and your message will be sent directly to Lezha Turistike.</p>
      </div>
      <ContactForm locale="en"/>
    </section>
    <section className="contact-explore section"><div><span className="overline">KEEP EXPLORING</span><h2>Discover more of Lezhë.</h2></div><nav aria-label="Explore Lezhë"><Link href="/en/destinacione"><span>01</span> Destinations <span>↗</span></Link><Link href="/en/webgis"><span>02</span> Web GIS <span>↗</span></Link><Link href="/en/galeri"><span>03</span> Gallery <span>↗</span></Link></nav></section>
  </main><BackToTop locale="en"/><SiteFooter locale="en"/><style>{`
    .contact-hero{display:grid;grid-template-columns:minmax(0,.78fr) minmax(460px,1.22fr);gap:clamp(48px,8vw,120px);align-items:start;padding-top:clamp(70px,10vw,130px);padding-bottom:clamp(80px,11vw,140px)}.contact-intro{position:sticky;top:110px;padding-top:18px}.contact-intro h1{font-size:clamp(3rem,6vw,6.5rem);line-height:.92;letter-spacing:-.055em;margin:18px 0 30px;max-width:780px}.contact-intro>p{max-width:570px;font-size:1.08rem;line-height:1.8;opacity:.72}.contact-explore{padding-top:30px;padding-bottom:100px;display:grid;grid-template-columns:.8fr 1.2fr;gap:60px}.contact-explore h2{font-size:clamp(2rem,4vw,4rem);line-height:1;margin:14px 0}.contact-explore nav{border-top:1px solid rgba(23,61,57,.18)}.contact-explore nav a{display:grid;grid-template-columns:42px 1fr auto;align-items:center;gap:16px;padding:22px 4px;border-bottom:1px solid rgba(23,61,57,.18);color:inherit;text-decoration:none;font-size:1.15rem;font-weight:800}.contact-explore nav a>span:first-child{font-size:.68rem;opacity:.55}html[data-theme="dark"] .contact-explore nav,html[data-theme="dark"] .contact-explore nav a{border-color:rgba(247,243,236,.16)}@media(max-width:900px){.contact-hero{grid-template-columns:1fr;gap:48px}.contact-intro{position:static;padding-top:0}.contact-explore{grid-template-columns:1fr;gap:28px}}@media(max-width:620px){.contact-hero{padding-top:52px;gap:36px}.contact-intro h1{font-size:clamp(2.8rem,14vw,4.4rem)}.contact-explore{padding-bottom:70px}.contact-explore nav a{padding:19px 2px}}
  `}</style></>;
}
