export const runtime='nodejs'

const patterns=[
 /@(-?\d{1,2}(?:\.\d+)?),(-?\d{1,3}(?:\.\d+)?)/,
 /[?&](?:query|q|ll|center)=(-?\d{1,2}(?:\.\d+)?)(?:%2C|,)(-?\d{1,3}(?:\.\d+)?)/i,
 /!3d(-?\d{1,2}(?:\.\d+)?)!4d(-?\d{1,3}(?:\.\d+)?)/,
 /\/place\/[^/]*\/(-?\d{1,2}(?:\.\d+)?),(-?\d{1,3}(?:\.\d+)?)/i,
]

function extract(text:string){
 let decoded=text
 try{decoded=decodeURIComponent(text.replace(/\+/g,' '))}catch{}
 for(const p of patterns){
  const m=decoded.match(p)
  if(m){
   const lat=Number(m[1]),lng=Number(m[2])
   if(Number.isFinite(lat)&&Number.isFinite(lng)&&Math.abs(lat)<=90&&Math.abs(lng)<=180)return{lat,lng}
  }
 }
 return null
}

function allowed(url:URL){
 const h=url.hostname.toLowerCase()
 return h==='maps.google.com'||h==='www.google.com'||h==='google.com'||h==='maps.app.goo.gl'||h==='goo.gl'||h.endsWith('.google.com')
}

export async function POST(request:Request){
 try{
  const body=await request.json()
  if(typeof body?.url!=='string')return Response.json({error:'Mungon linku i Google Maps.'},{status:400})
  let url:URL
  try{url=new URL(body.url)}catch{return Response.json({error:'Linku nuk është URL e vlefshme.'},{status:400})}
  if(url.protocol!=='https:'||!allowed(url))return Response.json({error:'Pranohet vetëm një link HTTPS i Google Maps.'},{status:400})
  const direct=extract(url.toString())
  if(direct)return Response.json(direct)
  const response=await fetch(url,{redirect:'follow',headers:{'User-Agent':'Mozilla/5.0'},signal:AbortSignal.timeout(7000)})
  const finalUrl=response.url
  const fromRedirect=extract(finalUrl)
  if(fromRedirect)return Response.json(fromRedirect)
  const html=await response.text()
  const fromHtml=extract(html)
  if(fromHtml)return Response.json(fromHtml)
  return Response.json({error:'Ky link nuk përmban koordinata të lexueshme. Hape vendin në Google Maps dhe kopjo linkun e plotë ose vendos pikën manualisht.'},{status:422})
 }catch{
  return Response.json({error:'Nuk u arrit të lexohej linku i Google Maps.'},{status:500})
 }
}
