const dateFormatter = new Intl.DateTimeFormat('ar', {
    calendar: 'gregory',
    numberingSystem: 'latn',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
})

const relativeTimeFormatter = new Intl.RelativeTimeFormat('ar', { numeric: 'auto' })

const longDateFormatter = new Intl.DateTimeFormat('ar', {
    calendar: 'gregory',
    numberingSystem: 'latn',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
})

/** The converter returns `YYYY-MM-DD HH:mm:ss` in UTC. */
export function parsePublishedDate(value) {
    const raw = typeof value === 'string' ? value.trim() : ''
    if (!raw) return null

    const normalized = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(raw) ? `${raw.replace(' ', 'T')}Z` : raw

    const date = new Date(normalized)
    return Number.isNaN(date.getTime()) ? null : date
}

/** Recent articles get a relative time ("منذ ساعتين"), older ones an absolute date. */
export function formatPublishedDate(date) {
    if (!date) return ''

    // Clock skew between the feed and the browser can put a fresh item slightly ahead.
    const diffMinutes = Math.min(0, Math.round((date.getTime() - Date.now()) / 60000))

    if (Math.abs(diffMinutes) < 60) {
        return relativeTimeFormatter.format(diffMinutes, 'minute')
    }
    if (Math.abs(diffMinutes) < 60 * 24) {
        return relativeTimeFormatter.format(Math.round(diffMinutes / 60), 'hour')
    }
    return dateFormatter.format(date)
}

/** Header date, e.g. "الجمعة، 11 سبتمبر 2026". */
export function formatLongDate(date) {
    return longDateFormatter.format(date)
}
