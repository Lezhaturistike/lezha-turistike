import Link from "next/link";

export default function ShkencaPage() {
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
        <section className="section science" id="shkenca">
          <div className="section-top">
            <div>
              <span className="overline">
                STUDIME SHKENCORE
              </span>

              <h2>
                Çfarë është studiuar deri tani?
              </h2>
            </div>

            <p>
              Dokumentimi bashkon të dhëna nga terreni,
              modelet 3D, prospektimi gjeofizik dhe paraqitja
              Web GIS. Interpretimet arkeologjike lidhen me
              burimet e botuara.
            </p>
          </div>

          {/* STUDIMET */}
          <div className="science-grid studies">
            <article>
              <span>01 / MATJE &amp; MODELIM</span>

              <h3>
                Dron, LiDAR dhe skanim lazer
              </h3>

              <p>
                Fotogrametria dhe LiDAR-i u përdorën për të
                dokumentuar relievin, muret dhe strukturat.
                Nga përpunimi u përftuan modele digjitale të
                terrenit dhe pamje 3D për analizë e
                paraqitje.
              </p>

              <a
                href="https://www.intechopen.com/online-first/1238994"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lexo studimin{" "}
                <span
                  className="arrow-icon"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </a>
            </article>

            <article>
              <span>02 / PROSPEKTIM</span>

              <h3>
                Studimet gjeofizike
              </h3>

              <p>
                Pranë Vendvarrimit të Skënderbeut dhe Kalasë
                së Sipërme u kryen matje gjeoelektrike.
                Hartat e rezistivitetit në thellësi të
                ndryshme treguan anomali me interes për
                kërkimin arkeologjik.
              </p>

              <p className="scientific-caveat">
                Anomalia nuk konfirmon vetë një mur ose
                objekt; kërkohen verifikime arkeologjike në
                terren.
              </p>

              <a
                href="https://www.intechopen.com/online-first/1238994"
                target="_blank"
                rel="noopener noreferrer"
              >
                Metoda dhe rezultatet{" "}
                <span
                  className="arrow-icon"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </a>
            </article>

            <article>
              <span>03 / HARTA &amp; PUBLIKIM</span>

              <h3>
                GIS dhe Web GIS
              </h3>

              <p>
                Hartat e vjetra, matjet në terren dhe
                shtresat tematike u organizuan në GIS. Map
                Tour, skena 3D, Atlasi dhe StoryMap-i e
                bëjnë këtë dokumentim të konsultueshëm.
              </p>

              <Link href="/webgis">
                Hap aplikacionet{" "}
                <span
                  className="arrow-icon"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </Link>
            </article>
          </div>

          {/* PUBLIKIMI */}
          <div className="research-links">
            <div>
              <span>PUNIME TË PUBLIKUARA</span>

              <h3>
                Lexo kërkimin e plotë
              </h3>

              <p>
                Kapitulli mbi Akrolisin dhe Lissusin
                përshkruan matjet, përpunimin dhe
                prospektimin; videot më poshtë paraqesin
                modelet 3D të Kalasë dhe Akrolisit.
              </p>
            </div>

            <a
              href="https://www.intechopen.com/online-first/1238994"
              target="_blank"
              rel="noopener noreferrer"
            >
              Kapitulli shkencor{" "}
              <span
                className="arrow-icon"
                aria-hidden="true"
              >
                ↗
              </span>
            </a>

            <a href="#video-3d">
              Shiko videot 3D ↓
            </a>
          </div>

          {/* VIDEOT 3D */}
          <div
            className="research-videos"
            id="video-3d"
          >
            <div className="video-heading">
              <span className="overline">
                TRASHËGIMIA NË TRE DIMENSIONE
              </span>

              <h3>
                Eksploro modelet 3D
              </h3>

              <p>
                Shiko dokumentimin digjital të Kalasë së
                Lezhës dhe Akrolisit, drejtpërdrejt këtu.
              </p>
            </div>

            <div className="video-grid">

              {/* VIDEO 1 */}
              <article className="video-card">
                <div className="video-frame">
                  <iframe
                    src="https://www.youtube-nocookie.com/embed/JPuSdBiFkgM?rel=0"
                    title="Modeli 3D i Kalasë së Lezhës"
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>

                <div className="video-caption">
                  <span className="overline">
                    01 / KALAJA
                  </span>

                  <h4>
                    Modeli 3D i Kalasë së Lezhës
                  </h4>

                  <p>
                    Dokumentimi 3D · Jeton Pekmezi
                  </p>

                  <a
                    href="https://www.youtube.com/watch?v=JPuSdBiFkgM"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Shiko në YouTube{" "}
                    <span aria-hidden="true">
                      <span
                        className="arrow-icon"
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    </span>
                  </a>
                </div>
              </article>

              {/* VIDEO 2 */}
              <article className="video-card">
                <div className="video-frame">
                  <iframe
                    src="https://www.youtube-nocookie.com/embed/UuHWCk8ZzRM?rel=0"
                    title="Modeli 3D i Akrolisit, Lezhë"
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>

                <div className="video-caption">
                  <span className="overline">
                    02 / AKROLISI
                  </span>

                  <h4>
                    Modeli 3D i Akrolisit, Lezhë
                  </h4>

                  <p>
                    Dokumentimi 3D · Jeton Pekmezi
                  </p>

                  <a
                    href="https://www.youtube.com/watch?v=UuHWCk8ZzRM"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Shiko në YouTube{" "}
                    <span aria-hidden="true">
                      <span
                        className="arrow-icon"
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    </span>
                  </a>
                </div>
              </article>

            </div>
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

      <footer
        className="site-footer"
        aria-label="Fundi i faqes"
      >
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
            Histori, natyrë dhe trashëgimi kulturore,
            të lidhura përmes hartave dhe rrëfimeve.
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
            <Link href="/destinacione">
              Destinacione
            </Link>

            <Link href="/histori">
              Histori
            </Link>

            <Link href="/arkeologji">
              Arkeologji
            </Link>

            <Link href="/webgis">
              Web GIS
            </Link>

            <Link href="/shkenca">
              Punime shkencore
            </Link>

            <Link href="/kulinari">
              Kulinari
            </Link>

            <Link href="/partneret">
              Partnerët
            </Link>

            <Link href="/galeri">
              Galeri
            </Link>
          </div>
        </nav>

        <div className="footer-contact">
          <h2>
            Le të lidhemi
          </h2>

          <p>
            Për informacion dhe bashkëpunime.
          </p>

          <a
            className="footer-email"
            href="mailto:lezhalezha2024@gmail.com"
          >
            lezhalezha2024@gmail.com{" "}
            <span aria-hidden="true">
              <span
                className="arrow-icon"
                aria-hidden="true"
              >
                ↗
              </span>
            </span>
          </a>

          <p>
            Rruga e Kalasë
            <br />
            Lezhë, Shqipëri
          </p>

          <Link
            className="footer-contact-link"
            href="/kontakt"
          >
            Na kontakto{" "}
            <span aria-hidden="true">
              <span
                className="arrow-icon"
                aria-hidden="true"
              >
                ↗
              </span>
            </span>
          </Link>
        </div>

        <div className="footer-bottom">
          <span>
            © 2026 Lezha Turistike.
          </span>

          <span>
            Njih historinë. Eksploro natyrën. Zbulo Lezhën.
          </span>
        </div>
      </footer>
    </>
  );
}