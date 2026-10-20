"use client";
import {useEffect,useId,useRef,useState} from "react";
import Link from "next/link";
import {localizedPath,type Locale} from "@/sanity/lib/localize";
import {menuItemPath,type SiteMenuItem} from "@/sanity/lib/site-settings-shared";

/** Rendered only when a CMS menu entry has visible submenu children. */
export default function OptionalSubMenuItem({item,locale,current}:{item:SiteMenuItem;locale:Locale;current:string}){
  const [expanded,setExpanded]=useState(false);
  const id=useId();
  const group=useRef<HTMLDivElement>(null);
  const items=item.subMenu?.filter(link=>link.visible!==false)??[];
  useEffect(()=>{
    const onPointerDown=(event:PointerEvent)=>{
      if(group.current && event.target instanceof Node && !group.current.contains(event.target))setExpanded(false);
    };
    document.addEventListener("pointerdown",onPointerDown);
    return ()=>document.removeEventListener("pointerdown",onPointerDown);
  },[]);
  if(!items.length)return <Link href={localizedPath(menuItemPath(item.slug),locale)}
    aria-current={current===(item.slug==="home"?"":item.slug)?"page":undefined}>{locale==="en"?item.labelEn:item.labelSq}</Link>;

  const title=locale==="en"?item.labelEn:item.labelSq;
  return <div ref={group} className="nav-submenu-group" data-open={expanded?"true":"false"}
    onKeyDown={event=>{
      if(event.key==="Escape"){setExpanded(false);group.current?.querySelector<HTMLButtonElement>(".nav-submenu-toggle")?.focus();}
    }}>
    <span className="nav-submenu-parent">
      <Link href={localizedPath(menuItemPath(item.slug),locale)} onClick={()=>setExpanded(false)}
        aria-current={current===(item.slug==="home"?"":item.slug)?"page":undefined}>{title}</Link>
      <button type="button" className="nav-submenu-toggle" aria-controls={id}
        aria-expanded={expanded} aria-label={locale==="en"?`Show submenu for ${title}`:`Shfaq nënmenunë për ${title}`}
        onClick={()=>setExpanded(value=>!value)}><span aria-hidden="true">⌄</span></button>
    </span>
    <ul className="nav-submenu-list" id={id}>
      {items.map((child,index)=><li key={child._key||`${child.href}-${index}`}>
        {child.href.startsWith("https://")
          ? <a href={child.href} target="_blank" rel="noopener noreferrer" onClick={()=>setExpanded(false)}>{locale==="en"?child.labelEn:child.labelSq}</a>
          : <Link href={localizedPath(child.href,locale)} onClick={()=>setExpanded(false)}>{locale==="en"?child.labelEn:child.labelSq}</Link>}
      </li>)}
    </ul>
  </div>;
}
