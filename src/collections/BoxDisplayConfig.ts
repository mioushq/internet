import type { CollectionConfig } from 'payload'

export const BoxDisplayConfig: CollectionConfig = {
  slug: 'box-display-config',
  labels: {
    singular: 'Konfiguracja boxów',
    plural: 'Konfiguracje boxów',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'layout', 'isDefault'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nazwa konfiguracji',
      required: true,
      admin: {
        description: 'np. "Domyślny box", "Kompaktowy", "Szczegółowy"',
      },
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Identyfikator',
      unique: true,
      required: true,
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Layout',
      required: true,
      defaultValue: 'card',
      options: [
        { label: 'Karta (card)', value: 'card' },
        { label: 'Wiersz (row)', value: 'row' },
        { label: 'Kompaktowy', value: 'compact' },
        { label: 'Szczegółowy', value: 'detailed' },
      ],
    },
    {
      name: 'visibleFields',
      type: 'array',
      label: 'Widoczne pola na boxie',
      admin: {
        description: 'Wybierz które informacje pokazywać na boxie oferty',
      },
      fields: [
        {
          name: 'fieldName',
          type: 'select',
          label: 'Pole',
          required: true,
          options: [
            { label: 'Prędkość pobierania', value: 'speedDownload' },
            { label: 'Prędkość wysyłania', value: 'speedUpload' },
            { label: 'Cena miesięczna', value: 'priceMonthly' },
            { label: 'Cena promocyjna', value: 'pricePromo' },
            { label: 'Cena po promocji', value: 'priceAfterPromo' },
            { label: 'Okres umowy', value: 'contractMonths' },
            { label: 'Koszt 24 mies.', value: 'totalCost24m' },
            { label: 'Opłata instalacyjna', value: 'installationFee' },
            { label: 'Technologia', value: 'technology' },
            { label: 'Cechy dodatkowe', value: 'features' },
            { label: 'TV w pakiecie', value: 'includesTV' },
            { label: 'Telefon w pakiecie', value: 'includesPhone' },
            { label: 'Router w cenie', value: 'freeRouter' },
            { label: 'Ocena operatora', value: 'rating' },
          ],
        },
        {
          name: 'label',
          type: 'text',
          label: 'Etykieta',
          admin: {
            description: 'Custom etykieta, np. "Prędkość", "Cena/mies."',
          },
        },
        {
          name: 'displayOrder',
          type: 'number',
          label: 'Kolejność',
          defaultValue: 0,
        },
        {
          name: 'showOnMobile',
          type: 'checkbox',
          label: 'Pokaż na mobile',
          defaultValue: true,
        },
      ],
    },
    {
      name: 'showOperatorLogo',
      type: 'checkbox',
      label: 'Pokaż logo operatora',
      defaultValue: true,
    },
    {
      name: 'showBadge',
      type: 'checkbox',
      label: 'Pokaż badge',
      defaultValue: true,
    },
    {
      name: 'showRating',
      type: 'checkbox',
      label: 'Pokaż ocenę',
      defaultValue: true,
    },
    {
      name: 'showSponsored',
      type: 'checkbox',
      label: 'Pokaż label "Sponsorowane"',
      defaultValue: true,
    },
    {
      name: 'ctaButtonText',
      type: 'text',
      label: 'Tekst CTA',
      defaultValue: 'Sprawdź ofertę',
    },
    {
      name: 'ctaButtonColor',
      type: 'text',
      label: 'Kolor CTA',
      defaultValue: '#2563eb',
      admin: {
        description: 'Hex kolor, np. #2563eb',
      },
    },
    {
      name: 'isDefault',
      type: 'checkbox',
      label: 'Domyślna konfiguracja',
      defaultValue: false,
    },
  ],
}
