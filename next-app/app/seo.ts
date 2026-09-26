import type { Metadata } from "next";

const BASE = "https://lezhaturistike.com";

export const seoPages = {
  "": ["Lezha Turistike | Udhëzues turistik, kulturë dhe Web GIS","Eksploro Lezhën: destinacione, histori, arkeologji, kulinari, galeri, Web GIS dhe punime shkencore.","Lezha Tourism | Travel Guide, Heritage and Web GIS","Explore Lezhë, Albania: destinations, history, archaeology, cuisine, galleries, Web GIS and scientific research."],
  destinacione: ["Destinacione në Lezhë | Çfarë të vizitosh","Zbulo destinacionet dhe vendet për t'u vizituar në Lezhë, nga trashëgimia kulturore te peizazhet dhe atraksionet.","Destinations in Lezhë | Places to Visit","Discover places to visit in Lezhë, Albania, from cultural heritage and historic sites to landscapes and attractions."],
  galeri: ["Galeri | Lezha në fotografi","Shiko galerinë fotografike të Lezhës dhe eksploro destinacionet, trashëgiminë, kulturën dhe peizazhet e saj.","Gallery | Lezhë in Photos","Explore Lezhë through a photo gallery of its destinations, heritage, culture and landscapes."],
  kulinari: ["Kulinari në Lezhë | Shije dhe vende","Eksploro kulinarinë e Lezhës, gatimet lokale dhe vendet e përzgjedhura për të njohur shijet e zonës.","Cuisine in Lezhë | Local Food and Places","Explore Lezhë cuisine, local dishes and selected places to discover the area's food culture."],
  akomodim: ["Akomodim në Lezhë | Hotele, bujtina dhe qëndrime","Zbulo hotele, bujtina, resorte, apartamente dhe mundësi akomodimi në Lezhë.","Accommodation in Lezhë | Hotels and Stays","Discover hotels, guesthouses, resorts, apartments and places to stay in Lezhë, Albania."],
  histori: ["Historia e Lezhës | Trashëgimi dhe identitet","Njih historinë e Lezhës dhe trashëgiminë që ka formësuar identitetin kulturor të qytetit dhe territorit.","History of Lezhë | Heritage and Identity","Discover the history of Lezhë and the heritage that shaped the cultural identity of the city and region."],
  arkeologji: ["Arkeologjia e Lezhës | Lissus dhe Akrolisi","Eksploro trashëgiminë arkeologjike të Lezhës, Lissusin, Akrolisin dhe dokumentimin e zonave arkeologjike.","Archaeology of Lezhë | Lissus and Akrolissos","Explore the archaeological heritage of Lezhë, including Lissus, Akrolissos and digital documentation of archaeological areas."],
  webgis: ["Web GIS Lezhë | Harta interaktive","Eksploro hartat dhe aplikacionet Web GIS të Lezhës për destinacionet, trashëgiminë kulturore dhe dokumentimin gjeohapësinor.","Lezhë Web GIS | Interactive Maps","Explore interactive Web GIS maps of Lezhë for destinations, cultural heritage and geospatial documentation."],
  shkenca: ["Punime shkencore | Lezhë, Lissus dhe Akrolisi","Shiko studimet, publikimet, dokumentimin 3D dhe kërkimin shkencor mbi Lezhën, Lissusin dhe Akrolisin.","Scientific Research | Lezhë, Lissus and Akrolissos","Explore studies, publications, 3D documentation and scientific research on Lezhë, Lissus and Akrolissos."],
  partneret: ["Partnerët | Lezha Turistike","Institucionet dhe partnerët që kontribuojnë në dokumentimin, kërkimin dhe promovimin e trashëgimisë së Lezhës.","Partners | Lezha Turistike","Institutions and partners contributing to the documentation, research and promotion of Lezhë's heritage."],
  kontakt: ["Kontakt | Lezha Turistike","Kontakto Lezha Turistike dhe gjej informacionet kryesore për komunikim dhe burimet e projektit.","Contact | Lezha Turistike","Contact Lezha Turistike and find the project's main communication details and resources."],
  privacy: ["Politika e Privatësisë | Lezha Turistike","Mëso si Lezha Turistike trajton informacionin, preferencat, analitikën dhe shërbimet e jashtme.","Privacy Policy | Lezha Turistike","Learn how Lezha Turistike handles information, preferences, analytics and external services."],
  terms: ["Kushtet e Përdorimit | Lezha Turistike","Kushtet që rregullojnë përdorimin e Lezha Turistike, guidës digjitale, hartave dhe përmbajtjes.","Terms & Conditions | Lezha Turistike","Terms governing use of Lezha Turistike, its digital guide, maps and content."],
  cookies: ["Politika e Cookies | Lezha Turistike","Informacion mbi cookies, localStorage, analitikën dhe teknologjitë e palëve të treta.","Cookie Policy | Lezha Turistike","Information about cookies, localStorage, analytics and third-party technologies."]
} as const;

export function pageMetadata(slug: keyof typeof seoPages, locale: "sq"|"en"): Metadata {
  const [sqTitle,sqDescription,enTitle,enDescription]=seoPages[slug];
  const title=locale==="en"?enTitle:sqTitle;
  const description=locale==="en"?enDescription:sqDescription;
  const path=slug ? `/${slug}` : "";
  const url=locale==="en" ? `${BASE}/en${path}` : `${BASE}${path || "/"}`;
  const sq=`${BASE}${path || "/"}`;
  const en=`${BASE}/en${path}`;
  return {
    title, description,
    alternates:{canonical:url,languages:{"sq-AL":sq,"en":en,"x-default":sq}},
    openGraph:{title,description,url,siteName:"Lezha Turistike",locale:locale==="en"?"en_US":"sq_AL",type:"website"},
    twitter:{card:"summary_large_image",title,description},
  };
}
