import SiteFooter from "@/app/components/SiteFooter";
import {localizeContent, localizedPath} from "@/sanity/lib/localize";
import LocaleHeader from "@/app/components/LocaleHeader";
import { getPageContent } from "@/sanity/lib/content";
export const dynamic = "force-dynamic";
import defaults from "@/sanity/content/shkenca.json";
import BackToTop from "@/app/components/BackToTop";

import Link from "next/link";
import {client} from "@/sanity/lib/client";

type Researcher = { _id?: string; name: string; academicTitle?: string; role?: string; institution?: string; bio?: string; photoUrl?: string; researchGate?: string; googleScholar?: string; orcid?: string; linkedin?: string; institutionalProfile?: string; email?: string };

export default async function ShkencaPage() {
  const content = localizeContent(await getPageContent("shkenca", defaults), "en");
  const fallbackResearchers = [
    {name:"Neritan Ceka", institution:"Academy of Sciences of Albania", role:"Archaeology / cultural heritage"},
    {name:"Edmond Hoxha", institution:"Polytechnic University of Tirana · Faculty of Geology and Mining", role:"Geology and scientific coordination", email:"ehoxha63@gmail.com"},
    {name:"Jeton Pekmezi", institution:"Polytechnic University of Tirana · Faculty of Geology and Mining", role:"Cartography, UAV and geospatial documentation"},
    {name:"Elio Hobdari", institution:"Institute of Archaeology, Tirana", role:"Archaeology"},
    {name:"Altin Karriqi", academicTitle:"PhD", institution:"Polytechnic University of Tirana · Faculty of Geology and Mining", role:"Geophysics", researchGate:"https://www.researchgate.net/profile/Altin-Karriqi", linkedin:"https://al.linkedin.com/in/altin-karriqi-ph-d-0a591527"},
    {name:"Elva Leka", academicTitle:"Dr.", institution:"Polytechnic University of Tirana · Faculty of Geology and Mining", role:"GIS / WebGIS and digital technologies", researchGate:"https://www.researchgate.net/profile/Elva-Leka"},
    {name:"Përparim Alikaj", institution:"Geophysical Consultant, Tirana", role:"Geophysical prospecting"},
    {name:"Paulin Zefi", institution:"Municipality of Lezha", role:"History and cultural heritage"},
    {name:"Ervin Kujtila", institution:"Institute of Archaeology, Tirana", role:"Archaeology"},
    {name:"Erland Alla", institution:"State Authority for Geospatial Information (ASIG)", role:"WebGIS Developer · GIS & Remote Sensing", linkedin:"https://al.linkedin.com/in/erland-alla", institutionalProfile:"https://www.intechopen.com/profiles/635428"},
    {name:"Elion Kuqali", institution:"Polytechnic University of Tirana · Faculty of Geology and Mining", role:"Geoinformatics / technical documentation"}
  ];
  const cmsResearchers = await client.fetch('*[_type=="researcher"]|order(order asc,name asc){_id,name,academicTitle,role,roleEn,institution,institutionEn,bio,bioEn,"photoUrl":photo.asset->url,researchGate,googleScholar,orcid,linkedin,institutionalProfile,email}');
  const researchers: Researcher[] = cmsResearchers.length ? localizeContent(cmsResearchers, "en") : fallbackResearchers;
  return (
    <>
      <LocaleHeader locale="en" current="shkenca" />

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
                  <Link href={localizedPath(item.url, "en")}>
                    {item.linkLabel}{" "}
                    <span className="arrow-icon" aria-hidden="true">
                      ↗
                    </span>
                  </Link>
                ) : (
                  <a href={localizedPath(item.url, "en")} target="_blank" rel="noopener noreferrer">
                    {item.linkLabel}{" "}
                    <span className="arrow-icon" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                )}
              </article>
            ))}
          </div>

          {/* STUDY IMAGE MARQUEE */}
          <div className="study-marquee" aria-label="Images from the HDZA Lezha studies">
            <div className="study-marquee-track">
              {[...content.studyGallery, ...content.studyGallery].map((item, index) => (
                <figure className="study-marquee-item" key={`${item._key}-${index}`} aria-hidden={index >= content.studyGallery.length}>
                  <img src={item.image} alt={index < content.studyGallery.length ? item.alt : ""} loading="lazy" />
                  <figcaption>
                    <span>{item.label}</span>
                    <strong>{item.caption}</strong>
                  </figcaption>
                </figure>
              ))}
            </div>
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

            <a href={localizedPath(content.href9, "en")}>{content.text10}</a>
          </div>

          {/* RESEARCH TEAM */}
          <section className="research-team" aria-labelledby="research-team-title">
            <div className="video-heading">
              <span className="overline">RESEARCH TEAM</span>
              <h3 id="research-team-title">Project researchers and experts</h3>
              <p>Authors of the HDZA Lezha scientific publication. Affiliations follow the IntechOpen publication.</p>
            </div>
            <div className="researcher-grid">
              {researchers.map((person)=>(
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
                      {person.institutionalProfile&&<a href={person.institutionalProfile} target="_blank" rel="noopener noreferrer">Profile</a>}
                      {person.email&&<a href={"mailto:"+person.email}>Email</a>}
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p className="research-team-source">Source of authorship and affiliations: the project’s scientific chapter, IntechOpen, 2026.</p>
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
                      href={localizedPath(item.url, "en")}
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

      <BackToTop locale="en" />

      <SiteFooter locale="en" />
    </>
  );
}
