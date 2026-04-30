import type { CollectionConfig } from 'payload'

export const ClickEvents: CollectionConfig = {
  slug: 'click-events',
  labels: {
    singular: 'Kliknięcie',
    plural: 'Kliknięcia',
  },
  admin: {
    useAsTitle: 'eventType',
    defaultColumns: ['eventType', 'plan', 'operator', 'sourceUrl', 'createdAt'],
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'plan',
      type: 'relationship',
      label: 'Oferta',
      relationTo: 'plans',
    },
    {
      name: 'operator',
      type: 'relationship',
      label: 'Operator',
      relationTo: 'operators',
    },
    {
      name: 'promotion',
      type: 'relationship',
      label: 'Promocja',
      relationTo: 'promotions',
    },
    {
      name: 'eventType',
      type: 'select',
      label: 'Typ zdarzenia',
      required: true,
      options: [
        { label: 'Kliknięcie', value: 'click' },
        { label: 'Przekierowanie', value: 'redirect' },
        { label: 'Wyświetlenie', value: 'impression' },
        { label: 'Konwersja', value: 'conversion' },
      ],
    },
    {
      name: 'sourceUrl',
      type: 'text',
      label: 'Strona źródłowa',
    },
    {
      name: 'destinationUrl',
      type: 'text',
      label: 'URL docelowy',
    },
    {
      name: 'userAgent',
      type: 'text',
      label: 'User Agent',
    },
    {
      name: 'ipHash',
      type: 'text',
      label: 'IP Hash',
      admin: {
        description: 'Zhashowane IP — RODO compliant',
      },
    },
    {
      name: 'referrer',
      type: 'text',
      label: 'Referrer',
    },
    {
      name: 'utm',
      type: 'group',
      label: 'UTM',
      fields: [
        {
          name: 'source',
          type: 'text',
          label: 'UTM Source',
        },
        {
          name: 'medium',
          type: 'text',
          label: 'UTM Medium',
        },
        {
          name: 'campaign',
          type: 'text',
          label: 'UTM Campaign',
        },
        {
          name: 'term',
          type: 'text',
          label: 'UTM Term',
        },
        {
          name: 'content',
          type: 'text',
          label: 'UTM Content',
        },
      ],
    },
    {
      name: 'device',
      type: 'group',
      label: 'Urządzenie',
      fields: [
        {
          name: 'type',
          type: 'select',
          label: 'Typ',
          options: [
            { label: 'Desktop', value: 'desktop' },
            { label: 'Mobile', value: 'mobile' },
            { label: 'Tablet', value: 'tablet' },
          ],
        },
        {
          name: 'browser',
          type: 'text',
          label: 'Przeglądarka',
        },
        {
          name: 'os',
          type: 'text',
          label: 'System operacyjny',
        },
      ],
    },
    {
      name: 'city',
      type: 'relationship',
      label: 'Miasto (kontekst)',
      relationTo: 'cities',
      admin: {
        description: 'Z jakiej strony miasta kliknięto',
      },
    },
  ],
  timestamps: true,
}
