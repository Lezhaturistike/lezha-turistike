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
