import type { CollectionConfig } from 'payload'

export const Operators: CollectionConfig = {
  slug: 'operators',
  labels: {
    singular: 'Operator',
    plural: 'Operatorzy',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'isPremiumPartner', 'rating', 'priority', 'isActive'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nazwa operatora',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      unique: true,
      required: true,
      admin: {
        description: 'URL-friendly nazwa, np. "orange", "play", "upc"',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      label: 'Logo',
      relationTo: 'media',
    },
    {
      name: 'logoDark',
      type: 'upload',
      label: 'Logo (ciemne tło)',
      relationTo: 'media',
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Opis operatora',
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Krótki opis',
      maxLength: 200,
      admin: {
        description: 'Wyświetlany na boxach i w listach',
      },
    },
    {
      name: 'website',
      type: 'text',
      label: 'Strona WWW',
      admin: {
        description: 'Oficjalna strona operatora',
      },
    },
    {
      name: 'supportPhone',
      type: 'text',
      label: 'Telefon BOK',
    },
    {
      name: 'coverageMapUrl',
      type: 'text',
      label: 'Mapa zasięgu URL',
    },
    {
      name: 'rating',
      type: 'number',
      label: 'Ocena',
      min: 1,
      max: 5,
      admin: {
        step: 0.1,
        description: 'Średnia ocena 1-5',
      },
    },
    {
      name: 'reviewCount',
      type: 'number',
      label: 'Liczba opinii',
      defaultValue: 0,
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Aktywny',
      defaultValue: true,
    },
    {
      name: 'isPremiumPartner',
      type: 'checkbox',
      label: 'Partner premium',
      defaultValue: false,
      admin: {
        description: 'Partnerzy premium są wyróżnieni na stronie (monetyzacja)',
      },
    },
    {
      name: 'priority',
      type: 'number',
      label: 'Priorytet wyświetlania',
      defaultValue: 0,
      admin: {
        description: 'Wyższy = wyżej na liście. Płatne wyższe pozycje.',
      },
    },
    {
      name: 'commission',
      type: 'group',
      label: 'Prowizja (wewnętrzne)',
      admin: {
        description: 'Dane prowizji — widoczne tylko dla admina',
      },
      fields: [
        {
          name: 'type',
          type: 'select',
          label: 'Typ prowizji',
          options: [
            { label: 'CPC (za kliknięcie)', value: 'cpc' },
            { label: 'CPL (za lead)', value: 'cpl' },
            { label: 'CPS (za sprzedaż)', value: 'cps' },
            { label: 'Flat fee', value: 'flat' },
          ],
        },
        {
          name: 'value',
          type: 'number',
          label: 'Wartość prowizji',
          admin: {
            description: 'CPC: PLN/klik, CPL: PLN/lead, CPS: %, Flat: PLN/mies',
          },
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Kontakt wewnętrzny',
      admin: {
        description: 'Dane kontaktowe — widoczne tylko dla admina',
      },
      fields: [
        {
          name: 'person',
          type: 'text',
          label: 'Osoba kontaktowa',
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email',
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Telefon',
        },
        {
          name: 'notes',
          type: 'textarea',
          label: 'Notatki',
        },
      ],
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
