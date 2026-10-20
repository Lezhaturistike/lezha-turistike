import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { destinacion } from "./sanity/schemaTypes/destinacion";
import { pageSchemas } from "./sanity/schemaTypes/pages";
import { pageDefinitions } from "./sanity/lib/content-model";
import { kulinari } from "./sanity/schemaTypes/kulinari";
import { kulinariReview } from "./sanity/schemaTypes/kulinariReview";
import { researcher } from "./sanity/schemaTypes/researcher";
import { akomodim } from "./sanity/schemaTypes/akomodim";
import { plannerTour } from "./sanity/schemaTypes/plannerTour";
import { mapsCoordinatesPlugin } from "./sanity/mapsCoordinatesPlugin";
import {siteSettingsSchema} from "./sanity/schemaTypes/siteSettings";

export default defineConfig({
  name: "default", title: "Lezha Turistike", basePath: "/studio", projectId: "ko1ud3ml", dataset: "production",
  plugins: [mapsCoordinatesPlugin(), structureTool({structure:(S)=>S.list().title("Përmbajtja").items([
    S.listItem().title("Konfigurimi i faqes · Logo, menu, email").id("site-settings").child(S.document().schemaType("siteSettings").documentId("site-settings").title("Konfigurimi i faqes")),
    S.divider(),
    ...Object.entries(pageDefinitions).map(([key,page])=>S.listItem().title(page.title).id(page.name).child(S.document().schemaType(page.name).documentId(`page-${key}`).title(page.title))),
    S.divider(),
    ...S.documentTypeListItems().filter((item)=>["destinacion","kulinari","akomodim","plannerTour","kulinariReview","researcher"].includes(item.getId()||"")),
  ])})],
  document:{newDocumentOptions:(options)=>options.filter((option)=>!pageSchemas.some((page)=>page.name===option.templateId)&&option.templateId!=="siteSettings"),actions:(actions,context)=>(context.schemaType==="siteSettings"||pageSchemas.some((page)=>page.name===context.schemaType))?actions.filter((action)=>!["delete","duplicate"].includes(action.action||"")):actions},
  schema:{types:[destinacion,kulinari,akomodim,plannerTour,kulinariReview,researcher,siteSettingsSchema,...pageSchemas]},
});
