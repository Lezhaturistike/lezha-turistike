import LegalPage, {type LegalContent} from "@/app/components/LegalPage";
import {getPageContent} from "@/sanity/lib/content";
import defaults from "@/sanity/content/privacy.json";
export const dynamic="force-dynamic";
export default async function Page(){const content=await getPageContent("privacy",defaults) as LegalContent;return <LegalPage kind="privacy" content={content}/>}