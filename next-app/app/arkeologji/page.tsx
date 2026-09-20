import Link from "next/link";

export default function ArkeologjiPage() {
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
          <Link href="/arkeologji" aria-current="page">
            Arkeologji
          </Link>
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
        <section id="arkeologji" className="section archaeology">
          <div className="section-top">
            <div>
              <span className="overline">ARKEOLOGJI</span>
              <h2>Gjurmët e Lissusit.</h2>
            </div>

            <p>
              Tre zona që ndihmojnë të lexohet zhvillimi i vendbanimit
              dhe sistemi i fortifikimit në raport me terrenin.
            </p>
          </div>

          <div className="archaeology-intro">
            <img
              loading="lazy"
              src="/images/akrolisi.jpeg"
              alt="Relievi dhe gjurmët e Akrolisit"
            />
          </div>

          <div className="archaeology-grid">
            <article>
              <span>01 / LARTËSIA</span>

              <h3>Akrolisi</h3>

              <p>
                Fortifikim i hershëm në Malin e Shëlbuemit. Gjurmët e
                mureve dhe relievi kërkojnë lexim të lidhur me vrojtimet
                dhe dokumentimin arkeologjik.
              </p>
            </article>

            <article>
              <span>02 / KODRA</span>

              <h3>Kalaja dhe Akropoli</h3>

              <p>
                Fortifikimet e pjesës së sipërme mbajnë dëshmi të
                periudhave të ndryshme. Fotogrametria dhe LiDAR-i
                ndihmojnë dokumentimin e mureve e të terrenit.
              </p>
            </article>

            <article>
              <span>03 / QYTETI</span>

              <h3>Lissusi i poshtëm</h3>

              <p>
                Zona përreth Vendvarrimit lidhet me shtrirjen e qytetit
                antik. Prospektimet gjeoelektrike kanë evidentuar
                anomali që kërkojnë vlerësim me gërmime.
              </p>
            </article>
          </div>

          <p className="source-line">
            Burime:{" "}
            <a
              href="https://lezha.gov.al/resurset-turistike/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bashkia Lezhë
            </a>
            {" · "}
            <a
              href="https://www.intechopen.com/online-first/1238994"
              target="_blank"
              rel="noopener noreferrer"
            >
              Studimi i projektit HDZA Lezha
            </a>
            . Përshkrimet historike janë për shqyrtim nga Paulin Zefi.
          </p>
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