import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-card">
        <span className="not-found-code">404</span>
        <span className="overline">LEZHA TURISTIKE</span>
        <h1>Faqja nuk u gjet</h1>
        <p>
          Adresa që kërkoni mund të jetë zhvendosur ose të mos ekzistojë.
          <span>The page you are looking for may have moved or does not exist.</span>
        </p>
        <div className="not-found-actions">
          <Link href="/">Kthehu në faqen kryesore</Link>
          <Link href="/en">English home</Link>
        </div>
      </div>
      <style>{`
        .not-found-page{min-height:100svh;display:grid;place-items:center;padding:32px 20px;background:var(--background,#f7f6f1);color:var(--foreground,#153b38)}
        .not-found-card{width:min(680px,100%);text-align:center;padding:clamp(38px,7vw,72px) clamp(22px,6vw,56px);border:1px solid color-mix(in srgb,currentColor 14%,transparent);background:color-mix(in srgb,var(--background,#f7f6f1) 94%,transparent)}
        .not-found-code{display:block;font:400 clamp(72px,16vw,132px)/.82 Georgia,serif;letter-spacing:-.07em;opacity:.13;margin-bottom:28px}
        .not-found-card .overline{display:block;font-size:10px;font-weight:800;letter-spacing:.18em;margin-bottom:12px}
        .not-found-card h1{font:400 clamp(34px,6vw,58px)/1 Georgia,serif;letter-spacing:-.035em;margin:0 0 18px}
        .not-found-card p{max-width:500px;margin:0 auto;color:color-mix(in srgb,currentColor 72%,transparent);font-size:14px;line-height:1.65}
        .not-found-card p span{display:block;margin-top:4px;opacity:.7}
        .not-found-actions{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin-top:30px}
        .not-found-actions a{min-height:44px;display:inline-flex;align-items:center;justify-content:center;padding:10px 17px;border:1px solid currentColor;color:inherit;text-decoration:none;font-size:12px;font-weight:800;transition:transform .18s ease,background .18s ease,color .18s ease}
        .not-found-actions a:first-child{background:#153b38;color:#fff;border-color:#153b38}
        .not-found-actions a:hover{transform:translateY(-1px)}
        [data-theme="dark"] .not-found-page{background:#0d2423;color:#f3f3ec}
        [data-theme="dark"] .not-found-card{background:#102d2d}
        [data-theme="dark"] .not-found-actions a:first-child{background:#edbd85;color:#153b38;border-color:#edbd85}
      `}</style>
    </main>
  );
}
