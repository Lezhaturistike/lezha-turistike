import Link from "next/link";
import MenuButton from "@/app/components/MenuButton";
import ThemeToggle from "@/app/components/ThemeToggle";
import {localizedPath, type Locale} from "@/sanity/lib/localize";

const navigation = [
  ["", "Home", "Home"],
  ["destinacione", "Destinacione", "Destinations"],
  ["galeri", "Galeri", "Gallery"],
  ["kulinari", "Kulinari", "Cuisine"],
  ["histori", "Histori", "History"],
  ["arkeologji", "Arkeologji", "Archaeology"],
  ["webgis", "Web GIS", "Web GIS"],
  ["shkenca", "Punime shkencore", "Scientific research"],
  ["partneret", "Partnerët", "Partners"],
  ["kontakt", "Kontakt", "Contact"],
] as const;

export default function LocaleHeader({locale = "sq", current = ""}: {locale?: Locale; current?: string}) {
  const currentPath = current ? `/${current}` : "/";
  return (
    <header className="header">
      <Link href={localizedPath("/", locale)} className="logo" aria-label="Lezha Turistike">
        <span className="logo-mark">L<span>✦</span></span>
        <span>LEZHA<br/><b>TURISTIKE</b></span>
      </Link>
      <nav className="nav" id="nav" aria-label={locale === "en" ? "Main navigation" : "Navigimi kryesor"}>
        {navigation.map(([slug, sq, en]) => (
          <Link key={slug} href={localizedPath(slug ? `/${slug}` : "/", locale)} aria-current={current === slug ? "page" : undefined}>
            {locale === "en" ? en : sq}
          </Link>
        ))}
        <span className="language-switch" aria-label={locale === "en" ? "Language" : "Gjuha"}>
          <Link href={currentPath} hrefLang="sq" lang="sq" aria-current={locale === "sq" ? "true" : undefined}>SQ</Link>
          <span aria-hidden="true">/</span>
          <Link href={localizedPath(currentPath, "en")} hrefLang="en" lang="en" aria-current={locale === "en" ? "true" : undefined}>EN</Link>
        </span>
      </nav>
      <ThemeToggle />
      <MenuButton />
      <Link className="nav-cta" href={localizedPath("/planifiko", locale)}>
        {locale === "en" ? "Plan your visit" : "Planifiko"}
      </Link>
    </header>
  );
}
