import type { MetadataRoute } from "next";

const baseUrl = "https://lezhaturistike.com";

const routes = [
  "",
  "/destinacione",
  "/galeri",
  "/kulinari",
  "/histori",
  "/arkeologji",
  "/webgis",
  "/shkenca",
  "/partneret",
  "/kontakt",
  "/privacy",
  "/terms",
  "/cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const sq = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
    priority: route === "" ? 1 : route === "/destinacione" ? 0.9 : 0.7,
    alternates: {
      languages: {
        sq: `${baseUrl}${route}`,
        en: `${baseUrl}/en${route}`,
        "x-default": `${baseUrl}${route}`,
      },
    },
  }));
  const en = routes.map((route) => ({
    url: `${baseUrl}/en${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
    priority: route === "" ? 0.9 : route === "/destinacione" ? 0.8 : 0.7,
    alternates: {
      languages: {
        sq: `${baseUrl}${route}`,
        en: `${baseUrl}/en${route}`,
        "x-default": `${baseUrl}${route}`,
      },
    },
  }));
  return [...sq, ...en];
}
