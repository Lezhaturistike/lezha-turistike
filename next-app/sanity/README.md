# Përmbajtja në Sanity

Projekti: `ko1ud3ml`, dataset: `production`, Studio: `/studio`.

## Redaktimi

Në menunë e Studio zgjidhni Faqja kryesore, Histori, Arkeologji, Punime shkencore,
Partnerët, Web GIS ose Kontakt. Çdo faqe ka një dokument të vetëm me ID `page-<rubrika>`.
Dokumentet e reja nisen me përmbajtjen ekzistuese. Ndryshoni fushat dhe klikoni Publish.
Tekstet e gjata kanë fusha me disa rreshta. Titujt e ndarë në dy rreshta ruajnë
ndarjen dhe theksimin ekzistues.

Listat e zonave, institucioneve, studimeve, videove dhe rubrikave lejojnë shtim,
heqje dhe renditje me tërheqje. Roli FINANCUES ruan stilin e financuesit; partnerët
pa logo ruajnë kartën tekstuale. Fusha Shënimi shkencor është opsionale.
Videot përdorin URL embed dhe lidhjen origjinale veçmas. Web GIS kërkon të paktën
një aplikacion. Fotot e reja ngarkohen nga fusha e fotografisë.

Website lexon vetëm dokumentet e publikuara, me `cache: no-store` dhe client-in
pa CDN. Ndryshimet shfaqen me kërkesën/rifreskimin pas publikimit, pa redeploy.
Një faqe e hapur tashmë nuk përditësohet vetvetiu. Draftet nuk shfaqen publikisht.

## Migrimi fillestar

`sanity/content/*.json` ruan tekstet, URL-të dhe rrugët origjinale të fotove nga
commit `1fdc175599e362b98ddfd0587d98a40bc92d3ade`. Nuk është fshirë asnjë aset.
Fallback përdoret kur dokumenti nuk ekziston ose shërbimi nuk përgjigjet.
Lista bosh e publikuar respektohet; elementet e hequra nuk rikthehen nga fallback.

```sh
npm run import:pages -- --dry-run
# SANITY_API_TOKEN duhet të jetë në mjedisin lokal të sigurt, me leje shkrimi.
npm run import:pages
```

Importi ngarkon fotot origjinale pa ripërpunim, ripërdor asetet me të njëjtin SHA-1,
ruan manifestin në `.migration-backups/` (i përjashtuar nga git), krijon vetëm
dokumentet që mungojnë dhe verifikon përmbajtjen pas shkrimit. Dokumentet ekzistuese
dhe draftet lihen të paprekura. Mund të ekzekutohet përsëri pas një ndërprerjeje.
Mos vendosni token në kod, git ose në variabla NEXT_PUBLIC.

## Verifikimi

```sh
npm test
npm run build
npm run lint
```

Testet kontrollojnë përditësimin mes dy kërkesave, vetëm përmbajtjen e publikuar,
fallback, listat bosh, URL-të dhe ekzistencën e fotove. CSS dhe header/footer janë
ruajtur. Menuja në faqet e integruara dhe butoni lart përdorin markup-un ekzistues
me sjellje në klient. Destinacione, Galeri dhe Kulinari nuk janë modifikuar.

Lint-i i plotë kishte një gabim ekzistues `react-hooks/immutability` në
`app/destinacione/DestinacioneClient.tsx` (ndryshimi i overflow në openPlace).
Paralajmërimet për `<img>` mbeten për të ruajtur renderimin ekzistues 1:1.
