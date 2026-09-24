import { NextRequest, NextResponse } from 'next/server'

const ORS_URL = 'https://api.heigit.org/openrouteservice/v2/directions'
const PROFILES: Record<string,string> = {
  'Makinë':'driving-car',
  'Në këmbë':'foot-walking',
  'Biçikletë':'cycling-regular',
  driving:'driving-car', walking:'foot-walking', bicycling:'cycling-regular'
}

export async function POST(request: NextRequest) {
  try {
    const key = process.env.OPENROUTESERVICE_API_KEY
    if (!key) return NextResponse.json({error:'Routing service is not configured.',fallback:true},{status:200})
    const body = await request.json()
    const coordinates = Array.isArray(body?.coordinates) ? body.coordinates : []
    if (coordinates.length < 2 || coordinates.length > 50) return NextResponse.json({error:'At least two valid stops are required.'},{status:400})
    const clean = coordinates.map((p:unknown)=>Array.isArray(p)&&p.length===2?[Number(p[0]),Number(p[1])]:null)
    if (clean.some((p:any)=>!p||!Number.isFinite(p[0])||!Number.isFinite(p[1]))) return NextResponse.json({error:'Invalid coordinates.'},{status:400})
    const profile = PROFILES[String(body?.transport)] || 'driving-car'
    const response = await fetch(`${ORS_URL}/${profile}/geojson`,{
      method:'POST',
      headers:{Authorization:key,'Content-Type':'application/json','Accept':'application/json, application/geo+json'},
      body:JSON.stringify({coordinates:clean,instructions:false,elevation:false}),
      cache:'no-store'
    })
    const data = await response.json().catch(()=>null)
    if (!response.ok || !data?.features?.[0]) return NextResponse.json({error:'No route could be calculated.',details:data?.error?.message||null,fallback:true},{status:200})
    const feature=data.features[0]
    const summary=feature.properties?.summary||{}
    return NextResponse.json({geometry:feature.geometry,distance:Number(summary.distance)||0,duration:Number(summary.duration)||0,profile})
  } catch {
    return NextResponse.json({error:'Routing request failed.'},{status:500})
  }
}
