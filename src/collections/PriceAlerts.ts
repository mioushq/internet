import type { CollectionConfig } from 'payload'

export const PriceAlerts: CollectionConfig = {
  slug: 'price-alerts',
  labels: { singular: 'Alert cenowy', plural: 'Alerty cenowe' },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'maxPrice', 'minSpeed', 'isActive', 'createdAt'],
    group: 'Dane',
  },
  access: {
    read: ({ req }) => !!req.user,
    create: () => true,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email',
    },
    {
      name: 'city',
      type: 'relationship',
      relationTo: 'cities',
      label: 'Miasto (opcjonalnie)',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      label: 'Kategoria (opcjonalnie)',
    },
    {
      name: 'maxPrice',
      type: 'number',
      label: 'Maksymalna cena (PLN/mies)',
      admin: { description: 'Powiadom gdy pojawi się oferta poniżej tej ceny' },
    },
    {
      name: 'minSpeed',
      type: 'number',
      label: 'Minimalna prędkość (Mbps)',
      admin: { description: 'Powiadom gdy pojawi się oferta z prędkością >= tej wartości' },
    },
    {
      name: 'operators',
      type: 'relationship',
      relationTo: 'operators',
      hasMany: true,
      label: 'Operatorzy (opcjonalnie — filtr)',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Aktywny',
    },
    {
      name: 'lastNotified',
      type: 'date',
      label: 'Ostatnie powiadomienie',
      admin: { readOnly: true },
    },
  ],
  timestamps: true,
}
