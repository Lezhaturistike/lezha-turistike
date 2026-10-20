"use client";
import Link from "next/link";
import MenuButton from "@/app/components/MenuButton";
import {useSiteSettings} from "./SiteSettingsProvider";
import BrandLogo,{brandClass} from "./BrandLogo";
import {menuItemPath} from "@/sanity/lib/site-settings-shared";
import ThemeToggle from "@/app/components/ThemeToggle";
import {localizedPath, type Locale} from "@/sanity/lib/localize";

export default function LocaleHeader({locale = "sq", current = ""}: {locale?: Locale; current?: string}) {
  const currentPath = current ? `/${current}` : "/";
  const settings=useSiteSettings();
  return (
    <header className="header">
      <Link href={localizedPath("/", locale)} className={brandClass("header",settings)} aria-label="Lezha Turistike">
        <BrandLogo/>
      </Link>
      <nav className="nav" id="nav" aria-label={locale === "en" ? "Main navigation" : "Navigimi kryesor"}>
        {settings.headerMenu.filter(item=>item.visible!==false).map(item=>(
          <Link key={item.slug} href={localizedPath(menuItemPath(item.slug),locale)} aria-current={current===(item.slug==="home"?"":item.slug)?"page":undefined}>
            {locale==="en"?item.labelEn:item.labelSq}
          </Link>
        ))}
        <span className="language-switch" aria-label={locale === "en" ? "Language" : "Gjuha"}>
          <Link href={currentPath} hrefLang="sq" lang="sq" aria-current={locale === "sq" ? "true" : undefined}>SQ</Link>
          <span aria-hidden="true">/</span>
          <Link href={localizedPath(currentPath, "en")} hrefLang="en" lang="en" aria-current={locale === "en" ? "true" : undefined}>EN</Link>
        </span>
        <span className="mobile-theme-toggle"><ThemeToggle /></span>
      </nav>
      <ThemeToggle />
      <MenuButton />
      {settings.showPlannerCta&&<Link className="nav-cta" href={localizedPath("/planifiko",locale)}>
        {locale==="en"?settings.plannerCtaEn:settings.plannerCtaSq}
      </Link>}
    </header>
  );
}
