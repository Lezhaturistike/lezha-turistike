import { getPageContent } from "@/sanity/lib/content";
export const dynamic = "force-dynamic";
import defaults from "@/sanity/content/shkenca.json";
import BackToTop from "@/app/components/BackToTop";
import MenuButton from "@/app/components/MenuButton";
import Link from "next/link";

export default async function ShkencaPage() {
  const content = await getPageContent("shkenca", defaults);
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

          <Link href="/shkenca" aria-current="page">
            Punime shkencore
          </Link>

          <Link href="/kulinari">Kulinari</Link>
          <Link href="/partneret">Partnerët</Link>
          <Link href="/kontakt">Kontakt</Link>
        </nav>

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
        <section className="section science" id="shkenca">
          <div className="section-top">
            <div>
              <span className="overline">{content.text1}</span>

              <h2>{content.text2}</h2>
            </div>

            <p>{content.text3}</p>
          </div>

          {/* STUDIMET */}
          <div className="science-grid studies">
            {content.studies.map((item) => (
              <article key={item._key}>
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                {item.caveat && (
                  <p className="scientific-caveat">{item.caveat}</p>
                )}
                {item.url.startsWith("/") ? (
                  <Link href={item.url}>
                    {item.linkLabel}{" "}
                    <span className="arrow-icon" aria-hidden="true">
                      ↗
                    </span>
                  </Link>
                ) : (
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.linkLabel}{" "}
                    <span className="arrow-icon" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                )}
              </article>
            ))}
          </div>

          {/* PUBLIKIMI */}
          <div className="research-links">
            <div>
              <span>{content.text4}</span>

              <h3>{content.text5}</h3>

              <p>{content.text6}</p>
            </div>

            <a href={content.href7} target="_blank" rel="noopener noreferrer">
              {content.text8}{" "}
              <span className="arrow-icon" aria-hidden="true">
                ↗
              </span>
            </a>

            <a href={content.href9}>{content.text10}</a>
          </div>

          {/* VIDEOT 3D */}
          <div className="research-videos" id="video-3d">
            <div className="video-heading">
              <span className="overline">{content.text11}</span>

              <h3>{content.text12}</h3>

              <p>{content.text13}</p>
            </div>

            <div className="video-grid">
              {content.videos.map((item) => (
                <article key={item._key} className="video-card">
                  <div className="video-frame">
                    <iframe
                      src={item.embed}
                      title={item.title}
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                  <div className="video-caption">
                    <span className="overline">{item.label}</span>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.linkLabel}{" "}
                      <span aria-hidden="true">
                        <span className="arrow-icon" aria-hidden="true">
                          ↗
                        </span>
                      </span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
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
