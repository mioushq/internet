import type { CollectionConfig } from 'payload'

export const Comparisons: CollectionConfig = {
  slug: 'comparisons',
  labels: { singular: 'Porównanie', plural: 'Porównania' },
  admin: {
    defaultColumns: ['sessionId', 'plans', 'createdAt'],
    group: 'Dane',
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'sessionId',
      type: 'text',
      required: true,
      label: 'ID sesji',
      admin: { description: 'Unikalny identyfikator sesji użytkownika' },
    },
    {
      name: 'plans',
      type: 'relationship',
      relationTo: 'plans',
      hasMany: true,
      required: true,
      label: 'Porównywane plany',
      maxRows: 4,
    },
    {
      name: 'ipHash',
      type: 'text',
      label: 'Hash IP',
      admin: { readOnly: true },
      access: { read: ({ req }) => !!req.user },
    },
  ],
  timestamps: true,
}
