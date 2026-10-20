import "server-only";
import {client} from "./client";
import {allowedMenuSlugs,defaultSiteSettings,type SiteMenuItem,type SiteSettings} from "./site-settings-shared";

const validSlugs=new Set<string>(allowedMenuSlugs);
const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const imagePattern=/^https:\/\/cdn\.sanity\.io\/images\//;
function safeMenu(value:unknown,fallback:SiteMenuItem[]):SiteMenuItem[]{
  if(!Array.isArray(value))return fallback;
  const seen=new Set<string>();
  const result:SiteMenuItem[]=[];
  for(const entry of value){
    if(!entry || typeof entry!=="object")continue;
    const item=entry as Record<string,unknown>;
    const slug=item.slug;
    if(typeof slug!=="string"||!validSlugs.has(slug)||seen.has(slug))continue;
    seen.add(slug);
    const previous=defaultSiteSettings.headerMenu.concat(defaultSiteSettings.footerMenu).find(x=>x.slug===slug);
    result.push({
      _key:typeof item._key==="string"?item._key:slug,
      slug,
      labelSq:typeof item.labelSq==="string"&&item.labelSq.trim()?item.labelSq:previous?.labelSq||slug,
      labelEn:typeof item.labelEn==="string"&&item.labelEn.trim()?item.labelEn:previous?.labelEn||slug,
      visible:item.visible!==false
    });
  }
  return result;
}
function safeEmail(value:unknown,fallback:string){
  return typeof value==="string"&&value.length<=254&&emailPattern.test(value)?value:fallback;
}
function safeImage(value:unknown){
  return typeof value==="string"&&imagePattern.test(value)?value:"";
}
export async function getSiteSettings():Promise<SiteSettings>{
  try{
    const result=await client.fetch<Record<string,unknown>|null>(
      `*[_id=="site-settings" && _type=="siteSettings"][0]{
        headerMenu[]{_key,slug,labelSq,labelEn,visible},
        footerMenu[]{_key,slug,labelSq,labelEn,visible},
        publicEmail,contactRecipientEmail,showPlannerCta,plannerCtaSq,plannerCtaEn,
        "headerLogoLight":headerLogoLight.asset->url,
        "headerLogoDark":headerLogoDark.asset->url,
        "footerLogo":footerLogo.asset->url
      }`,{}, {perspective:"published",cache:"no-store",timeout:7000}
    );
    if(!result)return defaultSiteSettings;
    return {
      headerMenu:safeMenu(result.headerMenu,defaultSiteSettings.headerMenu),
      footerMenu:safeMenu(result.footerMenu,defaultSiteSettings.footerMenu),
      publicEmail:safeEmail(result.publicEmail,defaultSiteSettings.publicEmail),
      contactRecipientEmail:safeEmail(result.contactRecipientEmail,defaultSiteSettings.contactRecipientEmail),
      headerLogoLight:safeImage(result.headerLogoLight),
      headerLogoDark:safeImage(result.headerLogoDark),
      footerLogo:safeImage(result.footerLogo),
      showPlannerCta:result.showPlannerCta!==false,
      plannerCtaSq:typeof result.plannerCtaSq==="string"&&result.plannerCtaSq.trim()?result.plannerCtaSq:defaultSiteSettings.plannerCtaSq,
      plannerCtaEn:typeof result.plannerCtaEn==="string"&&result.plannerCtaEn.trim()?result.plannerCtaEn:defaultSiteSettings.plannerCtaEn,
    };
  }catch(error){
    console.error("Sanity site settings unavailable; using preserved defaults",error instanceof Error?error.message:"Fetch failed");
    return defaultSiteSettings;
  }
}
