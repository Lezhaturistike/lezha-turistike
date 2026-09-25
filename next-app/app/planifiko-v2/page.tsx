import type {Metadata} from "next";
import LocaleHeader from "@/app/components/LocaleHeader";
import SiteFooter from "@/app/components/SiteFooter";
import BackToTop from "@/app/components/BackToTop";
import PlannerV2Client,{type PlannerPlace} from "./PlannerV2Client";
import {client} from "@/sanity/lib/client";
import "./planifiko-v2.css";

export const metadata:Metadata={title:"Planifiko vizitën — koncept i ri | Lezha Turistike",robots:{index:false,follow:false}};
const plannerQuery=`*[_type in ["destinacion","kulinari","akomodim"] && defined(lokacioni.lat) && defined(lokacioni.lng)] | order(coalesce(plannerOrder,999) asc){
"id":_id,"type":_type,"name":coalesce(titulli,emri),"kind":select(_type=="destinacion"=>coalesce(kategoria,"Destinacion"),_type=="kulinari"=>coalesce(kategoria,"Kulinari"),_type=="akomodim"=>coalesce(lloji,"Akomodim"),"Vend"),
"desc":coalesce(pershkrimi,"Zbulo këtë vend gjatë vizitës në Lezhë."),"lat":lokacioni.lat,"lng":lokacioni.lng,"image":foto.asset->url,
"duration":coalesce(kohezgjatja,"1 orë"),plannerFeatured,"tags":array::compact(coalesce(plannerTags,[])+coalesce(searchKeywords,[])+[zona,adresa])}`;
export default async function Page(){let places:PlannerPlace[]=[];try{places=await client.fetch(plannerQuery,{}, {next:{revalidate:60}})}catch{}return <><LocaleHeader locale="sq" current="planifiko"/><main><PlannerV2Client cmsPlaces={places}/></main><BackToTop/><SiteFooter locale="sq"/></>}
