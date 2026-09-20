import Link from "next/link";
import { client } from "@/sanity/lib/client";

export const dynamic = "force-dynamic";

export default async function KulinariPage() {
  const kulinari = await client.fetch(`
    *[_type == "kulinari"][0] {
      _id,
      titulli,
      pershkrimi,
      "fotoUrl": foto.asset->url,
      burimi,
      harta
    }
  `);

  return (
    <>
      <header className="header">
        <Link
          href="/"
          className="logo"
          aria-label="Lezha Turistike, faqja kryesore"
        >
          <span className="logo-mark">
            L<span>✦</span>
          </span>

          <span>
            LEZHA
            <br />
            <b>TURISTIKE</b>
          </span>
        </Link>

        <nav className="nav" id="nav" aria-label="Navigimi kryesor">
          <Link href="/destinacione">Destinacione</Link>
          <Link href="/galeri">Galeri</Link>
          <Link href="/histori">Histori</Link>
          <Link href="/arkeologji">Arkeologji</Link>
          <Link href="/webgis">Web GIS</Link>
          <Link href="/shkenca">Punime shkencore</Link>

          <Link href="/kulinari" aria-current="page">
            Kulinari
          </Link>

          <Link href="/partneret">Partnerët</Link>
          <Link href="/kontakt">Kontakt</Link>
        </nav>

        <button
          className="menu-btn"
          type="button"
          aria-expanded="false"
          aria-controls="nav"
        >
          Menu <span>☰</span>
        </button>

        <Link className="nav-cta" href="/webgis">
          Hap hartën{" "}
          <span>
            <span className="arrow-icon" aria-hidden="true">
              ↗
            </span>
          </span>
        </Link>
      </header>

      <main id="home">
        <section id="kulinari" className="culinary">
          <div>
            <span className="overline light">KULINARI</span>

            <h2>
              Lezha shijohet
              <br />
              edhe në tryezë.
            </h2>

            <p>
              {kulinari?.pershkrimi ||
                "Peizazhi i Lezhës lidhet me prodhimet e tokës, bregdetit dhe vreshtave. Në Fishtë njihen përvojat e agroturizmit me produkte sezonale; në Shëngjin gatimet e peshkut dhe prodhimet e detit; në Kallmet tradita e verës vendase."}
            </p>

            <div className="food-tags">
              <span>Fishtë · agroturizëm</span>
              <span>Shëngjin · prodhime deti</span>
              <span>Kallmet · verë</span>
            </div>

            <a
              className="button primary"
              href={kulinari?.burimi || "https://visitlezha.al/en"}
              target="_blank"
              rel="noopener noreferrer"
            >
              Zbulo përvojat kulinare{" "}
              <span className="arrow-icon" aria-hidden="true">
                ↗
              </span>
            </a>

            <p className="food-source">
              Përshkrimi mbështetet në portalin turistik të lidhur
              nga Bashkia Lezhë; faqja e vjetër WordPress nuk ka
              përmbajtje te rubrika “Kulinari”.
            </p>
          </div>

          <div className="culinary-image">
            <img
              loading="lazy"
              src={kulinari?.fotoUrl || "/images/fishte-food.jpg"}
              alt="Tryezë me prodhime vendase pranë Fishtës, fotografi nga VisitLezha"
            />
          </div>
        </section>
      </main>

      <a
        className="back-to-top"
        href="#home"
        aria-label="Ngjitu në krye të faqes"
        title="Ngjitu lart"
      >
        ↑
      </a>

      <footer className="site-footer" aria-label="Fundi i faqes">
        <div className="footer-main">
          <Link
            href="/"
            className="logo"
            aria-label="Lezha Turistike, faqja kryesore"
          >
            <span className="logo-mark">
              L<span>✦</span>
            </span>

            <span>
              LEZHA
              <br />
              <b>TURISTIKE</b>
            </span>
          </Link>

          <p>
            Një qytet për t’u zbuluar.
            <br />
            Histori, natyrë dhe trashëgimi kulturore, të lidhura
            përmes hartave dhe rrëfimeve.
          </p>

          <span className="footer-location">
            LEZHË · SHQIPËRI
          </span>
        </div>

        <nav
          className="footer-navigation"
          aria-label="Navigimi në fund të faqes"
        >
          <h2>Eksploro</h2>

          <div className="footer-links">
            <Link href="/destinacione">Destinacione</Link>
            <Link href="/histori">Histori</Link>
            <Link href="/arkeologji">Arkeologji</Link>
            <Link href="/webgis">Web GIS</Link>
            <Link href="/shkenca">Punime shkencore</Link>
            <Link href="/kulinari">Kulinari</Link>
            <Link href="/partneret">Partnerët</Link>
            <Link href="/galeri">Galeri</Link>
          </div>
        </nav>

        <div className="footer-contact">
          <h2>Le të lidhemi</h2>

          <p>Për informacion dhe bashkëpunime.</p>

          <a
            className="footer-email"
            href="mailto:lezhalezha2024@gmail.com"
          >
            lezhalezha2024@gmail.com{" "}
            <span aria-hidden="true">
              <span className="arrow-icon" aria-hidden="true">
                ↗
              </span>
            </span>
          </a>

          <p>
            Rruga e Kalasë
            <br />
            Lezhë, Shqipëri
          </p>

          <Link className="footer-contact-link" href="/kontakt">
            Na kontakto{" "}
            <span aria-hidden="true">
              <span className="arrow-icon" aria-hidden="true">
                ↗
              </span>
            </span>
          </Link>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Lezha Turistike.</span>

          <span>
            Njih historinë. Eksploro natyrën. Zbulo Lezhën.
          </span>
        </div>
      </footer>
    </>
  );
}