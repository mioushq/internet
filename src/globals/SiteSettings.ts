import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Ustawienia strony',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      label: 'Nazwa strony',
      defaultValue: 'Porównywarka Internetu',
      required: true,
    },
    {
      name: 'siteDescription',
      type: 'textarea',
      label: 'Opis strony',
      defaultValue: 'Porównaj ceny internetu światłowodowego, 5G i kablowego od wszystkich operatorów w Polsce.',
    },
    {
      name: 'defaultLanguage',
      type: 'select',
      label: 'Język domyślny',
      defaultValue: 'pl',
      options: [
        { label: 'Polski', value: 'pl' },
        { label: 'English', value: 'en' },
      ],
    },
    {
      name: 'contactEmail',
      type: 'email',
      label: 'Email kontaktowy',
    },
    {
      name: 'socialLinks',
      type: 'group',
      label: 'Social media',
      fields: [
        { name: 'facebook', type: 'text', label: 'Facebook' },
        { name: 'twitter', type: 'text', label: 'Twitter/X' },
        { name: 'instagram', type: 'text', label: 'Instagram' },
        { name: 'linkedin', type: 'text', label: 'LinkedIn' },
      ],
    },
    {
      name: 'analytics',
      type: 'group',
      label: 'Analityka',
      fields: [
        {
          name: 'googleAnalyticsId',
          type: 'text',
          label: 'Google Analytics ID',
          admin: { description: 'np. G-XXXXXXXXXX' },
        },
        {
          name: 'googleTagManagerId',
          type: 'text',
          label: 'GTM ID',
        },
      ],
    },
    {
      name: 'cookieConsentText',
      type: 'textarea',
      label: 'Tekst cookie consent',
      defaultValue: 'Ta strona używa plików cookie w celu zapewnienia najwyższej jakości usług. Kontynuując korzystanie ze strony, zgadzasz się na ich użycie.',
    },
    {
      name: 'footer',
      type: 'group',
      label: 'Stopka',
      fields: [
        {
          name: 'text',
          type: 'richText',
          label: 'Tekst stopki',
        },
        {
          name: 'copyrightText',
          type: 'text',
          label: 'Copyright',
          defaultValue: '© 2025 Porównywarka Internetu. Wszelkie prawa zastrzeżone.',
        },
      ],
    },
  ],
}
