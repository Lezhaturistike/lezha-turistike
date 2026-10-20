import {defineField,defineType} from "sanity";
import {allowedMenuSlugs,defaultSiteSettings} from "../lib/site-settings-shared";
const menuItem={
  type:"object" as const,
  name:"siteMenuItem",
  title:"Rubrika e menusë",
  fields:[
    defineField({name:"slug",title:"Rubrika",type:"string",options:{list:allowedMenuSlugs.map(v=>({title:v==="home"?"Faqja kryesore":v,value:v}))},validation:Rule=>Rule.required()}),
    defineField({name:"labelSq",title:"Titulli shqip",type:"string",validation:Rule=>Rule.required()}),
    defineField({name:"labelEn",title:"Titulli anglisht",type:"string",validation:Rule=>Rule.required()}),
    defineField({name:"visible",title:"Shfaq në menu",type:"boolean",initialValue:true}),
  ],
  preview:{select:{title:"labelSq",subtitle:"slug"}},
};
export const siteSettingsSchema=defineType({
  name:"siteSettings",
  title:"Konfigurimi i faqes",
  type:"document",
  initialValue:{
    headerMenu:defaultSiteSettings.headerMenu.map(x=>({...x,_type:"siteMenuItem"})),
    footerMenu:defaultSiteSettings.footerMenu.map(x=>({...x,_type:"siteMenuItem"})),
    publicEmail:defaultSiteSettings.publicEmail,
    contactRecipientEmail:defaultSiteSettings.contactRecipientEmail,
    showPlannerCta:true,plannerCtaSq:"Planifiko",plannerCtaEn:"Plan your visit",
  },
  fields:[
    defineField({name:"headerLogoLight",title:"Logo në header · Light Mode",type:"image",options:{hotspot:true},description:"Lëre bosh për logon aktuale të faqes."}),
    defineField({name:"headerLogoDark",title:"Logo në header · Dark Mode",type:"image",options:{hotspot:true},description:"Lëre bosh për logon aktuale të faqes."}),
    defineField({name:"footerLogo",title:"Logo në footer",type:"image",options:{hotspot:true},description:"Lëre bosh për logon aktuale të faqes."}),
    defineField({name:"headerMenu",title:"Menuja kryesore · renditje dhe fshehje",type:"array",of:[menuItem],description:"Tërhiq rubrikat për të ndryshuar renditjen. Fshehja e lidhjes nuk fshin faqen.",validation:Rule=>Rule.custom(value=>{if(!Array.isArray(value))return true;const ids=value.map(item=>item?.slug).filter(Boolean);return new Set(ids).size===ids.length?true:"Rubrikat nuk duhet të përsëriten.";})}),
    defineField({name:"footerMenu",title:"Menuja në fund të faqes",type:"array",of:[menuItem],validation:Rule=>Rule.custom(value=>{if(!Array.isArray(value))return true;const ids=value.map(item=>item?.slug).filter(Boolean);return new Set(ids).size===ids.length?true:"Rubrikat nuk duhet të përsëriten.";})}),
    defineField({name:"showPlannerCta",title:"Shfaq butonin Planifiko",type:"boolean",initialValue:true}),
    defineField({name:"plannerCtaSq",title:"Teksti i butonit SQ",type:"string"}),
    defineField({name:"plannerCtaEn",title:"Teksti i butonit EN",type:"string"}),
    defineField({name:"publicEmail",title:"Email-i publik",type:"string",validation:Rule=>Rule.required().email()}),
    defineField({name:"contactRecipientEmail",title:"Email-i pritës i formularit",description:"Për siguri, mund të përdoret vetëm një adresë e miratuar te CONTACT_ALLOWED_RECIPIENTS në Vercel. Ndryshimi nga Studio pa miratim nuk ridrejton email.",type:"string",validation:Rule=>Rule.required().email()}),
  ],
  preview:{prepare:()=>({title:"Konfigurimi i faqes"})},
});
