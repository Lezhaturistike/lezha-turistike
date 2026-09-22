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
    {ready && consent===null && <div className="lt-cookie-banner" role="dialog" aria-label="Preferencat e cookies" aria-live="polite">
      <div className="lt-cookie-copy">
        <strong>Privatësia & Analitika</strong>
        <p>Përdorim Google Analytics vetëm me pëlqimin tuaj për të kuptuar në mënyrë të përmbledhur si përdoret Lezha Turistike. Nuk përdorim këtë zgjedhje për reklama të personalizuara. <a href="/cookies">Cookie Policy</a></p>
        <p className="lt-cookie-en">We use Google Analytics only with your consent to understand aggregate website usage. <a href="/en/cookies">Cookie Policy</a></p>
      </div>
      <div className="lt-cookie-actions">
        <button type="button" className="lt-cookie-secondary" onClick={()=>choose("denied")}>Refuzo / Reject</button>
        <button type="button" className="lt-cookie-primary" onClick={()=>choose("granted")}>Prano / Accept</button>
      </div>
    </div>}
  </>;
}
