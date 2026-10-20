"use client";
import Image from "next/image";
import {useSiteSettings} from "./SiteSettingsProvider";

export default function BrandLogo({placement="header"}:{placement?:"header"|"footer"}){
  const settings=useSiteSettings();
  return <>
    <span className="logo-mark logo-castle brand-default-mark" aria-hidden="true"><i></i><i></i><i></i></span>
    <span className="brand-default-text">LEZHA<br/><b>TURISTIKE</b></span>
    {placement==="header"&&settings.headerLogoLight&&<Image className="brand-image brand-light" src={settings.headerLogoLight} width={240} height={80} alt="" unoptimized/>}
    {placement==="header"&&settings.headerLogoDark&&<Image className="brand-image brand-dark" src={settings.headerLogoDark} width={240} height={80} alt="" unoptimized/>}
    {placement==="footer"&&settings.footerLogo&&<Image className="brand-image brand-footer" src={settings.footerLogo} width={240} height={80} alt="" unoptimized/>}
  </>;
}
export function brandClass(placement:"header"|"footer",settings:ReturnType<typeof useSiteSettings>){
  return placement==="footer"
    ?(settings.footerLogo?"logo brand-with-footer":"logo")
    :["logo",settings.headerLogoLight?"brand-with-light":"",settings.headerLogoDark?"brand-with-dark":""].filter(Boolean).join(" ");
}
