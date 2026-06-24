import type { Buffer } from 'node:buffer'

export function isEligibleForBlurDataUrl(mime?: string | null) {
    if (!mime?.startsWith('image/')) return false
    if (mime === 'image/svg+xml') return false
}

export async function generateBlurDataUrl(
    buffer?: Buffer<ArrayBufferLike>,
): Promise<string | null> {
    return null
}
