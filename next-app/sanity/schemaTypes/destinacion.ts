import {defineField, defineType} from 'sanity'

export const destinacion = defineType({
  name: 'destinacion',
  title: 'Destinacione',
  type: 'document',

  fields: [
    defineField({
      name: 'titulli',
      title: 'Titulli',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({name:'titulliEn', title:'Title (EN)', type:'string'}),

    defineField({
      name: 'kategoria',
      title: 'Kategoria',
      type: 'string',
      options: {
        list: [
          {title: 'Histori', value: 'histori'},
          {title: 'Natyrë', value: 'natyre'},
          {title: 'Arkeologji', value: 'arkeologji'},
        ],
      },
    }),

    defineField({
      name: 'pershkrimi',
      title: 'Përshkrimi',
      type: 'text',
      rows: 5,
    }),

    defineField({name:'pershkrimiEn', title:'Description (EN)', type:'text', rows:5}),

    defineField({
      name: 'foto',
      title: 'Foto kryesore',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'galeria',
      title: 'Galeria',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),

    defineField({
      name: 'burimi',
      title: 'Linku i burimit',
      type: 'url',
    }),

    defineField({
      name: 'harta',
      title: 'Linku i hartës',
      type: 'url',
    }),
  ],
})