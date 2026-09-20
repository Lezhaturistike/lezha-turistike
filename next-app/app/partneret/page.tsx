import Link from "next/link";

export default function PartneretPage() {
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
          <Link href="/kulinari">Kulinari</Link>

          <Link href="/partneret" aria-current="page">
            Partnerët
          </Link>

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
        <section id="partneret" className="section partners">
          <div className="section-top">
            <div>
              <span className="overline">
                PROJEKTI HDZA LEZHA
              </span>

              <h2>
                Financuesi dhe institucionet zbatuese
              </h2>
            </div>

            <p>
              Projekti “Hartografimi dhe Dokumentimi i Zonave me
              Potencial Arkeologjik të Lezhës (Lissus)” bashkon
              kërkimin shkencor dhe institucionet lokale.
            </p>
          </div>

          <div className="partner-grid">
            <a
              className="partner-card funder"
              href="https://nasri.gov.al/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>FINANCUES</span>

              <img
                src="/logos/akkshi.png"
                alt="Logo AKKSHI"
              />

              <strong>
                Agjencia Kombëtare e Kërkimit Shkencor dhe
                Inovacionit
              </strong>
            </a>

            <a
              className="partner-card"
              href="https://akad.gov.al/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>ZBATUES</span>

              <img
                src="/logos/akademia.png"
                alt="Logo Akademia e Shkencave e Shqipërisë"
              />

              <strong>
                Akademia e Shkencave e Shqipërisë
              </strong>

              <small>
                Komisioni i Historisë dhe Arkeologjisë
              </small>
            </a>

            <a
              className="partner-card"
              href="https://fgjm.edu.al/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>ZBATUES</span>

              <img
                src="/logos/fgjm.png"
                alt="Logo Fakulteti i Gjeologjisë dhe i Minierave"
              />

              <strong>
                Universiteti Politeknik i Tiranës
              </strong>

              <small>
                Fakulteti i Gjeologjisë dhe i Minierave
              </small>
            </a>

            <a
              className="partner-card"
              href="https://lezha.gov.al/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>ZBATUES</span>

              <img
                src="/logos/bashkia-lezhe.png"
                alt="Logo Bashkia Lezhë"
              />

              <strong>
                Bashkia Lezhë
              </strong>
            </a>

            <a
              className="partner-card partner-text"
              href="https://akad.gov.al/historiku-arkeologjia/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>ZBATUES</span>

              <strong>
                Instituti i Arkeologjisë
              </strong>

              <small>
                Institucion kërkimor në fushën e arkeologjisë
              </small>
            </a>

            <a
              className="partner-card partner-text"
              href="https://lezhe.arsimiparauniversitar.gov.al/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>ZBATUES</span>

              <strong>
                Drejtoria Rajonale e Arsimit Parauniversitar Lezhë
              </strong>
            </a>
          </div>

          <p className="source-line">
            Lista e institucioneve zbatuese dhe financuesi:{" "}
            <a
              href="https://www.intechopen.com/online-first/1238994"
              target="_blank"
              rel="noopener noreferrer"
            >
              falënderimet e botimit shkencor të projektit
            </a>
            .
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