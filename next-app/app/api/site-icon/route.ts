import {getSiteSettings} from "@/sanity/lib/site-settings";
import {NextResponse} from "next/server";

export const dynamic="force-dynamic";
export const runtime="nodejs";

const FALLBACK_ICON="<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 64 64\">\n  <g fill=\"#0f3d2e\">\n    <path d=\"M10 26h12v-9h12v9h12v-9h8v9h5v8H5v-8h5z\"/>\n    <path d=\"M10 30h12v25H10z\"/>\n    <path d=\"M26 23h12v32H26z\"/>\n    <path d=\"M42 30h12v25H42z\"/>\n    <path d=\"M5 53h54v5H5z\"/>\n  </g>\n  <path d=\"M30 43c0-4 4-7 8-7s8 3 8 7v12H30z\" fill=\"#f8f6f1\" transform=\"translate(-7 0)\"/>\n</svg>";
const headers={"Cache-Control":"no-store, max-age=0"};

export async function GET(){
  const settings=await getSiteSettings();
  if(settings.faviconImage){
    // Uploaded Sanity image assets have an immutable CDN URL. Browser/Google may
    // retain their old favicon cache, but the source changes without redeploy.
    return NextResponse.redirect(settings.faviconImage,{status:307,headers});
  }
  return new NextResponse(FALLBACK_ICON,{
    status:200,
    headers:{...headers,"Content-Type":"image/svg+xml; charset=utf-8","X-Content-Type-Options":"nosniff"}
  });
}
