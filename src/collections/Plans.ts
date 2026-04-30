import type { CollectionConfig } from 'payload'

export const Plans: CollectionConfig = {
  slug: 'plans',
  labels: {
    singular: 'Oferta',
    plural: 'Oferty',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'operator', 'category', 'pricing_priceMonthly', 'speeds_speedDownload', 'isActive'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nazwa oferty',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      unique: true,
      required: true,
      admin: {
        description: 'URL-friendly, np. "orange-300mb-swiatlowod"',
      },
    },
    {
      name: 'operator',
      type: 'relationship',
      label: 'Operator',
      relationTo: 'operators',
      required: true,
      hasMany: false,
    },
    {
      name: 'category',
      type: 'relationship',
      label: 'Kategoria',
      relationTo: 'categories',
      required: true,
      hasMany: false,
    },
    {
      name: 'technology',
      type: 'select',
      label: 'Technologia',
      required: true,
      options: [
        { label: 'FTTH (światłowód do domu)', value: 'ftth' },
        { label: 'FTTB (światłowód do budynku)', value: 'fttb' },
        { label: 'HFC (kabel)', value: 'hfc' },
        { label: '5G', value: '5g' },
        { label: 'LTE', value: 'lte' },
        { label: 'DSL', value: 'dsl' },
        { label: 'Satelita', value: 'satellite' },
      ],
    },
    // --- PRĘDKOŚCI ---
    {
      name: 'speeds',
      type: 'group',
      label: 'Prędkości',
      fields: [
        {
          name: 'download',
          type: 'number',
          label: 'Pobieranie (Mbps)',
          required: true,
          min: 1,
        },
        {
          name: 'upload',
          type: 'number',
          label: 'Wysyłanie (Mbps)',
          min: 1,
        },
        {
          name: 'guaranteed',
          type: 'number',
          label: 'Gwarantowana (Mbps)',
          admin: {
            description: 'Minimalna gwarantowana prędkość',
          },
        },
      ],
    },
    // --- CENY ---
    {
      name: 'pricing',
      type: 'group',
      label: 'Ceny',
      fields: [
        {
          name: 'priceMonthly',
          type: 'number',
          label: 'Cena miesięczna (PLN)',
          required: true,
          min: 0,
          admin: {
            step: 0.01,
          },
        },
        {
          name: 'pricePromo',
          type: 'number',
          label: 'Cena promocyjna (PLN)',
          min: 0,
          admin: {
            step: 0.01,
            description: 'Cena w okresie promocyjnym',
          },
        },
        {
          name: 'promoMonths',
          type: 'number',
          label: 'Miesiące promocji',
          min: 0,
          admin: {
            description: 'Ile miesięcy trwa cena promocyjna',
          },
        },
        {
          name: 'priceAfterPromo',
          type: 'number',
          label: 'Cena po promocji (PLN)',
          min: 0,
          admin: {
            step: 0.01,
          },
        },
        {
          name: 'installationFee',
          type: 'number',
          label: 'Opłata instalacyjna (PLN)',
          defaultValue: 0,
          min: 0,
          admin: {
            step: 0.01,
          },
        },
        {
          name: 'activationFee',
          type: 'number',
          label: 'Opłata aktywacyjna (PLN)',
          defaultValue: 0,
          min: 0,
          admin: {
            step: 0.01,
          },
        },
        {
          name: 'totalCost24m',
          type: 'number',
          label: 'Łączny koszt 24 mies. (PLN)',
          admin: {
            readOnly: true,
            description: 'Auto-kalkulowany: (promo * promoMonths) + (regular * remaining) + installation',
          },
        },
      ],
    },
    // --- UMOWA ---
    {
      name: 'contract',
      type: 'group',
      label: 'Umowa',
      fields: [
        {
          name: 'months',
          type: 'select',
          label: 'Okres umowy',
          required: true,
          options: [
            { label: 'Bez umowy', value: '0' },
            { label: '12 miesięcy', value: '12' },
            { label: '24 miesiące', value: '24' },
            { label: '36 miesięcy', value: '36' },
          ],
        },
        {
          name: 'cancellationFee',
          type: 'number',
          label: 'Kara za zerwanie (PLN)',
          min: 0,
        },
        {
          name: 'freeRouterIncluded',
          type: 'checkbox',
          label: 'Router w cenie',
          defaultValue: false,
        },
        {
          name: 'routerModel',
          type: 'text',
          label: 'Model routera',
        },
      ],
    },
    // --- DODATKI ---
    {
      name: 'extras',
      type: 'group',
      label: 'Dodatki do pakietu',
      fields: [
        {
          name: 'includesTV',
          type: 'checkbox',
          label: 'TV w pakiecie',
          defaultValue: false,
        },
        {
          name: 'tvChannels',
          type: 'number',
          label: 'Liczba kanałów TV',
          min: 0,
          admin: {
            condition: (data, siblingData) => siblingData?.includesTV,
          },
        },
        {
          name: 'includesPhone',
          type: 'checkbox',
          label: 'Telefon stacjonarny w pakiecie',
          defaultValue: false,
        },
        {
          name: 'includesMobile',
          type: 'checkbox',
          label: 'Komórka w pakiecie',
          defaultValue: false,
        },
        {
          name: 'features',
          type: 'array',
          label: 'Cechy dodatkowe',
          fields: [
            {
              name: 'feature',
              type: 'text',
              label: 'Cecha',
              required: true,
            },
          ],
        },
        {
          name: 'additionalInfo',
          type: 'richText',
          label: 'Dodatkowe informacje',
        },
      ],
    },
    // --- WYŚWIETLANIE NA BOXACH ---
    {
      name: 'display',
      type: 'group',
      label: 'Wyświetlanie',
      admin: {
        description: 'Kontroluje jak oferta wygląda na stronie',
      },
      fields: [
        {
          name: 'badge',
          type: 'text',
          label: 'Badge',
          admin: {
            description: 'Tekst badge np. "Najlepsza cena", "Polecamy", "HOT"',
          },
        },
        {
          name: 'badgeColor',
          type: 'select',
          label: 'Kolor badge',
          options: [
            { label: 'Zielony', value: 'green' },
            { label: 'Niebieski', value: 'blue' },
            { label: 'Czerwony', value: 'red' },
            { label: 'Pomarańczowy', value: 'orange' },
            { label: 'Fioletowy', value: 'purple' },
            { label: 'Złoty', value: 'gold' },
          ],
        },
        {
          name: 'highlightBox',
          type: 'checkbox',
          label: 'Wyróżniony box',
          defaultValue: false,
          admin: {
            description: 'Wyróżnione obramowanie i cień',
          },
        },
        {
          name: 'customCTA',
          type: 'text',
          label: 'Custom CTA',
          admin: {
            description: 'Własny tekst przycisku, np. "Zamów teraz", "Sprawdź ofertę"',
          },
        },
        {
          name: 'sortOrder',
          type: 'number',
          label: 'Kolejność ręczna',
          defaultValue: 0,
          admin: {
            description: 'Wyższy = wyżej na liście',
          },
        },
      ],
    },
    // --- AFFILIATE ---
    {
      name: 'affiliate',
      type: 'group',
      label: 'Affiliate / Monetyzacja',
      admin: {
        description: 'Linki afiliacyjne i przekierowania',
      },
      fields: [
        {
          name: 'url',
          type: 'text',
          label: 'Link afiliacyjny',
          admin: {
            description: 'Docelowy URL z parametrami śledzenia',
          },
        },
        {
          name: 'affiliateId',
          type: 'text',
          label: 'ID afiliacyjne',
          admin: {
            description: 'Nasz ID w systemie partnera',
          },
        },
        {
          name: 'landingPageUrl',
          type: 'text',
          label: 'Landing page operatora',
          admin: {
            description: 'Strona docelowa u operatora',
          },
        },
      ],
    },
    // --- SPONSORING ---
    {
      name: 'sponsoring',
      type: 'group',
      label: 'Sponsoring',
      admin: {
        description: 'Oferta sponsorowana / promowana',
      },
      fields: [
        {
          name: 'isSponsored',
          type: 'checkbox',
          label: 'Sponsorowana',
          defaultValue: false,
        },
        {
          name: 'sponsoredLabel',
          type: 'text',
          label: 'Label sponsorowania',
          defaultValue: 'Promowane',
          admin: {
            description: '"Reklama", "Promowane", "Polecane"',
            condition: (data, siblingData) => siblingData?.isSponsored,
          },
        },
        {
          name: 'sponsoredFrom',
          type: 'date',
          label: 'Sponsoring od',
          admin: {
            condition: (data, siblingData) => siblingData?.isSponsored,
          },
        },
        {
          name: 'sponsoredUntil',
          type: 'date',
          label: 'Sponsoring do',
          admin: {
            condition: (data, siblingData) => siblingData?.isSponsored,
          },
        },
      ],
    },
    // --- DOSTĘPNOŚĆ ---
    {
      name: 'availability',
      type: 'group',
      label: 'Dostępność',
      fields: [
        {
          name: 'isActive',
          type: 'checkbox',
          label: 'Aktywna',
          defaultValue: true,
        },
        {
          name: 'isPromoted',
          type: 'checkbox',
          label: 'Promowana na stronie głównej',
          defaultValue: false,
        },
        {
          name: 'regions',
          type: 'relationship',
          label: 'Dostępne miasta',
          relationTo: 'cities',
          hasMany: true,
          admin: {
            description: 'Pozostaw puste = dostępna wszędzie',
          },
        },
        {
          name: 'validFrom',
          type: 'date',
          label: 'Ważna od',
        },
        {
          name: 'validUntil',
          type: 'date',
          label: 'Ważna do',
        },
      ],
    },
    // --- SEO ---
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
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Auto-calculate totalCost24m
        if (data?.pricing) {
          const { priceMonthly, pricePromo, promoMonths, installationFee, activationFee } = data.pricing
          const contractMonths = parseInt(data?.contract?.months || '24', 10)
          if (contractMonths > 0 && priceMonthly) {
            const promoTotal = (pricePromo || priceMonthly) * (promoMonths || 0)
            const regularMonths = Math.max(0, contractMonths - (promoMonths || 0))
            const regularTotal = priceMonthly * regularMonths
            data.pricing.totalCost24m = promoTotal + regularTotal + (installationFee || 0) + (activationFee || 0)
          }
        }
        return data
      },
    ],
  },
}
