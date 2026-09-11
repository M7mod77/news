import ErrorState from './ErrorState.jsx'
import EmptyState from './EmptyState.jsx'
import LoadingSkeleton from './LoadingSkeleton.jsx'
import NewsCard from './NewsCard.jsx'

/** Articles shown beside the lead story. */
export const HERO_SIDE_COUNT = 4

/**
 * Lead story plus the next few headlines.
 * @param {{articles: Array, status: 'loading'|'success'|'error'}} props
 */
export default function HeroSection({ articles = [], status = 'success' }) {
    if (status === 'loading') {
        return (
            <div className="hero" id="hero">
                <LoadingSkeleton count={1} variant="feature" />
                <div className="hero__side">
                    <LoadingSkeleton count={HERO_SIDE_COUNT} variant="compact" />
                </div>
            </div>
        )
    }

    if (status === 'error') {
        return (
            <div className="hero" id="hero">
                <ErrorState />
            </div>
        )
    }

    if (articles.length === 0) {
        return (
            <div className="hero" id="hero">
                <EmptyState />
            </div>
        )
    }

    const [lead, ...rest] = articles

    return (
        <div className="hero" id="hero">
            <NewsCard article={lead} variant="feature" />
            <div className="hero__side">
                {rest.slice(0, HERO_SIDE_COUNT).map((article) => (
                    <NewsCard key={article.url} article={article} variant="compact" />
                ))}
            </div>
        </div>
    )
}
