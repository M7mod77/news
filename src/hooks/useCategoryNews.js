import { fetchCategoryNews } from '../services/news.js'
import { useNews } from './useNews.js'

/**
 * Articles for one category.
 * @param {Object|null} category - an entry from CATEGORIES, or null for an unknown slug.
 * @param {{limit?: number}} options
 * @returns {{status: 'loading'|'success'|'error', articles: Array}}
 */
export function useCategoryNews(category, { limit } = {}) {
    return useNews(
        () => (category ? fetchCategoryNews(category, { limit }) : Promise.resolve([])),
        [category?.slug, limit]
    )
}
