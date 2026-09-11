import EmptyState from '../components/EmptyState.jsx'
import ErrorState from '../components/ErrorState.jsx'
import LoadingSkeleton from '../components/LoadingSkeleton.jsx'
import NewsCard from '../components/NewsCard.jsx'
import { useLatestNews } from '../hooks/useNews.js'

const SKELETON_COUNT = 12

export default function LatestNewsPage() {
    const { status, articles } = useLatestNews()

    return (
        <>
            <div className="page-head">
                <h1 className="page-head__title">أحدث الأخبار</h1>
                <p className="page-head__subtitle">آخر ما نُشر من أخبار عربية</p>
            </div>

            <div className="grid grid--cards">
                {status === 'loading' && <LoadingSkeleton count={SKELETON_COUNT} />}
                {status === 'error' && <ErrorState />}
                {status === 'success' && articles.length === 0 && <EmptyState />}
                {status === 'success' &&
                    articles.map((article) => <NewsCard key={article.url} article={article} />)}
            </div>
        </>
    )
}
