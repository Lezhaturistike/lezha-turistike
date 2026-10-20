import "server-only";
import {client} from "./client";
import {allowedMenuSlugs,defaultSiteSettings,defaultFooterText,type FooterText,type SiteMenuItem,type SiteSettings} from "./site-settings-shared";

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
const footerTargets=new Set(["/kontakt","/planifiko"]);
function safeFooterTarget(value:unknown){
  return typeof value==="string"&&footerTargets.has(value)?value:defaultSiteSettings.footerContactTarget;
}
function safeDeveloperUrl(value:unknown){
  if(typeof value!=="string"||value.length>2048)return defaultSiteSettings.footerDeveloperUrl;
  try{
    const url=new URL(value);
    if(url.protocol!=="https:"||!url.hostname||url.username||url.password)return defaultSiteSettings.footerDeveloperUrl;
    return url.href;
  }catch{return defaultSiteSettings.footerDeveloperUrl;}
}
function safeFooterText(input:Record<string,unknown>):FooterText{
  const normalized={} as Record<keyof FooterText,string>;
  for(const key of Object.keys(defaultFooterText) as Array<keyof FooterText>){
    const value=input[key];
    // Empty published values use the current label; a typo cannot silently erase the footer.
    normalized[key]=typeof value==="string"&&value.trim()&&value.length<=1500
      ? value
      : defaultFooterText[key];
  }
  return normalized;
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
        "footerLogo":footerLogo.asset->url,
        "cookieLogo":cookieLogo.asset->url,
        "faviconImage":faviconImage.asset->url,
        footerContactTarget,footerDeveloperUrl,footerDeveloperVisible,
        footerDescriptionLeadSq,footerDescriptionLeadEn,footerDescriptionBodySq,footerDescriptionBodyEn,footerLocationSq,footerLocationEn,footerExploreHeadingSq,footerExploreHeadingEn,footerContactHeadingSq,footerContactHeadingEn,footerContactInfoSq,footerContactInfoEn,footerAddressLine1Sq,footerAddressLine1En,footerAddressLine2Sq,footerAddressLine2En,footerContactLinkLabelSq,footerContactLinkLabelEn,footerMottoSq,footerMottoEn,footerPrivacyLabelSq,footerPrivacyLabelEn,footerTermsLabelSq,footerTermsLabelEn,footerCookiesLabelSq,footerCookiesLabelEn,footerDeveloperPrefixSq,footerDeveloperPrefixEn,footerDeveloperBold,footerDeveloperItalic,footerCopyrightOwner
      }`,{}, {perspective:"published",cache:"no-store",timeout:7000}
    );
    if(!result)return defaultSiteSettings;
    return {
      ...safeFooterText(result),
      footerContactTarget:safeFooterTarget(result.footerContactTarget),
      footerDeveloperUrl:safeDeveloperUrl(result.footerDeveloperUrl),
      footerDeveloperVisible:result.footerDeveloperVisible!==false,
      headerMenu:safeMenu(result.headerMenu,defaultSiteSettings.headerMenu),
      footerMenu:safeMenu(result.footerMenu,defaultSiteSettings.footerMenu),
      publicEmail:safeEmail(result.publicEmail,defaultSiteSettings.publicEmail),
      contactRecipientEmail:safeEmail(result.contactRecipientEmail,defaultSiteSettings.contactRecipientEmail),
      headerLogoLight:safeImage(result.headerLogoLight),
      headerLogoDark:safeImage(result.headerLogoDark),
      footerLogo:safeImage(result.footerLogo),
      cookieLogo:safeImage(result.cookieLogo),
      faviconImage:safeImage(result.faviconImage),
      showPlannerCta:result.showPlannerCta!==false,
      plannerCtaSq:typeof result.plannerCtaSq==="string"&&result.plannerCtaSq.trim()?result.plannerCtaSq:defaultSiteSettings.plannerCtaSq,
      plannerCtaEn:typeof result.plannerCtaEn==="string"&&result.plannerCtaEn.trim()?result.plannerCtaEn:defaultSiteSettings.plannerCtaEn,
    };
  }catch(error){
    console.error("Sanity site settings unavailable; using preserved defaults",error instanceof Error?error.message:"Fetch failed");
    return defaultSiteSettings;
  }
}
