/**
 * ONE-TIME migration for documents that already existed before the new Sanity fields.
 * NOT a CMS action, NOT triggered by deploy and NEVER overwrites existing values.
 * Requires SANITY_API_WRITE_TOKEN or SANITY_API_TOKEN in local environment.
 *
 * Preview: npm run sanity:seed:preview
 * Apply:   npm run sanity:seed:apply
 */
import {createClient} from '@sanity/client';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createReadStream} from 'node:fs';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const args=process.argv.slice(2);
if(args.length!==1||!['--dry-run','--apply'].includes(args[0])){
  throw new Error('Përdor: npm run sanity:seed:preview ose npm run sanity:seed:apply');
}
const apply=args[0]==='--apply';
const token=process.env.SANITY_API_WRITE_TOKEN||process.env.SANITY_API_TOKEN;
if(!token)throw new Error('SANITY_API_WRITE_TOKEN ose SANITY_API_TOKEN duhet në ambient. Mos e dërgoni në chat.');
const client=createClient({projectId:'ko1ud3ml',dataset:'production',apiVersion:'2026-09-20',token,useCdn:false});
const cacheModules=new Map();
function loadTs(filename){
  if(cacheModules.has(filename))return cacheModules.get(filename);
  const source=fs.readFileSync(filename,'utf8');
  const js=ts.transpileModule(source,{compilerOptions:{
    module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true
  }}).outputText;
  const exports={};cacheModules.set(filename,exports);
  const imports=(specifier)=>{
    if(specifier.endsWith('.json'))return JSON.parse(fs.readFileSync(path.resolve(path.dirname(filename),specifier),'utf8'));
    if(specifier.startsWith('.'))return loadTs(path.resolve(path.dirname(filename),specifier+'.ts'));
    throw new Error('Import i panjohur: '+specifier);
  };
  vm.runInNewContext(js,{exports,require:imports,console},{filename,timeout:8000});
  return exports;
}
const {planCMSBootstrap,summaryOfPlan}=loadTs(path.join(root,'sanity/lib/cms-bootstrap.ts'));
const ids=['site-settings','drafts.site-settings','page-home','drafts.page-home'];
const current=await client.fetch('*[_id in $ids]',{ids},{perspective:'raw',cache:'no-store'});
const plans=planCMSBootstrap(current);
console.log(summaryOfPlan(plans).join('\n')||'Asgjë për të mbushur: të gjitha vlerat ekzistojnë.');
if(!plans.length)process.exit(0);
const backupsPath=path.join(root,'.migration-backups');
await mkdir(backupsPath,{recursive:true});
const file=path.join(backupsPath,'cms-settings-home-'+new Date().toISOString().replace(/[:.]/g,'-')+'.json');
await writeFile(file,JSON.stringify({
  note:'Kopje para plotësimit; jo eksport i plotë i Sanity dataset.',
  createdAt:new Date().toISOString(),dataset:'production',documents:current,
  operations:plans.map(({id,action,values})=>({id,action,fields:Object.keys(values)})),
},null,2));
console.log('Kopja e dokumenteve u ruajt:',file);
if(!apply){
  console.log('VETËM PARAPAMJE. Asnjë ndryshim në Sanity. Për zbatim përdor sanity:seed:apply.');
  process.exit(0);
}
if(process.env.CONFIRM_SANITY_PRODUCTION_SEED!=='YES'){
  throw new Error('Zbatimi kërkon CONFIRM_SANITY_PRODUCTION_SEED=YES, pas shqyrtimit të kopjes dhe planit.');
}
const uploaded=new Map();
async function resolveImage(value){
  if(Array.isArray(value))return Promise.all(value.map(resolveImage));
  if(!value||typeof value!=='object')return value;
  if(value._type==='image'&&typeof value.originalPath==='string'&&!value.asset){
    const originalPath=value.originalPath;
    if(!/^\/images\/[a-zA-Z0-9_.-]+$/.test(originalPath))throw new Error('Rrugë e papritur fotoje: '+originalPath);
    const imagePath=path.join(root,'public',originalPath.slice(1));
    if(uploaded.has(originalPath))return uploaded.get(originalPath);
    const bytes=await readFile(imagePath);
    const hash=createHash('sha1').update(bytes).digest('hex');
    const existing=await client.fetch('*[_type=="sanity.imageAsset"&&sha1hash==$hash][0]{_id}',{hash});
    const asset=existing||await client.assets.upload('image',createReadStream(imagePath),{filename:path.basename(originalPath)});
    const doc={_type:'image',originalPath,asset:{_type:'reference',_ref:asset._id}};
    uploaded.set(originalPath,doc);
    return doc;
  }
  return Object.fromEntries(await Promise.all(Object.entries(value).map(async([key,item])=>[key,await resolveImage(item)])));
}
// Refetch to protect drafts and edits that happened between --dry-run and --apply.
const latest=await client.fetch('*[_id in $ids]',{ids},{perspective:'raw',cache:'no-store'});
const operations=planCMSBootstrap(latest);
if(!operations.length){console.log('Të gjitha fushat janë tashmë të mbushura.');process.exit(0);}
const prepared=await Promise.all(operations.map(async op=>({...op,values:await resolveImage(op.values)})));
let transaction=client.transaction();
for(const op of prepared){
  if(op.action==='create')transaction=transaction.createIfNotExists(op.values);
  else transaction=transaction.patch(op.id,{setIfMissing:op.values});
}
await transaction.commit({visibility:'sync'});
const saved=await client.fetch('*[_id in $ids]',{ids},{perspective:'raw',cache:'no-store'});
for(const op of prepared){
  const doc=saved.find(item=>item._id===op.id);
  if(!doc)throw new Error('Dokumenti nuk u verifikua pas shkrimit: '+op.id);
}
console.log('U plotësuan fushat që mungonin; vlerat ekzistuese u ruajtën.');
