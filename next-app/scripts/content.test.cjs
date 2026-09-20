/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS VM harness tests transpiled server modules without a Next.js runtime. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
function load(file, overrides = {}) {
  const exports = {};
  const source = ts.transpileModule(fs.readFileSync(file, 'utf8'), {compilerOptions: {target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, esModuleInterop: true}}).outputText;
  vm.runInNewContext(source, {exports, console, require: id => {
    if (Object.hasOwn(overrides, id)) return overrides[id];
    if (id.endsWith('.json')) return require(path.resolve(path.dirname(file), id));
    return require(id);
  }});
  return exports;
}
const model = load(path.join(root, 'sanity/lib/content-model.ts'));
const plain = value => JSON.parse(JSON.stringify(value));
test('published updates are read on the next request without a deploy', async () => {
  let current = 'Versioni i parë';
  const calls = [];
  const {getPageContent} = load(path.join(root, 'sanity/lib/content.ts'), {
    'server-only': {}, './content-model': model,
    './client': {client: {fetch: async (...args) => {calls.push(args);return {text3: current};}}},
  });
  const original = require('../sanity/content/histori.json');
  assert.equal((await getPageContent('histori', original)).text3, current);
  current = 'Versioni i publikuar';
  assert.equal((await getPageContent('histori', original)).text3, current);
  assert.equal(calls.length, 2);
  for (const [, params, options] of calls) {
    assert.equal(params.id, 'page-histori');
    assert.equal(options.cache, 'no-store');
    assert.equal(options.perspective, 'published');
  }
});
test('preserves original content when no published document exists or Sanity fails', async () => {
  const original = require('../sanity/content/histori.json');
  for (const fetch of [async () => null, async () => {throw new Error('offline');}]) {
    const {getPageContent} = load(path.join(root, 'sanity/lib/content.ts'), {'server-only': {}, './content-model': model, './client': {client: {fetch}}});
    assert.equal(await getPageContent('histori', original), original);
  }
});
test('empty lists stay empty; new cards and optional fields do not revive removed content', () => {
  const fields = model.pageDefinitions.partneret.fields;
  const fallback = require('../sanity/content/partneret.json');
  assert.deepEqual(plain(model.normalizeContent(fields, {partners: []}, fallback).partners), []);
  const result = plain(model.normalizeContent(fields, {partners: [{_key:'new',title:'Institucion',url:'https://example.org'}]}, fallback));
  assert.equal(result.partners[0].title, 'Institucion');
  assert.equal(result.partners[0].image, '');
  assert.equal(result.partners[0].subtitle, '');
});
test('invalid links cannot enter rendered content, and GIS viewer retains a usable initial app', () => {
  const fallback = require('../sanity/content/webgis.json');
  const result = plain(model.normalizeContent(model.pageDefinitions.webgis.fields, {gisApps: []}, fallback));
  assert.deepEqual(result.gisApps, fallback.gisApps);
  assert.equal(model.normalizeContent([{name:'url',type:'url'}], {url:'javascript:alert(1)'}, {}).url, '');
});
test('all local fallback image references exist; public pages use dynamic rendering', () => {
  for (const [page, definition] of Object.entries(model.pageDefinitions)) {
    const data = require(`../sanity/content/${page}.json`);
    function visit(fields, value) {for (const field of fields) {
      if (field.type === 'image' && value[field.name]) assert.ok(fs.existsSync(path.join(root, 'public', value[field.name])));
      if (field.type === 'array') for (const item of (value[field.name] || [])) visit(field.fields, item);
    }}
    visit(definition.fields, data);
    const pageSource = fs.readFileSync(path.join(root,'app',page==='home'?'':page,'page.tsx'),'utf8');
    assert.match(pageSource, /dynamic\s*=\s*['"]force-dynamic['"]/);
  }
});

test('English content uses nested CMS translations and preserves media, IDs and Albanian fallback', () => {
  const {localizeContent} = load(path.join(root, 'sanity/lib/localize.ts'));
  const source = {title:'Shqip',titleEn:'English',description:'Pa përkthim',descriptionEn:'',items:[{_key:'stable',title:'Vend',titleEn:'Place',image:'/assets/photo.jpg',embed:'https://example.org/map'}]};
  const original = JSON.stringify(source);
  assert.equal(localizeContent(source, 'sq'), source);
  assert.deepEqual(plain(localizeContent(source, 'en')), {title:'English',description:'Pa përkthim',items:[{_key:'stable',title:'Place',image:'/assets/photo.jpg',embed:'https://example.org/map'}]});
  assert.equal(JSON.stringify(source), original);
});

test('English internal links retain the matching page, query and fragment without rewriting assets', () => {
  const {localizedPath} = load(path.join(root, 'sanity/lib/localize.ts'));
  for (const slug of ['', 'destinacione', 'galeri', 'histori', 'arkeologji', 'webgis', 'shkenca', 'kulinari', 'partneret', 'kontakt']) {
    const route = '/' + slug;
    assert.equal(localizedPath(route, 'sq'), route);
    assert.equal(localizedPath(route + '?test=1#section', 'en'), '/en' + (slug ? '/' + slug : '') + '?test=1#section');
  }
  for (const url of ['/en/galeri', '/assets/map.pdf', '/api/reviews', '//example.com', 'https://example.com', 'mailto:hello@example.com', '#photos']) assert.equal(localizedPath(url, 'en'), url);
});
