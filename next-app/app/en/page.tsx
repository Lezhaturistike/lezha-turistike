import HomeClient from "../HomeClient";
import defaults from "@/sanity/content/home.json";
import { getPageContent } from "@/sanity/lib/content";

export const dynamic = "force-dynamic";

const englishHome = {
  ...defaults,
  text3: "LEZHË, ALBANIA · LIVING HISTORY",
  text4: "One city.",
  text5: "Many stories.",
  text6: "From the ancient walls of Lezhë Castle to the landscape of Kune-Vain, discover Lezhë through places, stories and interactive maps.",
  text8: "Discover destinations",
  text10: "Explore the 2D map",
  text13: "WHAT WOULD YOU LIKE TO DISCOVER?",
  text15: "Historic places",
  text17: "Nature & landscape",
  text19: "Interactive maps",
  text20: "EXPLORE BY CATEGORY",
  text21: "Choose what to explore.",
  text22: "Each section opens on its own page, with photographs, information and links to continue exploring.",
  directory: defaults.directory.map((item, index) => ({
    ...item,
    label: item.label.replace("LEZHA", "LEZHË"),
    title: ["Destinations","Gallery","History","Archaeology","Web GIS","Scientific research","Cuisine","Partners","Contact"][index] || item.title,
    description: [
      "The castle, memorial and natural landscapes.",
      "Photographs from the places that tell the story of Lezhë.",
      "Events and monuments in the memory of the city.",
      "Traces of Lissus and Akrolis.",
      "2D maps, 3D scenes and interactive stories.",
      "Documentation, geophysics and 3D videos.",
      "Local flavours and products.",
      "Institutions supporting the project.",
      "Get in touch and plan your visit."
    ][index] || item.description
  }))
};

export default async function EnglishHomePage() {
  const sq = await getPageContent("home", defaults);
  const content = { ...englishHome, heroSlides: (sq as typeof sq & {heroSlides?: Array<{_key?: string; image?: string; alt?: string; caption?: string}>}).heroSlides };
  return <HomeClient content={content} locale="en" />;
}
