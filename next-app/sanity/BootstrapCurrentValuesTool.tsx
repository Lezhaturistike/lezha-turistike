"use client";

import {useCallback,useEffect,useState} from "react";
import {useClient} from "sanity";
import {
  planCMSBootstrap,summaryOfPlan,type CMSDocument,type SeedPlan,
} from "./lib/cms-bootstrap";

const ids=["site-settings","drafts.site-settings","page-home","drafts.page-home"];
const frame:React.CSSProperties={maxWidth:900,margin:"32px auto",padding:"25px 30px",background:"var(--card-bg-color,#fff)",border:"1px solid #c7d3cf",borderRadius:14,color:"var(--card-fg-color,inherit)",lineHeight:1.65};
const button:React.CSSProperties={padding:"11px 18px",borderRadius:9,border:"1px solid #69857b",background:"#0f3d2e",color:"#fff",fontWeight:700,cursor:"pointer"};
const readableErr=(error:unknown)=>error instanceof Error?error.message:String(error);

export default function BootstrapCurrentValuesTool(){
  const client=useClient({apiVersion:"2026-09-20"});
  const [documents,setDocuments]=useState<CMSDocument[]|null>(null);
  const [plan,setPlan]=useState<SeedPlan[]>([]);
  const [busy,setBusy]=useState(false);
  const [backupSaved,setBackupSaved]=useState(false);
  const [confirmed,setConfirmed]=useState(false);
  const [message,setMessage]=useState("");
  const [error,setError]=useState("");

  const refresh=useCallback(async()=>{
    setError("");setBusy(true);setBackupSaved(false);setConfirmed(false);
    try{
      const found=await client.fetch<CMSDocument[]>(
        "*[_id in $ids]",{ids},{perspective:"raw",cache:"no-store"}
      );
      const changes=planCMSBootstrap(found);
      setDocuments(found);setPlan(changes);
      setMessage(changes.length?"U lexuan dokumentet. Shkarkoni kopjen para zbatimit.":"Fushat aktuale janë tashmë të mbushura. Asgjë për t'u shtuar.");
    }catch(e){setError(readableErr(e));setDocuments(null);setPlan([]);}
    finally{setBusy(false);}
  },[client]);
  useEffect(()=>{void refresh();},[refresh]);

  const backup=()=>{
    if(!documents)return;
    const contents=JSON.stringify({
      project:"Lezha Turistike",dataset:"production",
      generatedAt:new Date().toISOString(),
      note:"Vetëm dokumentet e konfigurimit dhe faqes kryesore; JO eksport i plotë i Sanity dataset.",
      documents,
      proposedChanges:plan.map(({id,action,values})=>({id,action,fieldNames:Object.keys(values)})),
    },null,2);
    const blob=new Blob([contents],{type:"application/json"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");a.href=url;
    a.download="lezha-sanity-settings-home-before-init-"+new Date().toISOString().slice(0,10)+".json";
    document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);
    setBackupSaved(true);setMessage("Kopja JSON është përgatitur për shkarkim.");
  };

  async function materializeImages(value:unknown,cache:Map<string,unknown>):Promise<unknown>{
    if(Array.isArray(value))return Promise.all(value.map(item=>materializeImages(item,cache)));
    if(!value||typeof value!=="object")return value;
    const input=value as Record<string,unknown>;
    if(input._type==="image" && typeof input.originalPath==="string" && input.originalPath.startsWith("/images/")){
      const path=input.originalPath;
      if(cache.has(path))return cache.get(path);
      const response=await fetch(path,{cache:"no-store"});
      if(!response.ok)throw new Error("Fotografia origjinale nuk mund të merret: "+path+" ("+response.status+")");
      const blob=await response.blob();
      const asset=await client.assets.upload("image",blob,{filename:path.split("/").pop()||"image.jpg"});
      const image={_type:"image",originalPath:path,asset:{_type:"reference",_ref:asset._id}};
      cache.set(path,image);
      return image;
    }
    return Object.fromEntries(await Promise.all(
      Object.entries(input).map(async([key,child])=>[key,await materializeImages(child,cache)])
    ));
  }

  const apply=async()=>{
    if(!backupSaved||!confirmed||busy||!documents)return;
    setBusy(true);setError("");setMessage("Po përgatiten fotot dhe fushat që mungojnë…");
    try{
      // Recheck, so edits made since preview are preserved.
      const latest=await client.fetch<CMSDocument[]>(
        "*[_id in $ids]",{ids},{perspective:"raw",cache:"no-store"}
      );
      const operations=planCMSBootstrap(latest);
      if(operations.length===0){setMessage("Asgjë për t'u plotësuar.");await refresh();return;}
      const cache=new Map<string,unknown>();
      const prepared=await Promise.all(operations.map(async operation=>({
        ...operation,
        values:await materializeImages(operation.values,cache) as Record<string,unknown>
      })));
      let transaction=client.transaction();
      for(const operation of prepared){
        if(operation.action==="create"){
          transaction=transaction.createIfNotExists(operation.values as CMSDocument);
        }else{
          transaction=transaction.patch(operation.id,{setIfMissing:operation.values});
        }
      }
      // Only fields missing/null are written; all preexisting edits survive.
      await transaction.commit({visibility:"sync"});
      setMessage("U mbushën me sukses fushat që mungonin. Për çdo ndryshim të mëvonshëm, redaktoni dhe publikoni normalisht në Sanity.");
      await refresh();
    }catch(e){setError(readableErr(e));setMessage("Nuk përfundoi mbushja. Verifikoni dokumentet përpara se të provoni sërish.");}
    finally{setBusy(false);}
  };
  return <main style={frame}>
    <h1 style={{fontSize:24,margin:"0 0 10px"}}>Mbush fushat me vlerat aktuale</h1>
    <p>Ky veprim plotëson <strong>Konfigurimin e faqes</strong> dhe <strong>Faqen kryesore</strong>
      me përmbajtjen aktuale të Lezha Turistike. Pasi të mbushen, ndryshimet e ardhshme bëhen normalisht në Studio.</p>
    <p><strong>Siguria:</strong> fushat që tashmë kanë përmbajtje nuk mbishkruhen. Nuk fshihen dokumente ose media.
      Kopja e mëposhtme përmban vetëm dokumentet e prekura; bëni veçmas edhe eksportin e plotë të dataset-it për dorëzim institucional.</p>
    <p style={{background:"rgba(212,180,131,.16)",padding:12,borderRadius:8}}>
      <strong>Logoja aktuale</strong> e header-it, footer-it dhe cookies është ndërtuar nga kodi i faqes.
      Fushat e ngarkimit të logove dhe favicon-it mund të lihen bosh: logoja dhe favicon-i aktual shfaqen automatikisht deri sa të ngarkoni të reja.
    </p>
    <h2 style={{fontSize:17}}>Kontrolli paraprak</h2>
    {!documents ? <p>Po lexohen dokumentet…</p>:plan.length===0 ? <p>Asgjë për të mbushur.</p>:
      <ul>{summaryOfPlan(plan).map(text=><li key={text}>{text}</li>)}</ul>}
    <div style={{display:"flex",flexWrap:"wrap",gap:12,margin:"22px 0"}}>
      <button style={button} type="button" disabled={busy} onClick={()=>void refresh()}>Rilexo fushat</button>
      <button style={button} type="button" disabled={busy||!documents} onClick={backup}>Shkarko kopjen JSON</button>
    </div>
    <label style={{display:"flex",alignItems:"flex-start",gap:10,margin:"10px 0 16px"}}>
      <input type="checkbox" checked={confirmed} disabled={!backupSaved||busy||plan.length===0} onChange={e=>setConfirmed(e.target.checked)}/>
      <span>Kam shkarkuar kopjen JSON, kam shqyrtuar ndryshimet dhe miratoj plotësimin e fushave që mungojnë në dataset-in production.</span>
    </label>
    <button style={button} type="button" disabled={!documents||!backupSaved||!confirmed||busy||plan.length===0} onClick={()=>void apply()}>
      {busy?"Duke punuar…":"Mbush fushat tani"}
    </button>
    {message&&<p role="status" style={{marginTop:15}}>{message}</p>}
    {error&&<p role="alert" style={{color:"#ba4036",marginTop:15}}>Gabim: {error}</p>}
    <p style={{marginTop:25,fontSize:13,opacity:.75}}>Fotografitë e tre rrathëve kopjohen nga imazhet ekzistuese në bibliotekën Sanity vetëm kur fushat janë bosh. Nuk ndryshohet asnjë fotografi ekzistuese.</p>
  </main>;
}
