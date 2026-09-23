import type {Metadata} from "next";
import LocaleHeader from "@/app/components/LocaleHeader";
import SiteFooter from "@/app/components/SiteFooter";
import BackToTop from "@/app/components/BackToTop";
import PlannerClient,{type PlannerPlace} from "../../planifiko/PlannerClient";
import {client} from "@/sanity/lib/client";
import "../../planifiko/planifiko.css";

export const metadata: Metadata={title:"Plan your visit | Lezha Turistike",description:"Build a personalized itinerary in Lezha based on your time, interests, food and accommodation."};

const plannerQuery=`*[_type in ["destinacion","kulinari","akomodim"]] | order(coalesce(plannerOrder,999) asc){
 "id":_id,"type":_type,"name":coalesce(titulliEn,emriEn,titulli,emri),
 "kind":select(_type=="destinacion"=>coalesce(kategoria,"Destinacion"),_type=="kulinari"=>coalesce(kategoria,"Kulinari"),_type=="akomodim"=>coalesce(lloji,"Akomodim"),"Vend"),
 "desc":coalesce(pershkrimiEn,pershkrimi,"Discover this place during your visit to Lezha."),
 "lat":coalesce(lokacioni.lat,0),"lng":coalesce(lokacioni.lng,0),"image":foto.asset->url,
 "duration":coalesce(kohezgjatja,"1 orë"),"time":coalesce(oraRekomanduar,"Sipas itinerarit"),plannerFeatured,
 "tags":coalesce(plannerTags,[])+coalesce(searchKeywords,[])+[coalesce(zona,""),coalesce(adresa,"")]
}`;

export default async function PlanVisitPage(){let places:PlannerPlace[]=[];try{places=await client.fetch(plannerQuery,{}, {next:{revalidate:60}})}catch{}return <><LocaleHeader locale="en" current="kontakt"/><main id="home"><PlannerClient cmsPlaces={places} locale="en"/></main><BackToTop/><SiteFooter locale="en"/></>}
