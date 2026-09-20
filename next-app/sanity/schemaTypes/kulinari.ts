import {defineField, defineType} from 'sanity'

export const kulinari = defineType({
  name: 'kulinari',
  title: 'Kulinari',
  type: 'document',

  fields: [
    defineField({
      name: 'titulli',
      title: 'Titulli',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'pershkrimi',
      title: 'Përshkrimi',
      type: 'text',
      rows: 6,
    }),

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