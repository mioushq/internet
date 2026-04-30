import type { CollectionConfig } from 'payload'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  labels: { singular: 'Artykuł', plural: 'Artykuły' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'publishedAt', 'author'],
    group: 'Blog',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Tytuł',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Zajawka',
      admin: { description: 'Krótki opis do listy artykułów i meta description' },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Treść',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Obrazek wyróżniający',
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      label: 'Autor',
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'blog-categories',
      hasMany: true,
      label: 'Kategorie',
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tagi',
      fields: [
        { name: 'tag', type: 'text', required: true, label: 'Tag' },
      ],
    },
    {
      name: 'relatedOperators',
      type: 'relationship',
      relationTo: 'operators',
      hasMany: true,
      label: 'Powiązani operatorzy',
    },
    {
      name: 'relatedPlans',
      type: 'relationship',
      relationTo: 'plans',
      hasMany: true,
      label: 'Powiązane oferty',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      label: 'Status',
      options: [
        { label: 'Szkic', value: 'draft' },
        { label: 'Opublikowany', value: 'published' },
        { label: 'Archiwalny', value: 'archived' },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Data publikacji',
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    // --- SEO ---
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        { name: 'metaTitle', type: 'text', label: 'Meta Title' },
        { name: 'metaDescription', type: 'textarea', label: 'Meta Description' },
        { name: 'ogImage', type: 'upload', relationTo: 'media', label: 'OG Image' },
      ],
    },
  ],
  timestamps: true,
}
