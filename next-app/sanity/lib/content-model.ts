import definitions from "../content/definitions.json";

export type FieldDefinition = {
  name: string;
  title: string;
  type: string;
  min?: number;
  fields?: FieldDefinition[];
};
export type PageKey = keyof typeof definitions;
export const pageDefinitions = definitions;

export function projection(fields: FieldDefinition[]): string {
  return fields
    .map((field) => {
      if (field.type === "image")
        return `"${field.name}": coalesce(${field.name}.asset->url, ${field.name}.originalPath, "")`;
      if (field.type === "array")
        return `${field.name}[]{_key, ${projection(field.fields || [])}}`;
      return field.name;
    })
    .join(", ");
}

// Only known fields enter the view. Empty arrays and optional empty strings are intentional.
export function normalizeContent(
  fields: FieldDefinition[],
  input: Record<string, unknown>,
  fallback: Record<string, unknown>,
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const field of fields) {
    const value = input[field.name];
    if (field.type === "array") {
      if (!Array.isArray(value) || (field.min && value.length < field.min)) {
        result[field.name] = fallback[field.name] || [];
        continue;
      }
      result[field.name] = value
        .filter((item) => item && typeof item === "object")
        .map((item, index) => ({
          _key:
            typeof item._key === "string"
              ? item._key
              : `${field.name}-${index}`,
          ...normalizeContent(field.fields || [], item, {}),
        }));
    } else {
      let text =
        typeof value === "string" ? value : (fallback[field.name] ?? "");
      if (typeof text !== "string") text = "";
      if (
        (field.type === "url" || field.type === "image") &&
        text &&
        !/^(https?:\/\/|mailto:|tel:|\/(?!\/)|#)/i.test(text as string)
      ) {
        text = fallback[field.name] || "";
      }
      result[field.name] = text;
    }
  }
  return result;
}
