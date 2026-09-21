import LegalPage, {type LegalContent} from "@/app/components/LegalPage";
import {getPageContent} from "@/sanity/lib/content";
import defaults from "@/sanity/content/cookies.json";
export const dynamic="force-dynamic";
export default async function Page(){const content=await getPageContent("cookies",defaults) as LegalContent;return <LegalPage kind="cookies" content={content}/>}