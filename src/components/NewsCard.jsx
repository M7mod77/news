import { FALLBACK_IMAGE_URL, handleImageError } from '../utils/imageFallback.js'

/** Article image with the site mark as fallback for missing or broken sources. */
function ArticleImage({ src, lazy = true }) {
    const hasImage = Boolean(src)

    return (
        <img
            src={hasImage ? src : FALLBACK_IMAGE_URL}
            className={hasImage ? undefined : 'is-placeholder'}
            alt=""
            decoding="async"
            loading={lazy ? 'lazy' : undefined}
            onError={handleImageError}
        />
    )
}

function PublishedTime({ article, className }) {
    if (!article.publishedLabel) return null

    return (
        <time className={className} dateTime={article.published?.toISOString()}>
            {article.publishedLabel}
        </time>
    )
}

/**
 * One article, in the layout the surrounding section needs.
 * Always links out to the original publisher.
 *
 * @param {{article: Object, variant?: 'default'|'feature'|'compact'}} props
 */
export default function NewsCard({ article, variant = 'default' }) {
    const linkProps = {
        href: article.url,
        target: '_blank',
        rel: 'noopener noreferrer'
    }

    if (variant === 'feature') {
        return (
            <a className="feature" {...linkProps}>
                <ArticleImage src={article.image} lazy={false} />
                <div className="feature__body">
                    <span className="chip chip--solid">{article.category}</span>
                    <h2 className="feature__title" dir="auto">
                        {article.title}
                    </h2>
                    {article.description && (
                        <p className="feature__desc" dir="auto">
                            {article.description}
                        </p>
                    )}
                    <div className="feature__meta">
                        <PublishedTime article={article} />
                    </div>
                </div>
            </a>
        )
    }

    if (variant === 'compact') {
        return (
            <a className="compact" {...linkProps}>
                <div className="compact__media">
                    <ArticleImage src={article.image} />
                </div>
                <div className="compact__body">
                    <h3 className="compact__title" dir="auto">
                        {article.title}
                    </h3>
                    <div className="compact__meta">
                        <span>{article.category}</span>
                        {article.publishedLabel && (
                            <>
                                {' · '}
                                <PublishedTime article={article} />
                            </>
                        )}
                    </div>
                </div>
            </a>
        )
    }

    return (
        <a className="card" {...linkProps}>
            <div className="card__media">
                <ArticleImage src={article.image} />
            </div>
            <div className="card__body">
                <span className="chip">{article.category}</span>
                <h3 className="card__title" dir="auto">
                    {article.title}
                </h3>
                {article.description && (
                    <p className="card__desc" dir="auto">
                        {article.description}
                    </p>
                )}
                <div className="card__meta">
                    <PublishedTime article={article} />
                    <span className="card__more">اقرأ المزيد ←</span>
                </div>
            </div>
        </a>
    )
}
