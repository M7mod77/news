import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import EmptyState from '../components/EmptyState.jsx'
import ErrorState from '../components/ErrorState.jsx'
import LoadingSkeleton from '../components/LoadingSkeleton.jsx'
import NewsCard from '../components/NewsCard.jsx'
import { findCategory } from '../data/categories.js'
import { useCategoryNews } from '../hooks/useCategoryNews.js'
import { SITE_NAME } from '../data/site.js'

const SKELETON_COUNT = 8

export default function CategoryPage() {
    const { slug } = useParams()
    const category = findCategory(slug)
    const { status, articles } = useCategoryNews(category)

    useEffect(() => {
        document.title = category ? `${category.label} — ${SITE_NAME}` : `الأقسام — ${SITE_NAME}`
    }, [category])

    if (!category) {
        return (
            <>
                <div className="page-head">
                    <h1 className="page-head__title">القسم غير موجود</h1>
                </div>
                <div className="grid grid--cards">
                    <EmptyState
                        title="القسم غير موجود"
                        text="تأكد من الرابط أو عد إلى الصفحة الرئيسية."
                    />
                </div>
            </>
        )
    }

    return (
        <>
            <div className="page-head">
                <h1 className="page-head__title">{category.label}</h1>
                <p className="page-head__subtitle">أحدث أخبار قسم {category.label}</p>
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
