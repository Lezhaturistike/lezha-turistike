export type SiteSubMenuItem = {
  _key?: string;
  labelSq: string;
  labelEn: string;
  href: string;
  visible?: boolean;
};

/** Only on-site paths and valid HTTPS links may be opened from CMS navigation. */
export function safeSubMenuHref(value: unknown): string | null {
  if (typeof value !== "string" || value.length > 500 || !value ||
      value.trim() !== value || /[\\\u0000-\u001f\u007f]/.test(value)) return null;
  if (value.startsWith("/") && !value.startsWith("//") &&
      !value.includes("..") && !value.includes("://")) return value;
  if (!value.startsWith("https://")) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || !url.hostname || url.username || url.password) return null;
    return value;
  } catch { return null; }
}
export type SiteMenuItem = {
  _key?: string;
  slug: string;
  labelSq: string;
  labelEn: string;
  visible?: boolean;
  subMenu?: SiteSubMenuItem[];
};
export const defaultFooterText = {
  "footerDescriptionLeadSq": "Një qytet për t’u zbuluar.",
  "footerDescriptionLeadEn": "A city waiting to be discovered.",
  "footerDescriptionBodySq": "Histori, natyrë dhe trashëgimi kulturore, të lidhura përmes hartave dhe rrëfimeve.",
  "footerDescriptionBodyEn": "History, nature and cultural heritage connected through maps and stories.",
  "footerLocationSq": "LEZHË · SHQIPËRI",
  "footerLocationEn": "LEZHË · ALBANIA",
  "footerExploreHeadingSq": "Eksploro",
  "footerExploreHeadingEn": "Explore",
  "footerContactHeadingSq": "Le të lidhemi",
  "footerContactHeadingEn": "Let's connect",
  "footerContactInfoSq": "Për informacion dhe bashkëpunime.",
  "footerContactInfoEn": "For information and collaboration.",
  "footerAddressLine1Sq": "Rruga e Kalasë",
  "footerAddressLine1En": "Castle Road",
  "footerAddressLine2Sq": "Lezhë, Shqipëri",
  "footerAddressLine2En": "Lezhë, Albania",
  "footerContactLinkLabelSq": "Na kontakto",
  "footerContactLinkLabelEn": "Contact us",
  "footerMottoSq": "Njih historinë. Eksploro natyrën. Zbulo Lezhën.",
  "footerMottoEn": "Know the history. Explore nature. Discover Lezhë.",
  "footerPrivacyLabelSq": "Privatësia",
  "footerPrivacyLabelEn": "Privacy",
  "footerTermsLabelSq": "Kushtet",
  "footerTermsLabelEn": "Terms",
  "footerCookiesLabelSq": "Cookie Policy",
  "footerCookiesLabelEn": "Cookie Policy",
  "footerDeveloperPrefixSq": "Developed by",
  "footerDeveloperPrefixEn": "Developed by",
  "footerDeveloperBold": "LINDI",
  "footerDeveloperItalic": "MAPS",
  "footerCopyrightOwner": "Lezha Turistike"
} as const;
export const footerTextFieldLabels: Record<keyof typeof defaultFooterText,string> = {
  "footerDescriptionLeadSq": "Përshkrimi i shkurtër · Shqip",
  "footerDescriptionLeadEn": "Përshkrimi i shkurtër · English",
  "footerDescriptionBodySq": "Përshkrimi kryesor · Shqip",
  "footerDescriptionBodyEn": "Përshkrimi kryesor · English",
  "footerLocationSq": "Vendndodhja me shkronja kapitale · Shqip",
  "footerLocationEn": "Vendndodhja me shkronja kapitale · English",
  "footerExploreHeadingSq": "Titulli i navigimit · Shqip",
  "footerExploreHeadingEn": "Titulli i navigimit · English",
  "footerContactHeadingSq": "Titulli i kontaktit · Shqip",
  "footerContactHeadingEn": "Titulli i kontaktit · English",
  "footerContactInfoSq": "Teksti i kontaktit · Shqip",
  "footerContactInfoEn": "Teksti i kontaktit · English",
  "footerAddressLine1Sq": "Adresa – Rreshti 1 · Shqip",
  "footerAddressLine1En": "Adresa – Rreshti 1 · English",
  "footerAddressLine2Sq": "Adresa – Rreshti 2 · Shqip",
  "footerAddressLine2En": "Adresa – Rreshti 2 · English",
  "footerContactLinkLabelSq": "Butoni i kontaktit · Shqip",
  "footerContactLinkLabelEn": "Butoni i kontaktit · English",
  "footerMottoSq": "Motoja në fund · Shqip",
  "footerMottoEn": "Motoja në fund · English",
  "footerPrivacyLabelSq": "Etiketa Politika e Privatësisë · Shqip",
  "footerPrivacyLabelEn": "Etiketa Privacy Policy · English",
  "footerTermsLabelSq": "Etiketa Kushtet · Shqip",
  "footerTermsLabelEn": "Etiketa Terms · English",
  "footerCookiesLabelSq": "Etiketa Cookies · Shqip",
  "footerCookiesLabelEn": "Etiketa Cookies · English",
  "footerDeveloperPrefixSq": "Fraza e zhvilluesit · Shqip",
  "footerDeveloperPrefixEn": "Fraza e zhvilluesit · English",
  "footerDeveloperBold": "Emri i zhvilluesit – pjesa e parë (me shkronja të trasha)",
  "footerDeveloperItalic": "Emri i zhvilluesit – pjesa e dytë (me shkronja të pjerrëta)",
  "footerCopyrightOwner": "Emri i subjektit në Copyright (viti gjenerohet vetë)"
};
export type FooterText = {[K in keyof typeof defaultFooterText]: string};
export type SiteSettings = {
  headerMenu: SiteMenuItem[];
  footerMenu: SiteMenuItem[];
  publicEmail: string;
  contactRecipientEmail: string;
  headerLogoLight: string;
  headerLogoDark: string;
  footerLogo: string;
  cookieLogo: string;
  faviconImage: string;
  showPlannerCta: boolean;
  plannerCtaSq: string;
  plannerCtaEn: string;
  footerContactTarget: string;
  footerDeveloperUrl: string;
  footerDeveloperVisible: boolean;
} & FooterText;
export const allowedMenuSlugs = [
  "home", "destinacione", "histori", "kulinari", "akomodim",
  "webgis", "galeri", "shkenca", "kontakt", "partneret",
] as const;
export const defaultSiteSettings: SiteSettings = {
  publicEmail: "lezhaturistike@gmail.com",
  contactRecipientEmail: "lezhaturistike@gmail.com",
  headerLogoLight: "",
  headerLogoDark: "",
  footerLogo: "",
  cookieLogo: "",
  faviconImage: "",
  showPlannerCta: true,
  plannerCtaSq: "Planifiko",
  plannerCtaEn: "Plan your visit",
  footerContactTarget: "/kontakt",
  footerDeveloperUrl: "https://lindimaps.com/",
  footerDeveloperVisible: true,
  ...defaultFooterText,
  headerMenu: [
    { _key: "home", slug: "home", labelSq: "Home", labelEn: "Home", visible: true },
    { _key: "destinacione", slug: "destinacione", labelSq: "Destinacione", labelEn: "Destinations", visible: true },
    { _key: "histori", slug: "histori", labelSq: "Histori & Arkeologji", labelEn: "History & Archaeology", visible: true },
    { _key: "kulinari", slug: "kulinari", labelSq: "Kulinari", labelEn: "Cuisine", visible: true },
    { _key: "akomodim", slug: "akomodim", labelSq: "Akomodim", labelEn: "Accommodation", visible: true },
    { _key: "webgis", slug: "webgis", labelSq: "Web GIS", labelEn: "Web GIS", visible: true },
    { _key: "galeri", slug: "galeri", labelSq: "Galeri", labelEn: "Gallery", visible: true },
    { _key: "shkenca", slug: "shkenca", labelSq: "Punime shkencore", labelEn: "Scientific research", visible: true },
    { _key: "kontakt", slug: "kontakt", labelSq: "Na kontakto", labelEn: "Contact", visible: true },
  ],
  footerMenu: [
    { _key: "destinacione", slug: "destinacione", labelSq: "Destinacione", labelEn: "Destinations", visible: true },
    { _key: "histori", slug: "histori", labelSq: "Histori & Arkeologji", labelEn: "History & Archaeology", visible: true },
    { _key: "webgis", slug: "webgis", labelSq: "Web GIS", labelEn: "Web GIS", visible: true },
    { _key: "shkenca", slug: "shkenca", labelSq: "Punime shkencore", labelEn: "Scientific research", visible: true },
    { _key: "kulinari", slug: "kulinari", labelSq: "Kulinari", labelEn: "Cuisine", visible: true },
    { _key: "partneret", slug: "partneret", labelSq: "Partnerët", labelEn: "Partners", visible: true },
    { _key: "galeri", slug: "galeri", labelSq: "Galeri", labelEn: "Gallery", visible: true },
  ],
};
export function menuItemPath(slug: string): string {
  if (slug === "home") return "/";
  if (slug === "partneret") return "/shkenca#partneret";
  return "/" + slug;
}

/**
 * Replace only the site's known legacy contact addresses in visitor-facing
 * text. This does not change private/researcher emails or other organizations.
 * Existing published Sanity text can keep its wording while displaying the
 * current central public email in all locales.
 */
export function resolveSiteContactEmail(value: string, publicEmail: string): string {
  if (typeof value !== "string" || typeof publicEmail !== "string") return value;
  return value.replace(/(?:lezhaturistike|lezhalezha2024)@gmail\.com/gi, publicEmail);
}

/** Use a dedicated cookie logo if present; otherwise follow the CMS brand. */
export function cookieBrandImage(settings:Pick<SiteSettings,"cookieLogo"|"headerLogoDark"|"headerLogoLight"|"footerLogo">):string{
  return settings.cookieLogo || settings.headerLogoDark || settings.footerLogo || settings.headerLogoLight || "";
}
