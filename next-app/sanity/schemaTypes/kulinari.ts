import {defineField, defineType} from 'sanity'

export const kulinari = defineType({
  name: 'kulinari',
  title: 'Kulinari',
  type: 'document',
  fields: [
    defineField({name:'titulli', title:'Emri', type:'string', validation:(Rule)=>Rule.required()}),
    defineField({
      name:'kategoria', title:'Kategoria', type:'string',
      options:{list:[
        {title:'Restorant',value:'restorant'},
        {title:'Agroturizëm',value:'agroturizem'},
        {title:'Kantinë',value:'kantine'},
        {title:'Bar / Kafe',value:'bar-kafe'},
        {title:'Produkte lokale',value:'produkte-lokale'},
        {title:'Tjetër',value:'tjeter'},
      ]}
    }),
    defineField({name:'pershkrimi', title:'Përshkrimi', type:'text', rows:6}),
    defineField({name:'foto', title:'Foto kryesore', type:'image', options:{hotspot:true}}),
    defineField({name:'galeria', title:'Galeria e fotove', type:'array', of:[{type:'image',options:{hotspot:true}}]}),
    defineField({name:'adresa', title:'Adresa', type:'string'}),
    defineField({name:'orari', title:'Orari', type:'string'}),
    defineField({name:'telefoni', title:'Telefoni', type:'string'}),
    defineField({name:'harta', title:'Google Maps / Lokacioni', type:'url'}),
    defineField({name:'menuja', title:'Menuja (link)', type:'url'}),
    defineField({name:'website', title:'Website', type:'url'}),
    defineField({name:'social', title:'Instagram / Facebook', type:'url'}),
    defineField({name:'rezervimi', title:'Rezervimi (link)', type:'url'}),
    defineField({name:'burimi', title:'Burimi / Më shumë informacion', type:'url'}),
    defineField({name:'cmimiNga', title:'Çmimi nga', type:'number', description:'P.sh. 12'}),
    defineField({name:'monedha', title:'Monedha', type:'string', options:{list:[{title:'€ EUR',value:'EUR'},{title:'$ USD',value:'USD'},{title:'Lek ALL',value:'ALL'}]}}),
    defineField({name:'cmimiPer', title:'Çmimi për', type:'string', options:{list:[{title:'Për person',value:'person'},{title:'Për natë',value:'night'},{title:'Për dhomë',value:'room'},{title:'Për vakt',value:'meal'}]}}),
    defineField({name:'featured', title:'I veçuar', type:'boolean', initialValue:false}),
  ],
  preview:{
    select:{title:'titulli',subtitle:'kategoria',media:'foto'},
    prepare({title,subtitle,media}){return {title,subtitle:subtitle || 'Kulinari',media}}
  }
})
