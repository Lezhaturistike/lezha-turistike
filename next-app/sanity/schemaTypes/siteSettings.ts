import {defineField,defineType} from "sanity";
import {allowedMenuSlugs,defaultSiteSettings,defaultFooterText,footerTextFieldLabels,safeSubMenuHref} from "../lib/site-settings-shared";
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
    defineField({
      name:"subMenu",title:"Nënmenu · opsionale (pa elemente fillimisht)",type:"array",
      description:"Lëreni bosh për të ruajtur menunë aktuale. Vetëm te menuja kryesore: shtoni lidhje SQ/EN, ndryshoni renditjen dhe dukshmërinë. Nuk krijohen faqe automatikisht.",
      initialValue:[],
      of:[{
        type:"object",name:"siteSubMenuItem",title:"Lidhje e nënmenusë",
        fields:[
          defineField({name:"labelSq",title:"Titulli shqip",type:"string",validation:Rule=>Rule.required().max(120)}),
          defineField({name:"labelEn",title:"Titulli anglisht",type:"string",validation:Rule=>Rule.required().max(120)}),
          defineField({name:"href",title:"Lidhja (p.sh. /histori#arkeologji)",type:"string",
            description:"Lidhje e brendshme që fillon me / ose lidhje e jashtme https://. Mos përdorni URL me skripte.",
            validation:Rule=>Rule.required().custom(value=>safeSubMenuHref(value)!==null||"Shkruani një adresë të brendshme /... ose HTTPS të vlefshme.")}),
          defineField({name:"visible",title:"Shfaq lidhjen",type:"boolean",initialValue:true}),
        ],
        preview:{select:{title:"labelSq",subtitle:"href"}}
      }]
    }),
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
    defineField({name:"cookieLogo",title:"Logo te shiriti Cookies",group:"appearance",type:"image",
      description:"Nëse lihet bosh, përdoret automatikisht logoja e ngarkuar e faqes ose logoja aktuale me kalanë. Këshillohet PNG transparent."}),
    defineField({name:"faviconImage",title:"Favicon · Ikona e shfletuesit",group:"appearance",type:"image",
      description:"Ngarko ikonë katrore PNG/WebP, idealisht 512×512 px, që të shfaqet në skedat e browser-it dhe në rezultate kërkimi. Në mungesë të saj mbetet ikona aktuale e kalasë. Browser-at/Google mund ta ruajnë në cache."}),
    defineField({name:"headerMenu",title:"Menuja kryesore · renditje dhe fshehje",group:"appearance",type:"array",of:[menuItem],initialValue:defaultSiteSettings.headerMenu.map(item=>({...item,_type:"siteMenuItem"})),description:"Tërhiq rubrikat për të ndryshuar renditjen. Fshehja e lidhjes nuk fshin faqen.",validation:Rule=>Rule.custom(uniqueMenuSlugs)}),
    defineField({name:"footerMenu",title:"Menuja në fund të faqes",group:"footer",type:"array",of:[menuItem],initialValue:defaultSiteSettings.footerMenu.map(item=>({...item,_type:"siteMenuItem"})),validation:Rule=>Rule.custom(uniqueMenuSlugs)}),
    defineField({name:"showPlannerCta",title:"Shfaq butonin Planifiko",group:"appearance",type:"boolean",initialValue:true}),
    defineField({name:"plannerCtaSq",title:"Teksti i butonit SQ",group:"appearance",type:"string",initialValue:defaultSiteSettings.plannerCtaSq}),
    defineField({name:"plannerCtaEn",title:"Teksti i butonit EN",group:"appearance",type:"string",initialValue:defaultSiteSettings.plannerCtaEn}),
    defineField({name:"publicEmail",title:"Email-i publik",group:"footer",type:"string",initialValue:defaultSiteSettings.publicEmail,validation:Rule=>Rule.email()}),
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
      validation:Rule=>Rule.uri({scheme:["https"]})}),
    defineField({name:"footerDeveloperVisible",title:"Shfaq informacionin e zhvilluesit",type:"boolean",group:"footer",
      description:"Kontrolloni detyrimet e licencës dhe të atribuimit përpara se ta fshihni.",
      initialValue:true}),
    defineField({name:"contactRecipientEmail",title:"Email-i pritës i formularit",description:"Për siguri, mund të përdoret vetëm një adresë e miratuar te CONTACT_ALLOWED_RECIPIENTS në Vercel. Ndryshimi nga Studio pa miratim nuk ridrejton email.",group:"email",type:"string",initialValue:defaultSiteSettings.contactRecipientEmail,validation:Rule=>Rule.email()}),
  ],
  preview:{prepare:()=>({title:"Konfigurimi i faqes"})},
});
