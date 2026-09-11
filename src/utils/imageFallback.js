import fallbackImage from '../assets/techifly-logo.png'

/** Shown when an article has no usable image, or when its image fails to load. */
export const FALLBACK_IMAGE_URL = fallbackImage

/**
 * Swaps a broken publisher image for the site mark.
 * Guarded so a failing fallback can never retrigger the handler.
 */
export function handleImageError(event) {
    const image = event.currentTarget
    if (image.dataset.fallbackApplied === 'true') return

    image.dataset.fallbackApplied = 'true'
    image.classList.add('is-placeholder')
    image.src = FALLBACK_IMAGE_URL
}
