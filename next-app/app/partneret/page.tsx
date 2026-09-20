import { getPageContent } from "@/sanity/lib/content";
export const dynamic = "force-dynamic";
import defaults from "@/sanity/content/partneret.json";
import BackToTop from "@/app/components/BackToTop";
import MenuButton from "@/app/components/MenuButton";
import Link from "next/link";

export default async function PartneretPage() {
  const content = await getPageContent("partneret", defaults);
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
          <Link href="/">Home</Link>>
          <Link href="/destinacione">Destinacione</Link>
          <Link href="/galeri">Galeri</Link>
          <Link href="/histori">Histori</Link>
          <Link href="/arkeologji">Arkeologji</Link>
          <Link href="/webgis">Web GIS</Link>
          <Link href="/shkenca">Punime shkencore</Link>
          <Link href="/kulinari">Kulinari</Link>

          <Link href="/partneret" aria-current="page">
            Partnerët
          </Link>

          <Link href="/kontakt">Kontakt</Link>
        <span className="language-switch"><Link href="/partneret">SQ</Link><span> / </span><Link href="/en/partneret">EN</Link></span></nav>

        <MenuButton />

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
        <section id="partneret" className="section partners">
          <div className="section-top">
            <div>
              <span className="overline">{content.text1}</span>

              <h2>{content.text2}</h2>
            </div>

            <p>{content.text3}</p>
          </div>

          <div className="partner-grid">
            {content.partners.map((item) => (
              <a
                key={item._key}
                className={`partner-card${item.role === "FINANCUES" ? " funder" : ""}${!item.image ? " partner-text" : ""}`}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{item.role}</span>
                {item.image && <img src={item.image} alt={item.alt} />}
                <strong>{item.title}</strong>
                {item.subtitle && <small>{item.subtitle}</small>}
              </a>
            ))}
          </div>

          <p className="source-line">
            {content.text4}{" "}
            <a href={content.href5} target="_blank" rel="noopener noreferrer">
              {content.text6}
            </a>
            .
          </p>
        </section>
      </main>

      <BackToTop />

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
            Histori, natyrë dhe trashëgimi kulturore, të lidhura përmes hartave
            dhe rrëfimeve.
          </p>

          <span className="footer-location">LEZHË · SHQIPËRI</span>
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

          <a className="footer-email" href="mailto:lezhalezha2024@gmail.com">
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

          <span>Njih historinë. Eksploro natyrën. Zbulo Lezhën.</span>
        </div>
      </footer>
    </>
  );
}
