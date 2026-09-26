import {ImageResponse} from "next/og";

export const alt="Lezha Turistike — Udhëzues digjital për Lezhën";
export const size={width:1200,height:630};
export const contentType="image/png";

function CastleMark(){
  const tower=(h:number,w:number)=>(
    <div style={{width:w,height:h,background:"#f8f6f1",position:"relative",display:"flex",flexDirection:"column",justifyContent:"flex-start"}}>
      <div style={{position:"absolute",top:-9,left:0,width:"100%",height:12,display:"flex",justifyContent:"space-between"}}>
        <span style={{width:"28%",height:"100%",background:"#f8f6f1"}}/>
        <span style={{width:"28%",height:"100%",background:"#f8f6f1"}}/>
        <span style={{width:"28%",height:"100%",background:"#f8f6f1"}}/>
      </div>
    </div>
  );
  return <div style={{width:108,height:94,display:"flex",alignItems:"flex-end",justifyContent:"center",gap:7}}>
    {tower(57,25)}{tower(79,31)}{tower(57,25)}
  </div>;
}

export default function Image(){
 return new ImageResponse(
  <div style={{width:"100%",height:"100%",display:"flex",position:"relative",overflow:"hidden",background:"#0f3d2e",color:"#f8f6f1",fontFamily:"Arial, sans-serif"}}>
   <div style={{position:"absolute",width:520,height:520,border:"1px solid rgba(212,180,131,.20)",borderRadius:"50%",right:-80,top:-180}}/>
   <div style={{position:"absolute",width:360,height:360,border:"1px solid rgba(212,180,131,.14)",borderRadius:"50%",right:100,bottom:-210}}/>
   <div style={{position:"absolute",left:0,bottom:0,width:"100%",height:12,background:"#d4b483"}}/>
   <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"72px 82px 68px",width:"100%"}}>
    <div style={{display:"flex",alignItems:"center",gap:28}}>
     <CastleMark/>
     <div style={{display:"flex",flexDirection:"column",fontSize:31,lineHeight:.9,letterSpacing:6,fontWeight:500}}>
      <span>LEZHA</span><span style={{fontSize:22,letterSpacing:7,fontWeight:800,marginTop:11}}>TURISTIKE</span>
     </div>
    </div>
    <div style={{display:"flex",flexDirection:"column",maxWidth:880}}>
     <div style={{fontFamily:"Georgia, serif",fontSize:70,lineHeight:1.02,letterSpacing:-2}}>Zbulo Lezhën.</div>
     <div style={{fontSize:27,lineHeight:1.35,marginTop:20,color:"#e6eee9",maxWidth:820}}>Destinacione, histori, kulinari, Web GIS dhe guida jote digjitale.</div>
    </div>
    <div style={{display:"flex",alignItems:"center",gap:18,fontSize:17,letterSpacing:2.2,color:"#d4b483",textTransform:"uppercase"}}>
     <span>Natyrë</span><span>·</span><span>Histori</span><span>·</span><span>Kulturë</span><span>·</span><span>Eksperienca</span>
    </div>
   </div>
  </div>,
  {...size}
 );
}
