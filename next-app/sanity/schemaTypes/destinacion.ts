import {defineField, defineType} from 'sanity'

export const destinacion = defineType({
  name: 'destinacion',
  title: 'Destinacione',
  type: 'document',
  fields: [
    defineField({name:'titulli',title:'Titulli',type:'string',validation:(Rule)=>Rule.required()}),
    defineField({name:'titulliEn',title:'Title (EN)',type:'string'}),
    defineField({name:'kategoria',title:'Kategoria',type:'string',options:{list:[
      {title:'Histori',value:'histori'},{title:'Natyrë',value:'natyre'},{title:'Arkeologji',value:'arkeologji'},
    ]}}),
    defineField({name:'pershkrimi',title:'Përshkrimi',type:'text',rows:5}),
    defineField({name:'pershkrimiEn',title:'Description (EN)',type:'text',rows:5}),
    defineField({name:'foto',title:'Foto kryesore',type:'image',options:{hotspot:true}}),
    defineField({name:'galeria',title:'Galeria',type:'array',of:[{type:'image',options:{hotspot:true}}]}),
    defineField({name:'burimi',title:'Linku i burimit',type:'url'}),
    defineField({name:'harta',title:'Linku i hartës',type:'url'}),
    defineField({name:'lokacioni',title:'Lokacioni për Planifiko vizitën',type:'geopoint',description:'Vendos pikën e saktë që përdoret nga itinerari dhe harta dinamike.'}),
    defineField({name:'kohezgjatja',title:'Kohëzgjatja e rekomanduar',type:'string',description:'P.sh. 45 min, 1 orë, 1 h 30 min'}),
    defineField({name:'oraRekomanduar',title:'Ora / momenti i rekomanduar',type:'string',description:'P.sh. 09:00, pasdite, perëndim dielli'}),
    defineField({name:'plannerTags',title:'Interesat në planner',type:'array',of:[{type:'string'}],options:{list:[
      {title:'Histori & Arkeologji',value:'Histori & Arkeologji'},
      {title:'Natyrë & Bregdet',value:'Natyrë & Bregdet'},
      {title:'Kulinari',value:'Kulinari'},
      {title:'Eksplorim',value:'Eksplorim'},
      {title:'E kombinuar',value:'E kombinuar'},
    ]}}),
    defineField({name:'plannerFeatured',title:'Sugjero në Planifiko vizitën',type:'boolean',initialValue:false}),
    defineField({name:'plannerOrder',title:'Renditja në itinerar',type:'number',description:'Numër më i vogël = shfaqet më herët.'}),
  ],
  preview:{select:{title:'titulli',subtitle:'kategoria',media:'foto'}}
})