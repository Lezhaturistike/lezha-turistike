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

test('missing uploaded hero images use original local photos rather than empty URLs', () => {
  const fallback = require('../sanity/content/home.json');
  const fields = model.pageDefinitions.home.fields;
  const missing = Object.fromEntries(['heroCircles','src1'].map(k => [k, k==='heroCircles' ? [] : '']));
  const result = plain(model.normalizeContent(fields, missing, fallback));
  assert.equal(result.src1, fallback.src1);
  assert.equal(result.heroCircles.length, 3);
  for (let i=0; i<3; i++) {
    assert.equal(result.heroCircles[i].image, fallback.heroCircles[i].image);
    assert.equal(result.heroCircles[i].page, fallback.heroCircles[i].page);
  }
});
test('hero circles keep edited target page while missing image uses client fallback', () => {
  const fallback = require('../sanity/content/home.json');
  const fields = model.pageDefinitions.home.fields;
  const updated = fallback.heroCircles.map(x => ({...x}));
  updated[0].page = '/webgis';
  updated[1].image = 'https://cdn.sanity.io/images/demo/production/abc.jpg';
  const actual = plain(model.normalizeContent(fields, {heroCircles: updated}, fallback));
  assert.equal(actual.heroCircles[0].page, '/webgis');
  assert.equal(actual.heroCircles[1].image, updated[1].image);
  assert.equal(actual.heroCircles.length, 3);
});

test('one public contact email updates SQ/EN legal text without replacing researcher addresses', () => {
  const {resolveSiteContactEmail} = load(path.join(root,'sanity/lib/site-settings-shared.ts'));
  const next='turizmi@bashkialezhe.gov.al';
  assert.equal(resolveSiteContactEmail('Kontakti: lezhaturistike@gmail.com',next),'Kontakti: '+next);
  assert.equal(resolveSiteContactEmail('Contact: lezhaturistike@gmail.com',next),'Contact: '+next);
  assert.equal(resolveSiteContactEmail('mailto:lezhalezha2024@gmail.com',next),'mailto:'+next);
  assert.equal(resolveSiteContactEmail('Email studiuesi: ehoxha63@gmail.com',next),'Email studiuesi: ehoxha63@gmail.com');
  assert.equal(resolveSiteContactEmail('Pa adresë email',next),'Pa adresë email');
});

test('institutional footer has complete bilingual defaults and approved links', () => {
  const {defaultSiteSettings,defaultFooterText,footerTextFieldLabels} = load(path.join(root,'sanity/lib/site-settings-shared.ts'));
  for(const [field,value] of Object.entries(defaultFooterText)){
    assert.ok(typeof value==='string' && value.trim(),field);
    assert.equal(defaultSiteSettings[field],value);
    assert.ok(footerTextFieldLabels[field]);
  }
  assert.equal(defaultSiteSettings.footerContactTarget,'/kontakt');
  assert.equal(defaultSiteSettings.footerDeveloperUrl,'https://lindimaps.com/');
  assert.equal(defaultSiteSettings.footerDeveloperVisible,true);
  assert.equal(defaultSiteSettings.footerDeveloperBold,'LINDI');
  assert.equal(defaultSiteSettings.footerDeveloperItalic,'MAPS');
});

test('cookie consent uses dedicated logo or current brand fallback',()=>{
  const {cookieBrandImage,defaultSiteSettings}=load(path.join(root,'sanity/lib/site-settings-shared.ts'));
  assert.equal(cookieBrandImage(defaultSiteSettings),'');
  const logo='https://cdn.sanity.io/images/project/production/logo.png';
  assert.equal(cookieBrandImage({...defaultSiteSettings,headerLogoDark:logo}),logo);
  assert.equal(cookieBrandImage({...defaultSiteSettings,headerLogoDark:logo,cookieLogo:'https://cdn.sanity.io/images/project/production/cookie.png'}),'https://cdn.sanity.io/images/project/production/cookie.png');
  assert.equal(cookieBrandImage({...defaultSiteSettings,footerLogo:logo}),logo);
  assert.equal(defaultSiteSettings.faviconImage,'');
});


test('CMS bootstrap creates only missing singleton documents with current published values',()=>{
  const shared=load(path.join(root,'sanity/lib/site-settings-shared.ts'));
  const bootstrap=load(path.join(root,'sanity/lib/cms-bootstrap.ts'),{'./site-settings-shared':shared});
  const plan=plain(bootstrap.planCMSBootstrap([]));
  assert.equal(plan.length,2);
  const settings=plan.find(x=>x.id==='site-settings');
  const home=plan.find(x=>x.id==='page-home');
  assert.equal(settings.action,'create');
  assert.equal(settings.values.publicEmail,'lezhaturistike@gmail.com');
  assert.equal(settings.values.footerMottoSq,'Njih historinë. Eksploro natyrën. Zbulo Lezhën.');
  assert.equal(settings.values.headerMenu.length,9);
  assert.equal(settings.values.footerMenu.length,7);
  assert.equal(home.values.heroCircles.length,3);
  assert.equal(home.values.heroCircles[0].image.originalPath,'/images/lezha.jpeg');
  assert.equal(home.values.showDirectory,true);
});
test('CMS bootstrap preserves existing edits and only fills genuinely missing fields',()=>{
  const shared=load(path.join(root,'sanity/lib/site-settings-shared.ts'));
  const bootstrap=load(path.join(root,'sanity/lib/cms-bootstrap.ts'),{'./site-settings-shared':shared});
  const documents=[
    {_id:'site-settings',_type:'siteSettings',publicEmail:'new@municipality.example',footerMottoSq:'Moto e re',footerMenu:[]},
    {_id:'page-home',_type:'homePage',heroTitle:'Titull i ndryshuar',showDirectory:false,directory:[
      {_key:'directory-1',title:'Rubrika e re'},
      {_key:'directory-2',visible:false,title:'E fshehur'}
    ]},
  ];
  const plan=plain(bootstrap.planCMSBootstrap(documents));
  const settings=plan.find(x=>x.id==='site-settings').values;
  assert.ok(!Object.hasOwn(settings,'publicEmail'));
  assert.ok(!Object.hasOwn(settings,'footerMottoSq'));
  assert.ok(!Object.hasOwn(settings,'footerMenu'));
  assert.equal(settings.footerLocationSq,'LEZHË · SHQIPËRI');
  const home=plan.find(x=>x.id==='page-home').values;
  assert.ok(!Object.hasOwn(home,'heroTitle'));
  assert.ok(!Object.hasOwn(home,'showDirectory'));
  assert.ok(!Object.hasOwn(home,'directory'));
  assert.equal(home['directory[_key=="directory-1"].visible'],true);
  assert.ok(!Object.hasOwn(home,'directory[_key=="directory-2"].visible'));
  assert.equal(home.heroCircles.length,3);
});
test('CMS bootstrap does not publish a draft implicitly',()=>{
  const shared=load(path.join(root,'sanity/lib/site-settings-shared.ts'));
  const bootstrap=load(path.join(root,'sanity/lib/cms-bootstrap.ts'),{'./site-settings-shared':shared});
  const plan=plain(bootstrap.planCMSBootstrap([
    {_id:'drafts.site-settings',_type:'siteSettings',footerContactHeadingSq:'Titull draft'}
  ]));
  assert.ok(plan.every(x=>x.id!=='site-settings'));
  assert.ok(plan.some(x=>x.id==='drafts.site-settings'));
  const draft=plan.find(x=>x.id==='drafts.site-settings');
  assert.ok(!Object.hasOwn(draft.values,'footerContactHeadingSq'));
  assert.ok(plan.some(x=>x.id==='page-home'&&x.action==='create'));
});

test('submenu fields are optional; existing navigation defaults contain no submenu items',()=>{
  const {defaultSiteSettings,safeSubMenuHref} = load(path.join(root,'sanity/lib/site-settings-shared.ts'));
  assert.ok(defaultSiteSettings.headerMenu.every(item=>!item.subMenu?.length));
  assert.equal(safeSubMenuHref('/histori#arkeologji'),'/histori#arkeologji');
  assert.equal(safeSubMenuHref('/webgis?view=3d'),'/webgis?view=3d');
  assert.equal(safeSubMenuHref('https://example.org/'), 'https://example.org/');
  for(const value of ['javascript:alert(1)','//other.site','/../admin','/a\\\\b','http://example.org','https://user:pass@example.org']){
    assert.equal(safeSubMenuHref(value),null,value);
  }
});
test('published submenu values keep safe SQ/EN links and ignore invisible/unsafe links',async()=>{
  const shared=load(path.join(root,'sanity/lib/site-settings-shared.ts'));
  const item={slug:'histori',labelSq:'Histori',labelEn:'History',visible:true,
    subMenu:[
      {_key:'a',labelSq:'Arkeologji',labelEn:'Archaeology',href:'/histori#arkeologji',visible:true},
      {_key:'b',labelSq:'Fshehur',labelEn:'Hidden',href:'/histori#secret',visible:false},
      {_key:'c',labelSq:'Gabim',labelEn:'Invalid',href:'javascript:alert(1)',visible:true}
    ]};
  const {getSiteSettings}=load(path.join(root,'sanity/lib/site-settings.ts'),{
    'server-only':{},'./site-settings-shared':shared,
    './client':{client:{fetch:async()=>({headerMenu:[item]})}},
  });
  const settings=plain(await getSiteSettings());
  assert.equal(settings.headerMenu.length,1);
  assert.equal(settings.headerMenu[0].subMenu.length,2);
  assert.equal(settings.headerMenu[0].subMenu[0].href,'/histori#arkeologji');
  assert.equal(settings.headerMenu[0].subMenu[1].visible,false);
  assert.equal(plain(shared.defaultSiteSettings.headerMenu).every(entry=>!entry.subMenu),true);
  const {localizedPath}=load(path.join(root,'sanity/lib/localize.ts'));
  assert.equal(localizedPath(settings.headerMenu[0].subMenu[0].href,'en'),'/en/histori#arkeologji');
});
test('mobile navigation closes on real links rather than submenu toggle buttons',()=>{
  const source=fs.readFileSync(path.join(root,'app/components/MenuButton.tsx'),'utf8');
  assert.match(source,/closest\("a"\)/);
  assert.match(source,/addEventListener\("click", closeOnNavigation\)/);
});
