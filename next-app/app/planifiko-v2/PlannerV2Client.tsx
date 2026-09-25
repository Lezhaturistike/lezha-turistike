'use client';
import {useMemo,useRef,useState} from 'react';
import LiveTourMap,{type MapPlace} from '../planifiko/LiveTourMap';

export type PlannerPlace={id:string;type:string;name:string;kind?:string;desc?:string;lat:number;lng:number;image?:string;duration?:string;plannerFeatured?:boolean;tags?:string[]};
const interests=['Histori & Arkeologji','Trashëgimi fetare','Kulturë urbane','Natyrë & Bregdet','Kulinari','Eksplorim','E kombinuar'];
const times=['3–4 orë','1 ditë','2 ditë','3 ditë'];
const transports=['Në këmbë','Makinë','Biçikletë'];
const thematic=[
 {id:'gjurmet',name:'Në Gjurmët e Lezhës',interest:'E kombinuar',names:['Memoriali i Skënderbeut','Kalaja e Lezhës','Rana e Hedhun','Lagunat Kune–Vain','Kune–Vain']},
 {id:'antike',name:'Lezha Antike',interest:'Histori & Arkeologji',names:['Qyteti antik i Lissusit','Kalaja e Lezhës','Memoriali i Skënderbeut','Obelisku i Kuvendit të Lezhës']},
 {id:'skenderbeu',name:'Gjurmët e Skënderbeut',interest:'Histori & Arkeologji',names:['Memoriali i Skënderbeut','Obelisku i Kuvendit të Lezhës','Kalaja e Lezhës']},
 {id:'bregdeti',name:'Lezhë · Shëngjin · Rana',interest:'Natyrë & Bregdet',names:['Shëngjini','Rana e Hedhun']},
 {id:'lagunat',name:'Kune–Vain · Tale',interest:'Natyrë & Bregdet',names:['Lagunat Kune–Vain','Kune–Vain','Plazhi i Tales']},
 {id:'trashegimia',name:'Trashëgimia fetare',interest:'Trashëgimi fetare',names:['Katedralja e qytetit','Kisha e Shën Eufemisë','Kisha e Kuvendit të Arbnit']}
];
const norm=(v:string)=>v.toLocaleLowerCase('sq').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/g,'');
const km=(a:PlannerPlace,b:PlannerPlace)=>{const r=6371,dLat=(b.lat-a.lat)*Math.PI/180,dLng=(b.lng-a.lng)*Math.PI/180,x=Math.sin(dLat/2)**2+Math.cos(a.lat*Math.PI/180)*Math.cos(b.lat*Math.PI/180)*Math.sin(dLng/2)**2;return 2*r*Math.asin(Math.sqrt(x))};
const optimize=(items:PlannerPlace[])=>{if(items.length<2)return items;const left=items.slice(1),out=[items[0]];while(left.length){const last=out.at(-1)!;left.sort((a,b)=>km(last,a)-km(last,b));out.push(left.shift()!)}return out};
const parseMin=(v='1 orë')=>{const h=v.match(/(\d+(?:[.,]\d+)?)\s*(?:h|or[ëe])/i),m=v.match(/(\d+)\s*min/i);return Math.max(30,Math.round(Number((h?.[1]||'0').replace(',','.'))*60+Number(m?.[1]||0)))};

export default function PlannerV2Client({cmsPlaces=[]}:{cmsPlaces:PlannerPlace[]}){
 const source=useMemo(()=>cmsPlaces.filter(p=>Number.isFinite(p.lat)&&Number.isFinite(p.lng)&&p.lat!==0&&p.lng!==0),[cmsPlaces]);
 const[interest,setInterest]=useState('E kombinuar'),[time,setTime]=useState('1 ditë'),[transport,setTransport]=useState('Makinë');
 const[stops,setStops]=useState<PlannerPlace[]>([]),[active,setActive]=useState(0),[query,setQuery]=useState(''),[searchOpen,setSearchOpen]=useState(false),[qr,setQr]=useState(false);\n const searchRef=useRef<HTMLDivElement|null>(null);
 const matches=useMemo(()=>{const q=norm(query);const list=q?source.filter(p=>norm([p.name,p.kind,p.desc,...(p.tags||[])].filter(Boolean).join(' ')).includes(q)):source;return list.slice(0,12)},[query,source]);
 const add=(p:PlannerPlace)=>{if(stops.some(x=>x.id===p.id)){setActive(stops.findIndex(x=>x.id===p.id));setSearchOpen(false);return}const next=optimize([...stops,p]);setStops(next);setActive(next.findIndex(x=>x.id===p.id));setQuery('');setSearchOpen(false)};
 const generate=()=>{const keys:Record<string,string[]>={
  'Histori & Arkeologji':['histori','arkeolog','kala','lissus','memorial','skenderbe'],
  'Trashëgimi fetare':['kish','katedrale','fetar','kuvendit te arbnit'],
  'Kulturë urbane':['kultur','qytet','urban','obelisk','memorial'],
  'Natyrë & Bregdet':['natyr','lagun','park','mal','kune','vain','bregdet','plazh','det','shengjin','tale','rana'],
  'Kulinari':['kulinari','restorant','ushqim','gatim'],
  'Eksplorim':['eksplor','ecje','mal','natyr','aventur']
 };let pool=interest==='E kombinuar'?source:source.filter(p=>{const s=norm([p.name,p.kind,...(p.tags||[])].join(' '));return (keys[interest]||[]).some(k=>s.includes(norm(k)))});if(pool.length<2)pool=source;pool=[...pool].sort((a,b)=>Number(b.plannerFeatured)-Number(a.plannerFeatured));const budget=time==='3–4 orë'?210:time==='1 ditë'?480:time==='2 ditë'?960:1440;let used=0;const picked:PlannerPlace[]=[];for(const p of pool){const visit=parseMin(p.duration),move=picked.length?30:0;if(used+visit+move>budget&&picked.length>=2)continue;picked.push(p);used+=visit+move;if(used>=budget*.82||picked.length>=8)break}setStops(optimize(picked));setActive(0)};
 const loadTheme=(t:(typeof thematic)[number])=>{const wanted=new Map(t.names.map((n,i)=>[norm(n),i]));let picked=source.filter(p=>wanted.has(norm(p.name))).sort((a,b)=>(wanted.get(norm(a.name))??99)-(wanted.get(norm(b.name))??99));if(!picked.length){const keys=t.interest==='Natyrë & Bregdet'?['plazh','lagun','bregdet','rana','tale']:t.interest==='Trashëgimi fetare'?['kish','katedrale','fetar']:['histori','arkeolog','kala','memorial'];picked=source.filter(p=>keys.some(k=>norm([p.name,p.kind,...(p.tags||[])].join(' ')).includes(norm(k)))).slice(0,6)}setInterest(t.interest);setStops(optimize(picked));setActive(0)};
 const mapPlaces:MapPlace[]=stops.map(p=>({name:p.name,lat:p.lat,lng:p.lng,note:p.kind||'Destinacion',description:p.desc,image:p.image}));
 const distance=stops.slice(1).reduce((n,p,i)=>n+km(stops[i],p),0),speed=transport==='Në këmbë'?4.5:transport==='Biçikletë'?15:38,travelMinutes=Math.round(distance/speed*60);
 const shareUrl=()=>{if(typeof window==='undefined')return'';const u=new URL(window.location.href);u.searchParams.set('koha',time);u.searchParams.set('interesi',interest);u.searchParams.set('transporti',transport);if(stops.length)u.searchParams.set('ndalesat',stops.map(s=>s.id).join(','));return u.toString()};
 const share=async()=>{const u=shareUrl();try{if(navigator.share)await navigator.share({title:'Itinerari im në Lezhë',url:u});else await navigator.clipboard.writeText(u)}catch{}};
 const qrUrl=`https://quickchart.io/qr?size=280&margin=2&text=${encodeURIComponent(shareUrl())}`;
 return <div className="plannerV2"><section className="plannerStage">
  <div className="mapCanvas"><LiveTourMap places={mapPlaces} active={Math.min(active,Math.max(0,mapPlaces.length-1))} onActive={setActive} transport={transport}/></div>

  <div className="searchFloat" ref={searchRef} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node))setSearchOpen(false)}}>
   <label><span>⌕</span><input value={query} onFocus={()=>setSearchOpen(true)} onChange={e=>{setQuery(e.target.value);setSearchOpen(true)}} placeholder="Kërko destinacione, restorante dhe akomodim..."/>{query&&<button onClick={()=>setQuery('')}>×</button>}</label>
   {searchOpen&&<div className="searchResults">{matches.length?matches.map(p=><button key={p.id} onClick={()=>add(p)}>{p.image?<img src={p.image} alt=""/>:<i>◎</i>}<span><b>{p.name}</b><small>{p.kind||'Destinacion'} · {p.type==='kulinari'?'Kulinari':p.type==='akomodim'?'Akomodim':'Destinacion'}</small></span><em>{stops.some(s=>s.id===p.id)?'Në tur':'＋ Shto'}</em></button>):<p>Nuk u gjet rezultat.</p>}</div>}
  </div>

  <div className="thematicCard"><small>TURE TEMATIKE</small><h3>Itinerare të gatshme</h3><div>{thematic.map(t=><button key={t.id} onClick={()=>loadTheme(t)}><span><b>{t.name}</b><small>Hap itinerarin</small></span><em>→</em></button>)}</div></div>

  <div className="plannerPanel">
   <div className="panelHead"><span className="pin">⌖</span><div><small>GUIDA JOTE DIGJITALE</small><h1>Planifiko vizitën</h1></div></div>
   <div className="step"><span className="stepNo">1</span><div><b>Zgjidh interesat</b><div className="pills">{interests.map(x=><button key={x} className={interest===x?'selected':''} onClick={()=>setInterest(x)}>{x}</button>)}</div></div></div>
   <div className="step"><span className="stepNo">2</span><div><b>Koha në dispozicion</b><div className="pills">{times.map(x=><button key={x} className={time===x?'selected':''} onClick={()=>setTime(x)}>{x}</button>)}</div></div></div>
   <div className="step"><span className="stepNo">3</span><div><b>Mënyra e lëvizjes</b><div className="transport">{transports.map(x=><button key={x} className={transport===x?'selected':''} onClick={()=>setTransport(x)}><span>{x==='Makinë'?'🚗':x==='Në këmbë'?'🚶':'🚲'}</span>{x}</button>)}</div></div></div>
   <button className="generateV2" onClick={generate}>Gjenero itinerarin <span>→</span></button>
  </div>

  <div className="leftBottomCluster"><div className="summaryCard"><small>ITINERARI I SUGJERUAR</small><div><span>⌖</span><b>{stops.length||'—'} ndalesa</b></div><div><span>↝</span><b>{stops.length?distance.toFixed(1):'—'} km</b></div><div><span>◷</span><b>{stops.length?Math.max(20,travelMinutes)+' min':'—'}</b></div></div>{stops.length>0&&<div className="selectedCards">{stops.map((p,i)=><button key={p.id} className={active===i?'active':''} onClick={()=>setActive(i)}>{p.image?<img src={p.image} alt=""/>:<span className="noPhoto">◎</span>}<span className="selectedText"><small>DESTINACIONI {i+1}</small><b>{p.name}</b><em>{p.desc||p.kind||'Ndalesë në itinerarin tënd.'}</em></span>{i<stops.length-1&&<strong className="nextArrow">→</strong>}</button>)}</div>}</div>
 </section>

 {stops.length>0&&<section className="routeStrip"><div className="routeTitle"><div><span>ITINERARI YT</span><h2>{time} në Lezhë</h2></div><div className="routeActions"><button onClick={share} className="takeAction"><span className="actionIcon">↗</span><b>Ndaje</b><small>Dërgo itinerarin</small></button><button onClick={()=>setQr(true)} className="takeAction"><span className="actionIcon">▦</span><b>QR Code</b><small>Hape në telefon</small></button></div></div><div className="stopStrip">{stops.map((p,i)=><button key={p.id} className={active===i?'active':''} onClick={()=>setActive(i)}><span>{i+1}</span><div><b>{p.name}</b><small>{p.kind||'Destinacion'}</small></div></button>)}</div></section>}
 {qr&&<div className="qrModal" onClick={()=>setQr(false)}><div onClick={e=>e.stopPropagation()}><button className="qrClose" onClick={()=>setQr(false)}>×</button><small>TURI IM / QR</small><h3>Skano dhe vazhdo në telefon</h3><img src={qrUrl} alt="QR Code"/><p>{time} · {interest}<br/>{stops.length} ndalesa · {transport}</p></div></div>}
 </div>
}