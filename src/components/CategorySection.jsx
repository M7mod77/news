import LoadingSkeleton from './LoadingSkeleton.jsx'
import ErrorState from './ErrorState.jsx'
import NewsCard from './NewsCard.jsx'
import SectionHead from './SectionHead.jsx'

/**
 * A titled block of articles.
 *
 * @param {Object} props
 * @param {string} props.title - section heading.
 * @param {string} [props.slug] - used for the section id / heading association.
 * @param {Array} props.articles
 * @param {'grid'|'featured'} [props.variant] - 'featured' puts a lead card beside a short list.
 * @param {'loading'|'success'|'error'} [props.status]
 * @param {string} [props.to] - link target for the section's "more" link.
 * @param {string} [props.linkLabel]
 * @param {number} [props.skeletonCount]
 */
export default function CategorySection({
    title,
    slug,
    articles = [],
    variant = 'grid',
    status = 'success',
    to,
    linkLabel,
    skeletonCount = 4
}) {
    const headingId = slug ? `${slug}-heading` : undefined
    const isFeatured = variant === 'featured' && articles.length > 1

    let body
    if (status === 'loading') {
        body = isFeaturedLayout(variant) ? (
            <div className="split">
                <LoadingSkeleton count={1} variant="card" />
                <div className="split__list">
                    <LoadingSkeleton count={skeletonCount - 1} variant="compact" />
                </div>
            </div>
        ) : (
            <div className="grid grid--cards">
                <LoadingSkeleton count={skeletonCount} variant="card" />
            </div>
        )
    } else if (status === 'error') {
        body = (
            <div className="grid">
                <ErrorState inline />
            </div>
        )
    } else if (isFeatured) {
        const [lead, ...rest] = articles
        body = (
            <div className="split">
                <NewsCard article={lead} />
                <div className="split__list">
                    {rest.map((article) => (
                        <NewsCard key={article.url} article={article} variant="compact" />
                    ))}
                </div>
            </div>
        )
    } else {
        body = (
            <div className="grid grid--cards">
                {articles.map((article) => (
                    <NewsCard key={article.url} article={article} />
                ))}
            </div>
        )
    }

    return (
        <section className="section" id={slug} aria-labelledby={headingId}>
            <SectionHead title={title} headingId={headingId} to={to} linkLabel={linkLabel} />
            {body}
        </section>
    )
}

function isFeaturedLayout(variant) {
    return variant === 'featured'
}
