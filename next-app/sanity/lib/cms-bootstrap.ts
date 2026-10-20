import homeFallback from "../content/home.json";
import {defaultSiteSettings} from "./site-settings-shared";

export type CMSDocument = Record<string,unknown> & {_id:string;_type:string;_rev?:string};
export type SeedPlan = {
  id:string;
  type:"homePage"|"siteSettings";
  action:"create"|"patch";
  values:Record<string,unknown>;
};
const newHomeFields=[
  "heroWelcome","heroWelcomeEn","heroTitle","heroTitleEn",
  "heroSubtitle","heroSubtitleEn","heroDescription","heroDescriptionEn",
  "heroPrimaryLabel","heroPrimaryLabelEn","heroSecondaryLabel","heroSecondaryLabelEn",
  "heroSecondaryUrl","heroCircles","showQuickLinks","showDirectory",
] as const;

function toStudioImage(path:string):Record<string,unknown>{
  return {_type:"image",originalPath:path};
}
function toCircleArray(): Array<Record<string,unknown>> {
  return homeFallback.heroCircles.map(item=>({
    _type:"heroCirclesItem",_key:item._key,
    image:toStudioImage(item.image),page:item.page,label:item.label,labelEn:item.labelEn,
  }));
}
function baseHome():Record<string,unknown>{
  return {
    ...homeFallback,
    src1:toStudioImage(homeFallback.src1),
    directory:homeFallback.directory.map(item=>({_type:"directoryItem",...item,visible:true})),
    heroCircles:toCircleArray(),
  };
}
function baseSettings():Record<string,unknown>{
  return {
    ...defaultSiteSettings,
    headerMenu:defaultSiteSettings.headerMenu.map(item=>({_type:"siteMenuItem",...item})),
    footerMenu:defaultSiteSettings.footerMenu.map(item=>({_type:"siteMenuItem",...item})),
  };
}
function missing(value:unknown):boolean{return value===undefined||value===null;}
const safeKey=/^[a-zA-Z0-9_-]+$/;
function homePatch(existing:CMSDocument):Record<string,unknown>{
  const src=baseHome();
  const values:Record<string,unknown>={};
  for(const key of newHomeFields){
    if(missing(existing[key]))values[key]=src[key];
  }
  // Populate new visibility fields on existing directory cards without reordering
  // or replacing the owner's text, images, links or any other stored values.
  if(Array.isArray(existing.directory)){
    for(const item of existing.directory){
      if(!item||typeof item!=="object")continue;
      const entry=item as Record<string,unknown>;
      const key=entry._key;
      if(typeof key==="string"&&safeKey.test(key)&&missing(entry.visible)){
        values[`directory[_key=="${key}"].visible`]=true;
      }
    }
  }
  return values;
}
function settingsPatch(existing:CMSDocument):Record<string,unknown>{
  const fallback=baseSettings();
  const values:Record<string,unknown>={};
  for(const [name,value] of Object.entries(fallback)){
    if(missing(existing[name]) && value!=="" && value!==undefined)values[name]=value;
  }
  return values;
}
function makeNew(id:string,type:"homePage"|"siteSettings",defaults:Record<string,unknown>):SeedPlan{
  return {id,type,action:"create",values:{_id:id,_type:type,...defaults}};
}
export function planCMSBootstrap(documents:CMSDocument[]):SeedPlan[]{
  const lookup=new Map(documents.map(document=>[document._id,document]));
  const out:SeedPlan[]=[];
  for(const [id,type,defaults,patcher] of [
    ["site-settings","siteSettings",baseSettings,settingsPatch],
    ["page-home","homePage",baseHome,homePatch],
  ] as const){
    const published=lookup.get(id);
    const draft=lookup.get("drafts."+id);
    if(!published&&!draft){
      out.push(makeNew(id,type,defaults()));
    }else{
      // If only a draft exists, never publish it implicitly.
      for(const document of [published,draft]){
        if(!document)continue;
        if(document._type!==type)throw new Error("Lloji i dokumentit nuk përputhet: "+document._id);
        const values=patcher(document);
        if(Object.keys(values).length)out.push({id:document._id,type,action:"patch",values});
      }
    }
  }
  return out;
}
export function summaryOfPlan(plan:SeedPlan[]):string[]{
  return plan.map(operation=>
    `${operation.id}: ${operation.action==="create"?"Krijim": "Mbushje"} (${Object.keys(operation.values).filter(key=>!key.startsWith("_")).length} fusha)`
  );
}
