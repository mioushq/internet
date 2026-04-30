import type { CollectionConfig } from 'payload'

export const AnalyticsDaily: CollectionConfig = {
  slug: 'analytics-daily',
  labels: { singular: 'Analityka dzienna', plural: 'Analityka dzienna' },
  admin: {
    defaultColumns: ['date', 'operator', 'plan', 'clicks', 'impressions', 'redirects'],
    group: 'Dane',
  },
  access: {
    read: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'date',
      type: 'date',
      required: true,
      label: 'Data',
    },
    {
      name: 'operator',
      type: 'relationship',
      relationTo: 'operators',
      label: 'Operator',
    },
    {
      name: 'plan',
      type: 'relationship',
      relationTo: 'plans',
      label: 'Plan',
    },
    {
      name: 'city',
      type: 'relationship',
      relationTo: 'cities',
      label: 'Miasto',
    },
    {
      name: 'clicks',
      type: 'number',
      defaultValue: 0,
      label: 'Kliknięcia',
    },
    {
      name: 'impressions',
      type: 'number',
      defaultValue: 0,
      label: 'Wyświetlenia',
    },
    {
      name: 'redirects',
      type: 'number',
      defaultValue: 0,
      label: 'Przekierowania affiliate',
    },
    {
      name: 'conversions',
      type: 'number',
      defaultValue: 0,
      label: 'Konwersje',
    },
    {
      name: 'ctr',
      type: 'number',
      label: 'CTR (%)',
      admin: { readOnly: true, description: 'Click-through rate = clicks/impressions * 100' },
    },
    {
      name: 'revenue',
      type: 'number',
      defaultValue: 0,
      label: 'Przychód (PLN)',
    },
  ],
  timestamps: true,
}
