/** Non-destructive, resumable import. Existing published documents AND drafts are never overwritten. */
import {createClient} from '@sanity/client';
import {readFile, mkdir, writeFile} from 'node:fs/promises';
import {createReadStream} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const definitions = JSON.parse(await readFile(path.join(root, 'sanity/content/definitions.json'), 'utf8'));
const dryRun = process.argv.includes('--dry-run');
const client = createClient({projectId: 'ko1ud3ml', dataset: 'production', apiVersion: '2026-09-20', useCdn: false,
  token: process.env.SANITY_API_TOKEN});
if (!dryRun && !process.env.SANITY_API_TOKEN) throw new Error('SANITY_API_TOKEN kërkohet për importin; përdorni --dry-run për kontrollin lokal.');
const assets = new Map();
async function image(originalPath) {
  if (!originalPath) return undefined;
  if (!/^\/(images|logos)\/[\w.-]+$/.test(originalPath)) throw new Error(`Rrugë fotoje e papritur: ${originalPath}`);
  const filename = path.join(root, 'public', originalPath);
  const bytes = await readFile(filename);
  const sha1 = createHash('sha1').update(bytes).digest('hex');
  if (dryRun) return {_type: 'image', originalPath};
  if (!assets.has(sha1)) {
    const existing = await client.fetch('*[_type == "sanity.imageAsset" && sha1hash == $sha1][0]{_id}', {sha1});
    const uploaded = existing || await client.assets.upload('image', createReadStream(filename), {filename: path.basename(filename)});
    assets.set(sha1, uploaded._id);
  }
  return {_type: 'image', originalPath, asset: {_type: 'reference', _ref: assets.get(sha1)}};
}
async function convert(fields, input) {
  const result = {};
  for (const field of fields) {
    const value = input[field.name];
    if (field.type === 'image') result[field.name] = await image(value);
    else if (field.type === 'array') {
      result[field.name] = [];
      for (const item of value) result[field.name].push({_key: item._key, _type: `${field.name}Item`, ...await convert(field.fields, item)});
    } else result[field.name] = value;
  }
  return result;
}
const documents = [];
for (const [page, definition] of Object.entries(definitions)) {
  const id = `page-${page}`;
  if (!dryRun) {
    const existing = await client.fetch('*[_id in $ids]{_id}', {ids: [id, `drafts.${id}`]}, {perspective: 'raw'});
    if (existing.length) {console.log(`Ruajtur pa ndryshime: ${id}`); continue;}
  }
  const fallback = JSON.parse(await readFile(path.join(root, `sanity/content/${page}.json`), 'utf8'));
  documents.push({_id: id, _type: definition.name, ...await convert(definition.fields, fallback)});
}
if (dryRun) {
  console.log(`Kontrolluar: ${documents.length} faqe; të gjithë skedarët origjinalë të fotove ekzistojnë.`);
} else if (documents.length) {
  const backup = path.join(root, '.migration-backups');
  await mkdir(backup, {recursive: true});
  await writeFile(path.join(backup, `pages-${Date.now()}.ndjson`), documents.map(d => JSON.stringify(d)).join('\n')+'\n');
  let transaction = client.transaction();
  for (const document of documents) transaction = transaction.createIfNotExists(document);
  await transaction.commit();
  const saved = await client.fetch('*[_id in $ids]', {ids: documents.map(d => d._id)});
  // Verify the complete nested payload, not only the document count.
  for (const document of documents) {
    const actual = saved.find(d => d._id === document._id);
    if (!actual) throw new Error(`Dokumenti mungon pas importit: ${document._id}`);
    for (const [key,value] of Object.entries(document)) {
      if (JSON.stringify(actual[key]) !== JSON.stringify(value)) {
        // Sanity may reorder object keys; compare recursively below.
        const canonical = value => Array.isArray(value) ? value.map(canonical) : value && typeof value === 'object' ? Object.fromEntries(Object.entries(value).sort().map(([k,v]) => [k,canonical(v)])) : value;
        if (JSON.stringify(canonical(actual[key])) !== JSON.stringify(canonical(value))) throw new Error(`Verifikimi dështoi: ${document._id}.${key}`);
      }
    }
  }
  console.log(`Publikuar dhe verifikuar: ${saved.length} faqe. Fotot origjinale u ngarkuan pa ripërpunim.`);
}
