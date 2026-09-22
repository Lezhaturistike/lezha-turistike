"use client";
import {useState} from "react";

import type defaults from "@/sanity/content/histori.json";
type Story={_key?:string;image?:string;alt?:string;label?:string;title?:string;highlight?:string;text1?:string;text2?:string;sourceUrl?:string;sourceLabel?:string;note?:string};
export default function HistoryBookEn({content}:{content:typeof defaults & {stories?:Story[]}}){
 const fallback:Story={image:content.src1,alt:content.alt2,label:content.text3,title:content.text4,highlight:content.text5,text1:content.text6,text2:content.text7,sourceUrl:content.href8,sourceLabel:content.text9,note:content.text12};
 const stories:Story[]=content.stories?.length?content.stories:[fallback]; const [i,setI]=useState(0); const s=stories[i]; const move=(d:number)=>setI(v=>(v+d+stories.length)%stories.length);
 return <section id="histori" className="story-section history-book"><div className="story-photo">{s.image&&<img loading="lazy" src={s.image} alt={s.alt||s.title||"History of Lezhë"}/>}</div><div className="story-copy"><span className="overline light">{s.label||"HISTORY"}</span><h1>{s.title}<br/><em>{s.highlight}</em></h1>{s.text1&&<p>{s.text1}</p>}{s.text2&&<p>{s.text2}</p>}<div className="story-links">{s.sourceUrl&&s.sourceLabel&&<a href={s.sourceUrl} target="_blank" rel="noopener noreferrer">{s.sourceLabel} <span className="arrow-icon" aria-hidden="true">↗</span></a>}</div>{s.note&&<p className="editorial-note">{s.note}</p>}{stories.length>1&&<div className="history-book-nav" aria-label="Browse stories"><button onClick={()=>move(-1)} aria-label="Previous story">←</button><span>{String(i+1).padStart(2,"0")} / {String(stories.length).padStart(2,"0")}</span><button onClick={()=>move(1)} aria-label="Next story">→</button></div>}</div></section>
}