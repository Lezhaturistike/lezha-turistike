"use client";
import Link from "next/link";
import {useSiteSettings} from "./SiteSettingsProvider";
import BrandLogo,{brandClass} from "./BrandLogo";
import {menuItemPath} from "@/sanity/lib/site-settings-shared";

type Locale="sq"|"en";

export default function SiteFooter({locale="sq"}:{locale?:Locale}){
 const p=(x:string)=>locale==="en"?"/en"+x:x;
 const settings=useSiteSettings();
 const language=locale==="en"?"En":"Sq";
 const t={
   desc:settings[`footerDescriptionLead${language}`],
   desc2:settings[`footerDescriptionBody${language}`],
   location:settings[`footerLocation${language}`],
   explore:settings[`footerExploreHeading${language}`],
   connect:settings[`footerContactHeading${language}`],
   info:settings[`footerContactInfo${language}`],
   address:settings[`footerAddressLine1${language}`],
   country:settings[`footerAddressLine2${language}`],
   contact:settings[`footerContactLinkLabel${language}`],
   motto:settings[`footerMotto${language}`],
   privacy:settings[`footerPrivacyLabel${language}`],
   terms:settings[`footerTermsLabel${language}`],
   cookies:settings[`footerCookiesLabel${language}`],
   developer:settings[`footerDeveloperPrefix${language}`],
 };
 return <footer className="site-footer" aria-label={locale==="en"?"Page footer":"Fundi i faqes"}>
  <div className="footer-main"><Link href={p("")||"/"} className={brandClass("footer",settings)} aria-label="Lezha Turistike"><BrandLogo placement="footer"/></Link><p>{t.desc}<br/>{t.desc2}</p><span className="footer-location">{t.location}</span></div>
  <nav className="footer-navigation" aria-label={locale==="en"?"Footer navigation":"Navigimi në fund të faqes"}><h2>{t.explore}</h2><div className="footer-links">{settings.footerMenu.filter(item=>item.visible!==false).map(item=><Link key={item.slug} href={p(menuItemPath(item.slug))}>{locale==="en"?item.labelEn:item.labelSq}</Link>)}</div></nav>
  <div className="footer-contact"><h2>{t.connect}</h2><p>{t.info}</p><a className="footer-email" href={`mailto:${settings.publicEmail}`}>{settings.publicEmail} <span className="arrow-icon" aria-hidden="true">↗</span></a><p>{t.address}<br/>{t.country}</p><Link className="footer-contact-link" href={p(settings.footerContactTarget)}>{t.contact} <span className="arrow-icon" aria-hidden="true">↗</span></Link></div>
  <div className="footer-bottom"><span className="footer-credit">© {new Date().getFullYear()} {settings.footerCopyrightOwner}. {settings.footerDeveloperVisible&&<><span aria-hidden="true">·</span> <a href={settings.footerDeveloperUrl} target="_blank" rel="noopener noreferrer" aria-label={`${t.developer} ${settings.footerDeveloperBold}${settings.footerDeveloperItalic}`}><span className="footer-credit-label">{t.developer}</span> <span className="footer-lindimaps-wordmark"><b>{settings.footerDeveloperBold}</b><i>{settings.footerDeveloperItalic}</i></span></a></>}</span><div className="footer-legal"><Link href={p("/privacy")}>{t.privacy}</Link><Link href={p("/terms")}>{t.terms}</Link><Link href={p("/cookies")}>{t.cookies}</Link></div><span>{t.motto}</span></div>
 </footer>
}
