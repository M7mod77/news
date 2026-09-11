import { Link } from 'react-router-dom'

export default function NotFoundPage() {
    return (
        <>
            <div className="page-head">
                <h1 className="page-head__title">الصفحة غير موجودة</h1>
            </div>
            <div className="grid grid--cards">
                <div className="state state--empty">
                    <p className="state__title">الصفحة غير موجودة</p>
                    <p className="state__text">تأكد من الرابط أو عد إلى الصفحة الرئيسية.</p>
                    <Link className="section__link" to="/">
                        الصفحة الرئيسية ←
                    </Link>
                </div>
            </div>
        </>
    )
}
