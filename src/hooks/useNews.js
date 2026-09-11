import { useEffect, useState } from 'react'
import { logNewsError } from '../services/api.js'
import { fetchLatestNews } from '../services/news.js'

/**
 * Shared loading/error wrapper around a news loader.
 * The service layer caches and de-duplicates requests, so StrictMode's double
 * effect in development does not cause a second network call.
 *
 * @param {() => Promise<Array>} loader - returns the articles to show.
 * @param {Array} deps - re-runs the loader when these change.
 * @returns {{status: 'loading'|'success'|'error', articles: Array}}
 */
export function useNews(loader, deps = []) {
    const [state, setState] = useState({ status: 'loading', articles: [] })

    useEffect(() => {
        let active = true
        setState({ status: 'loading', articles: [] })

        loader()
            .then((articles) => {
                if (active) setState({ status: 'success', articles })
            })
            .catch((error) => {
                logNewsError(error)
                if (active) setState({ status: 'error', articles: [] })
            })

        return () => {
            active = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)

    return state
}

/** Latest news merged across every section feed, newest first. */
export function useLatestNews() {
    return useNews(() => fetchLatestNews(), [])
}
