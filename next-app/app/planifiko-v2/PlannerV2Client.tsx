'use client';
import {useMemo,useState} from 'react';
import LiveTourMap,{type MapPlace} from '../planifiko/LiveTourMap';
export type PlannerPlace={id:string;type:string;name:string;kind?:string;desc?:string;lat:number;lng:number;image?:string;duration?:string;plannerFeatured?:boolean;tags?:string[]};
const interests=['Natyrë','Kulturë','Bregdet','Kulinari','Aventurë'];
const times=['Gjysmë dite','1 ditë','2–3 ditë','Më shumë'];
const transports=['Makinë','Në këmbë','Biçikletë'];
const km=(a:PlannerPlace,b:PlannerPlace)=>{const r=6371,dLat=(b.lat-a.lat)*Math.PI/180,dLng=(b.lng-a.lng)*Math.PI/180,x=Math.sin(dLat/2)**2+Math.cos(a.lat*Math.PI/180)*Math.cos(b.lat*Math.PI/180)*Math.sin(dLng/2)**2;return 2*r*Math.asin(Math.sqrt(x))};
const optimize=(items:PlannerPlace[])=>{if(items.length<2)return items;const left=items.slice(1),out=[items[0]];while(left.length){const last=out.at(-1)!;left.sort((a,b)=>km(last,a)-km(last,b));out.push(left.shift()!)}return out};
const parseMin=(v='1 orë')=>{const h=v.match(/(\d+(?:[.,]\d+)?)\s*(?:h|or[ëe])/i),m=v.match(/(\d+)\s*min/i);return Math.max(30,Math.round(Number((h?.[1]||'0').replace(',','.'))*60+Number(m?.[1]||0)))};
export default function PlannerV2Client({cmsPlaces=[]}:{cmsPlaces:PlannerPlace[]}){
 const source=useMemo(()=>cmsPlaces.filter(p=>Number.isFinite(p.lat)&&Number.isFinite(p.lng)&&p.lat!==0&&p.lng!==0),[cmsPlaces]);
 const[interest,setInterest]=useState('Natyrë'),[time,setTime]=useState('1 ditë'),[transport,setTransport]=useState('Makinë'),[stops,setStops]=useState<PlannerPlace[]>([]),[active,setActive]=useState(0);
 const generate=()=>{const synonyms:Record<string,string[]>={
  'Natyrë':['natyr','lagun','park','mal','kune','vain'],'Kulturë':['kultur','histori','arkeolog','trashëgimi','kish','kala','memorial'],
  'Bregdet':['bregdet','plazh','det','shëngjin','tale','rana'],'Kulinari':['kulinari','restorant','ushqim','gatim'],'Aventurë':['aventur','eksplor','ecje','mal','natyr']
 };const keys=synonyms[interest];let pool=source.filter(p=>{const s=(p.name+' '+(p.kind||'')+' '+(p.tags||[]).join(' ')).toLocaleLowerCase('sq');return keys.some(k=>s.includes(k))});if(pool.length<3)pool=source;pool=[...pool].sort((a,b)=>Number(b.plannerFeatured)-Number(a.plannerFeatured));const budget=time==='Gjysmë dite'?210:time==='1 ditë'?480:time==='2–3 ditë'?1200:1800;let used=0;const picked:PlannerPlace[]=[];for(const p of pool){const visit=parseMin(p.duration),move=picked.length?30:0;if(used+visit+move>budget&&picked.length>=3)continue;picked.push(p);used+=visit+move;if(used>=budget*.75||picked.length>=8)break}setStops(optimize(picked));setActive(0)};
 const mapPlaces:MapPlace[]=stops.map(p=>({name:p.name,lat:p.lat,lng:p.lng,note:p.kind||'Destinacion',description:p.desc,image:p.image}));
 const distance=stops.slice(1).reduce((n,p,i)=>n+km(stops[i],p),0);
 const speed=transport==='Në këmbë'?4.5:transport==='Biçikletë'?15:38;
 const travelMinutes=Math.round(distance/speed*60);
 return <div className="plannerV2">
  <section className="plannerStage">
   <div className="mapCanvas"><LiveTourMap places={mapPlaces} active={Math.min(active,Math.max(0,mapPlaces.length-1))} onActive={setActive} transport={transport}/></div>
   <div className="plannerPanel">
    <div className="panelHead"><span className="pin">⌖</span><div><small>GUIDA JOTE DIGJITALE</small><h1>Planifiko vizitën</h1></div></div>
    <div className="step"><span className="stepNo">1</span><div><b>Zgjidh interesat</b><div className="pills">{interests.map(x=><button key={x} className={interest===x?'selected':''} onClick={()=>setInterest(x)}>{x}</button>)}</div></div></div>
    <div className="step"><span className="stepNo">2</span><div><b>Koha në dispozicion</b><div className="pills">{times.map(x=><button key={x} className={time===x?'selected':''} onClick={()=>setTime(x)}>{x}</button>)}</div></div></div>
    <div className="step"><span className="stepNo">3</span><div><b>Mënyra e lëvizjes</b><div className="transport">{transports.map(x=><button key={x} className={transport===x?'selected':''} onClick={()=>setTransport(x)}><span>{x==='Makinë'?'🚗':x==='Në këmbë'?'🚶':'🚲'}</span>{x}</button>)}</div></div></div>
    <button className="generateV2" onClick={generate}>Gjenero itinerarin <span>→</span></button>
   </div>
   <div className="summaryCard">
    <small>ITINERARI I SUGJERUAR</small>
    <div><span>⌖</span><b>{stops.length||'—'} ndalesa</b></div>
    <div><span>↝</span><b>{stops.length?distance.toFixed(1):'—'} km</b></div>
    <div><span>◷</span><b>{stops.length?Math.max(20,travelMinutes)+' min':'—'}</b></div>
   </div>
   {!stops.length&&<div className="emptyOverlay"><b>Lezha është gati për t’u eksploruar.</b><span>Zgjidh preferencat dhe gjenero itinerarin tënd.</span></div>}
  </section>
  {stops.length>0&&<section className="routeStrip"><div><span>ITINERARI YT</span><h2>{time} në Lezhë</h2></div><div className="stopStrip">{stops.map((p,i)=><button key={p.id} className={active===i?'active':''} onClick={()=>setActive(i)}><span>{i+1}</span><div><b>{p.name}</b><small>{p.kind||'Destinacion'}</small></div></button>)}</div></section>}
 </div>
}