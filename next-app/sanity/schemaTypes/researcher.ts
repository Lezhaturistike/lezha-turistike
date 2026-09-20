import {defineField, defineType} from "sanity";

export const researcher = defineType({
  name:"researcher", title:"Ekipi shkencor", type:"document",
  fields:[
    defineField({name:"name",title:"Emri dhe mbiemri",type:"string",validation:r=>r.required()}),
    defineField({name:"academicTitle",title:"Titulli akademik",type:"string"}),
    defineField({name:"role",title:"Roli / ekspertiza në projekt",type:"string"}),
    defineField({name:"institution",title:"Institucioni / afiliacioni",type:"string"}),
    defineField({name:"bio",title:"Përshkrim i shkurtër",type:"text",rows:3}),
    defineField({name:"photo",title:"Fotografia profesionale",type:"image",options:{hotspot:true}}),
    defineField({name:"researchGate",title:"ResearchGate",type:"url"}),
    defineField({name:"googleScholar",title:"Google Scholar",type:"url"}),
    defineField({name:"orcid",title:"ORCID",type:"url"}),
    defineField({name:"linkedin",title:"LinkedIn",type:"url"}),
    defineField({name:"institutionalProfile",title:"Profili institucional / akademik",type:"url"}),
    defineField({name:"email",title:"Email profesional publik",type:"string"}),
    defineField({name:"order",title:"Renditja",type:"number",initialValue:100}),
  ],
  preview:{select:{title:"name",subtitle:"institution",media:"photo"}}
});