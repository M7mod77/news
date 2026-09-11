/**
 * Category registry.
 *
 * Each section maps to a real per-section Arabic RSS feed published by the source
 * itself, so categories are native to the provider rather than keyword guesses.
 */
export const CATEGORIES = [
    {
        slug: 'sports',
        label: 'رياضة',
        source: 'RT Arabic',
        feed: 'https://arabic.rt.com/rss/sport/'
    },
    {
        slug: 'politics',
        label: 'سياسة',
        source: 'CNN Arabic',
        feed: 'https://arabic.cnn.com/api/v1/rss/middle-east/rss.xml'
    },
    {
        slug: 'business',
        label: 'اقتصاد',
        source: 'RT Arabic',
        feed: 'https://arabic.rt.com/rss/business/'
    },
    {
        slug: 'technology',
        label: 'تكنولوجيا',
        source: 'RT Arabic',
        feed: 'https://arabic.rt.com/rss/technology/'
    },
    {
        slug: 'health',
        label: 'صحة',
        source: 'RT Arabic',
        feed: 'https://arabic.rt.com/rss/health/'
    },
    {
        slug: 'entertainment',
        label: 'فن',
        source: 'RT Arabic',
        feed: 'https://arabic.rt.com/rss/culture/'
    },
    {
        slug: 'world',
        label: 'العالم',
        source: 'RT Arabic',
        feed: 'https://arabic.rt.com/rss/world/'
    }
]

export const DEFAULT_CATEGORY_LABEL = 'أخبار'

export function findCategory(slug) {
    return CATEGORIES.find((category) => category.slug === slug) ?? null
}
