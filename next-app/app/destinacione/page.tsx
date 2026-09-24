import {pageMetadata} from "@/app/seo";
export const metadata = pageMetadata("destinacione", "sq");
import {client} from '@/sanity/lib/client'
import DestinacioneClient from './DestinacioneClient'

const officialResources = [
  {
    _id: "bashkia-kalaja-lezhe", titulli: "Kalaja e Lezhës", kategoria: "histori",
    permbledhje: "Fortifikimi që dominon qytetin dhe ruan gjurmë të disa fazave historike të Lezhës.",
    pershkrimi: "Kalaja e Lezhës ngrihet mbi qytet, mbi themelet e akropolit antik. Burimi institucional i Bashkisë Lezhë përshkruan faza të ndryshme ndërtimi dhe një sistem të gjerë fortifikues me porta, kulla dhe mure mbrojtëse.",
    cfareSheh: ["Muret dhe elementet e fortifikimit", "Gjurmë të fazave të ndryshme historike", "Pamje panoramike mbi Lezhë"],
    keshilleVizite: "Planifiko kohë për ecjen në terren dhe për panoramën. Kombinoje me Lissusin dhe Memorialin e Skënderbeut.",
    kohezgjatja: "1–1.5 orë", oraRekomanduar: "Paradite ose para perëndimit",
    fotoUrl: "https://lezha.gov.al/wp-content/uploads/2020/12/kalaja_lezhe_142-650x268.png",
    burimi: "https://lezha.gov.al/resurset-turistike/", burimiTitull: "Bashkia Lezhë – Resurset Turistike",
    harta: "https://www.google.com/maps/search/?api=1&query=Kalaja+e+Lezhes"
  },
  {
    _id: "bashkia-lissus", titulli: "Qyteti antik i Lissusit", kategoria: "arkeologji",
    permbledhje: "Gjurmët e qytetit antik dhe të sistemit fortifikues që lidhen me historinë ilire të Lezhës.",
    pershkrimi: "Lissusi është një nga shtresat kryesore arkeologjike të Lezhës. Fortifikimet dhe pozicioni pranë Drinit dëshmojnë rëndësinë strategjike të qytetit antik dhe lidhjet e tij me rrugët ujore e detare.",
    cfareSheh: ["Mure antike dhe gjurmë fortifikuese", "Gurët ilirë", "Lidhjen mes qytetit antik dhe Lezhës së sotme"],
    keshilleVizite: "Është ndalesë ideale për t’u kombinuar në këmbë me Memorialin e Skënderbeut dhe qendrën e qytetit.",
    kohezgjatja: "45–60 min", oraRekomanduar: "Paradite",
    fotoUrl: "https://lezha.gov.al/wp-content/uploads/2020/12/qyteti_antik_145-650x268.png",
    burimi: "https://lezha.gov.al/resurset-turistike/", burimiTitull: "Bashkia Lezhë – Resurset Turistike",
    harta: "https://www.google.com/maps/search/?api=1&query=Ancient+Lissus+Lezhe"
  },
  {
    _id: "bashkia-akrolisi", titulli: "Akrolisi", kategoria: "arkeologji",
    permbledhje: "Vendbanimi i fortifikuar në Shëlbuem, me shtresa arkeologjike që dëshmojnë një histori shumë të hershme.",
    pershkrimi: "Akrolisi ndodhet në majën shkëmbore të Shëlbuemit, në juglindje të Lezhës. Burimi i Bashkisë evidenton muret, kullat dhe shtresat arkeologjike që e bëjnë zonën një pikë me interes të veçantë për historinë e hershme të territorit.",
    cfareSheh: ["Gjurmë muresh dhe kullash", "Terren arkeologjik në Shëlbuem", "Panoramë mbi territorin e Lezhës"],
    keshilleVizite: "Destinacion për eksplorim në terren; këpucët e përshtatshme dhe planifikimi i kohës janë të rekomandueshme.",
    kohezgjatja: "1.5–2 orë", oraRekomanduar: "Paradite",
    fotoUrl: "https://lezha.gov.al/wp-content/uploads/2020/12/akrolisi_147-600x268.png",
    burimi: "https://lezha.gov.al/resurset-turistike/", burimiTitull: "Bashkia Lezhë – Resurset Turistike",
    harta: "https://www.google.com/maps/search/?api=1&query=Akrolisi+Lezhe"
  },
  {
    _id: "bashkia-memoriali", titulli: "Memoriali i Skënderbeut", kategoria: "histori",
    permbledhje: "Memoriali i ngritur mbi Kishën e Shën Kollit, vendi i lidhur me varrimin e Gjergj Kastriotit Skënderbeut.",
    pershkrimi: "Memoriali lidhet me Kishën e Shën Kollit, ku u varros Gjergj Kastrioti Skënderbeu në vitin 1468. Forma e sotme e memorialit u ndërtua në vitin 1981 dhe përfshin elemente simbolike të historisë së Besëlidhjes.",
    cfareSheh: ["Bustin e Skënderbeut", "Kopje simbolike të shpatës dhe përkrenares", "Mburojat me stemat e pjesëmarrësve të Kuvendit"],
    keshilleVizite: "Vendose në fillim të një turi historik në qendër të Lezhës dhe vazhdo drejt Lissusit e Kalasë.",
    kohezgjatja: "30–45 min", oraRekomanduar: "Gjatë ditës",
    fotoUrl: "https://lezha.gov.al/wp-content/uploads/2020/12/memoriali_148-600x268.png",
    burimi: "https://lezha.gov.al/resurset-turistike/", burimiTitull: "Bashkia Lezhë – Resurset Turistike",
    harta: "https://www.google.com/maps/search/?api=1&query=Memoriali+i+Skenderbeut+Lezhe"
  },
  {
    _id: "bashkia-obelisku", titulli: "Obelisku i Kuvendit të Lezhës", kategoria: "histori",
    permbledhje: "Monument në qendër të qytetit kushtuar Kuvendit të Lezhës të 2 marsit 1444.",
    pershkrimi: "Obelisku përkujton Kuvendin e Lezhës të 2 marsit 1444, ngjarje që lidhet me bashkimin e princërve shqiptarë dhe organizimin e tyre nën drejtimin ushtarak të Skënderbeut.",
    cfareSheh: ["Monumentin përkujtimor", "Referencën ndaj Besëlidhjes së Lezhës", "Qendrën urbane të Lezhës"],
    keshilleVizite: "Ndalesë e shkurtër që lidhet natyrshëm me Memorialin dhe itinerarin historik në qendër.",
    kohezgjatja: "15–20 min", oraRekomanduar: "Gjatë ditës",
    fotoUrl: "https://lezha.gov.al/wp-content/uploads/2020/12/Obelisku-i-Beselidhjes-Lezhe-scaled-600x440.jpg",
    burimi: "https://lezha.gov.al/resurset-turistike/", burimiTitull: "Bashkia Lezhë – Resurset Turistike",
    harta: "https://www.google.com/maps/search/?api=1&query=Obelisku+i+Kuvendit+te+Lezhes"
  }
]

export const dynamic = 'force-dynamic'

export default async function DestinacionePage() {
  const destinacionet = await client.fetch(`
    *[_type == "destinacion"] | order(_createdAt asc) {
      _id,
      titulli,
      kategoria,
      pershkrimi,
      permbledhje,
      cfareSheh,
      keshilleVizite,
      kohezgjatja,
      oraRekomanduar,
      burimiTitull,
      "fotoUrl": foto.asset->url,
      "galeriaUrls": galeria[].asset->url,
      burimi,
      harta
    }
  `)

  const normalize=(value:string)=>value.toLocaleLowerCase("sq").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]/g,"")
  const cmsNames=new Set(destinacionet.map((item:any)=>normalize(item.titulli||"")))
  const resources=[...destinacionet,...officialResources.filter(item=>!cmsNames.has(normalize(item.titulli)))]
  const jsonLd={"@context":"https://schema.org","@type":"ItemList",name:"Destinacione për t'u vizituar në Lezhë",itemListElement:resources.map((item:any,index:number)=>({"@type":"ListItem",position:index+1,item:{"@type":"TouristAttraction",name:item.titulli,description:item.pershkrimi,image:item.fotoUrl}}))};
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd).replace(/</g,"\\u003c")}}/><DestinacioneClient destinacionet={resources}/></>)
}