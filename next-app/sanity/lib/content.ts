import "server-only";
import { client } from "./client";
import {
  normalizeContent,
  pageDefinitions,
  projection,
  type PageKey,
} from "./content-model";

export async function getPageContent<T extends Record<string, unknown>>(
  page: PageKey,
  fallback: T,
): Promise<T> {
  const definition = pageDefinitions[page];
  try {
    const document = await client.fetch<Record<string, unknown> | null>(
      `*[_id == $id && _type == $type][0]{${projection(definition.fields)}}`,
      { id: `page-${page}`, type: definition.name },
      { perspective: "published", cache: "no-store", timeout: 10000 },
    );
    return document
      ? (normalizeContent(definition.fields, document, fallback) as T)
      : fallback;
  } catch (error) {
    console.error(
      `Sanity: using preserved content for ${page}`,
      error instanceof Error ? error.message : "Fetch failed",
    );
    return fallback;
  }
}
