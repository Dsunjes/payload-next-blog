import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
    slug: 'media',
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            required: true,
        },
        {
            name: 'blurDataUrl',
            type: 'text',
            required: true,
            admin: { hidden: true },
        },
    ],
    upload: true,
    hooks: {
        beforeChange: [
            ({ operation, data, req }) => {
                if (operation !== 'create') return data
            },
        ],
    },
}
