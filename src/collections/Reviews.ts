import type { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  labels: { singular: 'Opinia', plural: 'Opinie' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'operator', 'rating', 'isApproved', 'createdAt'],
    group: 'Treści',
  },
  access: {
    read: () => true,
    create: () => true,
  },
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        if (operation === 'create' || operation === 'update') {
          try {
            const operatorId = typeof doc.operator === 'object' ? doc.operator.id : doc.operator
            if (!operatorId) return

            const reviews = await req.payload.find({
              collection: 'reviews',
              where: {
                operator: { equals: operatorId },
                isApproved: { equals: true },
              },
              limit: 0,
            })

            if (reviews.totalDocs > 0) {
              const allReviews = await req.payload.find({
                collection: 'reviews',
                where: {
                  operator: { equals: operatorId },
                  isApproved: { equals: true },
                },
                limit: 1000,
              })

              const avgRating =
                allReviews.docs.reduce((sum, r) => sum + (r.rating || 0), 0) / allReviews.totalDocs

              await req.payload.update({
                collection: 'operators',
                id: operatorId,
                data: {
                  rating: Math.round(avgRating * 10) / 10,
                  reviewCount: allReviews.totalDocs,
                } as any,
              })
            }
          } catch (e) {
            console.error('Reviews afterChange hook error:', e)
          }
        }
      },
    ],
  },
  fields: [
    {
      name: 'author',
      type: 'text',
      required: true,
      label: 'Autor (nick)',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      admin: { description: 'Ukryty, nie wyświetlany publicznie' },
      access: { read: ({ req }) => !!req.user },
    },
    {
      name: 'operator',
      type: 'relationship',
      relationTo: 'operators',
      required: true,
      label: 'Operator',
    },
    {
      name: 'plan',
      type: 'relationship',
      relationTo: 'plans',
      label: 'Plan (opcjonalnie)',
    },
    {
      name: 'city',
      type: 'relationship',
      relationTo: 'cities',
      label: 'Miasto (opcjonalnie)',
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      label: 'Ocena (1-5)',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Tytuł opinii',
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
      label: 'Treść opinii',
    },
    {
      name: 'pros',
      type: 'array',
      label: 'Zalety',
      fields: [
        { name: 'text', type: 'text', required: true, label: 'Zaleta' },
      ],
    },
    {
      name: 'cons',
      type: 'array',
      label: 'Wady',
      fields: [
        { name: 'text', type: 'text', required: true, label: 'Wada' },
      ],
    },
    {
      name: 'isVerified',
      type: 'checkbox',
      defaultValue: false,
      label: 'Zweryfikowana',
      admin: { description: 'Potwierdzona opinia (np. od klienta)' },
    },
    {
      name: 'isApproved',
      type: 'checkbox',
      defaultValue: false,
      label: 'Zatwierdzona',
      admin: { description: 'Moderacja — widoczna publicznie po zatwierdzeniu' },
    },
    {
      name: 'ipHash',
      type: 'text',
      label: 'Hash IP',
      admin: { readOnly: true, position: 'sidebar' },
      access: { read: ({ req }) => !!req.user },
    },
  ],
  timestamps: true,
}
