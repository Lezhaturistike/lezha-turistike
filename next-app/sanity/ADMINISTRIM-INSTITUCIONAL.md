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

## Vlerat aktuale janë paraplotësuar – pa menu shtesë

**Përdorimi i zakonshëm:** Hape `Konfigurimi i faqes` ose `Faqja kryesore`, ndrysho vetëm fushën e dëshiruar dhe kliko `Publish`. Nuk ka mjet apo menu tjetër të quajtur "Mbush vlerat aktuale". Fushat e reja të dokumenteve të krijuara në Sanity kanë vlerat aktuale si initialValue. Fushat opsionale pa imazh të ngarkuar përdorin identitetin vizual të faqes dhe nuk pengojnë publikimin.

**Për dokumentet që ekzistonin PARA këtij përditësimi:** Sanity nuk vendos automatikisht `initialValue` mbi fusha të munguara të dokumenteve tashmë të ruajtura. Për të paraqitur fizikisht vlerat aktuale në çdo fushë, administratori teknik ekzekuton **vetëm një herë**, pas një backup-i, skriptin:
`npm run sanity:seed:preview` → `npm run sanity:seed:apply`.
Skripti punon me token në mjedisin e zhvilluesit, jo në CMS, dhe përdor `setIfMissing` që të mos mbishkruajë ndryshimet që ka bërë dikush. Ai përfshin edhe draftet, pa i publikuar pa miratim. Nuk ka hap të veçantë për përdoruesit e zakonshëm.

**Kopjet rezervë:** Skripti ruan një JSON të 4 dokumenteve (faqja kryesore dhe konfigurimi, publikuar/draft). Kjo nuk zëvendëson eksportin e plotë të dataset-it, i cili rekomandohet veçmas. **Nuk kryhet vetvetiu asnjë operacion mbi Sanity.**

**Logot dhe favicon:** Imazhet që ende prodhohen nga kodi (kalaja dhe emri Lezha Turistike) paraqiten si varianti aktual në website edhe kur kutia e ngarkimit është bosh. Një upload në Sanity do të zëvendësojë vetëm variantin përkatës. Nuk kërkohet ri-ngarkimi i logos ekzistuese për të ndryshuar një tekst.
