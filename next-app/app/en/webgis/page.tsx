import {localizeContent} from "@/sanity/lib/localize";
import WebGISEnClient from './WebGISEnClient';
import defaults from '@/sanity/content/webgis.json';
import {getPageContent} from '@/sanity/lib/content';
export const dynamic = 'force-dynamic';
export default async function Page() {
  const content = await getPageContent('webgis', defaults);
  return <WebGISEnClient content={localizeContent(content, "en")} />;
}
