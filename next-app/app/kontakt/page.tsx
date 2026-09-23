import {pageMetadata} from "@/app/seo";
export const metadata = pageMetadata("kontakt", "sq");
import SiteFooter from "@/app/components/SiteFooter";
import LocaleHeader from "@/app/components/LocaleHeader";
import BackToTop from "@/app/components/BackToTop";
import ContactForm from "./ContactForm";
import Link from "next/link";

function ArrowUpRight(){return <span className="explore-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7"/><path d="M8 7h9v9"/></svg></span>}

export default function KontaktPage() {
  return <><LocaleHeader locale="sq" current="kontakt"/><main id="home">
    <section className="contact-hero section">
      <div className="contact-intro">
        <span className="overline">KONTAKT</span>
        <h1>Planifiko vizitën<br/>tënde në Lezhë.</h1>
        <p>Ke pyetje rreth destinacioneve, trashëgimisë kulturore, Web GIS apo projektit? Plotëso formularin dhe mesazhi yt do të dërgohet direkt te Lezha Turistike.</p>
        <Link className="plan-visit-cta" href="/planifiko"><span><small>PLANIFIKO VIZITËN</small><strong>Ndërto itinerarin tënd</strong></span><ArrowUpRight/></Link>
      </div>
      <ContactForm locale="sq"/>
    </section>
    <section className="contact-explore section"><div><span className="overline">VAZHDO EKSPLORIMIN</span><h2>Zbulo më shumë nga Lezha.</h2></div><nav aria-label="Eksploro Lezhën"><Link href="/destinacione"><span>01</span> Destinacione <ArrowUpRight/></Link><Link href="/webgis"><span>02</span> Web GIS <ArrowUpRight/></Link><Link href="/galeri"><span>03</span> Galeri <ArrowUpRight/></Link><Link href="/planifiko" className="planner-link"><span>04</span> Planifiko vizitën <ArrowUpRight/></Link></nav></section>
  </main><BackToTop/><SiteFooter locale="sq"/><style>{`
    .contact-hero{display:grid;grid-template-columns:minmax(0,.78fr) minmax(460px,1.22fr);gap:clamp(48px,8vw,120px);align-items:start;padding-top:clamp(70px,10vw,130px);padding-bottom:clamp(80px,11vw,140px)}.contact-intro{position:sticky;top:110px;padding-top:18px}.contact-intro h1{font-size:clamp(3rem,6vw,6.5rem);line-height:.92;letter-spacing:-.055em;margin:18px 0 30px;max-width:780px}.contact-intro>p{max-width:570px;font-size:1.08rem;line-height:1.8;opacity:.72}.plan-visit-cta{margin-top:34px;max-width:430px;border:1px solid rgba(23,61,57,.2);border-radius:18px;padding:18px 18px 18px 22px;display:flex;align-items:center;justify-content:space-between;gap:20px;color:inherit;text-decoration:none;transition:transform .22s,background .22s}.plan-visit-cta:hover{transform:translateY(-2px);background:rgba(23,61,57,.05)}.plan-visit-cta span:first-child{display:flex;flex-direction:column;gap:3px}.plan-visit-cta small{font-size:.61rem;letter-spacing:.13em;opacity:.55}.plan-visit-cta strong{font-size:1.05rem}.contact-explore{padding-top:30px;padding-bottom:100px;display:grid;grid-template-columns:.8fr 1.2fr;gap:60px}.contact-explore h2{font-size:clamp(2rem,4vw,4rem);line-height:1;margin:14px 0}.contact-explore nav{border-top:1px solid rgba(23,61,57,.18)}.contact-explore nav a{display:grid;grid-template-columns:42px 1fr auto;align-items:center;gap:16px;padding:22px 4px;border-bottom:1px solid rgba(23,61,57,.18);color:inherit;text-decoration:none;font-size:1.15rem;font-weight:800}.contact-explore nav a>span:first-child{font-size:.68rem;opacity:.55}.contact-explore .planner-link{font-size:1.25rem}.explore-arrow{display:grid;place-items:center;width:34px;height:34px;border-radius:50%;border:1px solid rgba(23,61,57,.18);transition:transform .2s,background .2s}.contact-explore nav a:hover .explore-arrow,.plan-visit-cta:hover .explore-arrow{transform:translate(2px,-2px);background:rgba(23,61,57,.06)}html[data-theme="dark"] .contact-explore nav,html[data-theme="dark"] .contact-explore nav a{border-color:rgba(247,243,236,.16)}html[data-theme="dark"] .explore-arrow,html[data-theme="dark"] .plan-visit-cta{border-color:rgba(247,243,236,.18)}@media(max-width:900px){.contact-hero{grid-template-columns:1fr;gap:48px}.contact-intro{position:static;padding-top:0}.contact-explore{grid-template-columns:1fr;gap:28px}}@media(max-width:620px){.contact-hero{padding-top:52px;gap:36px}.contact-intro h1{font-size:clamp(2.8rem,14vw,4.4rem)}.plan-visit-cta{max-width:none}.contact-explore{padding-bottom:70px}.contact-explore nav a{padding:19px 2px}.explore-arrow{width:36px;height:36px}}
  `}</style></>;
}
