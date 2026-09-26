import {defineField,defineType} from 'sanity'

export const plannerTour=defineType({
 name:'plannerTour',
 title:'Ture tematike',
 type:'document',
 fields:[
  defineField({name:'titulli',title:'Titulli',type:'string',validation:(Rule)=>Rule.required()}),
  defineField({name:'titulliEn',title:'Title (EN)',type:'string'}),
  defineField({name:'pershkrimi',title:'Përshkrimi',type:'text',rows:3}),
  defineField({name:'pershkrimiEn',title:'Description (EN)',type:'text',rows:3}),
  defineField({name:'interesi',title:'Interesi kryesor',type:'string',initialValue:'E kombinuar',options:{list:[
   {title:'Histori & Arkeologji',value:'Histori & Arkeologji'},{title:'Trashëgimi fetare',value:'Trashëgimi fetare'},
   {title:'Kulturë urbane',value:'Kulturë urbane'},{title:'Natyrë & Bregdet',value:'Natyrë & Bregdet'},
   {title:'Kulinari',value:'Kulinari'},{title:'Eksplorim',value:'Eksplorim'},{title:'E kombinuar',value:'E kombinuar'}
  ]}}),
  defineField({name:'ndalesat',title:'Ndalesat e turit',type:'array',description:'Shto destinacionet, kulinarinë ose akomodimin në rendin që dëshiron. Renditja mund të ndryshohet me drag & drop.',of:[
   {type:'reference',to:[{type:'destinacion'},{type:'kulinari'},{type:'akomodim'}]}
  ],validation:(Rule)=>Rule.min(1).warning('Shto të paktën një ndalesë.')}),
  defineField({name:'aktiv',title:'Shfaq në Planifiko V2',type:'boolean',initialValue:true}),
  defineField({name:'renditja',title:'Renditja e turit',type:'number',description:'Numër më i vogël = shfaqet më lart.',initialValue:100})
 ],
 preview:{select:{title:'titulli',subtitle:'interesi'}}
})
