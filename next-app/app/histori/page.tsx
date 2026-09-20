import Link from "next/link";

export default function HistoriPage() {
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
          <Link href="/histori" aria-current="page">
            Histori
          </Link>
          <Link href="/arkeologji">Arkeologji</Link>
          <Link href="/webgis">Web GIS</Link>
          <Link href="/shkenca">Punime shkencore</Link>
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
        <section id="histori" className="story-section">
          <div className="story-photo">
            <img
              loading="lazy"
              src="/images/kala.jpeg"
              alt="Muret e Kalasë së Lezhës mbi qytet"
            />
          </div>

          <div className="story-copy">
            <span className="overline light">HISTORI</span>

            <h2>
              Nga Lissusi te
              <br />
              <em>Besëlidhja e Lezhës.</em>
            </h2>

            <p>
              Lezha ruan gjurmë të qytetit antik Lissus dhe të
              fortifikimeve që kanë ndryshuar në periudha të ndryshme.
              Pozicioni pranë Drinit dhe lidhja me bregdetin e kanë bërë
              vendin një pikë të rëndësishme të peizazhit historik.
            </p>

            <p>
              Më 2 mars 1444 në Lezhë u mbajt Kuvendi i Lezhës, ku
              princat shqiptarë u bashkuan nën drejtimin e Gjergj
              Kastriotit. Ai u varros në Lezhë më 1468. Memoriali i
              sotëm u ndërtua në vitin 1981 mbi zonën e kishës së Shën
              Kollit.
            </p>

            <div className="story-links">
              <a
                href="https://lezha.gov.al/njihni-lezhen/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lexo historinë në Bashkinë Lezhë{" "}
                <span className="arrow-icon" aria-hidden="true">
                  ↗
                </span>
              </a>

              <Link href="/arkeologji">
                Shiko arkeologjinë{" "}
                <span className="arrow-icon" aria-hidden="true">
                  ↗
                </span>
              </Link>
            </div>

            <p className="editorial-note">
              Teksti historik është përgatitur për shqyrtim shkencor nga
              Paulin Zefi.
            </p>
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
            Histori, natyrë dhe trashëgimi kulturore, të lidhura përmes
            hartave dhe rrëfimeve.
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