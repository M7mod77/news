import { fetchFeed, NewsFeedError } from './api.js'
import { CATEGORIES, DEFAULT_CATEGORY_LABEL } from '../data/categories.js'
import { formatPublishedDate, parsePublishedDate } from '../utils/formatDate.js'

/** Feed items carry HTML in their summaries; cards show plain text. */
const MAX_DESCRIPTION_LENGTH = 220

function cleanText(value) {
    return typeof value === 'string' ? value.trim() : ''
}

/** Removes markup and entity escapes from a feed summary. */
function toPlainText(html) {
    const withoutTags = cleanText(html).replace(/<[^>]*>/g, ' ')
    const decoded = withoutTags
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    const collapsed = decoded.replace(/\s+/g, ' ').trim()

    return collapsed.length > MAX_DESCRIPTION_LENGTH
        ? `${collapsed.slice(0, MAX_DESCRIPTION_LENGTH).trimEnd()}…`
        : collapsed
}

/** Feeds expose images either as a thumbnail or as an enclosure. */
function pickImage(item) {
    const candidates = [item?.thumbnail, item?.enclosure?.link]
    const image = candidates.map(cleanText).find((value) => /^https?:\/\//i.test(value))
    return image ?? null
}

/**
 * Turns a raw feed item into the shape the UI renders.
 * Returns null when the item is unusable (no title or no link).
 */
export function normalizeArticle(item, categoryLabel = DEFAULT_CATEGORY_LABEL) {
    if (!item || typeof item !== 'object') return null

    const title = toPlainText(item.title)
    const url = cleanText(item.link)
    if (!title || !/^https?:\/\//i.test(url)) return null

    const published = parsePublishedDate(item.pubDate)

    return {
        title,
        description: toPlainText(item.description ?? item.content),
        image: pickImage(item),
        url,
        category: categoryLabel,
        published,
        author: cleanText(item.author),
        publishedLabel: formatPublishedDate(published)
    }
}

/** Removes repeated articles, keeping the first occurrence. Articles are keyed by URL. */
export function dedupeArticles(articles) {
    const seen = new Set()
    return articles.filter((article) => {
        if (seen.has(article.url)) return false
        seen.add(article.url)
        return true
    })
}

function prepareArticles(items, categoryLabel) {
    return dedupeArticles(items.map((item) => normalizeArticle(item, categoryLabel)).filter(Boolean))
}

/**
 * Articles for one category, straight from that category's own feed.
 * @param {Object} category - an entry from CATEGORIES.
 * @param {{limit?: number}} options
 * @returns {Promise<Array>} normalized articles.
 */
export async function fetchCategoryNews(category, { limit } = {}) {
    const items = await fetchFeed(category.feed)
    const articles = prepareArticles(items, category.label)
    return typeof limit === 'number' ? articles.slice(0, limit) : articles
}

/**
 * Latest news across the whole site: every section feed merged and sorted by
 * publication time. These are the same feeds the category blocks use, so on the
 * homepage this costs no extra requests — the cache serves them.
 * Fails only when every feed fails.
 * @returns {Promise<Array>} normalized articles, newest first.
 */
export async function fetchLatestNews() {
    const results = await Promise.allSettled(
        CATEGORIES.map(async (category) => prepareArticles(await fetchFeed(category.feed), category.label))
    )

    const articles = results
        .filter((result) => result.status === 'fulfilled')
        .flatMap((result) => result.value)

    if (articles.length === 0) {
        const firstFailure = results.find((result) => result.status === 'rejected')
        throw firstFailure?.reason ?? new NewsFeedError('No feed returned any usable article')
    }

    return dedupeArticles(articles).sort(
        (a, b) => (b.published?.getTime() ?? 0) - (a.published?.getTime() ?? 0)
    )
}
