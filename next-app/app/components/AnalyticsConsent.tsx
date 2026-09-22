"use client";

import Script from "next/script";
import {useEffect, useState} from "react";

const GA_ID = "G-5FMBPFYTNX";
const STORAGE_KEY = "lt-analytics-consent";
type Consent = "granted" | "denied" | null;

export default function AnalyticsConsent(){
  const [consent,setConsent]=useState<Consent>(null);
  const [ready,setReady]=useState(false);

  useEffect(()=>{
    const saved=localStorage.getItem(STORAGE_KEY) as Consent;
    if(saved==="granted"||saved==="denied") setConsent(saved);
    setReady(true);
  },[]);

  const choose=(value: Exclude<Consent,null>)=>{
    localStorage.setItem(STORAGE_KEY,value);
    setConsent(value);
  };

  return <>
    {consent==="granted" && <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('consent', 'default', {
          analytics_storage: 'granted',
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied'
        });
        gtag('config', '${GA_ID}', { anonymize_ip: true });
      `}</Script>
    </>}

    {ready && consent===null && <div className="lt-consent-wrap">
      <div className="lt-consent-card" role="dialog" aria-modal="false" aria-label="Preferencat e privatësisë" aria-live="polite">
        <div className="lt-consent-icon" aria-hidden="true">L<span>✦</span></div>
        <div className="lt-consent-copy">
          <span className="lt-consent-kicker">PRIVATËSIA & ANALITIKA</span>
          <strong>Ju zgjidhni si përdoren të dhënat.</strong>
          <p>Përdorim Google Analytics vetëm me pëlqimin tuaj për të kuptuar në mënyrë të përmbledhur si përdoret Lezha Turistike. Nuk përdorim të dhënat për reklama të personalizuara.</p>
          <p className="lt-consent-en">We use Google Analytics only with your consent to understand aggregate website usage.</p>
          <a className="lt-consent-policy" href="/cookies"><span>Cookie Policy</span><svg className="lt-policy-arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 11L11 5M6.5 5H11V9.5" /></svg></a>
        </div>
        <div className="lt-consent-actions">
          <button type="button" className="lt-consent-secondary" onClick={()=>choose("denied")}>Refuzo <small>Reject</small></button>
          <button type="button" className="lt-consent-primary" onClick={()=>choose("granted")}>Prano <small>Accept</small><span>→</span></button>
        </div>
      </div>
    </div>}

    <style jsx>{`
      .lt-consent-wrap{position:fixed;z-index:99999;left:0;right:0;bottom:0;padding:20px clamp(18px,4vw,54px);pointer-events:none}
      .lt-consent-card{pointer-events:auto;max-width:1240px;margin:0 auto;background:#102d2d;color:#f5f6f1;border:1px solid rgba(237,189,133,.36);box-shadow:0 18px 60px rgba(5,25,24,.28);display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:22px;padding:22px 24px}
      .lt-consent-icon{width:48px;height:48px;border-radius:50%;background:#edbd85;color:#153b38;display:grid;place-items:center;font:400 27px Georgia,serif;position:relative;flex:none}
      .lt-consent-icon span{position:absolute;right:7px;top:5px;font:700 8px Arial,sans-serif}
      .lt-consent-copy{min-width:0}
      .lt-consent-kicker{display:block;color:#edbd85;font-size:10px;font-weight:800;letter-spacing:.16em;margin-bottom:5px}
      .lt-consent-copy strong{display:block;font-size:17px;letter-spacing:-.02em;margin-bottom:5px}
      .lt-consent-copy p{margin:0;color:#d3dfda;font-size:12.5px;line-height:1.55;max-width:720px}
      .lt-consent-copy .lt-consent-en{color:#9fb3aa;margin-top:2px;font-size:11.5px}
      .lt-consent-policy{display:inline-flex;align-items:center;gap:5px;color:#edbd85;margin-top:7px;font-size:11.5px;line-height:1;font-weight:700;text-decoration:none;padding-bottom:3px;border-bottom:1px solid rgba(237,189,133,.48)}
      .lt-policy-arrow{display:block;width:12px;height:12px;flex:0 0 12px;overflow:visible}
      .lt-policy-arrow path{fill:none;stroke:currentColor;stroke-width:1.35;stroke-linecap:round;stroke-linejoin:round}
      .lt-consent-actions{display:flex;align-items:stretch;gap:9px;white-space:nowrap}
      .lt-consent-actions button{border:0;min-height:48px;padding:10px 17px;font-weight:800;font-size:12px;transition:transform .18s ease,background .18s ease}
      .lt-consent-actions button:hover{transform:translateY(-1px)}
      .lt-consent-actions small{display:block;font-size:9px;font-weight:500;opacity:.72;margin-top:2px}
      .lt-consent-secondary{background:transparent;color:#f2f5f1;border:1px solid #58716a!important}
      .lt-consent-secondary:hover{background:#173b39}
      .lt-consent-primary{background:#edbd85;color:#153b38;min-width:108px;position:relative;padding-right:30px!important}
      .lt-consent-primary:hover{background:#f2c995}
      .lt-consent-primary>span{position:absolute;right:12px;top:50%;transform:translateY(-50%);font-size:16px}
      @media(max-width:760px){
        .lt-consent-wrap{padding:12px}
        .lt-consent-card{grid-template-columns:40px 1fr;gap:12px;padding:17px;border-radius:2px}
        .lt-consent-icon{width:40px;height:40px;font-size:23px;align-self:start}
        .lt-consent-copy strong{font-size:15px}
        .lt-consent-copy p{font-size:11.5px;line-height:1.48}
        .lt-consent-copy .lt-consent-en{display:none}
        .lt-consent-policy{gap:4px;margin-top:8px;padding-bottom:3px}
        .lt-policy-arrow{width:11px;height:11px;flex-basis:11px}
        .lt-consent-actions{grid-column:1/-1;display:grid;grid-template-columns:1fr 1.15fr;width:100%;margin-top:2px}
        .lt-consent-actions button{min-height:46px}
      }
      @media(max-width:390px){
        .lt-consent-icon{display:none}
        .lt-consent-card{grid-template-columns:1fr;padding:15px}
        .lt-consent-actions{grid-column:1}
      }
    `}</style>
  </>;
}
