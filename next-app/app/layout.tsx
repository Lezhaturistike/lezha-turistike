import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AnalyticsConsent from "./components/AnalyticsConsent";
import "./globals.css";
import "./modern-ui.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://lezhaturistike.com"),
  title: { default: "Lezha Turistike | Destinacione, histori dhe trashëgimi", template: "%s | Lezha Turistike" },
  description: "Eksploro Lezhën përmes destinacioneve, historisë, arkeologjisë, kulinarisë, Web GIS dhe kërkimit shkencor.",
  applicationName: "Lezha Turistike",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "sq_AL", alternateLocale: ["en_US"], siteName: "Lezha Turistike", url: "https://lezhaturistike.com", title: "Lezha Turistike | Destinacione, histori dhe trashëgimi", description: "Eksploro Lezhën përmes destinacioneve, historisë, arkeologjisë, kulinarisë, Web GIS dhe kërkimit shkencor." },
  twitter: { card: "summary_large_image", title: "Lezha Turistike", description: "Destinacione, histori, arkeologji, kulinari, Web GIS dhe kërkim shkencor në Lezhë." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
};

const websiteJsonLd = { "@context": "https://schema.org", "@type": "WebSite", "@id": "https://lezhaturistike.com/#website", url: "https://lezhaturistike.com/", name: "Lezha Turistike", alternateName: "Lezha Tourism", description: "Platformë digjitale për eksplorimin e destinacioneve, historisë, arkeologjisë, kulinarisë, Web GIS dhe kërkimit shkencor në Lezhë.", inLanguage: ["sq", "en"] };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="sq" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}><body className="min-h-full flex flex-col"><script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c")}} />{children}<AnalyticsConsent /></body></html>;
}
