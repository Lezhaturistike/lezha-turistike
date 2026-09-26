import {pageMetadata} from "@/app/seo";
import LegalPage, {type LegalContent} from "@/app/components/LegalPage";
import {getPageContent} from "@/sanity/lib/content";
import defaults from "@/sanity/content/terms.json";
export const metadata=pageMetadata("terms","sq");
export const dynamic="force-dynamic";
export default async function Page(){const content=await getPageContent("terms",defaults) as LegalContent;return <LegalPage kind="terms" content={content}/>}