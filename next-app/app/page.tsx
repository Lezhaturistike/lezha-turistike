import HomeClient from './HomeClient';
import defaults from '@/sanity/content/home.json';
import {getPageContent} from '@/sanity/lib/content';
export const dynamic = 'force-dynamic';
export default async function Page() {
  const content = await getPageContent('home', defaults);
  return <HomeClient content={content} />;
}
