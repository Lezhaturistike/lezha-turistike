import WebGISClient from "@/app/webgis/WebGISClient";
import defaults from "@/sanity/content/webgis.json";
import {getPageContent} from "@/sanity/lib/content";
import {localizeContent} from "@/sanity/lib/localize";
export const dynamic="force-dynamic";
export default async function Page(){const raw=await getPageContent("webgis",defaults);return <WebGISClient content={localizeContent(raw,"en")} locale="en"/>;}
