import {defineField, defineType} from 'sanity'

export const akomodim = defineType({
  name:'akomodim',title:'Akomodim',type:'document',
  fields:[
    defineField({name:'titulli',title:'Emri',type:'string',validation:(Rule)=>Rule.required()}),
    defineField({name:'titulliEn',title:'Name (EN)',type:'string'}),
    defineField({name:'lloji',title:'Lloji',type:'string',options:{list:[{title:'Hotel',value:'hotel'},{title:'Bujtinë',value:'bujtine'},{title:'Resort',value:'resort'},{title:'Apartament',value:'apartament'},{title:'Camping',value:'camping'},{title:'Tjetër',value:'tjeter'}]}}),
    defineField({name:'pershkrimi',title:'Përshkrimi',type:'text',rows:5}),
    defineField({name:'pershkrimiEn',title:'Description (EN)',type:'text',rows:5}),
    defineField({name:'foto',title:'Foto kryesore',type:'image',options:{hotspot:true}}),
    defineField({name:'galeria',title:'Galeria',type:'array',of:[{type:'image',options:{hotspot:true}}]}),
    defineField({name:'adresa',title:'Adresa',type:'string'}),
    defineField({name:'lokacioni',title:'Lokacioni',type:'geopoint',validation:(Rule)=>Rule.required(),description:'Pika përdoret për hartën, afërsinë dhe itinerarin.'}),
    defineField({name:'telefoni',title:'Telefoni',type:'string'}),
    defineField({name:'website',title:'Website',type:'url'}),
    defineField({name:'rezervimi',title:'Link rezervimi',type:'url'}),
    defineField({name:'harta',title:'Google Maps',type:'url'}),
    defineField({name:'cmimiNga',title:'Çmimi nga',type:'number'}),
    defineField({name:'monedha',title:'Monedha',type:'string',initialValue:'EUR',options:{list:[{title:'€ EUR',value:'EUR'},{title:'Lek ALL',value:'ALL'}]}}),
    defineField({name:'plannerFeatured',title:'Sugjero në Planifiko vizitën',type:'boolean',initialValue:true}),
    defineField({name:'plannerOrder',title:'Renditja në sugjerime',type:'number'}),
  ],
  preview:{select:{title:'titulli',subtitle:'lloji',media:'foto'}}
})