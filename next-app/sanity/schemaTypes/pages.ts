import {
  defineField,
  defineType,
  type FieldDefinition as SanityField,
} from "sanity";
import { pageDefinitions, type FieldDefinition } from "../lib/content-model";
import home from "../content/home.json";
import histori from "../content/histori.json";
import arkeologji from "../content/arkeologji.json";
import shkenca from "../content/shkenca.json";
import partneret from "../content/partneret.json";
import webgis from "../content/webgis.json";
import kontakt from "../content/kontakt.json";

const defaults = {
  home,
  histori,
  arkeologji,
  shkenca,
  partneret,
  webgis,
  kontakt,
};
const optional = new Set(["image", "alt", "subtitle", "caveat"]);
function schemaField(field: FieldDefinition): SanityField {
  const base = { name: field.name, title: field.title };
  if (field.type === "array")
    return defineField({
      ...base,
      type: "array",
      description:
        "Shtoni, ndryshoni ose tërhiqni elementet për të ndryshuar renditjen.",
      of: [
        {
          type: "object",
          name: `${field.name}Item`,
          title: "Element",
          fields: (field.fields || []).map(schemaField),
          preview: { select: { title: "title", subtitle: "label" } },
        },
      ],
      validation: (rule) => (field.min ? rule.required().min(field.min) : rule),
    });
  if (field.type === "image")
    return defineField({
      ...base,
      type: "image",
      fields: [
        {
          name: "originalPath",
          title: "Fotografia origjinale në website",
          type: "string",
          readOnly: true,
        },
      ],
      description:
        "Ngarkoni një foto për ta zëvendësuar. Fotografia origjinale ruhet gjatë migrimit.",
    });
  if (field.type === "url")
    return defineField({
      ...base,
      type: "url",
      validation: (rule) =>
        rule
          .required()
          .uri({
            allowRelative: true,
            scheme: ["http", "https", "mailto", "tel"],
          }),
    });
  return defineField({
    ...base,
    type: field.type === "text" ? "text" : "string",
    ...(field.type === "text" ? { rows: 5 } : {}),
    ...(field.name === "role"
      ? { options: { list: ["FINANCUES", "ZBATUES"] } }
      : {}),
    validation: (rule) => ((optional.has(field.name) || field.name.endsWith("En")) ? rule : rule.required()),
  });
}
function initialValue(
  fields: FieldDefinition[],
  input: Record<string, unknown>,
): Record<string, unknown> {
  return Object.fromEntries(
    fields.map((field) => {
      const value = input[field.name];
      if (field.type === "image")
        return [
          field.name,
          value ? { _type: "image", originalPath: value } : undefined,
        ];
      if (field.type === "array")
        return [
          field.name,
          (Array.isArray(value) ? (value as Record<string, unknown>[]) : []).map((item) => ({
            _key: item._key,
            _type: `${field.name}Item`,
            ...initialValue(field.fields || [], item),
          })),
        ];
      return [field.name, value];
    }),
  );
}
export const pageSchemas = Object.entries(pageDefinitions).map(
  ([key, definition]) =>
    defineType({
      name: definition.name,
      title: definition.title,
      type: "document",
      initialValue: initialValue(
        definition.fields,
        defaults[key as keyof typeof defaults],
      ),
      fields: definition.fields.map(schemaField),
      preview: { prepare: () => ({ title: definition.title }) },
    }),
);
