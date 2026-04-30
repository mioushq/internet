import type { CollectionConfig } from 'payload'

export const AffiliateLinks: CollectionConfig = {
  slug: 'affiliate-links',
  labels: {
    singular: 'Link afiliacyjny',
    plural: 'Linki afiliacyjne',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'operator', 'commissionType', 'isActive'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nazwa konfiguracji',
      required: true,
    },
    {
      name: 'operator',
      type: 'relationship',
      label: 'Operator',
      relationTo: 'operators',
      required: true,
    },
    {
      name: 'baseUrl',
      type: 'text',
      label: 'Bazowy URL affiliate',
      required: true,
      admin: {
        description: 'np. https://partner.orange.pl/click/',
      },
    },
    {
      name: 'trackingParam',
      type: 'text',
      label: 'Parametr śledzący',
      defaultValue: 'ref',
      admin: {
        description: 'Nazwa parametru URL, np. "ref", "aff_id", "partner"',
      },
    },
    {
      name: 'trackingId',
      type: 'text',
      label: 'Nasz ID',
      required: true,
      admin: {
        description: 'Nasz identyfikator w systemie partnera',
      },
    },
    {
      name: 'additionalParams',
      type: 'array',
      label: 'Dodatkowe parametry URL',
      fields: [
        {
          name: 'key',
          type: 'text',
          label: 'Klucz',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          label: 'Wartość',
          required: true,
        },
      ],
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Aktywny',
      defaultValue: true,
    },
    {
      name: 'cookieDays',
      type: 'number',
      label: 'Czas cookie (dni)',
      defaultValue: 30,
    },
    {
      name: 'commissionType',
      type: 'select',
      label: 'Typ prowizji',
      options: [
        { label: 'CPC (za kliknięcie)', value: 'cpc' },
        { label: 'CPL (za lead)', value: 'cpl' },
        { label: 'CPS (za sprzedaż)', value: 'cps' },
      ],
    },
    {
      name: 'commissionRate',
      type: 'number',
      label: 'Stawka prowizji',
      admin: {
        description: 'PLN/klik, PLN/lead lub % od sprzedaży',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Notatki wewnętrzne',
    },
  ],
}
