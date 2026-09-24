export type Locale = "sq" | "en";

export function localizeContent<T>(value: T, locale: Locale): T {
  if (locale !== "en" || value == null) return value;
  if (Array.isArray(value)) return value.map((item) => localizeContent(item, locale)) as T;
  if (typeof value !== "object") return value;
  const source = value as Record<string, unknown>;
  const result: Record<string, unknown> = {};
  for (const [key, item] of Object.entries(source)) {
    if (key.endsWith("En")) continue;
    const translated = source[key + "En"];
    result[key] = translated !== undefined && translated !== null && translated !== ""
      ? localizeContent(translated, locale)
      : localizeContent(item, locale);
  }
  return result as T;
}

// Only translate known page routes. Keep files, APIs, external URLs and anchors intact.
const pageRoutes = new Set(["/", "/destinacione", "/galeri", "/histori", "/arkeologji", "/webgis", "/shkenca", "/kulinari", "/partneret", "/kontakt", "/planifiko", "/privacy", "/terms", "/cookies"]);
export function localizedPath(path: string, locale: Locale): string {
  if (locale !== "en") return path;
  const [pathname] = path.split(/[?#]/);
  const normalized = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  if (!pageRoutes.has(normalized)) return path;
  return `/en${normalized === "/" ? "" : normalized}${path.slice(pathname.length)}`;
}
