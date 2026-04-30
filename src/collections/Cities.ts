import type { CollectionConfig } from 'payload'

export const Cities: CollectionConfig = {
  slug: 'cities',
  labels: {
    singular: 'Miasto',
    plural: 'Miasta',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'voivodeship', 'population', 'isMainCity', 'isActive'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nazwa miasta',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      unique: true,
      required: true,
      admin: {
        description: 'URL-friendly: "warszawa", "krakow", "bielsko-biala"',
      },
    },
    {
      name: 'voivodeship',
      type: 'select',
      label: 'Województwo',
      required: true,
      options: [
        { label: 'dolnośląskie', value: 'dolnoslaskie' },
        { label: 'kujawsko-pomorskie', value: 'kujawsko-pomorskie' },
        { label: 'lubelskie', value: 'lubelskie' },
        { label: 'lubuskie', value: 'lubuskie' },
        { label: 'łódzkie', value: 'lodzkie' },
        { label: 'małopolskie', value: 'malopolskie' },
        { label: 'mazowieckie', value: 'mazowieckie' },
        { label: 'opolskie', value: 'opolskie' },
        { label: 'podkarpackie', value: 'podkarpackie' },
        { label: 'podlaskie', value: 'podlaskie' },
        { label: 'pomorskie', value: 'pomorskie' },
        { label: 'śląskie', value: 'slaskie' },
        { label: 'świętokrzyskie', value: 'swietokrzyskie' },
        { label: 'warmińsko-mazurskie', value: 'warminsko-mazurskie' },
        { label: 'wielkopolskie', value: 'wielkopolskie' },
        { label: 'zachodniopomorskie', value: 'zachodniopomorskie' },
      ],
    },
    {
      name: 'population',
      type: 'number',
      label: 'Liczba mieszkańców',
      admin: {
        description: 'Do priorytetyzacji w listach i sitemap',
      },
    },
    {
      name: 'isMainCity',
      type: 'checkbox',
      label: 'Główne miasto',
      defaultValue: false,
      admin: {
        description: 'Miasto wojewódzkie / duże — wyżej w listach',
      },
    },
    {
      name: 'availableOperators',
      type: 'relationship',
      label: 'Dostępni operatorzy',
      relationTo: 'operators',
      hasMany: true,
      admin: {
        description: 'Operatorzy z ofertami w tym mieście',
      },
    },
    {
      name: 'coordinates',
      type: 'group',
      label: 'Współrzędne',
      admin: {
        description: 'Na przyszłość — mapa zasięgu',
      },
      fields: [
        {
          name: 'lat',
          type: 'number',
          label: 'Szerokość geograficzna',
          admin: { step: 0.000001 },
        },
        {
          name: 'lng',
          type: 'number',
          label: 'Długość geograficzna',
          admin: { step: 0.000001 },
        },
      ],
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Aktywne',
      defaultValue: true,
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          label: 'Meta Title',
          admin: {
            description: 'Custom title, np. "Internet w Warszawie - porównaj oferty"',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Meta Description',
        },
        {
          name: 'ogImage',
          type: 'upload',
          label: 'OG Image',
          relationTo: 'media',
        },
      ],
    },
  ],
}
