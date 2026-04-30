import type { GlobalConfig } from 'payload'

const linkFields = [
  {
    name: 'label',
    type: 'text' as const,
    label: 'Etykieta',
    required: true,
  },
  {
    name: 'url',
    type: 'text' as const,
    label: 'URL',
    required: true,
  },
  {
    name: 'isExternal',
    type: 'checkbox' as const,
    label: 'Link zewnętrzny',
    defaultValue: false,
  },
  {
    name: 'openInNewTab',
    type: 'checkbox' as const,
    label: 'Otwórz w nowej karcie',
    defaultValue: false,
  },
]

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Nawigacja',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'mainMenu',
      type: 'array',
      label: 'Menu główne',
      fields: [
        ...linkFields,
        {
          name: 'children',
          type: 'array',
          label: 'Podmenu',
          fields: linkFields,
        },
      ],
    },
    {
      name: 'footerMenu',
      type: 'array',
      label: 'Menu stopki',
      fields: [
        {
          name: 'columnTitle',
          type: 'text',
          label: 'Tytuł kolumny',
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          label: 'Linki',
          fields: linkFields,
        },
      ],
    },
    {
      name: 'mobileMenu',
      type: 'array',
      label: 'Menu mobile',
      admin: {
        description: 'Jeśli puste, używa menu głównego',
      },
      fields: linkFields,
    },
  ],
}
