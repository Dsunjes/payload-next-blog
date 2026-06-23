import { getPayload } from 'payload'
import config from '@/payload.config'
import { isDuplicateError } from './lib/is-duplicate-error'
import { env } from '@/lib/env'

export async function seedAdmin() {
    const payload = await getPayload({ config })

    try {
        // 🔍 Check if user already exists
        const existing = await payload.find({
            collection: 'users',
            where: {
                email: {
                    equals: email,
                },
            },
        })

        if (existing.docs.length > 0) {
            console.log('✅ Admin already exists')
            return
        }

        // ➕ Create user if not exists
        const response = await payload.create({
            collection: 'users',
            data: {
                email: env.CMS_SEED_ADMIN_EMAIL,
                password: env.CMS_SEED_ADMIN_PASSWORD,
            },
        })

        console.log('✅ Admin user created:', response)
    } catch (error: any) {
        console.error('❌ Error seeding admin user:', JSON.stringify(error, null, 2))
    }
}
