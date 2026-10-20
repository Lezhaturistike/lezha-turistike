# Modeli i administrimit institucional

Këto ndryshime janë vetëm në degën `feature/sanity-administrim-institucional-2026-10-20`; `main` mbetet i paprekur.

## Sanity Studio > Konfigurimi i faqes

- Logo header Light/Dark dhe logo footer: ngarkim imazhesh nga Sanity; nëse mungojnë, ruhet logoja aktuale.
- Menuja kryesore dhe menuja e footer: renditje me drag & drop, etiketim SQ/EN, shfaq/fshih. Fshehja e tab-it **nuk fshin faqen** dhe nuk e çaktivizon URL-në.
- Butoni Planifiko: shfaq/fshih dhe tekst SQ/EN.
- Email publik: shfaqet në footer.
- Email pritës i formularit: ndryshohet nga CMS vetëm brenda listës së lejuar `CONTACT_ALLOWED_RECIPIENTS` në Vercel; adresa `CONTACT_TO_EMAIL` ka përparësi kur vendoset.
- `RESEND_API_KEY` është sekret, nuk ruhet në CMS.
- Vetëm administratorët e autorizuar duhet të modifikojnë konfigurimet institucionale të faqes; kufizimi real i rolit vendoset në Sanity.

## Faqja kryesore

Në dokumentin Faqja kryesore mund të ndryshohen tekstet e Hero, titujt SQ/EN, butonat, fotot e slideshow, tre imazhet e vogla, kartat e rubrikave dhe dukshmëria e seksioneve Lidhje të shpejta / Rubrikat.

## Pranimi

Para integrimit në main: `npm run build`, `npm test`, `npm run lint`, krahasim vizual pa konfigurim CMS, testim SQ/EN, Light/Dark/mobile, test menuje, testim email-i me adresë të miratuar dhe backup të Sanity. Nuk kryhet publikimi pa miratim.

## Tre fotografitë rrethore në Hero

Studio > **Faqja kryesore** > **Tre fotografitë rrethore · Zgjidh faqet**.
Ky është një grup me saktësisht **3** elemente. Për çdo element:
1. Ngarko fotografinë nga Sanity (fusha **Fotografia rrethore**).
2. Te **Faqja që do të hapet kur klikohet** zgjidh rubrikën në listën e lejuar.
3. Plotëso përshkrimin në shqip dhe anglisht.
4. Mund të ndryshosh renditjen me drag & drop.
5. Kliko **Publish** dhe kontrollo lidhjet në SQ/EN.

**Siguria e pamjes:** nëse dokumenti i vjetër nuk ka grupin, ose një foto nuk është ngarkuar, faqja ruan automatikisht 3 fotot ekzistuese dhe lidhjet përkatëse. Fshehja e një tab-i në header nuk heq mundësinë e hapjes së faqes nga këto foto.

## Një email publik për të gjithë portalin

Fusha `Konfigurimi i faqes > Email-i publik` është burimi i vetëm i kontaktit zyrtar në ndërfaqen e vizitorit:
- footer në SQ dhe EN;
- fundi i faqeve ligjore Privatësia, Kushtet dhe Cookies;
- përmendja e email-it në trupin e politikës së privatësisë dhe tekste të tjera ligjore të publikuara, edhe kur Sanity ruan tekstin e vjetër.
- Kontakt: footer-i i pranishëm te faqja Kontakt shfaq automatikisht të njëjtën adresë.

Lidhjet `mailto:` përditësohen bashkë me email-in e shfaqur. Shndërrimi prek vetëm adresat e vjetra të kontaktit të portalit `lezhaturistike@gmail.com` dhe `lezhalezha2024@gmail.com`, jo adresat personale të studiuesve apo subjektet e listuara.

`Kontakt > href9/text10` janë fusha të trashëguara nga një version i vjetër, që **nuk përdoren nga faqja aktuale Kontakt**. Për të shmangur konfuzionin, fusha e email-it institucional duhet ndryshuar vetëm te `Konfigurimi i faqes`.

### Për dërgimin e mesazheve
`Email-i pritës i formularit` është **fushë tjetër** për siguri dhe privatësi. Vlera do të pranohet vetëm nëse është në `CONTACT_ALLOWED_RECIPIENTS` të serverit. `CONTACT_TO_EMAIL` ka përparësi mbi CMS. Dërguesi teknik `kontakt@lezhaturistike.com` kërkon verifikim të domain-it në Resend dhe nuk ndryshohet automatikisht.

## Administrimi i plotë i Footer-it

Në Studio hapni **Konfigurimi i faqes → Administrimi i Footer-it** (tab i veçantë brenda dokumentit).
Mund të ndryshoni logon, lidhjet dhe renditjen e menusë së footer-it, email-in publik,
titujt e navigimit dhe kontaktit, përshkrimet kryesore, adresën, vendndodhjen, moton,
tekstet e butonit të kontaktit, etiketat ligjore dhe pjesën e copyright/zhvilluesit.
Fushat me emërtim *Sq/En* kontrollojnë tekstin në gjuhën përkatëse.

- Butoni i kontaktit zgjedh midis faqes Kontakt dhe Planifiko; nuk pranon linke të pakontrolluara.
- URL e zhvilluesit pranon vetëm HTTPS dhe hapet në një skedë të re.
- Viti i copyright-it përditësohet automatikisht; emri i titullarit është i ndryshueshëm.
- Nëse mungon një fushë në dokumentin Sanity, përdoret **përmbajtja ekzistuese** e faqes.
- Lidhjet Privatësia, Kushtet, Cookies mbeten gjithmonë të aksesueshme; mund të ndryshohen etiketat e tyre, por jo rrugët.
- Opsioni për të fshehur kreditin e zhvilluesit duhet përdorur vetëm pas verifikimit të të drejtave dhe marrëveshjeve të atribuimit.
- Email-i publik është i përbashkët me faqet ligjore dhe ndjek një burim të vetëm; email-i pritës i formularit është i veçantë për arsye sigurie.
- Për siguri, ruani dokumentin dhe testoni paraprakisht pamjet Light/Dark, SQ/EN dhe mobile përpara dorëzimit zyrtar.

## Logo e Cookies dhe Favicon nga Sanity

Në **Konfigurimi i faqes → Pamja dhe menuja**:
- `Logo te shiriti Cookies`: imazh transparent i përshtatur për sfond të errët. Nëse lihet bosh, përdoret automatikisht logoja Dark e header-it, ose logoja e footer-it, ose logoja Light. Në mungesë të të gjithave, shfaqet logoja aktuale me kalanë dhe shkrimin LEZHA TURISTIKE. Simboli i vjetër "L✦" nuk përdoret më.
- `Favicon · Ikona e shfletuesit`: rekomandohet imazh katror PNG ose WebP, 512×512 px. Pa imazh të ngarkuar kthehet **SVG-ja ekzistuese e kalasë**.
- Endpoint `/api/site-icon` e lexon vlerën e publikuar nga Sanity dhe kthen favicon-in për të dyja gjuhët. HTML përdor `/api/site-icon` në vend të ikonës statike `app/icon.svg`.
- Përditësimet e favicon-it nga CMS nuk kërkojnë deploy. Browser-at dhe Google mund ta mbajnë ikonën e vjetër në cache për një periudhë.
- Ndryshimi i favicon-it nuk ndryshon automatikisht posterin OpenGraph/social share ose ikonat e llogarive të rrjeteve sociale. Për ato kërkohet konfigurim i veçantë.
- Ndryshimet për admin janë të disponueshme fillimisht vetëm në Preview, pasi të kalojë build-i. Mos publikoni të dhëna testimi në Sanity `production` pa backup.

## Mbushja fillestare e fushave me vlerat aktuale

Studio > menuja e sipërme **Mbush vlerat aktuale**. Ky është një veprim i kontrolluar, jo një mutacion automatik gjatë hapjes së faqes.

1. Klikoni **Rilexo fushat** dhe kontrolloni listën e veprimeve.
2. Klikoni **Shkarko kopjen JSON** të dokumenteve të prekura dhe ruajeni.
3. Shënoni konfirmimin dhe klikoni **Mbush fushat tani**.
4. Kontrolloni te **Konfigurimi i faqes** dhe **Faqja kryesore** që vlerat janë materializuar.
5. Ndryshimet e mëvonshme bëhen nga fusha përkatëse dhe butoni **Publish** në Sanity.

Skripti plotëson vetëm fushat `undefined`/`null` me patch `setIfMissing`, duke ruajtur gjithë përmbajtjen ekzistuese dhe draftet. Për fotografitë rrethore të munguar, ngarkon në bibliotekën e Sanity tri fotot origjinale nga `/images`. Nëse nuk ekziston dokumenti për një faqe, krijohet versioni bazë; një draft i papublikuar nuk publikohet në heshtje.

**Kujdes:** kopja JSON e mjetit mbulon vetëm dokumentet e përzgjedhura; nuk zëvendëson eksportin e plotë të Sanity. Fushat e imazheve të logove mbeten bosh qëllimisht kur logoja aktuale prodhohet nga kodi CSS: faqja vazhdon të shfaqë logon origjinale deri në ngarkimin e një logoje të re. Kjo lejon Bashkinë të menaxhojë të gjitha ndryshimet e mëvonshme pa ndërhyrje në kod.
