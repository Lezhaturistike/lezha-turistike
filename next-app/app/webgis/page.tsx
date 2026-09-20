import WebGISClient from './WebGISClient';
import defaults from '@/sanity/content/webgis.json';
import {getPageContent} from '@/sanity/lib/content';
export const dynamic = 'force-dynamic';
export default async function Page() {
  const content = await getPageContent('webgis', defaults);
  return <WebGISClient content={content} />;
}
