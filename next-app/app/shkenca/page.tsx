import { getPageContent } from "@/sanity/lib/content";
export const dynamic = "force-dynamic";
import defaults from "@/sanity/content/shkenca.json";
import BackToTop from "@/app/components/BackToTop";
import MenuButton from "@/app/components/MenuButton";
import Link from "next/link";
import {client} from "@/sanity/lib/client";

export default async function ShkencaPage() {
  const content = await getPageContent("shkenca", defaults);
  const fallbackResearchers = [
    {name:"Neritan Ceka", institution:"Academy of Sciences of Albania", role:"Arkeologji / trashëgimi kulturore"},
    {name:"Edmond Hoxha", institution:"Polytechnic University of Tirana · Faculty of Geology and Mining", role:"Gjeologji dhe koordinim shkencor", email:"ehoxha63@gmail.com"},
    {name:"Jeton Pekmezi", institution:"Polytechnic University of Tirana · Faculty of Geology and Mining", role:"Hartografi, UAV dhe dokumentim gjeohapësinor"},
    {name:"Elio Hobdari", institution:"Institute of Archaeology, Tirana", role:"Arkeologji"},
    {name:"Altin Karriqi", academicTitle:"PhD", institution:"Polytechnic University of Tirana · Faculty of Geology and Mining", role:"Gjeofizikë", researchGate:"https://www.researchgate.net/profile/Altin-Karriqi", linkedin:"https://al.linkedin.com/in/altin-karriqi-ph-d-0a591527"},
    {name:"Elva Leka", academicTitle:"Dr.", institution:"Polytechnic University of Tirana · Faculty of Geology and Mining", role:"GIS / WebGIS dhe teknologji digjitale", researchGate:"https://www.researchgate.net/profile/Elva-Leka"},
    {name:"Përparim Alikaj", institution:"Geophysical Consultant, Tirana", role:"Prospektim gjeofizik"},
    {name:"Paulin Zefi", institution:"Municipality of Lezha", role:"Histori dhe trashëgimi kulturore"},
    {name:"Ervin Kujtila", institution:"Institute of Archaeology, Tirana", role:"Arkeologji"},
    {name:"Erland Alla", institution:"State Authority for Geospatial Information (ASIG)", role:"WebGIS Developer · GIS & Remote Sensing", linkedin:"https://al.linkedin.com/in/erland-alla", institutionalProfile:"https://www.intechopen.com/profiles/635428"},
    {name:"Elion Kuqali", institution:"Polytechnic University of Tirana · Faculty of Geology and Mining", role:"Gjeoinformatikë / dokumentim teknik"}
  ];
  const cmsResearchers = await client.fetch('*[_type=="researcher"]|order(order asc,name asc){_id,name,academicTitle,role,institution,bio,"photoUrl":photo.asset->url,researchGate,googleScholar,orcid,linkedin,institutionalProfile,email}');
  const researchers = cmsResearchers.length ? cmsResearchers : fallbackResearchers;
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
          <Link href="/">Home</Link>
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
        <span className="language-switch"><Link href="/shkenca">SQ</Link><span> / </span><Link href="/en/shkenca">EN</Link></span></nav>

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

          {/* EKIPI SHKENCOR */}
          <section className="research-team" aria-labelledby="research-team-title">
            <div className="video-heading">
              <span className="overline">EKIPI SHKENCOR</span>
              <h3 id="research-team-title">Studiuesit dhe ekspertët e projektit</h3>
              <p>Autorët e botimit shkencor të projektit HDZA Lezha. Afiliacionet bazë ndjekin botimin IntechOpen; profilet shfaqen vetëm kur janë të verifikuara ose plotësohen nga Sanity Studio.</p>
            </div>
            <div className="researcher-grid">
              {researchers.map((person:any)=>(
                <article className="researcher-card" key={person._id || person.name}>
                  <div className="researcher-avatar">{person.photoUrl?<img src={person.photoUrl} alt={person.name}/>:<span>{person.name.split(" ").map((x:string)=>x[0]).slice(0,2).join("")}</span>}</div>
                  <div className="researcher-body">
                    <span className="researcher-title">{person.academicTitle || "Researcher"}</span>
                    <h4>{person.name}</h4>
                    <p className="researcher-role">{person.role}</p>
                    <p className="researcher-institution">{person.institution}</p>
                    {person.bio&&<p className="researcher-bio">{person.bio}</p>}
                    <div className="researcher-links">
                      {person.researchGate&&<a href={person.researchGate} target="_blank" rel="noopener noreferrer">ResearchGate</a>}
                      {person.googleScholar&&<a href={person.googleScholar} target="_blank" rel="noopener noreferrer">Scholar</a>}
                      {person.orcid&&<a href={person.orcid} target="_blank" rel="noopener noreferrer">ORCID</a>}
                      {person.linkedin&&<a href={person.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
                      {person.institutionalProfile&&<a href={person.institutionalProfile} target="_blank" rel="noopener noreferrer">Profil</a>}
                      {person.email&&<a href={"mailto:"+person.email}>Email</a>}
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p className="research-team-source">Burimi i autorësisë dhe afiliacioneve: kapitulli shkencor i projektit, IntechOpen, 2026.</p>
          </section>

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
