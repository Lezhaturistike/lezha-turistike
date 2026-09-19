# Lezha Turistike — portal statik për GitHub Pages

Faqja është gati për GitHub Pages. Në rrënjë të kësaj pakete ndodhen `index.html`, `style.css`, `app.js`, `admin.html`, `admin.js`, `admin.css`, dosjet `images/`, `logos/`, `data/` dhe `.nojekyll`. Mos ngarko ZIP-in si një skedar të vetëm në GitHub: **shpaketoje** dhe publiko përmbajtjen e tij.

## Publikimi i parë me GitHub Desktop (më e thjeshta)

1. Krijo një repo të re në [GitHub](https://github.com/new), p.sh. `lezha-turistike`. Nëse përdor planin falas dhe GitHub Pages, bëje **Public**.
2. Instalo [GitHub Desktop](https://desktop.github.com/), hyr me llogarinë tënde dhe zgjidh **File → Clone repository**, pastaj repon që krijove.
3. Shpaketo ZIP-in dhe kopjo **përmbajtjen** e dosjes `lezha-turistike` brenda dosjes së repos së klonuar. `index.html` duhet të jetë në rrënjën e repos (jo brenda një dosjeje tjetër).
4. Në GitHub Desktop shkruaj një përmbledhje, p.sh. `Publikimi i portalit`, pastaj kliko **Commit to main** dhe **Push origin**.
5. Në GitHub hap repon → **Settings → Pages**. Te **Build and deployment** zgjidh **Deploy from a branch**, pastaj `main` dhe `/(root)`, dhe kliko **Save**.
6. Pas publikimit, adresa do të jetë `https://EMRI-YT.github.io/lezha-turistike/` (me emrin e saktë të përdoruesit dhe të repos). GitHub shfaq edhe lidhjen e saktë te **Settings → Pages**.

[Udhëzimi zyrtar për publikimin nga një branch](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Menaxhimi i fotove dhe seksioneve

1. Hape `admin.html` nga faqja jote GitHub Pages, p.sh. `https://EMRI-YT.github.io/lezha-turistike/admin.html`. Mund ta hapësh edhe lokalisht në kompjuter.
2. Te **Seksionet** ndrysho titujt/tekstet hyrëse ose shfaq/fshih rubrikat; te **Galeritë & fotot** shto fotografi nga kompjuteri, ndrysho përshkrimet, lëvizi ose hiqi. Mund të shtosh edhe seksione të reja.
3. Kliko **Shkarko ndryshimet (.js)**. Skedari që merr është `site-content.js`. Fotot e reja paketohen automatikisht në të, prandaj nuk ka nevojë të ngarkosh veçmas skedarët e rinj të fotove.
4. Në dosjen lokale të repos zëvendëso `data/site-content.js` me skedarin e shkarkuar. Me GitHub Desktop bëj **Commit to main → Push origin**. Mund edhe ta hapësh `data/site-content.js` në GitHub dhe të zëvendësosh përmbajtjen e tij, pastaj **Commit changes**; për skedarë të mëdhenj përdor GitHub Desktop.
5. Hape përsëri faqen kur GitHub Pages të përfundojë publikimin; nëse sheh versionin e vjetër, rifreskoje me `Ctrl+F5`.

**Ruajtja:** Redaktori nuk ndryshon menjëherë faqen publike. Drafti mbahet përkohësisht në shfletuesin tënd; vetëm skedari i ngarkuar në GitHub bëhet publik. Fotot e reja zvogëlohen deri në 1600 px. Për koleksione shumë të mëdha fotografish, përdor skedarë të veçantë në `images/` dhe vendos rrugën e tyre te `data/site-content.js`, në mënyrë që skedari i konfigurimit të mos bëhet tepër i madh.

## Skedarët dhe kufizimet

- `images/`: fotografitë fillestare. Mbaji në repo, përndryshe galeritë fillestare nuk ngarkohen.
- `logos/`: logot institucionale të siguruara. Dy institucionet që nuk kanë logo të konfirmuara shfaqen me emrat e tyre.
- `data/site-content.js`: përmbajtja e redaktueshme; krijo një kopje rezervë para një ndryshimi të madh.
- `admin.html`: redaktor lokal i përmbajtjes; nuk është panel i mbrojtur me fjalëkalim. Vetëm personat me të drejtë shkrimi në repon e GitHub mund të publikojnë ndryshime.
- Tekstet historike janë shënuar për shqyrtim nga Paulin Zefi. Miratimi i tij nuk është regjistruar në këtë paketë.

**Privatësia:** Një faqe e publikuar me GitHub Pages është e aksesueshme publikisht edhe kur plani yt lejon repo private. Në GitHub Free, Pages përdoret me repo publike. Për faqe me hyrje vetëm për përdorues të caktuar, duhet një zgjidhje tjetër hostimi me kontroll aksesi.

## Burimet e përmbajtjes dhe fotografive

- [Portali Lezha turistike](https://lezhaturistike.wordpress.com/) — fotografitë e Kalasë, Akrolisit, Vendvarrimit dhe Kune-Vainit.
- [Bashkia Lezhë — resurset turistike](https://lezha.gov.al/resurset-turistike/) — fotografi e Memorialit dhe informacion për monumentet.
- [VisitLezha](https://visitlezha.al/en) — rubrika Kulinari dhe fotografia e tryezës së Fishtës.
- [Botimi shkencor i projektit](https://www.intechopen.com/online-first/1238994) — institucionet zbatuese dhe rezultatet gjeofizike.
