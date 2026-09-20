import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { destinacion } from "./sanity/schemaTypes/destinacion";
import { pageSchemas } from "./sanity/schemaTypes/pages";
import { pageDefinitions } from "./sanity/lib/content-model";
import { kulinari } from "./sanity/schemaTypes/kulinari";

export default defineConfig({
  name: "default",
  title: "Lezha Turistike",
  basePath: "/studio",
  projectId: "ko1ud3ml",
  dataset: "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Përmbajtja")
          .items([
            ...Object.entries(pageDefinitions).map(([key, page]) =>
              S.listItem()
                .title(page.title)
                .id(page.name)
                .child(
                  S.document()
                    .schemaType(page.name)
                    .documentId(`page-${key}`)
                    .title(page.title),
                ),
            ),
            S.divider(),
            ...S.documentTypeListItems().filter((item) =>
              ["destinacion", "kulinari"].includes(item.getId() || ""),
            ),
          ]),
    }),
  ],
  document: {
    newDocumentOptions: (options) =>
      options.filter(
        (option) =>
          !pageSchemas.some((page) => page.name === option.templateId),
      ),
    actions: (actions, context) =>
      pageSchemas.some((page) => page.name === context.schemaType)
        ? actions.filter(
            (action) =>
              !["delete", "duplicate", "unpublish"].includes(
                action.action || "",
              ),
          )
        : actions,
  },
  schema: {
    types: [destinacion, kulinari, ...pageSchemas],
  },
});
