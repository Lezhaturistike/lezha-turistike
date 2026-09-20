import {NextResponse} from "next/server";
import {createClient} from "next-sanity";

const projectId="ko1ud3ml";
const dataset="production";

export async function POST(request:Request){
  try{
    const token=process.env.SANITY_API_WRITE_TOKEN;
    if(!token) return NextResponse.json({error:"Review-t nuk janë konfiguruar ende."},{status:503});
    const body=await request.json();
    const placeId=String(body.placeId||"");
    const rating=Number(body.rating);
    if(!placeId||!Number.isInteger(rating)||rating<1||rating>5) return NextResponse.json({error:"Vlerësim i pavlefshëm."},{status:400});
    const client=createClient({projectId,dataset,apiVersion:"2026-09-20",useCdn:false,token});
    await client.create({_type:"kulinariReview",place:{_type:"reference",_ref:placeId},rating,createdAt:new Date().toISOString()});
    const stats=await client.fetch('{"rating": math::avg(*[_type=="kulinariReview" && place._ref==$id].rating), "reviewCount": count(*[_type=="kulinariReview" && place._ref==$id])}',{id:placeId});
    return NextResponse.json(stats);
  }catch{return NextResponse.json({error:"Vlerësimi nuk u ruajt."},{status:500})}
}
