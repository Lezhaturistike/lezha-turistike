import type {Metadata} from "next";
import LocaleHeader from "@/app/components/LocaleHeader";
import SiteFooter from "@/app/components/SiteFooter";
import BackToTop from "@/app/components/BackToTop";
import PlannerClient from "./PlannerClient";
import LiveTourMap from "./LiveTourMap";

export const metadata: Metadata = {
  title: "Planifiko vizitën | Lezha Turistike",
  description: "Ndërto një itinerar të personalizuar në Lezhë sipas kohës, interesave, ushqimit dhe akomodimit.",
};

export default function PlanifikoPage(){
  return <><LocaleHeader locale="sq" current="kontakt"/><main id="home"><PlannerClient/><LiveTourMap/></main><BackToTop/><SiteFooter locale="sq"/></>;
}
