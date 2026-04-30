import type { GlobalConfig } from 'payload'

export const ComparisonConfig: GlobalConfig = {
  slug: 'comparison-config',
  label: 'Konfiguracja porównywarki',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'defaultSortBy',
      type: 'select',
      label: 'Domyślne sortowanie',
      defaultValue: 'price',
      options: [
        { label: 'Cena (najniższa)', value: 'price' },
        { label: 'Prędkość (najwyższa)', value: 'speed' },
        { label: 'Ocena (najwyższa)', value: 'rating' },
        { label: 'Promowane pierwsze', value: 'promoted' },
        { label: 'Priorytet (ręczny)', value: 'priority' },
      ],
    },
    {
      name: 'resultsPerPage',
      type: 'number',
      label: 'Wyników na stronę',
      defaultValue: 20,
      min: 5,
      max: 100,
    },
    {
      name: 'showSponsoredFirst',
      type: 'checkbox',
      label: 'Sponsorowane na górze',
      defaultValue: true,
      admin: {
        description: 'Oferty sponsorowane zawsze wyświetlane jako pierwsze',
      },
    },
    {
      name: 'defaultCategory',
      type: 'relationship',
      label: 'Domyślna kategoria',
      relationTo: 'categories',
    },
    {
      name: 'enableClickTracking',
      type: 'checkbox',
      label: 'Włącz tracking kliknięć',
      defaultValue: true,
    },
    {
      name: 'defaultBoxConfig',
      type: 'relationship',
      label: 'Domyślna konfiguracja boxów',
      relationTo: 'box-display-config',
    },
    {
      name: 'availableFilters',
      type: 'group',
      label: 'Dostępne filtry',
      fields: [
        {
          name: 'showCategoryFilter',
          type: 'checkbox',
          label: 'Filtr kategorii',
          defaultValue: true,
        },
        {
          name: 'showSpeedFilter',
          type: 'checkbox',
          label: 'Filtr prędkości',
          defaultValue: true,
        },
        {
          name: 'showPriceFilter',
          type: 'checkbox',
          label: 'Filtr ceny',
          defaultValue: true,
        },
        {
          name: 'showOperatorFilter',
          type: 'checkbox',
          label: 'Filtr operatora',
          defaultValue: true,
        },
        {
          name: 'showContractFilter',
          type: 'checkbox',
          label: 'Filtr umowy',
          defaultValue: true,
        },
        {
          name: 'showTechnologyFilter',
          type: 'checkbox',
          label: 'Filtr technologii',
          defaultValue: true,
        },
        {
          name: 'showCityFilter',
          type: 'checkbox',
          label: 'Filtr miasta',
          defaultValue: true,
        },
      ],
    },
    {
      name: 'speedRanges',
      type: 'array',
      label: 'Zakresy prędkości (filtry)',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Etykieta',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          label: 'Slug URL',
          required: true,
          admin: {
            description: 'np. "100mb", "300mb", "1gb"',
          },
        },
        {
          name: 'minSpeed',
          type: 'number',
          label: 'Min Mbps',
          required: true,
        },
        {
          name: 'maxSpeed',
          type: 'number',
          label: 'Max Mbps',
          admin: {
            description: 'Puste = bez limitu',
          },
        },
      ],
    },
  ],
}
