import type { CollectionConfig } from 'payload'

export const SpeedStats: CollectionConfig = {
  slug: 'speed-stats',
  labels: { singular: 'Statystyka prędkości', plural: 'Statystyki prędkości' },
  admin: {
    useAsTitle: 'period',
    defaultColumns: ['city', 'operator', 'period', 'avgDownload', 'avgUpload'],
    group: 'Dane',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'city',
      type: 'relationship',
      relationTo: 'cities',
      required: true,
      label: 'Miasto',
    },
    {
      name: 'operator',
      type: 'relationship',
      relationTo: 'operators',
      label: 'Operator (opcjonalnie — null = średnia dla miasta)',
    },
    {
      name: 'period',
      type: 'text',
      required: true,
      label: 'Okres',
      admin: { description: 'Np. 2025-Q1, 2025-Q2' },
    },
    {
      name: 'avgDownload',
      type: 'number',
      required: true,
      label: 'Średnia prędkość pobierania (Mbps)',
    },
    {
      name: 'avgUpload',
      type: 'number',
      required: true,
      label: 'Średnia prędkość wysyłania (Mbps)',
    },
    {
      name: 'avgLatency',
      type: 'number',
      label: 'Średni ping (ms)',
    },
    {
      name: 'sampleCount',
      type: 'number',
      label: 'Liczba próbek',
    },
    {
      name: 'source',
      type: 'select',
      required: true,
      label: 'Źródło danych',
      options: [
        { label: 'Ookla Speedtest', value: 'ookla' },
        { label: 'Zgłoszone przez użytkowników', value: 'user-reported' },
        { label: 'UKE', value: 'uke' },
      ],
    },
    {
      name: 'dataDate',
      type: 'date',
      label: 'Data danych',
    },
  ],
  timestamps: true,
}
