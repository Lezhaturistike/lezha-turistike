import {defineField,defineType} from "sanity";
import {allowedMenuSlugs,defaultSiteSettings,defaultFooterText,footerTextFieldLabels} from "../lib/site-settings-shared";
// Sanity custom validation values are untyped; validate their shape before reading fields.
function uniqueMenuSlugs(value: unknown): true | string {
  if (!Array.isArray(value)) return true;
  const slugs = value.map((item: unknown) => {
    if (item === null || typeof item !== "object") return undefined;
    const slug = (item as {slug?: unknown}).slug;
    return typeof slug === "string" ? slug : undefined;
  }).filter((slug): slug is string => typeof slug === "string");
  return new Set(slugs).size === slugs.length
    ? true
    : "Rubrikat nuk duhet të përsëriten.";
}
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
    footerContactTarget:"/kontakt",
    footerDeveloperUrl:"https://lindimaps.com/",
    footerDeveloperVisible:true,
    ...defaultFooterText,
  },
  groups:[
    {name:"appearance",title:"Pamja dhe menuja",default:true},
    {name:"footer",title:"Administrimi i Footer-it"},
    {name:"email",title:"Formulari i kontaktit"}
  ],
  fields:[
    defineField({name:"headerLogoLight",title:"Logo në header · Light Mode",group:"appearance",type:"image",options:{hotspot:true},description:"Lëre bosh për logon aktuale të faqes."}),
    defineField({name:"headerLogoDark",title:"Logo në header · Dark Mode",group:"appearance",type:"image",options:{hotspot:true},description:"Lëre bosh për logon aktuale të faqes."}),
    defineField({name:"footerLogo",title:"Logo në footer",group:"footer",type:"image",options:{hotspot:true},description:"Lëre bosh për logon aktuale të faqes."}),
    defineField({name:"headerMenu",title:"Menuja kryesore · renditje dhe fshehje",group:"appearance",type:"array",of:[menuItem],description:"Tërhiq rubrikat për të ndryshuar renditjen. Fshehja e lidhjes nuk fshin faqen.",validation:Rule=>Rule.custom(uniqueMenuSlugs)}),
    defineField({name:"footerMenu",title:"Menuja në fund të faqes",group:"footer",type:"array",of:[menuItem],validation:Rule=>Rule.custom(uniqueMenuSlugs)}),
    defineField({name:"showPlannerCta",title:"Shfaq butonin Planifiko",group:"appearance",type:"boolean",initialValue:true}),
    defineField({name:"plannerCtaSq",title:"Teksti i butonit SQ",group:"appearance",type:"string"}),
    defineField({name:"plannerCtaEn",title:"Teksti i butonit EN",group:"appearance",type:"string"}),
    defineField({name:"publicEmail",title:"Email-i publik",group:"footer",type:"string",validation:Rule=>Rule.required().email()}),
    ...Object.entries(defaultFooterText).map(([name,initialValue])=>
      defineField({
        name,title:footerTextFieldLabels[name as keyof typeof defaultFooterText],
        type:"string",group:"footer",initialValue,
        description:name==="footerCopyrightOwner"?"Emri i titullarit. Viti aktual vendoset automatikisht.":undefined,
      })
    ),
    defineField({name:"footerContactTarget",title:"Faqja që hap butoni Na kontakto",type:"string",group:"footer",
      options:{list:[{title:"Kontakt",value:"/kontakt"},{title:"Planifiko vizitën",value:"/planifiko"}]},
      initialValue:"/kontakt"}),
    defineField({name:"footerDeveloperUrl",title:"URL e zhvilluesit (HTTPS)",type:"url",group:"footer",
      initialValue:"https://lindimaps.com/",
      validation:Rule=>Rule.required().uri({scheme:["https"]})}),
    defineField({name:"footerDeveloperVisible",title:"Shfaq informacionin e zhvilluesit",type:"boolean",group:"footer",
      description:"Kontrolloni detyrimet e licencës dhe të atribuimit përpara se ta fshihni.",
      initialValue:true}),
    defineField({name:"contactRecipientEmail",title:"Email-i pritës i formularit",description:"Për siguri, mund të përdoret vetëm një adresë e miratuar te CONTACT_ALLOWED_RECIPIENTS në Vercel. Ndryshimi nga Studio pa miratim nuk ridrejton email.",group:"email",type:"string",validation:Rule=>Rule.required().email()}),
  ],
  preview:{prepare:()=>({title:"Konfigurimi i faqes"})},
});
