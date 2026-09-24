import {createClient} from '@sanity/client'

const token=process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN
const client=createClient({projectId:'ko1ud3ml',dataset:'production',apiVersion:'2026-09-24',token,useCdn:false})

const docs=await client.fetch(`*[_type=="destinacion"]|order(titulli asc){
  _id,titulli,kategoria,
  "hasFoto":defined(foto.asset),
  "galleryCount":count(galeria),
  "hasLocation":defined(lokacioni.lat)&&defined(lokacioni.lng),
  "lat":lokacioni.lat,"lng":lokacioni.lng,
  "plannerTags":coalesce(plannerTags,[]),
  "plannerFeatured":coalesce(plannerFeatured,false),
  "hasSummary":defined(permbledhje),
  "hasHighlights":count(cfareSheh)>0,
  "hasVisitTip":defined(keshilleVizite)
}`)

const expected=new Set(["Kalaja e Lezhës","Qyteti antik i Lissusit","Akrolisi","Memoriali i Skënderbeut","Obelisku i Kuvendit të Lezhës","Ura e vjetër e qytetit","Shtëpia e Mlikajve","Lumi Drin dhe shëtitorja","Katedralja e qytetit","Kisha e Shën Eufemisë","Kisha e Kuvendit të Arbnit","Rana e Hedhun","Shëngjini","Lagunat Kune–Vain","Plazhi i Tales","Shtëpia e At Gjergj Fishtës","Pallati i Kulturës","Biblioteka e qytetit","Kisha e Zojës Nunenciate","Kisha Ortodokse e Metamorfozës","Xhamia e qytetit","Kisha e Shën Shtjefnit","Kisha e Troshanit","Kisha e Shën Premtës","Kisha e Martirëve","Kisha Zemra e Krishtit"])
const extras=docs.filter(d=>!expected.has(d.titulli))
const missingLocation=docs.filter(d=>expected.has(d.titulli)&&!d.hasLocation)
const missingFoto=docs.filter(d=>expected.has(d.titulli)&&!d.hasFoto)
const missingTags=docs.filter(d=>expected.has(d.titulli)&&!d.plannerTags.length)
const incomplete=docs.filter(d=>expected.has(d.titulli)&&(!d.hasSummary||!d.hasHighlights||!d.hasVisitTip))

console.log(`\n📊 AUDIT DESTINACIONE — CMS: ${docs.length}, katalogu: ${expected.size}`)
console.log(`🧩 Jashtë katalogut 26: ${extras.length}`)
extras.forEach(d=>console.log(`   • ${d.titulli} [${d._id}]`))
console.log(`\n📍 Pa lokacion: ${missingLocation.length}`)
missingLocation.forEach(d=>console.log(`   • ${d.titulli}`))
console.log(`\n🖼️ Pa foto kryesore: ${missingFoto.length}`)
missingFoto.forEach(d=>console.log(`   • ${d.titulli}`))
console.log(`\n🏷️ Pa plannerTags: ${missingTags.length}`)
missingTags.forEach(d=>console.log(`   • ${d.titulli}`))
console.log(`\n📝 Me përmbajtje turistike jo të plotë: ${incomplete.length}`)
incomplete.forEach(d=>console.log(`   • ${d.titulli}`))
console.log(`\n✅ Gati për hartë (me lokacion): ${docs.filter(d=>expected.has(d.titulli)&&d.hasLocation).length}/26`)
console.log(`✅ Me plannerTags: ${26-missingTags.length}/26`)
