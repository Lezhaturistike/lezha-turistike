import {defineField,defineType} from "sanity";
export const kulinariReview=defineType({name:"kulinariReview",title:"Reviews Kulinari",type:"document",fields:[
 defineField({name:"place",title:"Vendi",type:"reference",to:[{type:"kulinari"}],validation:r=>r.required()}),
 defineField({name:"rating",title:"Yjet",type:"number",validation:r=>r.required().integer().min(1).max(5)}),
 defineField({name:"createdAt",title:"Data",type:"datetime"})
]});
