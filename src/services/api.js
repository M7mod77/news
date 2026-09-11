/**
 * News transport.
 *
 * Source: public Arabic RSS feeds (RT Arabic, CNN Arabic) converted to JSON by
 * rss2json, which is keyless and sends `Access-Control-Allow-Origin: *` so the
 * feeds can be read straight from the browser. Publisher feeds themselves do not
 * send CORS headers, which is why the converter is needed.
 *
 * No API key is involved anywhere in this project.
 */
const CONVERTER_URL = 'https://api.rss2json.com/v1/api.json'

/** Cache answers for the session so route changes and revisits do not refetch. */
const CACHE_TTL_MS = 10 * 60 * 1000
const CACHE_PREFIX = 'techifly:'

/**
 * Concurrent requests for the same feed share one promise. This also absorbs the
 * double effect invocation React StrictMode performs in development.
 */
const inFlightRequests = new Map()

export class NewsFeedError extends Error {
    constructor(message, { status, feed } = {}) {
        super(message)
        this.name = 'NewsFeedError'
        this.status = status
        this.feed = feed
    }
}

/** Short label for logs: the feed's host plus path. */
function describeFeed(feedUrl) {
    try {
        const { host, pathname } = new URL(feedUrl)
        return `${host}${pathname}`
    } catch {
        return String(feedUrl)
    }
}

function readCache(key) {
    try {
        const raw = sessionStorage.getItem(CACHE_PREFIX + key)
        if (!raw) return null
        const { savedAt, items } = JSON.parse(raw)
        if (Date.now() - savedAt > CACHE_TTL_MS) {
            sessionStorage.removeItem(CACHE_PREFIX + key)
            return null
        }
        return items
    } catch {
        return null
    }
}

function writeCache(key, items) {
    try {
        sessionStorage.setItem(CACHE_PREFIX + key, JSON.stringify({ savedAt: Date.now(), items }))
    } catch {
        // Storage unavailable or full — caching is an optimisation, not a requirement.
    }
}

async function requestFeed(feedUrl) {
    const feed = describeFeed(feedUrl)
    const url = `${CONVERTER_URL}?rss_url=${encodeURIComponent(feedUrl)}`

    let response
    try {
        response = await fetch(url, { headers: { Accept: 'application/json' } })
    } catch (cause) {
        throw new NewsFeedError(`${feed} failed: network request could not be completed (${cause.message})`, { feed })
    }

    const payload = await response.json().catch(() => null)

    if (!response.ok) {
        throw new NewsFeedError(`${feed} failed: HTTP ${response.status} - ${payload?.message ?? response.statusText}`, {
            status: response.status,
            feed
        })
    }

    if (payload?.status !== 'ok' || !Array.isArray(payload.items)) {
        throw new NewsFeedError(
            `${feed} failed: converter returned "${payload?.status ?? 'no status'}" - ${payload?.message ?? 'no items'}`,
            { status: response.status, feed }
        )
    }

    return payload.items
}

/**
 * Fetches one RSS feed as JSON, reusing cached and in-flight results so a feed
 * used by several sections costs a single request.
 * @param {string} feedUrl - the publisher's RSS URL.
 * @returns {Promise<Array>} raw feed items.
 */
export function fetchFeed(feedUrl) {
    const cached = readCache(feedUrl)
    if (cached) return Promise.resolve(cached)

    const pending = inFlightRequests.get(feedUrl)
    if (pending) return pending

    const request = requestFeed(feedUrl)
        .then((items) => {
            writeCache(feedUrl, items)
            return items
        })
        .finally(() => inFlightRequests.delete(feedUrl))

    inFlightRequests.set(feedUrl, request)
    return request
}

/**
 * Logs a feed failure for developers: feed, HTTP status and the converter's own
 * message. Users only ever see the Arabic message in the UI.
 */
export function logNewsError(error) {
    if (error instanceof NewsFeedError) {
        console.error('[News]', error.message)
    } else {
        console.error('[News] unexpected failure:', error?.stack ?? error)
    }
}
