import type { ValidationContext } from 'sanity'

type AssetValue = { asset?: { _ref?: string } } | undefined

/**
 * Sanity has no built-in file-size validator for image/file fields — the asset
 * is already uploaded by the time validation runs, so this fetches the asset
 * document's `size` (bytes) and compares it against the limit.
 */
export function maxAssetSize(maxBytes: number, label: string) {
  return async (value: AssetValue, context: ValidationContext) => {
    const assetId = value?.asset?._ref
    if (!assetId) return true

    const client = context.getClient({ apiVersion: '2024-01-01' })
    const asset = await client.fetch<{ size?: number } | null>(
      `*[_id == $id][0]{size}`,
      { id: assetId },
    )

    if (asset?.size && asset.size > maxBytes) {
      const maxMb = Math.round(maxBytes / (1024 * 1024))
      const actualMb = (asset.size / (1024 * 1024)).toFixed(1)
      return `${label} must be smaller than ${maxMb}MB (uploaded file is ${actualMb}MB)`
    }

    return true
  }
}

export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024
export const MAX_VIDEO_SIZE_BYTES = 100 * 1024 * 1024

// Browsers other than Safari can't play a video/quicktime (.mov) <source> at
// all — it fails silently with no error or loading indicator. Restrict to
// containers every major browser decodes natively.
export const WEB_SAFE_VIDEO_MIME_TYPES = ['video/mp4', 'video/webm']

export function requireWebSafeVideo() {
  return async (value: AssetValue, context: ValidationContext) => {
    const assetId = value?.asset?._ref
    if (!assetId) return true

    const client = context.getClient({ apiVersion: '2024-01-01' })
    const asset = await client.fetch<{ mimeType?: string } | null>(
      `*[_id == $id][0]{mimeType}`,
      { id: assetId },
    )

    if (asset?.mimeType && !WEB_SAFE_VIDEO_MIME_TYPES.includes(asset.mimeType)) {
      return `This file is ${asset.mimeType}, which most browsers can't play (e.g. .mov/QuickTime only works in Safari). Re-export as .mp4 (H.264 + AAC) and upload that instead.`
    }

    return true
  }
}
