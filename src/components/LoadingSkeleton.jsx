function SkeletonCard({ variant }) {
    return (
        <div className={`skeleton skeleton--${variant}`}>
            <div className="skeleton__media" />
            <div className="skeleton__body">
                {variant === 'compact' ? (
                    <>
                        <div className="skeleton__line skeleton__line--long" />
                        <div className="skeleton__line skeleton__line--short" />
                    </>
                ) : (
                    <>
                        <div className="skeleton__line skeleton__line--short" />
                        <div className="skeleton__line" />
                        <div className="skeleton__line skeleton__line--long" />
                    </>
                )}
            </div>
        </div>
    )
}

/**
 * Placeholder cards shown while a request is in flight. Shapes match the real
 * cards so nothing shifts when the articles arrive.
 *
 * @param {{count?: number, variant?: 'card'|'feature'|'compact'}} props
 */
export default function LoadingSkeleton({ count = 4, variant = 'card' }) {
    return Array.from({ length: count }, (_, index) => <SkeletonCard key={index} variant={variant} />)
}
