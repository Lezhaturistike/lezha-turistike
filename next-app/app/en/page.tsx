import HomeClient from "../HomeClient";
import defaults from "@/sanity/content/home.json";
import { getPageContent } from "@/sanity/lib/content";
import { localizeContent } from "@/sanity/lib/localize";

export const dynamic = "force-dynamic";

export default async function EnglishHomePage() {
  const raw = await getPageContent("home", defaults);
  return <HomeClient content={localizeContent(raw, "en")} locale="en" />;
}
