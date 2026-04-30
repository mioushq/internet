import type { CollectionConfig } from 'payload'

export const Promotions: CollectionConfig = {
  slug: 'promotions',
  labels: {
    singular: 'Promocja',
    plural: 'Promocje',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'placement', 'isActive', 'startDate', 'endDate'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nazwa wewnętrzna',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      label: 'Typ',
      required: true,
      options: [
        { label: 'Banner', value: 'banner' },
        { label: 'Sponsorowany box', value: 'sponsored_box' },
        { label: 'Featured strip', value: 'featured_strip' },
        { label: 'Popup', value: 'popup' },
      ],
    },
    {
      name: 'placement',
      type: 'select',
      label: 'Lokalizacja',
      required: true,
      options: [
        { label: 'Góra strony głównej', value: 'homepage_top' },
        { label: 'Sidebar', value: 'sidebar' },
        { label: 'Między wynikami', value: 'between_results' },
        { label: 'Stopka', value: 'footer' },
        { label: 'Strona kategorii', value: 'category_page' },
        { label: 'Strona miasta', value: 'city_page' },
      ],
    },
    {
      name: 'operator',
      type: 'relationship',
      label: 'Operator',
      relationTo: 'operators',
      admin: {
        description: 'Opcjonalnie — powiązany operator',
      },
    },
    {
      name: 'plan',
      type: 'relationship',
      label: 'Oferta',
      relationTo: 'plans',
      admin: {
        description: 'Opcjonalnie — powiązana oferta',
      },
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Grafika',
      relationTo: 'media',
    },
    {
      name: 'imageMobile',
      type: 'upload',
      label: 'Grafika (mobile)',
      relationTo: 'media',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Tytuł promocji',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Opis',
    },
    {
      name: 'ctaText',
      type: 'text',
      label: 'Tekst CTA',
      defaultValue: 'Sprawdź',
    },
    {
      name: 'ctaUrl',
      type: 'text',
      label: 'Link CTA',
    },
    {
      name: 'affiliateUrl',
      type: 'text',
      label: 'Link affiliate',
      admin: {
        description: 'Jeśli inny niż link CTA',
      },
    },
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Kolor tła',
      admin: {
        description: 'Hex, np. #FF6600',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Aktywna',
      defaultValue: true,
    },
    {
      name: 'startDate',
      type: 'date',
      label: 'Od kiedy',
    },
    {
      name: 'endDate',
      type: 'date',
      label: 'Do kiedy',
    },
    {
      name: 'impressionLimit',
      type: 'number',
      label: 'Limit wyświetleń',
      min: 0,
      admin: {
        description: '0 = bez limitu',
      },
    },
    {
      name: 'impressionCount',
      type: 'number',
      label: 'Licznik wyświetleń',
      defaultValue: 0,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'priority',
      type: 'number',
      label: 'Priorytet',
      defaultValue: 0,
      admin: {
        description: 'Wyższy = ważniejszy',
      },
    },
  ],
}
