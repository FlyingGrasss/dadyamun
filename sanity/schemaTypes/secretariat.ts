import { defineField, defineType } from 'sanity'

export const secretariat = defineType({
  name: 'secretariat',
  title: 'Secretariat',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      type: 'number',
      title: 'Secretariat ID (order)',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'name',
      type: 'string',
      title: 'Secretariat Name',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true // Still enable smart cropping
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'link',
      type: 'url',
      title: 'Link',
      validation: (Rule) => Rule.required()
    }),
  ]
})