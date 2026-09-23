import {definePlugin} from 'sanity'
import {useCallback,useState} from 'react'
import {Box,Button,Card,Flex,Stack,Text} from '@sanity/ui'
import {useFormValue} from 'sanity'

type GeoPoint={_type:'geopoint';lat:number;lng:number;alt?:number}
type Props={value?:GeoPoint;onChange:(patch:any)=>void;renderDefault:(props:any)=>React.ReactNode}

const directPatterns=[
 /@(-?\d{1,2}(?:\.\d+)?),(-?\d{1,3}(?:\.\d+)?)/,
 /[?&](?:query|q|ll|center)=(-?\d{1,2}(?:\.\d+)?)(?:%2C|,)(-?\d{1,3}(?:\.\d+)?)/i,
 /!3d(-?\d{1,2}(?:\.\d+)?)!4d(-?\d{1,3}(?:\.\d+)?)/,
 /\/place\/[^/]*\/(-?\d{1,2}(?:\.\d+)?),(-?\d{1,3}(?:\.\d+)?)/i,
]

function coordsFromText(input:string){
 const text=decodeURIComponent(input.replace(/\+/g,' '))
 for(const pattern of directPatterns){
  const m=text.match(pattern)
  if(m){
   const lat=Number(m[1]),lng=Number(m[2])
   if(Number.isFinite(lat)&&Number.isFinite(lng)&&Math.abs(lat)<=90&&Math.abs(lng)<=180)return{lat,lng}
  }
 }
 return null
}

async function resolveGoogleMapsUrl(url:string){
 const direct=coordsFromText(url)
 if(direct)return direct
 const r=await fetch('/api/maps-coordinates',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({url})})
 const data=await r.json()
 if(!r.ok)throw new Error(data.error||'Koordinatat nuk u gjetën.')
 return data as {lat:number;lng:number}
}

function LocationFromMapsInput(props:Props){
 const harta=useFormValue(['harta']) as string|undefined
 const[loading,setLoading]=useState(false)
 const[message,setMessage]=useState('')
 const extract=useCallback(async()=>{
  if(!harta){setMessage('Vendos fillimisht Linkun e hartës (Google Maps).');return}
  setLoading(true);setMessage('')
  try{
   const point=await resolveGoogleMapsUrl(harta)
   props.onChange({type:'set',path:[],value:{_type:'geopoint',lat:point.lat,lng:point.lng}})
   setMessage(`U morën koordinatat: ${point.lat.toFixed(6)}, ${point.lng.toFixed(6)}`)
  }catch(e){setMessage(e instanceof Error?e.message:'Koordinatat nuk u gjetën nga ky link.')}
  finally{setLoading(false)}
 },[harta,props])
 return <Stack space={3}>
  {props.renderDefault(props)}
  <Card padding={3} radius={2} tone="transparent" border>
   <Flex gap={3} align="center" wrap="wrap">
    <Button text={loading?'Duke lexuar Google Maps…':'Merr koordinatat nga Linku i hartës'} tone="primary" mode="ghost" disabled={loading||!harta} onClick={extract}/>
    {props.value&&<Text size={1} muted>{props.value.lat.toFixed(6)}, {props.value.lng.toFixed(6)}</Text>}
   </Flex>
   {message&&<Box marginTop={3}><Text size={1}>{message}</Text></Box>}
  </Card>
 </Stack>
}

export const mapsCoordinatesPlugin=definePlugin({
 name:'maps-coordinates',
 form:{components:{input:(props:any)=>props.schemaType?.name==='geopoint'?<LocationFromMapsInput {...props}/>:props.renderDefault(props)}}
})
