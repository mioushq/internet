import type { CollectionConfig } from 'payload'

export const BlogCategories: CollectionConfig = {
  slug: 'blog-categories',
  labels: { singular: 'Kategoria bloga', plural: 'Kategorie bloga' },
  admin: {
    useAsTitle: 'name',
    group: 'Blog',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nazwa',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      admin: { description: 'URL-friendly identyfikator' },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Opis',
    },
  ],
}
