import type { CollectionConfig } from 'payload'
import { generateBlurDataUrl, isEligibleForBlurDataUrl } from './Media/lib/generate-blur-data-url'

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
            // Set required to false or conditionally validate it,
            // since it won't exist until the hook actually runs.
            required: false,
            admin: { hidden: true },
        },
    ],
    upload: true,
    hooks: {
        beforeChange: [
            async ({ operation, data, req }) => {
                if (operation !== 'create') return data
                if (!isEligibleForBlurDataUrl(req.file?.mimetype)) return data

                const base64 = await generateBlurDataUrl(req.file?.data)
                if (!base64) return data

                data.blurDataUrl = base64

                // FIXED: Corrected the template literal syntax and closing brackets here
                console.log(`Generated blur data URL for ${data.filename}`)

                return data
            },
        ],
    },
}
