import CategorySection from '../components/CategorySection.jsx'
import HeroSection, { HERO_SIDE_COUNT } from '../components/HeroSection.jsx'
import { CATEGORIES } from '../data/categories.js'
import { useCategoryNews } from '../hooks/useCategoryNews.js'
import { useLatestNews } from '../hooks/useNews.js'

/** Cards in the "أحدث الأخبار" block. */
const LATEST_COUNT = 8
/** Articles per category block. */
const CATEGORY_COUNT = 4
/** The category that gets the larger lead-plus-list layout. */
const FEATURED_CATEGORY = 'sports'

/**
 * One category block. Loads its own feed so a slow or failing section never
 * holds up the rest of the page, and hides itself when the feed has nothing.
 */
function CategoryBlock({ category }) {
    const { status, articles } = useCategoryNews(category, { limit: CATEGORY_COUNT })

    if (status === 'success' && articles.length === 0) return null

    return (
        <CategorySection
            title={category.label}
            slug={category.slug}
            articles={articles}
            status={status}
            variant={category.slug === FEATURED_CATEGORY ? 'featured' : 'grid'}
            to={`/category/${category.slug}`}
            linkLabel="المزيد"
            skeletonCount={CATEGORY_COUNT}
        />
    )
}

export default function HomePage() {
    // One load feeds both the hero and the latest block, so no article is shown twice.
    const { status, articles } = useLatestNews()

    return (
        <>
            <h1 className="visually-hidden">Techifly — أخبار عربية</h1>

            <HeroSection articles={articles} status={status} />

            <CategorySection
                title="أحدث الأخبار"
                slug="latest"
                status={status}
                articles={articles.slice(1 + HERO_SIDE_COUNT, 1 + HERO_SIDE_COUNT + LATEST_COUNT)}
                to="/latest"
                linkLabel="كل الأخبار"
                skeletonCount={LATEST_COUNT}
            />

            {CATEGORIES.map((category) => (
                <CategoryBlock key={category.slug} category={category} />
            ))}
        </>
    )
}
