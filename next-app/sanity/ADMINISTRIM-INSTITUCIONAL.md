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
