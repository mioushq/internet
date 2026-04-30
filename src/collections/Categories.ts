import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: 'Kategoria',
    plural: 'Kategorie',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'urlPrefix', 'sortOrder', 'isActive'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nazwa',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      unique: true,
      required: true,
      admin: {
        description: 'Auto-generowany z nazwy. Używany w URL.',
      },
    },
    {
      name: 'urlPrefix',
      type: 'text',
      label: 'Prefix URL',
      required: true,
      unique: true,
      admin: {
        description: 'Prefix używany w URL, np. "internet-swiatlowodowy", "internet-5g"',
      },
    },
    {
      name: 'icon',
      type: 'text',
      label: 'Ikona (Lucide)',
      admin: {
        description: 'Nazwa ikony z Lucide, np. "wifi", "signal", "cable"',
      },
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Opis kategorii',
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Krótki opis',
      admin: {
        description: 'Używany w meta description i na kartach',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      label: 'Kolejność',
      defaultValue: 0,
      admin: {
        description: 'Wyższa wartość = wyżej na liście',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Aktywna',
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
            description: 'Szablon: użyj {{category}} i {{city}} jako placeholdery',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Meta Description',
          admin: {
            description: 'Szablon: użyj {{category}} i {{city}} jako placeholdery',
          },
        },
        {
          name: 'h1Template',
          type: 'text',
          label: 'Szablon H1',
          admin: {
            description: 'np. "Internet światłowodowy w {{city}} - porównaj oferty"',
          },
        },
        {
          name: 'contentTemplate',
          type: 'richText',
          label: 'Szablon treści',
          admin: {
            description: 'Szablon treści dla stron z miastem. Użyj {{city}}, {{category}}.',
          },
        },
      ],
    },
  ],
}
