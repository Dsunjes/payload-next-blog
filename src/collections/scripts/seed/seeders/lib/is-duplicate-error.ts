import { z } from 'zod'

const payloadErrorSchema = z.object({
    name: z.string(),
    status: z.number(),
    data: z.object({
        collection: z.string(),
        errors: z.array(
            z.object({
                message: z.string(),
                path: z.string(),
            }),
        ),
    }),
})

type PayloadErrorLike = z.infer<typeof payloadErrorSchema>

function isPayloadError(error: unknown): error is PayloadErrorLike {
    return payloadErrorSchema.safeParse(error).success
}

export function isDuplicateError(error: unknown): boolean {
    return false
}
