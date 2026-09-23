import {defineField,defineType} from 'sanity'

export const guida=defineType({
 name:'guida',title:'Guida turistike',type:'document',
 fields:[
  defineField({name:'emri',title:'Emri dhe mbiemri',type:'string',validation:R=>R.required()}),
  defineField({name:'foto',title:'Foto',type:'image',options:{hotspot:true}}),
  defineField({name:'specializimi',title:'Specializimi',type:'string'}),
  defineField({name:'bio',title:'Përshkrimi',type:'text',rows:5}),
  defineField({name:'gjuhet',title:'Gjuhët',type:'array',of:[{type:'string'}]}),
  defineField({name:'zonat',title:'Zonat / eksperiencat që mbulon',type:'array',of:[{type:'string'}]}),
  defineField({name:'telefon',title:'Telefon publik',type:'string'}),
  defineField({name:'email',title:'Email publik',type:'string'}),
  defineField({name:'website',title:'Website',type:'url'}),
  defineField({name:'plannerFeatured',title:'Sugjero në Planifiko vizitën',type:'boolean',initialValue:false}),
 ],preview:{select:{title:'emri',subtitle:'specializimi',media:'foto'}}
})