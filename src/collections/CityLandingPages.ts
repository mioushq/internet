import type { CollectionConfig } from 'payload'

export const CityLandingPages: CollectionConfig = {
  slug: 'city-landing-pages',
  labels: {
    singular: 'Landing Page (miasto)',
    plural: 'Landing Pages (miasta)',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'city', 'category', 'isActive'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Tytuł wewnętrzny',
      required: true,
      admin: {
        description: 'np. "Światłowód Warszawa" — do identyfikacji w panelu',
      },
    },
    {
      name: 'city',
      type: 'relationship',
      label: 'Miasto',
      relationTo: 'cities',
      required: true,
    },
    {
      name: 'category',
      type: 'relationship',
      label: 'Kategoria',
      relationTo: 'categories',
      admin: {
        description: 'Puste = ogólna strona miasta (wszystkie kategorie)',
      },
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      unique: true,
      admin: {
        description: 'Auto-generowany z miasta + kategorii',
      },
    },
    // --- TREŚĆ ---
    {
      name: 'content',
      type: 'group',
      label: 'Treść strony',
      fields: [
        {
          name: 'h1',
          type: 'text',
          label: 'Nagłówek H1',
          required: true,
          admin: {
            description: 'np. "Internet światłowodowy w Warszawie - porównaj oferty 2025"',
          },
        },
        {
          name: 'heroText',
          type: 'richText',
          label: 'Tekst powitalny',
          admin: {
            description: 'Krótki tekst pod nagłówkiem',
          },
        },
        {
          name: 'bodyContent',
          type: 'richText',
          label: 'Treść strony',
          admin: {
            description: 'Unikalna treść per miasto — ważne dla SEO!',
          },
        },
        {
          name: 'faqItems',
          type: 'array',
          label: 'FAQ (Schema.org)',
          admin: {
            description: 'Pytania i odpowiedzi — wyświetlane jako FAQ Schema w Google',
          },
          fields: [
            {
              name: 'question',
              type: 'text',
              label: 'Pytanie',
              required: true,
            },
            {
              name: 'answer',
              type: 'richText',
              label: 'Odpowiedź',
              required: true,
            },
          ],
        },
        {
          name: 'ctaText',
          type: 'text',
          label: 'Tekst CTA',
          defaultValue: 'Porównaj oferty',
        },
      ],
    },
    // --- WYRÓŻNIONE OFERTY ---
    {
      name: 'featured',
      type: 'group',
      label: 'Wyróżnione oferty',
      fields: [
        {
          name: 'operators',
          type: 'relationship',
          label: 'Wyróżnieni operatorzy',
          relationTo: 'operators',
          hasMany: true,
        },
        {
          name: 'plans',
          type: 'relationship',
          label: 'Wyróżnione oferty',
          relationTo: 'plans',
          hasMany: true,
        },
        {
          name: 'customSortOrder',
          type: 'array',
          label: 'Ręczna kolejność operatorów',
          fields: [
            {
              name: 'operator',
              type: 'relationship',
              relationTo: 'operators',
              required: true,
            },
            {
              name: 'position',
              type: 'number',
              label: 'Pozycja',
              required: true,
            },
          ],
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
          admin: {
            description: 'Custom SEO title. Domyślnie generowany z szablonu kategorii.',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Meta Description',
        },
        {
          name: 'canonicalUrl',
          type: 'text',
          label: 'Canonical URL',
          admin: {
            description: 'Nadpisanie canonical URL — unikanie duplikatów',
          },
        },
        {
          name: 'ogImage',
          type: 'upload',
          label: 'OG Image',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Aktywna',
      defaultValue: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Data publikacji',
    },
  ],
}
