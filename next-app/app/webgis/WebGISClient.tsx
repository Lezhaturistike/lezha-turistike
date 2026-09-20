"use client";

import BackToTop from "@/app/components/BackToTop";
import LocaleHeader from "@/app/components/LocaleHeader";
import SiteFooter from "@/app/components/SiteFooter";
import { useState } from "react";

type WebGISContent = {text1:string;text2:string;text3:string;text4:string;text5:string;href6:string;text7:string;backgroundImage:string;text8:string;text9:string;text10:string;text11:string;gisLinks:Array<{_key:string;label:string;title:string;description:string;url:string}>;gisApps:Array<{_key:string;name:string;title:string;embed:string;original:string}>};
export default function WebGISPage({ content, locale='sq' }: { content: WebGISContent; locale?: 'sq'|'en' }) {
  const gisApps = content.gisApps;
  const [activeKey, setActiveKey] = useState(gisApps[0]._key);
  const activeApp = gisApps.find((app) => app._key === activeKey) || gisApps[0];

  return (
    <>
      <LocaleHeader locale={locale} current="webgis"/>
      <main id="home">
        <section id="webgis" className="section gis-section">
          <div className="section-top">
            <div>
              <span className="overline">{content.text1}</span>
              <h2>{content.text2}</h2>
            </div>

            <p>{content.text3}</p>
          </div>

          <div className="gis-feature">
            {/* FOTO ORIGJINALE */}
            <div
              className="gis-visual"
              style={{
                backgroundImage: `url('${content.backgroundImage}')`,
                backgroundPosition: "center 45%",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="gis-visual-overlay">
                <span>{content.text4}</span>

                <strong>{content.text5}</strong>

                <a
                  href={content.href6}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content.text7}
                  <span>↗</span>
                </a>
              </div>
            </div>

            <div className="gis-list">
              {content.gisLinks.map((item) => (
                <a
                  key={item._key}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{item.label}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <small>{item.description}</small>
                  </div>
                  <b aria-hidden="true">↗</b>
                </a>
              ))}
            </div>
          </div>

          {/* APLIKACIONET WEB GIS */}
          <div
            className="gis-embed"
            aria-label="Aplikacionet Web GIS brenda faqes"
          >
            <div className="gis-embed-heading">
              <div>
                <span className="overline">{content.text8}</span>

                <h3>{content.text9}</h3>

                <p>{content.text10}</p>
              </div>
            </div>

            <div
              className="gis-embed-tabs"
              role="group"
              aria-label="Zgjidh aplikacionin Web GIS"
            >
              {gisApps.map((app) => (
                <button
                  key={app._key}
                  type="button"
                  className={`gis-tab ${
                    activeApp._key === app._key ? "active" : ""
                  }`}
                  aria-pressed={activeApp._key === app._key}
                  onClick={() => setActiveKey(app._key)}
                >
                  {app.name}
                </button>
              ))}
            </div>

            <div className="gis-frame">
              <iframe
                key={activeApp.embed}
                title={activeApp.title}
                src={activeApp.embed}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="fullscreen; geolocation"
                allowFullScreen
              />
            </div>

            <div className="gis-embed-bottom">
              <span>{activeApp.title}</span>

              <a
                href={activeApp.original}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content.text11}
                <span>↗</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <BackToTop />

      <SiteFooter locale={locale}/>
    </>
  );
}
