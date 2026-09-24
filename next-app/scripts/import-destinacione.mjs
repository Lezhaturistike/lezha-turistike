import {createClient} from '@sanity/client'

const token=process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN
if(!token){console.error('❌ SANITY_API_WRITE_TOKEN mungon.');process.exit(1)}
const client=createClient({projectId:'ko1ud3ml',dataset:'production',apiVersion:'2026-09-24',token,useCdn:false})

const resources=[
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
  },
  {
    _id: "bashkia-ura-vjeter", titulli: "Ura e vjetër e qytetit", kategoria: "histori",
    permbledhje: "Ura historike mbi Drin, pjesë e kujtesës urbane dhe peizazhit të qytetit.",
    pershkrimi: "Bashkia Lezhë e paraqet si urën më të vjetër të ndërtuar mbi lumin Drin, me vlera historike dhe artistike për vizitorët.",
    cfareSheh: ["Ura historike mbi Drin", "Peizazhin urban buzë lumit", "Një element të trashëgimisë së qytetit"],
    keshilleVizite: "Kombinoje me një shëtitje përgjatë Drinit dhe qendrës historike.", kohezgjatja: "20–30 min", oraRekomanduar: "Paradite ose pasdite",
    burimi: "https://lezha.gov.al/resurset-turistike/", burimiTitull: "Bashkia Lezhë – Resurset Turistike", harta: "https://www.google.com/maps/search/?api=1&query=Ura+e+vjeter+Lezhe"
  },
  {
    _id: "bashkia-mlikaj", titulli: "Shtëpia e Mlikajve", kategoria: "histori",
    permbledhje: "Banesë qytetare dykatëshe e shekullit XIX në lagjen e vjetër Skënderbeg.",
    pershkrimi: "Shtëpia e Esat Mlikës ndodhet buzë Drinit në lagjen Skënderbeg. Është një banesë popullore qytetare dykatëshe e shekullit XIX, me vlera në punimin e mureve, çatisë, dritareve dhe dyerve.",
    cfareSheh: ["Arkitekturë qytetare tradicionale", "Punimin e mureve dhe çatisë", "Detaje të dritareve dhe dyerve"],
    keshilleVizite: "Trajtoje si ndalesë të trashëgimisë arkitekturore; verifiko aksesin para vizitës.", kohezgjatja: "20–30 min", oraRekomanduar: "Gjatë ditës",
    burimi: "https://lezha.gov.al/resurset-turistike/", burimiTitull: "Bashkia Lezhë – Resurset Turistike", harta: "https://www.google.com/maps/search/?api=1&query=Shtepia+e+Mlikajve+Lezhe"
  },
  {
    _id: "bashkia-drin", titulli: "Lumi Drin dhe shëtitorja", kategoria: "natyre",
    permbledhje: "Boshti ujor i Lezhës dhe një hapësirë e natyrshme për shëtitje pranë qytetit.",
    pershkrimi: "Drini i Lezhës ka qenë elementi kryesor i rrjetit hidrografik të qytetit dhe zonave përreth. Sot lumi dhe hapësirat buzë tij krijojnë një lidhje të drejtpërdrejtë mes peizazhit natyror dhe qytetit.",
    cfareSheh: ["Peizazhin e lumit Drin", "Shëtitoren dhe hapësirën urbane", "Lidhjen e qytetit me sistemin ujor"],
    keshilleVizite: "E përshtatshme si ndalesë e qetë mes monumenteve të qendrës.", kohezgjatja: "30–45 min", oraRekomanduar: "Pasdite",
    burimi: "https://lezha.gov.al/resurset-turistike/", burimiTitull: "Bashkia Lezhë – Resurset Turistike", harta: "https://www.google.com/maps/search/?api=1&query=Lumi+Drin+Lezhe"
  },
  {
    _id: "bashkia-katedralja", titulli: "Katedralja e qytetit", kategoria: "histori",
    permbledhje: "Arkitekturë bashkëkohore kishtare ku ndërthuren artizanati tradicional dhe teknika moderne.",
    pershkrimi: "Katedralja dallon për ndërthurjen e materialeve dhe teknikave moderne me motive me frymë bizantine, mozaikë dhe elemente të orendimit kishtar të konceptuara si forma skulpturore.",
    cfareSheh: ["Mozaikët dhe motivet dekorative", "Altarin dhe ambonin", "Elementet bashkëkohore të arkitekturës kishtare"],
    keshilleVizite: "Respekto funksionin fetar të objektit dhe oraret e shërbesave.", kohezgjatja: "30 min", oraRekomanduar: "Gjatë ditës",
    burimi: "https://lezha.gov.al/resurset-turistike/", burimiTitull: "Bashkia Lezhë – Resurset Turistike", harta: "https://www.google.com/maps/search/?api=1&query=Katedralja+Lezhe"
  },
  {
    _id: "bashkia-shen-eufemia", titulli: "Kisha e Shën Eufemisë", kategoria: "histori",
    permbledhje: "Kishë historike pelegrinazhi në Kallmet, e dokumentuar në burime mesjetare.",
    pershkrimi: "Kisha e Shën Eufemisë në Kallmet përmendet në dokumente historike që nga shekulli XIV. Brenda saj lidhet edhe një burim uji që konsiderohet bekues nga besimtarët.",
    cfareSheh: ["Kishën historike të pelegrinazhit", "Gjurmë të traditës së hershme fetare", "Burimin e ujit brenda zonës së kishës"],
    keshilleVizite: "Vizitoje me respekt për karakterin e saj të pelegrinazhit.", kohezgjatja: "45–60 min", oraRekomanduar: "Paradite",
    burimi: "https://lezha.gov.al/resurset-turistike/", burimiTitull: "Bashkia Lezhë – Resurset Turistike", harta: "https://www.google.com/maps/search/?api=1&query=Kisha+e+Shen+Eufemise+Kallmet"
  },
  {
    _id: "bashkia-kuvendi-arbnit", titulli: "Kisha e Kuvendit të Arbnit", kategoria: "histori",
    permbledhje: "Kisha e Shën Gjon Kryepremit në Mërqi, e lidhur me Kuvendin e Arbnit të vitit 1703.",
    pershkrimi: "Kisha në Mërqi dokumentohet që në shekullin XVII dhe mori rëndësi të veçantë gjatë Kuvendit të Arbnit më 1703, një ngjarje e rëndësishme për organizimin kishtar dhe kulturor shqiptar.",
    cfareSheh: ["Kishën historike në Mërqi", "Vendin e lidhur me Kuvendin e Arbnit", "Peizazhin rural përreth"],
    keshilleVizite: "Përshtatet me një itinerar të trashëgimisë fetare jashtë qendrës së Lezhës.", kohezgjatja: "45–60 min", oraRekomanduar: "Paradite",
    burimi: "https://lezha.gov.al/resurset-turistike/", burimiTitull: "Bashkia Lezhë – Resurset Turistike", harta: "https://www.google.com/maps/search/?api=1&query=Kisha+e+Kuvendit+te+Arbnit+Merqi"
  },
  {
    _id: "bashkia-rana", titulli: "Rana e Hedhun", kategoria: "natyre",
    permbledhje: "Gjeomonument bregdetar pranë Shëngjinit, ku rëra ngjitet në shpatin e malit.",
    pershkrimi: "Rreth 3–4 kilometra nga Shëngjini ndodhet Rana e Hedhun, një peizazh i veçantë ku rëra e imët mbulon shpatin e malit dhe krijon një nga pamjet më karakteristike të bregdetit të Lezhës.",
    cfareSheh: ["Dunën e rërës në shpatin e malit", "Bregdetin dhe miniplazhet", "Peizazh të veçantë natyror"],
    keshilleVizite: "Shko me makinë dhe planifiko vizitën jashtë orëve më të nxehta të verës.", kohezgjatja: "1–2 orë", oraRekomanduar: "Mëngjes ose para perëndimit",
    burimi: "https://lezha.gov.al/resurset-turistike/", burimiTitull: "Bashkia Lezhë – Resurset Turistike", harta: "https://www.google.com/maps/search/?api=1&query=Rana+e+Hedhun+Shengjin"
  },
  {
    _id: "bashkia-shengjin", titulli: "Shëngjini", kategoria: "natyre",
    permbledhje: "Destinacioni kryesor bregdetar i Lezhës, ku plazhi, porti, mali dhe lagunat takohen.",
    pershkrimi: "Shëngjini përfaqëson lidhjen e Lezhës me detin. Plazhi, porti, pylli me pisha dhe mali përreth krijojnë një destinacion bregdetar me jetë aktive sidomos gjatë sezonit veror.",
    cfareSheh: ["Plazhin e Shëngjinit", "Portin dhe vijën bregdetare", "Peizazhin mes detit, pishave dhe malit"],
    keshilleVizite: "Në verë shmang oraret e pikut nëse kërkon një eksperiencë më të qetë.", kohezgjatja: "2–4 orë", oraRekomanduar: "Mëngjes ose pasdite",
    burimi: "https://lezha.gov.al/resurset-turistike/", burimiTitull: "Bashkia Lezhë – Resurset Turistike", harta: "https://www.google.com/maps/search/?api=1&query=Shengjin+Albania"
  },
  {
    _id: "bashkia-kune-vain", titulli: "Lagunat Kune–Vain", kategoria: "natyre",
    permbledhje: "Dy laguna mes Lezhës dhe Adriatikut, me plazh, pyll, qetësi dhe biodiversitet.",
    pershkrimi: "Kune dhe Vain shtrihen në të dy anët e grykëderdhjes së Drinit. Ato formojnë dy mjedise të dallueshme: Kune lidhet më shumë me plazhin, ndërsa Vain me pyllin dhe qetësinë e peizazhit lagunor.",
    cfareSheh: ["Peizazhin lagunor", "Pyllin dhe bregdetin", "Habitate natyrore pranë grykëderdhjes së Drinit"],
    keshilleVizite: "Lëviz ngadalë dhe respekto habitatet natyrore; është ndalesë ideale për fotografi dhe natyrë.", kohezgjatja: "1.5–2 orë", oraRekomanduar: "Mëngjes ose pasdite",
    burimi: "https://lezha.gov.al/resurset-turistike/", burimiTitull: "Bashkia Lezhë – Resurset Turistike", harta: "https://www.google.com/maps/search/?api=1&query=Kune+Vain+Lezhe"
  },
  {
    _id: "bashkia-tale", titulli: "Plazhi i Tales", kategoria: "natyre",
    permbledhje: "Vijë e gjatë bregdetare në jug të lagunave, një alternativë më e hapur për turizmin e detit.",
    pershkrimi: "Plazhi i Tales shtrihet për disa kilometra nga zona e lagunave drejt deltës së Matit. Zona është zhvilluar me rrugë dhe shërbime turistike, duke u kthyer në një destinacion të rëndësishëm bregdetar të Lezhës.",
    cfareSheh: ["Vijën e gjatë të plazhit", "Peizazhin bregdetar", "Zonën pranë deltës së Matit"],
    keshilleVizite: "Në sezonin veror planifiko paraprakisht akomodimin dhe shërbimet.", kohezgjatja: "2–4 orë", oraRekomanduar: "Mëngjes ose pasdite",
    burimi: "https://lezha.gov.al/resurset-turistike/", burimiTitull: "Bashkia Lezhë – Resurset Turistike", harta: "https://www.google.com/maps/search/?api=1&query=Tale+Beach+Lezhe"
  },
  {
    _id: "bashkia-fishta", titulli: "Shtëpia e At Gjergj Fishtës", kategoria: "histori",
    permbledhje: "Vend i lidhur me jetën familjare të At Gjergj Fishtës dhe kujtesën kulturore të Zadrimës.",
    pershkrimi: "Burimi i Bashkisë përshkruan shtëpinë e dytë ku u vendos familja e Gjergj Fishtës në kodrën e Lekiçeve. Gjendja e objektit kërkon kujdes dhe informacion të përditësuar përpara një vizite fizike.",
    cfareSheh: ["Vendin e lidhur me familjen e Fishtës", "Peizazhin kulturor të zonës", "Një pikë të kujtesës letrare shqiptare"],
    keshilleVizite: "Mos e paraqit si objekt me akses të garantuar; kontrollo gjendjen dhe mundësinë e vizitës paraprakisht.", kohezgjatja: "30–45 min", oraRekomanduar: "Gjatë ditës",
    burimi: "https://lezha.gov.al/resurset-turistike/", burimiTitull: "Bashkia Lezhë – Resurset Turistike", harta: "https://www.google.com/maps/search/?api=1&query=Shtepia+e+Gjergj+Fishtes+Fishte+Lezhe"
  },
  {
    _id: "bashkia-pallati-kultures", titulli: "Pallati i Kulturës", kategoria: "histori",
    permbledhje: "Qendër e jetës kulturore të Lezhës, me festivale, kuvende dhe aktivitete artistike.",
    pershkrimi: "Pallati i Kulturës është një hapësirë funksionale e qytetit ku zhvillohen periodikisht veprimtari kulturore dhe edukuese, përfshirë festivale, kuvende, rapsodi dhe muzikë folklorike.",
    cfareSheh: ["Aktivitete kulturore dhe artistike", "Traditën folklorike lokale", "Një pikë aktive të jetës kulturore të qytetit"],
    keshilleVizite: "Vlera e vizitës rritet kur përkon me një aktivitet ose festival; kontrollo programin paraprakisht.", kohezgjatja: "30–90 min", oraRekomanduar: "Sipas programit të aktiviteteve",
    burimi: "https://lezha.gov.al/resurset-turistike/", burimiTitull: "Bashkia Lezhë – Resurset Turistike", harta: "https://www.google.com/maps/search/?api=1&query=Pallati+i+Kultures+Lezhe"
  },
  {
    _id: "bashkia-biblioteka", titulli: "Biblioteka e qytetit", kategoria: "histori",
    permbledhje: "Biblioteka publike e Lezhës, hapësirë leximi, informacioni dhe aktivitetesh kulturore.",
    pershkrimi: "Biblioteka Publike e Lezhës është ndërtuar në vitin 2001 dhe përfshin pesë salla leximi. Përveç shërbimit bibliotekar, hapësirat përdoren edhe për seminare, ekspozita, panaire dhe takime kulturore.",
    cfareSheh: ["Arkitekturën e bibliotekës", "Sallat dhe hapësirat e leximit", "Aktivitete kulturore kur janë në program"],
    keshilleVizite: "Burimi i Bashkisë publikon orar pune nga e hëna në të premte; verifiko orarin aktual para vizitës.", kohezgjatja: "30–60 min", oraRekomanduar: "Gjatë orarit të punës",
    burimi: "https://lezha.gov.al/resurset-turistike/", burimiTitull: "Bashkia Lezhë – Resurset Turistike", harta: "https://www.google.com/maps/search/?api=1&query=Biblioteka+Publike+Lezhe"
  },
  {
    _id: "bashkia-zoja-nunenciate", titulli: "Kisha e Zojës Nunenciate", kategoria: "histori",
    permbledhje: "Trashëgimi françeskane e lidhur me traditën e hershme të urdhrit në Lezhë.",
    pershkrimi: "Kisha njihet edhe si Kisha e Dom Lleshit. Tradita historike e paraqitur nga Bashkia Lezhë e lidh praninë françeskane në qytet me shekullin XIII.",
    cfareSheh: ["Trashëgimi kishtare françeskane", "Arkitekturë dhe histori fetare", "Peizazhin kulturor të Lezhës"],
    keshilleVizite: "Respekto funksionin fetar dhe kontrollo aksesin para vizitës.", kohezgjatja: "30–45 min", oraRekomanduar: "Gjatë ditës",
    burimi: "https://lezha.gov.al/resurset-turistike/", burimiTitull: "Bashkia Lezhë – Resurset Turistike", harta: "https://www.google.com/maps/search/?api=1&query=Kisha+e+Zojes+Nunenciate+Lezhe"
  },
  {
    _id: "bashkia-kisha-ortodokse", titulli: "Kisha Ortodokse e Metamorfozës", kategoria: "histori",
    permbledhje: "Kishë ortodokse bashkëkohore në Lezhë, e ndërtuar në fillim të viteve 2000.",
    pershkrimi: "Kisha e Metamorfozës ndodhet në një pozicion të dukshëm në qytet. Ndërtimi nisi në vitin 2000 dhe përfundoi në vitin 2005.",
    cfareSheh: ["Arkitekturën e kishës", "Hapësirën fetare ortodokse", "Kontekstin urban të qendrës"],
    keshilleVizite: "Vizitoje me respekt për shërbesat dhe komunitetin fetar.", kohezgjatja: "20–30 min", oraRekomanduar: "Gjatë ditës",
    burimi: "https://lezha.gov.al/resurset-turistike/", burimiTitull: "Bashkia Lezhë – Resurset Turistike", harta: "https://www.google.com/maps/search/?api=1&query=Kisha+Ortodokse+Metamorfozes+Lezhe"
  },
  {
    _id: "bashkia-xhamia", titulli: "Xhamia e qytetit", kategoria: "histori",
    permbledhje: "Objekt i kultit islam në qytetin e Lezhës, pjesë e peizazhit fetar bashkëkohor.",
    pershkrimi: "Xhamia e qytetit përfaqëson një nga objektet e kultit të Lezhës dhe plotëson mozaikun e trashëgimisë dhe jetës fetare të qytetit.",
    cfareSheh: ["Arkitekturën e objektit të kultit", "Peizazhin fetar të qytetit", "Qendrën urbane të Lezhës"],
    keshilleVizite: "Respekto oraret e faljeve dhe rregullat e objektit të kultit.", kohezgjatja: "20–30 min", oraRekomanduar: "Jashtë orareve të faljes",
    burimi: "https://lezha.gov.al/resurset-turistike/", burimiTitull: "Bashkia Lezhë – Resurset Turistike", harta: "https://www.google.com/maps/search/?api=1&query=Xhamia+Lezhe"
  },
  {
    _id: "bashkia-shen-shtjefni", titulli: "Kisha e Shën Shtjefnit", kategoria: "histori",
    permbledhje: "Rrënoja kishtare pranë Drinit dhe fshatit të vjetër të Blinishtit.",
    pershkrimi: "Kisha lidhet me Blinishtin mesjetar dhe, sipas burimit institucional, u ndërtua në shekullin XIII. Sot është shumë e dëmtuar dhe bimësia ka pushtuar pjesë të mureve.",
    cfareSheh: ["Rrënojat e kishës", "Bimësinë mbi muret historike", "Peizazhin pranë Drinit"],
    keshilleVizite: "Trajtoje si pikë eksplorimi historik dhe verifiko aksesin në terren.", kohezgjatja: "30–45 min", oraRekomanduar: "Paradite",
    burimi: "https://lezha.gov.al/resurset-turistike/", burimiTitull: "Bashkia Lezhë – Resurset Turistike", harta: "https://www.google.com/maps/search/?api=1&query=Kisha+Shen+Shtjefnit+Blinisht+Lezhe"
  },
  {
    _id: "bashkia-troshan", titulli: "Kisha e Troshanit", kategoria: "histori",
    permbledhje: "Kuvend françeskan rrëzë malit të Troshanit, i lidhur me figura të rëndësishme të kulturës shqiptare.",
    pershkrimi: "Kisha u ndërtua në gjysmën e dytë të shekullit XIX. Në kuvendin françeskan funksionoi një kolegj ku kontribuuan figura si Gjergj Fishta, Luigj Gurakuqi dhe Shtjefën Gjeçovi.",
    cfareSheh: ["Kishën dhe kuvendin françeskan", "Vendin e lidhur me historinë e arsimit", "Peizazhin rrëzë malit të Troshanit"],
    keshilleVizite: "Kombinoje me itinerarin kulturor të Fishtës dhe Zadrimës.", kohezgjatja: "45–60 min", oraRekomanduar: "Paradite",
    burimi: "https://lezha.gov.al/resurset-turistike/", burimiTitull: "Bashkia Lezhë – Resurset Turistike", harta: "https://www.google.com/maps/search/?api=1&query=Kisha+Troshan+Lezhe"
  },
  {
    _id: "bashkia-shen-premta", titulli: "Kisha e Shën Premtës", kategoria: "histori",
    permbledhje: "Monument kishtar në Balldre me arkitekturë gotike dhe shtresa të rëndësishme historike.",
    pershkrimi: "Kisha e Shën Premtës ndodhet në Balldre mbi një kodër shkëmbore. Burimi institucional evidenton arkitekturën njënefëshe, qemerët prej guri dhe një mbishkrim restaurimi të vitit 1462.",
    cfareSheh: ["Arkitekturë kishtare gotike", "Qemerët prej guri", "Mbishkrimin historik të restaurimit"],
    keshilleVizite: "Një ndalesë me vlerë për itineraret e arkitekturës dhe trashëgimisë fetare.", kohezgjatja: "45 min", oraRekomanduar: "Paradite",
    burimi: "https://lezha.gov.al/resurset-turistike/", burimiTitull: "Bashkia Lezhë – Resurset Turistike", harta: "https://www.google.com/maps/search/?api=1&query=Kisha+Shen+Premtes+Balldre"
  },
  {
    _id: "bashkia-martiret", titulli: "Kisha e Martirëve", kategoria: "histori",
    permbledhje: "Kishë moderne në Blinisht me përkujtimore kushtuar martirëve dhe viktimave.",
    pershkrimi: "Kisha u bekua në vitin 1992 në ndërtesën e ish-Pallatit të Kulturës në Blinisht. Brenda saj ndodhen elemente përkujtimore me rëndësi për historinë e komunitetit.",
    cfareSheh: ["Arkitekturën moderne", "Përkujtimoret e martirëve", "Hapësirën e memories së komunitetit"],
    keshilleVizite: "Respekto karakterin përkujtimor dhe fetar të vendit.", kohezgjatja: "30–45 min", oraRekomanduar: "Gjatë ditës",
    burimi: "https://lezha.gov.al/resurset-turistike/", burimiTitull: "Bashkia Lezhë – Resurset Turistike", harta: "https://www.google.com/maps/search/?api=1&query=Kisha+e+Martireve+Blinisht+Lezhe"
  },
  {
    _id: "bashkia-zemra-krishtit", titulli: "Kisha Zemra e Krishtit", kategoria: "histori",
    permbledhje: "Kishë historike në Kallmet, dikur me funksion katedraleje për dioqezën e Lezhës.",
    pershkrimi: "Kisha Zemra e Krishtit u ndërtua në fillim të shekullit XX nga Imzot Luigj Bumçi. Pas dëmtimeve dhe ndryshimit të përdorimit gjatë komunizmit, ajo u rikonstruktua pas viteve 1990.",
    cfareSheh: ["Arkitekturën e kishës", "Trashëgiminë katolike të Kallmetit", "Historinë e dioqezës së Lezhës"],
    keshilleVizite: "Kombinoje me Shën Eufeminë për një itinerar të Kallmetit.", kohezgjatja: "30–45 min", oraRekomanduar: "Paradite",
    burimi: "https://lezha.gov.al/resurset-turistike/", burimiTitull: "Bashkia Lezhë – Resurset Turistike", harta: "https://www.google.com/maps/search/?api=1&query=Kisha+Zemra+e+Krishtit+Kallmet"
  }
]


const religiousTitles=new Set(["Katedralja e qytetit","Kisha e Shën Eufemisë","Kisha e Kuvendit të Arbnit","Kisha e Zojës Nunenciate","Kisha Ortodokse e Metamorfozës","Xhamia e qytetit","Kisha e Shën Shtjefnit","Kisha e Troshanit","Kisha e Shën Premtës","Kisha e Martirëve","Kisha Zemra e Krishtit"])
const urbanTitles=new Set(["Ura e vjetër e qytetit","Shtëpia e Mlikajve","Pallati i Kulturës","Biblioteka e qytetit"])
const archaeologyTitles=new Set(["Qyteti antik i Lissusit","Akrolisi"])
const natureTitles=new Set(["Lumi Drin dhe shëtitorja","Rana e Hedhun","Shëngjini","Lagunat Kune–Vain","Plazhi i Tales"])
const classify=(item)=>{
 const kategoria=religiousTitles.has(item.titulli)?'fetare':urbanTitles.has(item.titulli)?'kulture-urbane':archaeologyTitles.has(item.titulli)?'arkeologji':natureTitles.has(item.titulli)?'natyre':'histori'
 const plannerTags=kategoria==='fetare'?['Trashëgimi fetare','Histori & Arkeologji','E kombinuar']:kategoria==='kulture-urbane'?['Kulturë urbane','Eksplorim','E kombinuar']:kategoria==='arkeologji'?['Histori & Arkeologji','Eksplorim','E kombinuar']:kategoria==='natyre'?['Natyrë & Bregdet','Eksplorim','E kombinuar']:['Histori & Arkeologji','Eksplorim','E kombinuar']
 return {...item,kategoria,plannerTags}
}
const verifiedLocations={
 "Kalaja e Lezhës":{_type:'geopoint',lat:41.7837,lng:19.65006},
 "Qyteti antik i Lissusit":{_type:'geopoint',lat:41.78281,lng:19.64306},
 "Memoriali i Skënderbeut":{_type:'geopoint',lat:41.782667,lng:19.643267},
 "Obelisku i Kuvendit të Lezhës":{_type:'geopoint',lat:41.78068,lng:19.64443},
 "Lagunat Kune–Vain":{_type:'geopoint',lat:41.75203,lng:19.60733},
 "Shëngjini":{_type:'geopoint',lat:41.78854,lng:19.59706},
 "Rana e Hedhun":{_type:'geopoint',lat:41.8280045,lng:19.5482576},
 "Katedralja e qytetit":{_type:'geopoint',lat:41.77778,lng:19.64778},
 "Xhamia e qytetit":{_type:'geopoint',lat:41.7773647,lng:19.6443647},
 "Pallati i Kulturës":{_type:'geopoint',lat:41.78151,lng:19.6429994},
 "Biblioteka e qytetit":{_type:'geopoint',lat:41.781947,lng:19.6425248},
 "Kisha e Shën Premtës":{_type:'geopoint',lat:41.8183,lng:19.6403},
 "Plazhi i Tales":{_type:'geopoint',lat:41.68594,lng:19.57745},
 "Kisha e Shën Eufemisë":{_type:'geopoint',lat:41.85293,lng:19.71139},
 "Kisha e Zojës Nunenciate":{_type:'geopoint',lat:41.78546,lng:19.63914},
 "Kisha Ortodokse e Metamorfozës":{_type:'geopoint',lat:41.78167,lng:19.64094},
 "Shtëpia e At Gjergj Fishtës":{_type:'geopoint',lat:41.882225,lng:19.663111},
 "Kisha e Kuvendit të Arbnit":{_type:'geopoint',lat:41.73174,lng:19.64649},
 "Kisha e Troshanit":{_type:'geopoint',lat:41.88492,lng:19.71837},
 "Kisha Zemra e Krishtit":{_type:'geopoint',lat:41.84706,lng:19.68957},
 "Kisha e Shën Shtjefnit":{_type:'geopoint',lat:41.8685,lng:19.6148},
 "Ura e vjetër e qytetit":{_type:'geopoint',lat:41.786961,lng:19.6409476},
 "Kisha e Martirëve":{_type:'geopoint',lat:41.8825725,lng:19.6326055},
 "Akrolisi":{_type:'geopoint',lat:41.77877590622475,lng:19.661229195210108},
 "Lumi Drin dhe shëtitorja":{_type:'geopoint',lat:41.781122857893514,lng:19.642454468433908}
}
const catalog=resources.map(classify).map(item=>verifiedLocations[item.titulli]?{...item,lokacioni:verifiedLocations[item.titulli]}:item)

const normalize=(v='')=>v.toLocaleLowerCase('sq').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/g,'')
const existing=await client.fetch('*[_type == "destinacion"]{_id,titulli,lokacioni}')
const byTitle=new Map(existing.map(doc=>[normalize(doc.titulli),doc]))
let created=0, updated=0
console.log(`🚀 Sinkronizim CMS: ${catalog.length} destinacione. Në CMS: ${existing.length}.`)
for(const item of catalog){
 const match=byTitle.get(normalize(item.titulli))
 const {_id,...fields}=item
 if(match){
   // Sanity është burimi final për lokacionin: një pikë ekzistuese nuk mbishkruhet nga importeri.
   const safeFields={...fields}
   if(match.lokacioni) delete safeFields.lokacioni
   await client.patch(match._id).set(safeFields).commit({visibility:'sync'})
   console.log(`🔄 PËRDITËSUAR: ${item.titulli}`);updated++
 }else{
   await client.create({_id,_type:'destinacion',...fields},{visibility:'sync'})
   console.log(`✅ KRIJUAR: ${item.titulli}`);created++
 }
}
console.log(`\n🎉 Përfundoi: ${updated} përditësuar, ${created} krijuar. Foto/galeri/lokacion/planner fields nuk u fshinë.`)
