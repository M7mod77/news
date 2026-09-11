/** Shown when a request succeeds but there is nothing to display. */
export default function EmptyState({
    title = 'لا توجد أخبار',
    text = 'لا توجد أخبار متاحة في هذا القسم حالياً.',
    inline = false
}) {
    return (
        <div className={`state state--empty${inline ? ' state--inline' : ''}`}>
            <p className="state__title">{title}</p>
            <p className="state__text">{text}</p>
        </div>
    )
}
