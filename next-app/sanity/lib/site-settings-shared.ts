export type SiteMenuItem = {
  _key?: string;
  slug: string;
  labelSq: string;
  labelEn: string;
  visible?: boolean;
};
export type SiteSettings = {
  headerMenu: SiteMenuItem[];
  footerMenu: SiteMenuItem[];
  publicEmail: string;
  contactRecipientEmail: string;
  headerLogoLight: string;
  headerLogoDark: string;
  footerLogo: string;
  showPlannerCta: boolean;
  plannerCtaSq: string;
  plannerCtaEn: string;
};
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
  showPlannerCta: true,
  plannerCtaSq: "Planifiko",
  plannerCtaEn: "Plan your visit",
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
