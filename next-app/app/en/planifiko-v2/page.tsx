import type {Metadata} from "next";
import LocaleHeader from "@/app/components/LocaleHeader";
import SiteFooter from "@/app/components/SiteFooter";
import BackToTop from "@/app/components/BackToTop";
import PlannerV2Client,{type PlannerPlace,type PlannerTheme} from "../../planifiko-v2/PlannerV2Client";
import {client} from "@/sanity/lib/client";
import "../../planifiko-v2/planifiko-v2.css";

export const metadata:Metadata={title:"Plan your visit — new concept | Lezha Turistike",robots:{index:false,follow:false}};
const plannerQuery=`*[_type in ["destinacion","kulinari","akomodim"] && defined(lokacioni.lat) && defined(lokacioni.lng)] | order(coalesce(plannerOrder,999) asc){
"id":_id,"type":_type,"name":coalesce(titulliEn,emriEn,titulli,emri),"kind":select(_type=="destinacion"=>coalesce(kategoria,"Destinacion"),_type=="kulinari"=>coalesce(kategoria,"Kulinari"),_type=="akomodim"=>coalesce(lloji,"Akomodim"),"Vend"),
"desc":coalesce(pershkrimiEn,pershkrimi,"Discover this place during your visit to Lezha."),"lat":lokacioni.lat,"lng":lokacioni.lng,"image":foto.asset->url,
"duration":coalesce(kohezgjatja,"1 orë"),plannerFeatured,"thematicTours":coalesce(plannerThematicTours,[]),"tags":array::compact(coalesce(plannerTags,[])+coalesce(searchKeywords,[])+[zona,adresa])}`;
const themesQuery=`*[_type=="plannerTour" && aktiv != false] | order(coalesce(renditja,999) asc){"id":_id,"name":titulli,"nameEn":coalesce(titulliEn,titulli),"desc":pershkrimi,"descEn":coalesce(pershkrimiEn,pershkrimi),"interest":coalesce(interesi,"E kombinuar"),"places":ndalesat[]->{ "id":_id,"type":_type,"name":coalesce(titulliEn,titulli,emriEn,emri),"kind":select(_type=="destinacion"=>coalesce(kategoria,"Destination"),_type=="kulinari"=>coalesce(kategoria,"Culinary"),_type=="akomodim"=>coalesce(lloji,"Accommodation"),"Place"),"desc":coalesce(pershkrimiEn,pershkrimi,"Discover this place during your visit to Lezha."),"lat":lokacioni.lat,"lng":lokacioni.lng,"image":foto.asset->url,"duration":coalesce(kohezgjatjaEn,kohezgjatja,"1 hour"),plannerFeatured,"tags":coalesce(plannerTags,[])}}`;
export default async function Page(){let places:PlannerPlace[]=[],themes:PlannerTheme[]=[];try{[places,themes]=await Promise.all([client.fetch(plannerQuery,{}, {next:{revalidate:60}}),client.fetch(themesQuery,{}, {next:{revalidate:60}})])}catch{}return <><LocaleHeader locale="en" current="planifiko"/><main><PlannerV2Client cmsPlaces={places} cmsThemes={themes} locale="en"/></main><BackToTop locale="en"/><SiteFooter locale="en"/></>}


