import type {Metadata} from "next";
import LocaleHeader from "@/app/components/LocaleHeader";
import SiteFooter from "@/app/components/SiteFooter";
import BackToTop from "@/app/components/BackToTop";
import PlannerClient,{type PlannerPlace} from "../../planifiko/PlannerClient";
import {client} from "@/sanity/lib/client";
import "../../planifiko/planifiko.css";

export const metadata: Metadata={title:"Plan your visit | Lezha Turistike",description:"Build a personalized itinerary in Lezha based on your time, interests, food and accommodation."};

const plannerQuery=`*[_type in ["destinacion","kulinari","akomodim"] && defined(lokacioni.lat) && defined(lokacioni.lng)] | order(coalesce(plannerOrder,999) asc){
 "id":_id,"type":_type,"name":coalesce(titulliEn,emriEn,titulli,emri),
 "kind":select(_type=="destinacion"=>select(kategoria=="histori"=>"History",kategoria=="natyre"=>"Nature",kategoria=="arkeologji"=>"Archaeology",kategoria=="fetare"=>"Religious Heritage",kategoria=="kulture-urbane"=>"Urban Culture","Destination"),_type=="kulinari"=>select(kategoria=="restorant"=>"Restaurant",kategoria=="agroturizem"=>"Agritourism",kategoria=="kantine"=>"Winery",kategoria=="bar-kafe"=>"Bar / Café",kategoria=="produkte-lokale"=>"Local products","Cuisine"),_type=="akomodim"=>select(lloji=="hotel"=>"Hotel",lloji=="bujtine"=>"Guesthouse",lloji=="resort"=>"Resort",lloji=="apartament"=>"Apartment",lloji=="camping"=>"Camping","Accommodation"),"Place"),
 "desc":coalesce(pershkrimiEn,pershkrimi,"Discover this place during your visit to Lezha."),
 "lat":lokacioni.lat,"lng":lokacioni.lng,"image":foto.asset->url,
 "duration":coalesce(kohezgjatjaEn,select(
   kohezgjatja=="1 orë"=>"1 hour",
   kohezgjatja=="2 orë"=>"2 hours",
   kohezgjatja=="30 min"=>"30 min",
   kohezgjatja=="45 min"=>"45 min",
   kohezgjatja
 ),"1 hour"),
 "time":coalesce(oraRekomanduarEn,select(
   oraRekomanduar=="Sipas itinerarit"=>"According to itinerary",
   oraRekomanduar match "*Pasdite*"=>"Afternoon, especially 1–2 hours before sunset · 60–90 min",
   oraRekomanduar
 ),"According to itinerary"),plannerFeatured,
 "tags":array::compact(coalesce(plannerTags,[])+coalesce(searchKeywords,[])+[zona,adresa])
}`;

export default async function PlanVisitPage(){let places:PlannerPlace[]=[];try{places=await client.fetch(plannerQuery,{}, {next:{revalidate:60}})}catch{}return <><LocaleHeader locale="en" current="planifiko"/><main id="home"><PlannerClient cmsPlaces={places} locale="en"/></main><BackToTop locale="en"/><SiteFooter locale="en"/></>}
