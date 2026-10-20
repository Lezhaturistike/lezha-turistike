"use client";
import {createContext,useContext,type ReactNode} from "react";
import {defaultSiteSettings,type SiteSettings} from "@/sanity/lib/site-settings-shared";
const SettingsContext=createContext<SiteSettings>(defaultSiteSettings);
export function SiteSettingsProvider({settings,children}:{settings:SiteSettings;children:ReactNode}){
  return <SettingsContext.Provider value={settings}>{children}</SettingsContext.Provider>;
}
export function useSiteSettings(){return useContext(SettingsContext);}
