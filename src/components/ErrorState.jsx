/** Shown when a feed request fails. The technical detail goes to the console. */
export default function ErrorState({ inline = false }) {
    return (
        <div className={`state state--error${inline ? ' state--inline' : ''}`}>
            <p className="state__title">تعذر تحميل الأخبار</p>
            <p className="state__text">تعذر تحميل الأخبار حالياً، حاول مرة أخرى لاحقاً.</p>
        </div>
    )
}
